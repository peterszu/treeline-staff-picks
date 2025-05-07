import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Settings, X } from 'lucide-react';

type DocumentOptionsProps = {
	options: {
		showJacketCover: boolean;
		showPrice: boolean;
		showMarketingText: boolean;
		showReviews: boolean;
		reviewsLabel: string;
	};
	onChange: (options: DocumentOptionsProps['options']) => void;
	trigger?: React.ReactNode;
};

const DocumentOptions: React.FC<DocumentOptionsProps> = ({
	options,
	onChange,
	trigger,
}) => {
	const handleToggle = (key: keyof typeof options) => {
		onChange({
			...options,
			[key]: !options[key],
		});
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				{trigger || (
					<button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:border-gray-400">
						<Settings className="w-5 h-5 mr-2" />
						Display Options
					</button>
				)}
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
					<div className="flex items-center justify-between mb-6">
						<Dialog.Title className="text-xl font-semibold text-gray-900">
							Document Display Options
						</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-400 hover:text-gray-600">
								<X className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</div>

					<div className="space-y-4">
						<label className="flex items-center justify-between cursor-pointer">
							<span className="text-gray-700">
								Show Jacket Cover Image
							</span>
							<input
								type="checkbox"
								checked={options.showJacketCover}
								onChange={() => handleToggle('showJacketCover')}
								className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
							/>
						</label>

						<label className="flex items-center justify-between cursor-pointer">
							<span className="text-gray-700">Show Price</span>
							<input
								type="checkbox"
								checked={options.showPrice}
								onChange={() => handleToggle('showPrice')}
								className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
							/>
						</label>

						<label className="flex items-center justify-between cursor-pointer">
							<span className="text-gray-700">
								Show Marketing Text
							</span>
							<input
								type="checkbox"
								checked={options.showMarketingText}
								onChange={() =>
									handleToggle('showMarketingText')
								}
								className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
							/>
						</label>

						<label className="flex items-center justify-between cursor-pointer">
							<span className="text-gray-700">Show Reviews</span>
							<input
								type="checkbox"
								checked={options.showReviews}
								onChange={() => handleToggle('showReviews')}
								className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
							/>
						</label>

						<div className="space-y-2">
							<label
								htmlFor="reviewsLabel"
								className="block text-gray-700">
								Reviews Section Label
							</label>
							<input
								type="text"
								id="reviewsLabel"
								value={options.reviewsLabel}
								onChange={(e) =>
									onChange({
										...options,
										reviewsLabel: e.target.value,
									})
								}
								placeholder="Enter section label"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default DocumentOptions;
