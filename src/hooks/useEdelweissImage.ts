import { useQuery } from '@tanstack/react-query';
import { getUseTestData } from '../utils/env.utils';

const doUseTestData = getUseTestData() === 'true';

export function useEdelweissImage(url: string): {
	isLoading: boolean;
	base64: string;
} {
	const enabled = Boolean(url) && !doUseTestData;

	const { data, isLoading } = useQuery({
		queryKey: ['edelweissImage', url],
		queryFn: async () => {
			if (!url) return { base64: '' };

			// Convert the Edelweiss URL to our proxy URL
			const proxyUrl = url.replace(
				'https://images.abovethetreeline.com',
				'/api/image',
			);

			const response = await fetch(proxyUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch image');
			}

			const data = await response.json();
			return data;
		},
		enabled,
	});

	return {
		isLoading: enabled && isLoading,
		base64: data?.base64 || '',
	};
}
