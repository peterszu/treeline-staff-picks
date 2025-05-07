import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	build: {
		outDir: 'build',
	},
	plugins: [react()],
	optimizeDeps: {
		exclude: ['lucide-react'],
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
		},
	},
});
