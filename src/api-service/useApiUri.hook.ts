import { Service, TServicesConfig, useApiContext } from './ApiContext';

export function useApiUri(service?: Service): string | undefined {
	const { url, services } = useApiContext();
	if (service && !services) {
		return undefined;
	}
	return service && services ? getUri(service, services) : url;
}

function getUri(
	service: Service,
	services: TServicesConfig | undefined,
): string | undefined {
	if (!services) {
		return undefined;
	}
	const serviceUrl = services[service];
	if (!serviceUrl) {
		return undefined;
	}
	return serviceUrl;
}
