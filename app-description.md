## StaffPicksPro: Marketing Plateform for Booksellers

**Create professional book marketing materials in minutes.** StaffPicksPro transforms Edelweiss reviews and comprehensive book data into ready-to-print promotional PDFs for your bookstore.

## What It Does

StaffPicksPro seamlessly combines:

- Complete bibliographic information - covers, descriptions, author bios, pricing details
- Authentic bookseller reviews - curated from the Edelweiss community
- AI-powered marketing text - professionally crafted promotional copy

The result is a polished, professional marketing document you can print and share with customers, perfect for staff picks displays, book recommendation sheets, and in-store promotions.

## Why Booksellers Love It

StaffPicksPro eliminates the need to manually design marketing materials. Simply enter a book's SKU, select your favorite reviews, and generate a printable PDF that helps sell books and showcase your staff's expertise.

## Benefits for the Edelweiss platform

Encourages Edelweiss Review Participation: By showcasing reviews in marketing materials, the app incentivizes users to write more reviews on the Edelweiss platform.
Enhances Value of DRC Distribution: Increased review activity makes the publisher's DRC distribution service more valuable.
Boosts Edelweiss Community: More reviews strengthen the social function of the Edelweiss Community platform.
Drives Ad Sales: Publishers are encouraged to book more ad space on Edelweiss as they see Booksellers meaningfully engage with their Titles via Edelweiss Reviews.

## Secondary Requirements

### Document Display Options
Each document supports customizable display options that control which elements appear in the final output:

- Show Jacket Cover Image (default: true)
- Show Price (default: true)
- Show Marketing Text (default: true)
- Show Reviews (default: true)

These options can be modified through a dialog accessible from the Preview Document page and are saved with each document.

## Technical Overview: Marketing Material Generation App for Publishers and Bookstores

Goal: Allow users to generate a marketing document given one book SKU. The name of the app should be “Edelweiss StaffPicksPro.” The document is rendered in HTML, but the user can export the document to PDF, so they can print it and distribute it in their store.

## Note on terminology

“Titles” are also known as “Books” or “Products”.
“Affiliations” are also known as “Communities”. These are arbitrary groups of users.

## Technical Considerations

This project does not require a database. Data persistence should be achieved with browser local storage.

This project should support Environment variables. The .env file should contain:

```
VITE_API_URL=”https://qa-api.edelweiss.plus”
VITE_USE_TEST_DATA=”true”
OPENAI_API_KEY=”XXXXXXXXXXXX”
ALLOW_AI_PROMPT="false"
```

I will enter the actual value of OPENAI_API_KEY later.

If VITE_USE_TEST_DATA is “true”, then the app should return mock data instead of actually requesting data from the real REST API. Mock data should be generated based on the typescript definitions provided below.

All fetch requests to VITE_API_URL MUST include the following `RequestInit` fetch options:

```typescript
{
    // … all other options go here…
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
}
```

All REST API data should be retrieved using the React Query library.

This project requires support for an ExpressJS REST API as outlined below. Here is a general approach for integrating Vite and ExpressJS:

For integrating Express with the Vite dev server in development, we can use the following approach:

Development Mode:
Express server runs on port as defined `const PORT = process.env.PORT || 8080;`
Vite dev server runs on port 3000
Express server proxies all non-API requests to the Vite dev server
API requests (/api/\*) are handled directly by Express
This maintains hot module reloading while allowing API access

Production Mode:
Express server runs on port as defined `const PORT = process.env.PORT || 8080;`
Serves static files from the Vite build output directory
Handles API requests directly
No proxy needed since there's no dev server

This approach means:
Same API endpoint works in both environments
Single entry point for all requests
No need to change API URLs between environments

## User stories with technical implementation notes

As a user, I want to visit a webpage that generates a marketing document I can print out based on the multi-step process outlined below.

The app should include a landing page that outlines all the features available to the user.

The app should include a “home” page that lists the user’s previously created documents plus a means to “create a new document.” Previously created documents can be edited per the process outlined below and re-downloaded.

## Process for creating a new document

## Step 1: Input Title SKU

As a user, I want to visit a webpage where I am prompted to input one Title SKU. The system can accept a SKU that is either 10 or 13 characters long. When the system submits the SKU to the server, the system should confirm the SKU matches a valid Title. If the user inputs an invalid SKU, then the UI should display a warning message along the lines of “your input is invalid. Please try again.”

## Step 2: Confirm Title and Select User Reviews

As a user, after submitting a valid SKU, I should see the following metadata for the Title if it exists: Jacket cover image, summary, author, quotes, keynotes, Title name, Title sub name, category, EAN, date published, retail price and supplier.

```typescript
// Here is the TypeScript definition of TProduct, which represents a “Title”:

enum ProductImageType {
	JacketCover = "jacketCover",
	Interior = "interior",
	NonWatermarkedInterior = "nonWatermarkedInterior",
	Author = "author",
}

type TProduct = {
	sku: string;
	ean: string;
	author: string;
	name: string; // Title name
	retailPrice: number; // retail price
	category: string;
	shipDate?: string;
	onSaleDate?: string;
	subName?: string; // Title sub name
	pubDate: string; // date published
	format?: string;
	descriptions?: {
		authorBio?: string;
		quotes?: string;
		summary?: string;
		keynotes?: string;
	};
	images?: {
		type: ProductImageType;
		uri: string;
	};
};
```

Products can be fetched with the following REST API:

```
Request Method: POST
Request URL: `${VITE_API_URL}/api/v2/products/images,categories,descriptions,contributors,product`
Request Payload: Array<string>
Request Payload Description: a list of Title SKUs
Returns  Array<TProduct>
```

As a user, for the given Title, I should also see a list of all Edelweiss User Reviews for that Title. The Reviews should be listed below the Title metadata section as described.

As a user, each listed Edelweiss Review should show the following data: user name, user avatar image (displayed as a circle), created date (which is when the review was written and submitted), rating (this is the “overall” rating the user assigned to their review), and text (content of the review). The text might be empty if the user only assigned a rating to their review and did not provide any qualitative review text.

As a user, I should be able to select (using a checkbox) up to 3 reviews that I want to include in my final PDF document. The UI should show a warning if the user has reached the limit.

Here are the relevant Typescript definitions for Reviews data:

```typescript
type TUser = {
	createdDate: string;
	email: string;
	firstName: string;
	fullName: string;
	id: number;
	lastName: string;
	orgCity: string;
	orgState: string;
	orgID: string;
	orgName: string;
	classification: string;
	userID: string;
	phone: string;
	title: string;
};

type TUserAvatar = {
	displayName: string;
	hasImage: boolean;
	initials: string;
	initialsFontClass: string;
	size: string;
	appUserId: number;
	uri: string;
};

type TOrganization = {
	orgID: string;
	name: string;
	billingActive: boolean;
	address: {
		streetAddress1: string;
		streetAddress2: string;
		city: string;
		stateProvince: string;
		stateId: number;
		postalCode: string;
		country: string;
	};
	billingFee: string;
	displayName: string;
	clientId: number;
	primaryGroupId: number;
};

type TReview = {
	appUserId: number;
	createdDate: string;
	rating: number;
	sku: string;
	text: string;
	user?: TUser;
	userAvatar?: TUserAvatar;
	organization?: TOrganization;
};

type TReviewAggregate = {
	organizationsById: {
		[orgId: string]: TOrganization;
	};
	reviews: TReview[];
	userAvatarsByAppUserId: {
		[appUserId: number]: TUserAvatar;
	};
	usersById: {
		[userId: number]: TUser;
	};
};

type TMyCommunitiesResponse = {
	affiliations?: Array<{
		id: number;
	}>;
};
```

Here is a function for fetching the Title’s Reviews from VITE_API_URL:

```typescript
async function fetchReviews(sku: string): Promise<Array<Required<TReview>>> {
	try {
		// Step 1: Fetch the user's joined communities (affiliations)
		const communityResponse = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/api/affiliations/me?options=basic,joinedAffiliationsOnly`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			}
		);

		if (!communityResponse.ok) {
			throw new Error(
				`Failed to fetch communities: ${communityResponse.status}`
			);
		}

		const communitiesData: TMyCommunitiesResponse =
			await communityResponse.json();
		const communityIds =
			communitiesData.affiliations?.map((aff) => aff.id) || [];

		// Step 2: Use the affiliation IDs to fetch reviews for the SKU
		const reviewsResponse = await fetch(
			`${import.meta.env.VITE_API_URL}/api/v2/affiliations/reviews`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					appUserIds: [],
					communityIds,
					skus: [sku],
				}),
			}
		);

		if (!reviewsResponse.ok) {
			throw new Error(`Failed to fetch reviews: ${reviewsResponse.status}`);
		}

		const reviewsData: TReviewAggregate = await reviewsResponse.json();

		// Step 3: Process the reviews data to include user, userAvatar, and organization
		const completeReviews = reviewsData.reviews.map((review) => {
			// Get the user data
			const user = reviewsData.usersById[review.appUserId];

			// Get the user avatar
			const userAvatar = reviewsData.userAvatarsByAppUserId[review.appUserId];

			// Get the organization if user has orgID
			const organization = user?.orgID
				? reviewsData.organizationsById[user.orgID.toLowerCase()]
				: undefined;

			// Return the complete review with all required fields
			return {
				...review,
				user: user || ({} as TUser),
				userAvatar: userAvatar || ({} as TUserAvatar),
				organization: organization || ({} as TOrganization),
			} as Required<TReview>;
		});

		return completeReviews;
	} catch (err) {
		// Handle errors
		console.error("Error fetching reviews:", err);
		return [];
	}
}
```

As a user, after I’ve selected 1 - 3 User Reviews to include in my final PDF document, I should be able to click a button that will advance me to the next step. This should trigger a REST API request to this project’s NodeJS server, which will send the `TProduct` and `Array<Required<TReviews>` to an endpoint that will use the Open AI NodeJS SDK to return a compelling Marketing text based on this data. The relevant ExpressJS “router” should be implemented like this:

```typescript
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates an OpenAI prompt based on book product data and user reviews
 */
function generateMarketingPrompt(
  product: TProduct,
  reviews: Array<Required<TReview>>
): string {
  // Extract relevant book information
  const {
    name,
    subName,
    author,
    category,
    descriptions = {},
  } = product;

  const { summary, quotes, keynotes, authorBio } = descriptions;

  If (process.env.ALLOW_AI_PROMPT === “false”) return summary ?? “”;

  // Format reviews for inclusion in the prompt
  const formattedReviews = reviews
    .map((review) => {
      const reviewer = review.user?.fullName || "Anonymous";
      const organization = review.organization?.name || "";
      const affiliationText = organization ? ` from ${organization}` : "";
      const rating = review.rating ? `Rating: ${review.rating}/5` : "";

      return `Review by ${reviewer}${affiliationText}. ${rating}
"${review.text}"`;
    })
    .join("\n\n");

  // Build the complete prompt
  return `
Create compelling marketing copy for a book that will be used in a staff picks handout for bookstores.
This should be engaging, concise (approximately 150-200 words), and highlight why readers would enjoy this book.

BOOK DETAILS:
Title: ${name}${subName ? ` - ${subName}` : ""}
Author: ${author}
Category: ${category || "N/A"}
${summary ? `\nSummary: ${summary}` : ""}
${keynotes ? `\nKey Points: ${keynotes}` : ""}
${quotes ? `\nQuotes: ${quotes}` : ""}
${authorBio ? `\nAbout the Author: ${authorBio}` : ""}

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

/**
 * Endpoint to generate marketing text using OpenAI
 */
router.post('/generate-marketing-text', async (req: Request, res: Response) => {
  try {
    const { product, reviews } = req.body;

    // Validate input
    if (!product || !product.sku || !Array.isArray(reviews)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: Product or reviews missing'
      });
    }

    // Generate the prompt for OpenAI
    const prompt = generateMarketingPrompt(product, reviews);

    // Call OpenAI API
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    // Return the generated marketing text
    return res.status(200).json({
      success: true,
      marketingText: response.output_text,
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

```

Create a test suite for `generateMarketingPrompt(product, reviews);` using Jest.

## Step 3: Finalize the document and download it as a PDF.

As a user, I should see a representation of the final PDF document in the UI. The document should include:

- The Title Jacket Cover image prominently displayed towards the top left.
- The following Title metadata should be shown: Title name, Title sub name and author name
- The marketing text generated by Open AI.
- Each selected Edelweiss User Review, showing the Review rating, text content and the name of the reviewer.

As a user, I should be able to review and edit the marketing text generated by Open AI SDK. I should then be able to click a “download” button that downloads the document as a PDF to my computer. Downloading the document should add the current document to my list of documents in the browser's local storage. There can only be one document per Title (so per SKU). Previous documents can be browsed and accessed from the "home" page.

To convert the document rendered in react to a PDF, you can use `react-to-pdf`. Here is basic example of using this library. We can start with the default options for this library.

```javascript
import { usePDF } from "react-to-pdf";

const Component = () => {
	const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
	return (
		<div>
			<button onClick={() => toPDF()}>Download PDF</button>
			<div ref={targetRef}>Content to be generated to PDF</div>
		</div>
	);
};
```
