import { execSync } from 'node:child_process';
import process from 'node:process';

const validEnvironments = ['qa', 'development', 'production'];
const env = process.argv[2];

if (!env) {
	console.error('Error: Environment parameter is required');
	console.error('Usage: npm run build:client {env}');
	console.error('Valid environments:', validEnvironments.join(', '));
	process.exit(1);
}

if (!validEnvironments.includes(env)) {
	console.error(`Error: Invalid environment "${env}"`);
	console.error('Valid environments:', validEnvironments.join(', '));
	process.exit(1);
}

try {
	// Run commands separately to ensure proper error handling in PowerShell
	execSync('tsc', { stdio: 'inherit' });
	execSync(`vite build --mode ${env}`, { stdio: 'inherit' });
} catch (error) {
	process.exit(error.status || 1);
}
