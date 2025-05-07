import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReviews } from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';
import type { TProduct, TReview } from '../types';
import { getContributorsNameDisplay } from '../utils/product.utils';

const MAX_SELECTIONS = 3;

const ReviewSelection = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const product = location.state?.product as TProduct;

	const [selectedReviews, setSelectedReviews] = useState<Required<TReview>[]>(
		[],
	);

	const { data: reviews, isLoading, isError } = useReviews(product.sku);

	if (!product) {
		navigate('/create');
		return null;
	}

	const handleReviewSelect = (review: Required<TReview>) => {
		setSelectedReviews((prev) => {
			const isSelected = prev.some(
				(r) => r.appUserId === review.appUserId,
			);
			if (isSelected) {
				return prev.filter((r) => r.appUserId !== review.appUserId);
			}
			if (prev.length >= MAX_SELECTIONS) return prev;
			return [...prev, review];
		});
	};

	const handleContinue = () => {
		if (selectedReviews.length === 0) return;
		navigate('/create/preview', {
			state: { product, selectedReviews },
		});
	};

	const coverImage = product.images?.find(
		(img) => img.type === 'jacketCover',
	);

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">
				Select Reviews
			</h1>

			<div className="bg-white shadow rounded-lg p-6 mb-8">
				<div className="flex gap-6">
					{coverImage && (
						<img
							src={`${coverImage.uri}?width=260`}
							alt={product.name}
							className="w-32 h-auto object-cover rounded"
						/>
					)}

					<div>
						<h2 className="text-2xl font-bold text-gray-900">
							{product.name}
						</h2>
						{product.subName && (
							<p className="text-lg text-gray-600 mb-2">
								{product.subName}
							</p>
						)}
						<p className="text-gray-600">
							By {getContributorsNameDisplay(product)}
						</p>
						<div className="mt-4 space-y-1 text-sm text-gray-500">
							<p>Category: {product.category}</p>
							<p>EAN: {product.ean}</p>
							<p>
								Published:{' '}
								{new Date(product.pubDate).toLocaleDateString()}
							</p>
							<p>Price: ${product.retailPrice.toFixed(2)}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-semibold text-gray-900">
						Bookseller Reviews
					</h3>
					<p className="text-sm text-gray-500">
						Selected: {selectedReviews.length}/{MAX_SELECTIONS}
					</p>
				</div>

				{isLoading && (
					<p className="text-center py-8 text-gray-500">
						Loading reviews...
					</p>
				)}

				{isError && (
					<p className="text-center py-8 text-red-500">
						Failed to load reviews. Please try again.
					</p>
				)}

				{reviews && reviews.length === 0 && (
					<p className="text-center py-8 text-gray-500">
						No reviews available for this book.
					</p>
				)}

				<div className="space-y-4">
					{reviews?.map((review) => (
						<ReviewCard
							key={`${review.appUserId}-${review.createdDate}`}
							review={review}
							isSelected={selectedReviews.some(
								(r) => r.appUserId === review.appUserId,
							)}
							onSelect={() => handleReviewSelect(review)}
							disabled={
								selectedReviews.length >= MAX_SELECTIONS &&
								!selectedReviews.some(
									(r) => r.appUserId === review.appUserId,
								)
							}
						/>
					))}
				</div>

				<div className="mt-8 flex justify-end">
					<button
						onClick={handleContinue}
						disabled={selectedReviews.length === 0}
						className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
						Continue with {selectedReviews.length} selected review
						{selectedReviews.length !== 1 ? 's' : ''}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReviewSelection;
