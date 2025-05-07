import { execSync } from 'node:child_process';
import process from 'node:process';
import { copyFileSync } from 'node:fs';

const validEnvironments = ['qa', 'development', 'production'];
const env = process.argv[2];

if (!env) {
	console.error('Error: Environment parameter is required');
	console.error('Usage: npm run build {env}');
	console.error('Valid environments:', validEnvironments.join(', '));
	process.exit(1);
}

if (!validEnvironments.includes(env)) {
	console.error(`Error: Invalid environment "${env}"`);
	console.error('Valid environments:', validEnvironments.join(', '));
	process.exit(1);
}

try {
	// Run client build first
	execSync(`npm run build:client ${env}`, { stdio: 'inherit' });

	// Then run server build
	execSync('npm run build:server', { stdio: 'inherit' });

	// Then copy the web.config and startup files to the build directory
	copyFileSync('web.config', 'build/web.config');
	copyFileSync('startup.txt', 'build/startup.txt');
} catch (error) {
	process.exit(error.status || 1);
}
