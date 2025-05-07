import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { MyUserProvider } from './user/contexts/MyUserContext.tsx';
import './index.css';
import { TApiContext, ApiProvider } from './api-service';
import { getApiUrl } from './utils/env.utils.ts';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 1,
		},
	},
});

const apiContext: TApiContext = {
	url: getApiUrl(),
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ApiProvider context={apiContext}>
				<MyUserProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MyUserProvider>
			</ApiProvider>
		</QueryClientProvider>
	</StrictMode>,
);
