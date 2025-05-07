import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/*', async (req, res) => {
	try {
		// Get the path after /api/image/
		const imagePath = req.path;

		// Construct the target URL
		const targetUrl = `https://images.abovethetreeline.com${imagePath}?width=520`;

		// Fetch the image
		const response = await axios.get(targetUrl, {
			responseType: 'arraybuffer',
		});

		// Convert to base64
		const base64 = Buffer.from(response.data).toString('base64');

		// Return the base64 data
		res.json({ base64 });
	} catch (error) {
		// Pass through any errors
		res.status(error.response?.status || 500).json({
			error: error.message,
		});
	}
});

export default router;
