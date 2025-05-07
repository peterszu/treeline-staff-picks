import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Resolution, usePDF } from 'react-to-pdf';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import ActionMenu from '../components/ActionMenu';
import { useMarketingText } from '../hooks/useMarketingText';
import {
	type TProduct,
	type TReview,
	type TDocument,
	ProductImageType,
} from '../types';
import { useEdelweissImage } from '../hooks/useEdelweissImage';
import { getContributorsNameDisplay } from '../utils/product.utils';
import { getUseTestData } from '../utils/env.utils';

const doUseTestData = getUseTestData() === 'true';

const PreviewDocument = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		product,
		selectedReviews,
		marketingText: initialMarketingText,
		options: initialOptions,
	} = location.state as {
		product: TProduct;
		selectedReviews: Required<TReview>[];
		marketingText?: string;
		options?: TDocument['options'];
	};

	useEffect(() => {
		// scroll to the top of the page
		window.scrollTo(0, 0);
	}, []);

	const coverImage = product.images?.find(
		(img) => img.type === ProductImageType.JacketCover,
	);
	const coverImageUrl = coverImage?.uri;

	// Download the image and return the base64 data
	const { base64: coverImageBase64, isLoading: coverImageIsLoading } =
		useEdelweissImage(coverImageUrl ?? '');

	const marketingTextFallback =
		stripHtml(product?.descriptions?.summary) ||
		'Marketing text goes here...';

	const [marketingText, setMarketingText] = useState(
		initialMarketingText || marketingTextFallback,
	);
	const [isEditing, setIsEditing] = useState(!initialMarketingText);
	const { mutate: generateText, isPending } = useMarketingText();
	const [savedMarketingText, setSavedMarketingText] = useState(
		initialMarketingText || marketingTextFallback,
	);

	const [options, setOptions] = useState<TDocument['options']>(
		initialOptions || {
			showJacketCover: true,
			showPrice: true,
			showMarketingText: true,
			showReviews: true,
			reviewsLabel: 'Bookseller Reviews',
		},
	);

	const { toPDF, targetRef } = usePDF({
		filename: `${product.name
			.replace(/[^a-z0-9]/gi, '_')
			.toLowerCase()}_staff_picks.pdf`,
		resolution: Resolution.MEDIUM,
	});

	const handleEnhanceText = () => {
		generateText(
			{ product, reviews: selectedReviews },
			{
				onSuccess: (text) => {
					setMarketingText(text);
					setSavedMarketingText(text);
					setIsEditing(false);
					handleSave();
				},
			},
		);
	};

	const handleSave = () => {
		const documents = JSON.parse(
			localStorage.getItem('staffPicksDocuments') || '[]',
		);
		const newDocument = {
			id: Date.now(),
			sku: product.sku,
			product,
			selectedReviews,
			marketingText: marketingText || '',
			options,
			createdAt: new Date().toISOString(),
		};

		const updatedDocuments = [
			newDocument,
			...documents.filter((doc: TDocument) => doc.sku !== product.sku),
		];

		localStorage.setItem(
			'staffPicksDocuments',
			JSON.stringify(updatedDocuments),
		);
	};

	if (!product || !selectedReviews) {
		navigate('/create');
		return null;
	}

	const handleSaveChanges = () => {
		setSavedMarketingText(marketingText || '');
		setIsEditing(false);
	};

	const handleEdit = () => {
		setMarketingText(savedMarketingText);
		setIsEditing(true);
	};

	if (coverImageIsLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-12 w-12 animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					Preview Document
				</h1>
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:border-gray-400">
						<ArrowLeft className="w-5 h-5 mr-2" />
						Back
					</button>
					<ActionMenu
						onDownload={() => {
							handleSave();
							toPDF();
						}}
						onSave={() => {
							handleSave();
							navigate('/home');
						}}
						onEnhanceText={handleEnhanceText}
						isEnhancing={isPending}
						isDownloadDisabled={isEditing}
						options={options}
						onOptionsChange={(newOptions) => {
							setOptions(newOptions);
							handleSave();
						}}
					/>
				</div>
			</div>

			<div className="flex justify-end mb-6">
				{isEditing ? (
					<button
						onClick={handleSaveChanges}
						className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm">
						<Save className="w-5 h-5 mr-2" />
						Save Changes
					</button>
				) : (
					<>
						<button
							onClick={handleEdit}
							className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:border-gray-400">
							Edit Marketing Text
						</button>
					</>
				)}
			</div>

			<div
				ref={targetRef}
				className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-[800px] mx-auto">
				<div className="flex gap-6 mb-6">
					{options.showJacketCover &&
						coverImage &&
						(coverImageBase64 || doUseTestData) && (
							<img
								alt={product.name}
								src={
									doUseTestData
										? coverImageUrl
										: `data:image/jpeg;base64,${coverImageBase64}`
								}
								className="w-40 h-auto object-cover rounded-lg shadow-md"
							/>
						)}

					<div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							{product.name}
						</h2>
						{product.subName && (
							<p className="text-xl text-gray-600 mb-2">
								{product.subName}
							</p>
						)}
						<p className="text-lg mb-3">
							By {getContributorsNameDisplay(product)}
						</p>
						{options.showPrice && (
							<p className="text-base font-medium text-gray-900">
								${product.retailPrice.toFixed(2)}
							</p>
						)}
					</div>
				</div>

				{options.showMarketingText &&
					(isPending ? (
						<div className="animate-pulse bg-gray-100 h-32 rounded-md mb-6" />
					) : (
						<div className="mb-6 prose max-w-none">
							{isEditing ? (
								<textarea
									value={marketingText || ''}
									onChange={(e) =>
										setMarketingText(e.target.value)
									}
									className="w-full p-4 border border-gray-200 rounded-lg text-base leading-relaxed focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[200px]"
								/>
							) : (
								<div className="p-4 bg-gray-50 rounded-lg text-base leading-relaxed">
									{savedMarketingText}
								</div>
							)}
						</div>
					))}

				{options.showReviews && (
					<div className="space-y-6">
						<h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-3">
							{options.reviewsLabel}
						</h3>

						{selectedReviews.map((review) => (
							<div
								key={`${review.appUserId}-${review.createdDate}`}
								className="border-l-4 border-indigo-500 pl-4 py-3 mb-4">
								<div className="flex items-center gap-2 mb-2">
									<p className="font-medium text-gray-900">
										{review.user.fullName}
									</p>
									{review.organization.name && (
										<>
											<span className="text-gray-400">
												•
											</span>
											<p className="text-gray-600 italic">
												{review.organization.name}
											</p>
										</>
									)}
								</div>
								<p className="text-gray-700 mb-2 text-base leading-relaxed">
									{stripHtml(review.text || '')}
								</p>
								<div className="flex items-center text-sm text-gray-500">
									<span>{review.rating}/5 stars</span>
									<span className="mx-2">•</span>
									<time>
										{new Date(
											review.createdDate,
										).toLocaleDateString()}
									</time>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

function stripHtml(html: string | undefined): string {
	if (!html) {
		return '';
	}
	const temp = document.createElement('div');
	temp.innerHTML = html;
	return temp.textContent || temp.innerText || '';
}

export default PreviewDocument;
