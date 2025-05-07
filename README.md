# StaffPicksPro: Marketing Platform for Booksellers

Create professional book marketing materials in minutes. StaffPicksPro transforms Edelweiss reviews and comprehensive book data into ready-to-print promotional PDFs for your bookstore. It's perfect for highlighting your store's "staff picks."

## Prerequisites

- Node.js 20.0.0 or higher
- npm 10.0.0 or higher

Consider installing (volta)[https://volta.sh/] before running this project to guarantee Node.js version compatibility.

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL="https://qa-api.edelweiss.plus"
VITE_USE_TEST_DATA="true"
OPENAI_API_KEY="your_openai_api_key"
ALLOW_AI_PROMPT="false"
PORT=8080
```

- Set `VITE_USE_TEST_DATA="false"` to use real API data
- Set `ALLOW_AI_PROMPT="true"` to enable AI-generated marketing text
- Replace `your_openai_api_key` with your actual OpenAI API key

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

This will:

- Start the Vite dev server on port 3000
- Start the Express server on port 8080
- Enable hot module reloading
- Proxy API requests to the Express server

## Feature Testing

Here are some example Book SKUs with Edelweiss Reviews you can try out in the app:

9780316576055
9780316575140
9781538710500
9780316577137
9780316574716
9780316419420
9780316580915
9781682637692
9780316570770

Check out [Edelweiss catalogs](https://www.edelweiss.plus/#dashList=2&page=1) for more SKU examples.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Testing

Run the test suite:

```bash
npm test
```

## Project Structure

```
├── server/               # Express server files
│   ├── index.ts         # Server entry point
│   └── routes/          # API route handlers
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
└── public/              # Static assets
```

## Features

- SKU-based book lookup
- Bookseller review selection
- AI-powered marketing text generation
- PDF generation
- Document customization options
- Local storage for saved documents

## Technical Considerations

- Uses React Query for data fetching and caching
- Implements TypeScript for type safety
- Uses Tailwind CSS for styling
- Integrates with OpenAI API for marketing text
- Supports both development and production environments
- Includes mock data support for development

## Browser Support

Supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
