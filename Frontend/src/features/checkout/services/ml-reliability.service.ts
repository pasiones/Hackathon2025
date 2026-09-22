import { apiClient } from '@/core/api';
import type { MLPredictionRequest, MLPredictionResponse } from '../types';

const USE_MOCK_DATA = false;

class MLReliabilityService {
  async predictReliability(productIds: number[]): Promise<MLPredictionResponse> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const predictions = productIds.map((id) => ({
        product_id: id,
        score: id === 101 ? 0.35 : id === 102 ? 0.55 : id === 103 ? 0.25 : Math.random() * 0.4 + 0.4,
      }));

      return { predictions };
    }

    const requestBody: MLPredictionRequest = {
      product_ids: productIds,
    };

    try {
      return await apiClient.post<MLPredictionResponse>('/checkout/predict', requestBody);
    } catch (error) {
      console.warn('Falling back to demo reliability data because the backend route is unavailable.', error);

      const predictions = productIds.map((id) => ({
        product_id: id,
        score: id === 101 ? 0.35 : id === 102 ? 0.55 : id === 103 ? 0.25 : 0.72,
      }));

      return { predictions };
    }
  }
}

export const mlReliabilityService = new MLReliabilityService();
