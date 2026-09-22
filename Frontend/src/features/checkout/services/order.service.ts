import { apiClient, API_ENDPOINTS } from '@/core/api';

export interface TrackingItem {
  product_id: number;
  ordered_quantity: number;
}

export interface OrderPayload {
  total: number;
  tracking: TrackingItem[];
}

export interface OrderResponse {
  success: boolean;
  order_id?: number | string;
  message?: string;
}

class OrderService {
  async createOrder(total: number, tracking: TrackingItem[]): Promise<OrderResponse> {
    const payload: OrderPayload = { total, tracking };

    const response = await apiClient.post<Record<string, unknown>>(API_ENDPOINTS.ORDER, payload);

    const normalizedSuccess =
      Boolean(response.success) ||
      response.order_id !== undefined ||
      (typeof response.message === 'string' && /created|success/i.test(response.message));

    return {
      success: normalizedSuccess,
      order_id: typeof response.order_id === 'number' || typeof response.order_id === 'string'
        ? response.order_id
        : undefined,
      message:
        typeof response.message === 'string'
          ? response.message
          : normalizedSuccess
            ? 'Order placed successfully.'
            : 'Failed to place order.',
    };
  }
}

export const orderService = new OrderService();
