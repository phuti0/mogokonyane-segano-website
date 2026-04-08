'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { defaultPlatformState, PLATFORM_STORAGE_KEY } from '@/lib/platform-data'
import { limitArray, sanitizeText, safeDate, validatePrice, validateRequiredText } from '@/lib/platform-security'
import { Listing, MessageThread, OrderItem, OrderStatus, PlatformState, PlatformUser, UserRole } from '@/lib/platform-types'

const categories = ['agriculture', 'tailoring', 'fashion', 'services', 'food', 'other']

type ListingForm = {
  title: string
  description: string
  category: string
  price: string
  location: string
  imageUrl: string
}

function makeId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

function statusClass(status: OrderStatus): string {
  if (status === 'completed') return 'bg-green-100 text-green-800'
  if (status === 'in_progress') return 'bg-yellow-100 text-yellow-800'
  return 'bg-slate-100 text-slate-800'
}

export default function PlatformApp() {
  const [state, setState] = useState<PlatformState>(() => {
    if (typeof window === 'undefined') return defaultPlatformState
    try {
      const raw = localStorage.getItem(PLATFORM_STORAGE_KEY)
      if (!raw) return defaultPlatformState
      const parsed = JSON.parse(raw) as PlatformState
      if (!parsed?.users || !parsed?.listings || !parsed?.orders || !parsed?.threads) {
        return defaultPlatformState
      }
      return parsed
    } catch {
      return defaultPlatformState
    }
  })
  const [activeUserId, setActiveUserId] = useState<string>('u-provider-1')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedThreadId, setSelectedThreadId] = useState<string>('')
  const [messageBody, setMessageBody] = useState('')
  const [error, setError] = useState('')
  const [listingForm, setListingForm] = useState<ListingForm>({
    title: '',
    description: '',
    category: 'agriculture',
    price: '',
    location: '',
    imageUrl: '',
  })

  useEffect(() => {
    localStorage.setItem(PLATFORM_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const activeUser = useMemo(() => {
    const found = state.users.find((u) => u.id === activeUserId)
    return found ?? state.users[0]
  }, [activeUserId, state.users])

  const activeRole: UserRole = activeUser.role

  const visibleListings = useMemo(() => {
    return state.listings.filter((listing) => {
      const isOwner = listing.ownerId === activeUser.id
      const canView = listing.status === 'approved' || isOwner || activeRole === 'admin'
      if (!canView) return false

      const normalizedSearch = search.toLowerCase().trim()
      const matchesSearch =
        normalizedSearch.length === 0 ||
        listing.title.toLowerCase().includes(normalizedSearch) ||
        listing.description.toLowerCase().includes(normalizedSearch)
      const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter
      const matchesLocation = locationFilter === 'all' || listing.location === locationFilter
      const min = minPrice ? Number(minPrice) : Number.MIN_SAFE_INTEGER
      const max = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER
      const matchesPrice = listing.price >= min && listing.price <= max
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice
    })
  }, [state.listings, activeRole, activeUser.id, search, categoryFilter, locationFilter, minPrice, maxPrice])

  const myListings = state.listings.filter((l) => l.ownerId === activeUser.id)
  const myOrders = state.orders.filter((o) => o.customerId === activeUser.id || o.providerId === activeUser.id)
  const myThreads = state.threads.filter((t) => t.participants.includes(activeUser.id))

  const selectedThread = myThreads.find((t) => t.id === selectedThreadId) ?? myThreads[0]

  const allLocations = useMemo(() => {
    const unique = Array.from(new Set(state.listings.map((l) => l.location)))
    return unique.sort()
  }, [state.listings])

  const analytics = {
    users: state.users.length,
    activeListings: state.listings.filter((l) => l.status === 'approved').length,
    pendingListings: state.listings.filter((l) => l.status === 'pending').length,
    orders: state.orders.length,
    completedOrders: state.orders.filter((o) => o.status === 'completed').length,
    messages: state.threads.reduce((sum, t) => sum + t.messages.length, 0),
  }

  const createListing = () => {
    setError('')
    if (activeRole !== 'provider' && activeRole !== 'admin') {
      setError('Only providers can create listings.')
      return
    }

    const titleError = validateRequiredText(listingForm.title, 4, 90)
    const descriptionError = validateRequiredText(listingForm.description, 12, 600)
    const locationError = validateRequiredText(listingForm.location, 2, 60)
    const priceNumber = Number(listingForm.price)
    const priceError = validatePrice(priceNumber)

    if (titleError || descriptionError || locationError || priceError) {
      setError(titleError || descriptionError || locationError || priceError || 'Invalid listing data.')
      return
    }

    const cleanedImage = sanitizeText(listingForm.imageUrl)
    const listing: Listing = {
      id: makeId('listing'),
      ownerId: activeUser.id,
      title: sanitizeText(listingForm.title),
      description: sanitizeText(listingForm.description),
      category: listingForm.category,
      price: priceNumber,
      location: sanitizeText(listingForm.location),
      images: cleanedImage ? [cleanedImage] : [],
      status: activeRole === 'admin' ? 'approved' : 'pending',
      createdAt: new Date().toISOString(),
    }

    setState((prev) => ({ ...prev, listings: [listing, ...prev.listings] }))
    setListingForm({ title: '', description: '', category: 'agriculture', price: '', location: '', imageUrl: '' })
  }

  const placeOrder = (listing: Listing) => {
    setError('')
    if (activeRole !== 'customer' && activeRole !== 'admin') {
      setError('Switch to customer role to place an order/request.')
      return
    }
    const order: OrderItem = {
      id: makeId('order'),
      listingId: listing.id,
      customerId: activeUser.id,
      providerId: listing.ownerId,
      status: 'pending',
      note: `Order request for ${listing.title}`,
      createdAt: new Date().toISOString(),
    }
    const thread: MessageThread = {
      id: makeId('thread'),
      orderId: order.id,
      participants: [order.customerId, order.providerId],
      messages: [
        {
          id: makeId('message'),
          senderId: activeUser.id,
          body: 'Hello, I would like to request this listing. Please share next steps.',
          createdAt: new Date().toISOString(),
        },
      ],
    }
    setState((prev) => ({
      ...prev,
      orders: [order, ...prev.orders],
      threads: [thread, ...prev.threads],
    }))
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    }))
  }

  const moderateListing = (listingId: string, status: Listing['status']) => {
    setState((prev) => ({
      ...prev,
      listings: prev.listings.map((listing) => (listing.id === listingId ? { ...listing, status } : listing)),
    }))
  }

  const toggleUserActive = (userId: string) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((user) => (user.id === userId ? { ...user, active: !user.active } : user)),
    }))
  }

  const sendMessage = () => {
    setError('')
    if (!selectedThread) return
    const cleaned = sanitizeText(messageBody)
    const validation = validateRequiredText(cleaned, 2, 300)
    if (validation) {
      setError(validation)
      return
    }

    setState((prev) => ({
      ...prev,
      threads: prev.threads.map((thread) => {
        if (thread.id !== selectedThread.id) return thread
        return {
          ...thread,
          messages: limitArray(
            [
              ...thread.messages,
              {
                id: makeId('message'),
                senderId: activeUser.id,
                body: cleaned,
                createdAt: new Date().toISOString(),
              },
            ],
            200,
          ),
        }
      }),
    }))
    setMessageBody('')
  }

  const updateProfile = (field: keyof PlatformUser, value: string) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === activeUser.id
          ? {
              ...user,
              [field]: sanitizeText(value),
            }
          : user,
      ),
    }))
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform MVP</h1>
          <p className="text-muted-foreground">Core marketplace, orders, messaging, and admin controls with no database.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground" htmlFor="active-user">Active user</label>
          <select
            id="active-user"
            value={activeUserId}
            onChange={(e) => setActiveUserId(e.target.value)}
            className="h-10 rounded-md border border-border bg-background px-3 text-sm"
          >
            {state.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <Tabs defaultValue="marketplace" className="gap-4">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-transparent p-0">
          <TabsTrigger value="marketplace" className="rounded-lg border border-border bg-card px-3 py-2">Marketplace</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-lg border border-border bg-card px-3 py-2">My Listings</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg border border-border bg-card px-3 py-2">Orders</TabsTrigger>
          <TabsTrigger value="messages" className="rounded-lg border border-border bg-card px-3 py-2">Messages</TabsTrigger>
          <TabsTrigger value="admin" className="rounded-lg border border-border bg-card px-3 py-2">Admin</TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg border border-border bg-card px-3 py-2">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Search & Discovery</CardTitle>
              <CardDescription>Filter approved listings by keyword, category, location, and price.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-5">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm md:col-span-2" placeholder="Search products or services" />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
                  <option value="all">All locations</option>
                  {allLocations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm" placeholder="Min" inputMode="numeric" />
                  <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm" placeholder="Max" inputMode="numeric" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {visibleListings.map((listing) => {
                  const owner = state.users.find((user) => user.id === listing.ownerId)
                  return (
                    <Card key={listing.id} className="border-border/60 bg-surface">
                      <CardHeader className="gap-1">
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        <CardDescription>{listing.category} - {listing.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{listing.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-primary">R{listing.price.toLocaleString()}</span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{listing.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Provider: {owner?.name ?? 'Unknown'}</p>
                        <Button className="h-11 w-full" onClick={() => placeOrder(listing)}>Request / Place Order</Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Listing</CardTitle>
                <CardDescription>Upload products or services with category, image, and pricing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <input className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" placeholder="Title" value={listingForm.title} onChange={(e) => setListingForm((prev) => ({ ...prev, title: e.target.value }))} />
                <textarea className="min-h-28 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="Description" value={listingForm.description} onChange={(e) => setListingForm((prev) => ({ ...prev, description: e.target.value }))} />
                <div className="grid gap-3 md:grid-cols-2">
                  <select className="h-10 rounded-md border border-border bg-background px-3 text-sm" value={listingForm.category} onChange={(e) => setListingForm((prev) => ({ ...prev, category: e.target.value }))}>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <input className="h-10 rounded-md border border-border bg-background px-3 text-sm" inputMode="numeric" placeholder="Price" value={listingForm.price} onChange={(e) => setListingForm((prev) => ({ ...prev, price: e.target.value }))} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input className="h-10 rounded-md border border-border bg-background px-3 text-sm" placeholder="Location" value={listingForm.location} onChange={(e) => setListingForm((prev) => ({ ...prev, location: e.target.value }))} />
                  <input className="h-10 rounded-md border border-border bg-background px-3 text-sm" placeholder="Image URL (optional)" value={listingForm.imageUrl} onChange={(e) => setListingForm((prev) => ({ ...prev, imageUrl: e.target.value }))} />
                </div>
                <Button className="h-11 w-full" onClick={createListing}>Submit Listing</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Track listing approval state and visibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {myListings.length === 0 && <p className="text-sm text-muted-foreground">No listings created yet.</p>}
                {myListings.map((listing) => (
                  <div key={listing.id} className="rounded-lg border border-border/70 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-medium">{listing.title}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{listing.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.location} - R{listing.price.toLocaleString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order / Request Tracking</CardTitle>
              <CardDescription>Track requests from pending to completed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {myOrders.length === 0 && <p className="text-sm text-muted-foreground">No orders yet.</p>}
              {myOrders.map((order) => {
                const listing = state.listings.find((item) => item.id === order.listingId)
                return (
                  <div key={order.id} className="rounded-lg border border-border/70 p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">{listing?.title ?? 'Listing removed'}</p>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass(order.status)}`}>{order.status}</span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{order.note}</p>
                    {(activeUser.id === order.providerId || activeRole === 'admin') && (
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="h-10" onClick={() => updateOrderStatus(order.id, 'pending')}>Pending</Button>
                        <Button size="sm" variant="outline" className="h-10" onClick={() => updateOrderStatus(order.id, 'in_progress')}>In progress</Button>
                        <Button size="sm" variant="outline" className="h-10" onClick={() => updateOrderStatus(order.id, 'completed')}>Completed</Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>Basic messaging between customers and providers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {myThreads.length === 0 && <p className="text-sm text-muted-foreground">No threads yet.</p>}
                {myThreads.map((thread) => {
                  const order = state.orders.find((item) => item.id === thread.orderId)
                  return (
                    <button
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm ${selectedThread?.id === thread.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <p className="font-medium">Order {order?.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">{thread.messages.length} messages</p>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thread</CardTitle>
                <CardDescription>Secure text-only messaging with sanitized input.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[420px] space-y-2 overflow-y-auto rounded-md border border-border p-3">
                  {selectedThread?.messages.map((message) => {
                    const sender = state.users.find((user) => user.id === message.senderId)
                    return (
                      <div key={message.id} className="rounded-md bg-slate-50 p-3">
                        <p className="text-xs text-muted-foreground">
                          {sender?.name ?? 'Unknown'} - {new Date(safeDate(message.createdAt)).toLocaleString()}
                        </p>
                        <p className="text-sm">{message.body}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <input className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-sm" value={messageBody} onChange={(e) => setMessageBody(e.target.value)} placeholder="Write a message" />
                  <Button className="h-11" onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admin">
          {activeRole !== 'admin' ? (
            <Card>
              <CardHeader>
                <CardTitle>Admin Access</CardTitle>
                <CardDescription>Switch to the admin user to manage the platform.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardDescription>Users</CardDescription><CardTitle>{analytics.users}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Approved listings</CardDescription><CardTitle>{analytics.activeListings}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Orders</CardDescription><CardTitle>{analytics.orders}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Messages</CardDescription><CardTitle>{analytics.messages}</CardTitle></CardHeader></Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>Activate/deactivate user accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {state.users.map((user) => (
                    <div key={user.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email} - {user.role}</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-10" onClick={() => toggleUserActive(user.id)}>
                        {user.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Listing Moderation</CardTitle>
                  <CardDescription>Approve or remove provider listings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {state.listings.map((listing) => (
                    <div key={listing.id} className="rounded-md border border-border p-3">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium">{listing.title}</p>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{listing.status}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-10" onClick={() => moderateListing(listing.id, 'approved')}>Approve</Button>
                        <Button size="sm" variant="outline" className="h-10" onClick={() => moderateListing(listing.id, 'pending')}>Set Pending</Button>
                        <Button size="sm" variant="outline" className="h-10" onClick={() => moderateListing(listing.id, 'removed')}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="account">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>User profile creation and basic account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="text-sm text-muted-foreground" htmlFor="profile-name">Name</label>
                <input id="profile-name" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={activeUser.name} onChange={(e) => updateProfile('name', e.target.value)} />
                <label className="text-sm text-muted-foreground" htmlFor="profile-email">Email</label>
                <input id="profile-email" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={activeUser.email} onChange={(e) => updateProfile('email', e.target.value)} />
                <label className="text-sm text-muted-foreground" htmlFor="profile-phone">Phone</label>
                <input id="profile-phone" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={activeUser.phone} onChange={(e) => updateProfile('phone', e.target.value)} />
                <label className="text-sm text-muted-foreground" htmlFor="profile-location">Location</label>
                <input id="profile-location" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" value={activeUser.location} onChange={(e) => updateProfile('location', e.target.value)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Baseline</CardTitle>
                <CardDescription>Current protections before auth and payments are added.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Input sanitization for listing and messaging fields.</li>
                  <li>Length and numeric validation to reduce malformed payloads.</li>
                  <li>Role-based controls for admin moderation and provider features.</li>
                  <li>Client-side only demo state; do not store sensitive credentials.</li>
                </ul>
                <div className="mt-6">
                  <Link href="/" className="text-sm font-medium text-primary hover:underline">Back to marketing site</Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
