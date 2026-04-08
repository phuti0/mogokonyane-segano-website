import { PlatformState } from '@/lib/platform-types'

export const PLATFORM_STORAGE_KEY = 'ms-platform-state-v1'

export const defaultPlatformState: PlatformState = {
  users: [
    {
      id: 'u-admin-1',
      name: 'Platform Admin',
      email: 'admin@mogokonyane-segano.co.za',
      location: 'Gauteng',
      phone: '+27 71 000 1111',
      role: 'admin',
      active: true,
    },
    {
      id: 'u-provider-1',
      name: 'One Segano',
      email: 'one@mogokonyane-segano.co.za',
      location: 'Limpopo',
      phone: '+27 72 000 2222',
      role: 'provider',
      active: true,
    },
    {
      id: 'u-customer-1',
      name: 'Lerato Mokoena',
      email: 'lerato@example.com',
      location: 'North West',
      phone: '+27 73 000 3333',
      role: 'customer',
      active: true,
    },
  ],
  listings: [
    {
      id: 'l-1',
      ownerId: 'u-provider-1',
      title: 'Fresh Spinach Bundle',
      description: 'Freshly harvested spinach available weekly for schools and local buyers.',
      category: 'agriculture',
      price: 35,
      location: 'Limpopo',
      images: ['/blackwoma.jpg'],
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'l-2',
      ownerId: 'u-provider-1',
      title: 'Small-Scale Drip Irrigation Setup',
      description: 'Installation support for low-cost irrigation systems for emerging farmers.',
      category: 'services',
      price: 1800,
      location: 'North West',
      images: ['/otlotleng.png'],
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: 'o-1',
      listingId: 'l-1',
      customerId: 'u-customer-1',
      providerId: 'u-provider-1',
      status: 'in_progress',
      note: 'Need delivery every Wednesday morning.',
      createdAt: new Date().toISOString(),
    },
  ],
  threads: [
    {
      id: 't-1',
      orderId: 'o-1',
      participants: ['u-provider-1', 'u-customer-1'],
      messages: [
        {
          id: 'm-1',
          senderId: 'u-customer-1',
          body: 'Hi, can we start with 30 bundles this week?',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'm-2',
          senderId: 'u-provider-1',
          body: 'Yes, that works. We will prepare for Wednesday.',
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
}
