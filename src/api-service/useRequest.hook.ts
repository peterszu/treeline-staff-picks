import { getUrlHref, request } from './api-service';
import { Service } from './ApiContext';
import { useApiUri } from './useApiUri.hook';

type TRequest = (endpoint: string, options?: RequestInit) => Promise<Response>;

export function useRequest(service?: Service): TRequest {
	const apiUri: string | undefined = useApiUri(service);
	const isSameOrigin = typeof apiUri === 'undefined';

	if (isSameOrigin && service) {
		throw new Error(`Api url not found for service: ${service}`);
	}

	return (endpoint: string, options?: RequestInit) => {
		if (isSameOrigin) {
			// If the apiUri is not defined, it's a Same-Origin request
			return request(endpoint, options);
		}
		return request(getUrlHref(endpoint, apiUri), options);
	};
}
