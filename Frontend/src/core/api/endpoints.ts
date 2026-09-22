export const API_ENDPOINTS = {
  // Bookings / Products
  PRODUCTS: '/booking/products',
  PRODUCT_BY_ID: (id: string) => `/booking/products/${id}`,

  // Checkout
  RELIABILITY_CHECK: '/checkout/predict',
  SUBSTITUTES: '/service/alternative',
  ORDER: '/checkout/order',
  ORDERS: '/checkout/order',

  // Orders / tracking
  BOOKING_ORDERS: '/booking/orders',
  VALIDATE_ORDER: '/validate/',

  // Service bot
  SERVICE_ALTERNATIVE: '/service/alternative',
  SERVICE_MISSING: '/service/missing',
  SERVICE_TALK: '/service/talk',

  // Chat
  CHAT_MESSAGE: '/chat/message',
  CHAT_CLEAR: '/chat/clear',
  CHAT_ORDER_APOLOGY: '/chat/order-apology',
} as const;
