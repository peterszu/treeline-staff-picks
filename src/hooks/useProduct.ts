import { useQuery } from '@tanstack/react-query';
import { getMockProduct } from '../utils/mockData';
import { getApiUrl, getUseTestData } from '../utils/env.utils';

export function useProduct(sku: string | null) {
	const enabled = Boolean(sku);

	const { data, isError, isPending, isSuccess } = useQuery({
		queryKey: ['product', sku],
		queryFn: async () => {
			if (!sku) return null;

			if (getUseTestData() === 'true') {
				return getMockProduct(sku);
			}

			const response = await fetch(
				`${getApiUrl()}/api/v2/products/images,categories,descriptions,contributors,product`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify([sku]),
				},
			);

			if (!response.ok) {
				throw new Error('Failed to fetch product');
			}

			const data = await response.json();
			return data[0];
		},
		enabled,
		retry: false,
	});

	return {
		product: data,
		isError,
		isSuccess,
		isPending: enabled && isPending,
	};
}
