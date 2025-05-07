import { useMutation } from '@tanstack/react-query';
import type { TProduct, TReview } from '../types';
import { getUseTestData } from '../utils/env.utils';
import { generateMockMarketingText } from '../utils/mockData';

export function useMarketingText() {
	return useMutation({
		mutationFn: async ({
			product,
			reviews,
		}: {
			product: TProduct;
			reviews: Required<TReview>[];
		}) => {
			if (getUseTestData() === 'true') {
				return generateMockMarketingText(product.sku);
			}

			const response = await fetch(
				'/api/marketing/generate-marketing-text',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ product, reviews }),
				},
			);

			if (!response.ok) {
				throw new Error('Failed to generate marketing text');
			}

			const data = await response.json();
			return data.marketingText;
		},
	});
}
