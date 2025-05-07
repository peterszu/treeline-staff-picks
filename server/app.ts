import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import marketingRouter from './routes/marketing.js';
import imageRouter from './routes/image.js';

export function createApp() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const app = express();
	const PORT = process.env.PORT || 8080;
	const isDev = process.env.NODE_ENV === 'development';

	// Middleware
	app.use(cors());
	app.use(morgan('dev') as express.RequestHandler);
	app.use(express.json());

	// API routes
	app.use('/api/marketing', marketingRouter);
	app.use('/api/image', imageRouter);

	app.get('/api/health', (req, res) => {
		res.status(200).json({ message: 'OK' });
	});

	// Serve static files in production
	if (!isDev) {
		const distPath = join(__dirname, '../');
		app.use(express.static(distPath));

		// Handle client-side routing
		app.get('*', (req, res) => {
			res.sendFile(join(distPath, 'index.html'));
		});
	}

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}
