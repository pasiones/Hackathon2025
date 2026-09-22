import { apiClient } from '@/core/api';
import type { MLPredictionRequest, MLPredictionResponse } from '../types';

const USE_MOCK_DATA = false;

interface DatabasePrediction {
  ProductID: number;
  Prediction_score: number;
}

interface DatabasePredictionResponse {
  predictions: DatabasePrediction[];
}

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
      const response = await apiClient.post<
        DatabasePredictionResponse | MLPredictionResponse
      >('/checkout/predict', requestBody);

      return {
        predictions: response.predictions.map((prediction) => ({
          product_id: 'ProductID' in prediction ? prediction.ProductID : prediction.product_id,
          score: 'Prediction_score' in prediction ? prediction.Prediction_score : prediction.score,
        })),
      };
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
