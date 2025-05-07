export function getApiUrl(): string {
	return import.meta.env.VITE_API_URL ?? 'https://atl14909.edelweiss.plus';
}

export function getUseTestData(): string {
	return import.meta.env.VITE_USE_TEST_DATA ?? 'false';
}

export function getAllowEnhanceWithAi(): string {
	return import.meta.env.VITE_ALLOW_ENHANCE_WITH_AI ?? 'false';
}
