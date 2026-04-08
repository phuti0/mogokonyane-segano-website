export type UserRole = 'customer' | 'provider' | 'admin'

export type OrderStatus = 'pending' | 'in_progress' | 'completed'

export type ListingStatus = 'pending' | 'approved' | 'removed'

export interface PlatformUser {
  id: string
  name: string
  email: string
  location: string
  phone: string
  role: UserRole
  active: boolean
}

export interface Listing {
  id: string
  ownerId: string
  title: string
  description: string
  category: string
  price: number
  location: string
  images: string[]
  status: ListingStatus
  createdAt: string
}

export interface OrderItem {
  id: string
  listingId: string
  customerId: string
  providerId: string
  status: OrderStatus
  note: string
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  body: string
  createdAt: string
}

export interface MessageThread {
  id: string
  orderId: string
  participants: string[]
  messages: Message[]
}

export interface PlatformState {
  users: PlatformUser[]
  listings: Listing[]
  orders: OrderItem[]
  threads: MessageThread[]
}
