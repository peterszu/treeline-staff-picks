import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';

const validateSku = (value: string) => {
	const trimmed = value.trim();
	return trimmed.length === 10 || trimmed.length === 13;
};

const SkuInput = () => {
	const [inputValue, setInputValue] = useState('');
	const [sku, setSku] = useState<string | null>(null);
	const navigate = useNavigate();

	const { product, isError, isPending, isSuccess } = useProduct(sku);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedValue = inputValue.trim();
		if (validateSku(trimmedValue)) {
			setSku(inputValue.trim());
		}
	};

	React.useEffect(() => {
		if (product) {
			navigate('/create/reviews', { state: { product } });
		}
	}, [product, navigate]);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter book SKU (10 or 13 characters)"
					className="w-full px-4 py-2 pl-10 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
				/>
				<button
					type="submit"
					disabled={!validateSku(inputValue.trim()) || isPending}
					className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:bg-gray-400">
					{isPending ? (
						<span className="flex items-center">
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Searching...
						</span>
					) : (
						'Search'
					)}
				</button>
			</div>
			{inputValue && !validateSku(inputValue) && (
				<p className="text-red-500 text-sm">
					SKU must be 10 or 13 characters long
				</p>
			)}
			{isError && (
				<p className="text-red-500 text-sm">
					Could not find a book with this SKU. Please check the number
					and try again.
				</p>
			)}
			{isSuccess && !product && (
				<p className="text-red-500 text-sm">
					No book found with this SKU. Please try another.
				</p>
			)}
		</form>
	);
};

export default SkuInput;
