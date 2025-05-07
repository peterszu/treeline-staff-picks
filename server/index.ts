import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env "server" files
config({ path: resolve(process.cwd(), '.env.server.local') });
config({ path: resolve(process.cwd(), '.env.server') });

import('./app.js').then(({ createApp }) => {
	createApp();
});
