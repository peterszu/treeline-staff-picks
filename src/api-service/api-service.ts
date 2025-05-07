import { QueryKey } from '@tanstack/react-query';

export function getUrlHref(endpoint: string, apiOrigin: string): string {
	const startingPath = new URL(apiOrigin).pathname;
	if (startingPath === '/') {
		return new URL(endpoint, apiOrigin).href;
	}
	return new URL(combinePathnames(startingPath, endpoint), apiOrigin).href;
}

export async function request(
	href: string,
	options?: RequestInit,
): Promise<Response> {
	return fetch(href, getFetchOptions(options));
}

export function handleServerError(
	err: Error,
	setData: React.SetStateAction<any>,
) {
	switch (err.message) {
		case 'Response status: 401':
			console.warn(err.message);
			break;
		case 'Response status: 500':
			setData(() => {
				throw new Error('Sorry our servers are down, try again later');
			});
			break;
		default:
			console.warn(err.message);
			break;
	}
}

export function buildQueryKey(queryItems: any[]): QueryKey {
	return queryItems.filter(
		(item) =>
			typeof item === 'number' ||
			typeof item === 'string' ||
			Boolean(item),
	);
}

function combinePathnames(basePath: string, additionalPath: string): string {
	if (!basePath.startsWith('/')) {
		basePath = `/${basePath}`;
	}
	if (!additionalPath.startsWith('/')) {
		additionalPath = `/${additionalPath}`;
	}
	return `${basePath}${additionalPath}`;
}

function getFetchOptions(options: RequestInit = {}): RequestInit {
	let headers: HeadersInit = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json ; charset=utf-8',
	};

	if (options.headers) {
		headers = { ...headers, ...options.headers };
	}

	return {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		...options,
		headers,
	};
}
