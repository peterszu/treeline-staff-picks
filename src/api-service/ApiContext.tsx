import { createContext, useContext } from 'react';

export type TServicesConfig = {
	[key in Service]?: string;
};

export type TApiContext = {
	url?: string;
	services?: TServicesConfig;
};

export enum Service {
	Accounting = 'accounting',
	Localization = 'localization',
	Events = 'events',
}

const ApiContext = createContext<TApiContext>({ url: '' });

type TApiProviderProps = {
	context: TApiContext;
	children: React.ReactNode;
};

export function ApiProvider({ context, children }: TApiProviderProps) {
	return (
		<ApiContext.Provider value={context}>{children}</ApiContext.Provider>
	);
}

export function useApiContext(): TApiContext {
	const apiContext = useContext(ApiContext);

	if (!apiContext) {
		throw new Error('useApiContext() must be a child of <ApiProvider>');
	}

	return apiContext;
}
