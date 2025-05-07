import express, { Request, Response } from 'express';
import { OpenAI } from 'openai';
import { TProduct, TReview } from '../../src/types';

const router = express.Router();
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

function generateMarketingPrompt(
	product: TProduct,
	reviews: Array<Required<TReview>>,
): string {
	const { name, subName, author, category, descriptions = {} } = product;

	const { summary, quotes, keynotes, authorBio } = descriptions;

	const formattedReviews = reviews
		.map((review) => {
			const reviewer = review.user?.fullName || 'Anonymous';
			const organization = review.organization?.name || '';
			const affiliationText = organization ? ` from ${organization}` : '';
			const rating = review.rating ? `Rating: ${review.rating}/5` : '';

			return `Review by ${reviewer}${affiliationText}. ${rating}
"${review.text}"`;
		})
		.join('\n\n');

	return `
Create compelling marketing copy for a book that will be used in a staff picks handout for bookstores.
This should be engaging, concise (approximately 150-200 words), and highlight why readers would enjoy this book.

BOOK DETAILS:
Title: ${name}${subName ? ` - ${subName}` : ''}
Author: ${author}
Category: ${category || 'N/A'}
${summary ? `\nSummary: ${summary}` : ''}
${keynotes ? `\nKey Points: ${keynotes}` : ''}
${quotes ? `\nQuotes: ${quotes}` : ''}
${authorBio ? `\nAbout the Author: ${authorBio}` : ''}

BOOKSELLER REVIEWS:
${formattedReviews}

Based on this information, create marketing text that:
1. Captures the essence of the book
2. Incorporates positive sentiments from the bookseller reviews
3. Uses an engaging, conversational tone appropriate for a staff recommendation
4. Ends with a compelling call-to-action for readers
5. Does NOT use quotation marks around the entire piece
`;
}

router.post('/generate-marketing-text', async (req: Request, res: Response) => {
	try {
		const { product, reviews } = req.body;

		if (!product || !product.sku || !Array.isArray(reviews)) {
			return res.status(400).json({
				success: false,
				error: 'Invalid request: Product or reviews missing',
			});
		}

		if (process.env.ALLOW_AI_PROMPT === 'false') {
			return res.status(200).json({
				success: true,
				marketingText: product.descriptions?.summary ?? '',
			});
		}

		const prompt = generateMarketingPrompt(product, reviews);

		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.7,
			max_tokens: 500,
		});

		return res.status(200).json({
			success: true,
			marketingText: response.choices[0].message.content,
		});
	} catch (error) {
		console.error('Error generating marketing text:', error);
		return res.status(500).json({
			success: false,
			error: 'Failed to generate marketing text',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
});

export default router;
