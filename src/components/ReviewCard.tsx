import React from 'react';
import { Star } from 'lucide-react';
import type { TReview } from '../types';

interface ReviewCardProps {
	review: Required<TReview>;
	isSelected: boolean;
	onSelect: () => void;
	disabled: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
	review,
	isSelected,
	onSelect,
	disabled,
}) => {
	const { user, userAvatar, organization, rating, text, createdDate } =
		review;

	return (
		<div
			className={`p-4 border rounded-lg transition-colors ${
				isSelected
					? 'border-primary-500 bg-primary-50'
					: 'border-gray-200 hover:border-primary-200'
			} ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
			onClick={() => !disabled && onSelect()}>
			<div className="flex items-start gap-4">
				<div className="flex-shrink-0">
					{userAvatar.hasImage ? (
						<img
							src={userAvatar.uri}
							alt={userAvatar.displayName}
							className="w-10 h-10 rounded-full"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
							<span
								className={`text-primary-700 ${userAvatar.initialsFontClass}`}>
								{userAvatar.initials}
							</span>
						</div>
					)}
				</div>

				<div className="flex-grow">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-gray-900">
								{user.fullName}
							</h3>
							{organization.name && (
								<p className="text-sm text-gray-500">
									{organization.name}
								</p>
							)}
						</div>
						<div className="flex items-center">
							<Star className="w-4 h-4 text-yellow-400 fill-current" />
							<span className="ml-1 text-sm text-gray-600">
								{rating}/5
							</span>
						</div>
					</div>

					{text && <p className="mt-2 text-gray-700">{text}</p>}

					<div className="mt-2 flex items-center justify-between">
						<time className="text-sm text-gray-500">
							{new Date(createdDate).toLocaleDateString()}
						</time>
						<div className="flex items-center">
							<input
								type="checkbox"
								checked={isSelected}
								onChange={onSelect}
								disabled={disabled && !isSelected}
								className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
