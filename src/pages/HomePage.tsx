import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import type { TDocument } from '../types';
import { getContributorsNameDisplay } from '../utils/product.utils';

const HomePage = () => {
	const [documents, setDocuments] = useState<TDocument[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const savedDocs = JSON.parse(
			localStorage.getItem('staffPicksDocuments') || '[]',
		);
		setDocuments(savedDocs);
		setLoading(false);
	}, []);

	const handleDelete = (id: number) => {
		if (!confirm('Are you sure you want to delete this document?')) return;

		const updatedDocs = documents.filter((doc) => doc.id !== id);
		localStorage.setItem(
			'staffPicksDocuments',
			JSON.stringify(updatedDocs),
		);
		setDocuments(updatedDocs);
	};

	const filteredDocuments = documents.filter(
		(doc) =>
			doc.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doc.product.author.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-12 w-12 animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					My Documents
				</h1>
				{documents.length > 0 && (
					<Link
						to="/create"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-sm">
						Create New Document
					</Link>
				)}
			</div>

			{documents.length > 0 && (
				<div className="mb-6">
					<div className="relative">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search by title or author..."
							className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
						/>
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					</div>
				</div>
			)}

			{documents.length === 0 ? (
				<div className="bg-white shadow rounded-lg p-6">
					<div className="text-center py-12">
						<PlusCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No documents yet
						</h3>
						<p className="text-gray-500 mb-6">
							Create your first marketing document to get started.
						</p>
						<Link
							to="/create"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-sm">
							Create New Document
						</Link>
					</div>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredDocuments.map((doc) => {
						const coverImage = doc.product.images?.find(
							(img) => img.type === 'jacketCover',
						);

						return (
							<div
								key={doc.id}
								className="bg-white shadow rounded-lg overflow-hidden">
								<div className="p-4">
									<div className="flex items-start gap-4">
										{coverImage && (
											<img
												src={coverImage.uri}
												alt={doc.product.name}
												className="w-20 h-auto object-cover rounded"
											/>
										)}
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-medium text-gray-900 truncate">
												{doc.product.name}
											</h3>
											<p className="text-sm text-gray-500">
												By{' '}
												{getContributorsNameDisplay(
													doc.product,
												)}
											</p>
											<p className="text-xs text-gray-400 mt-1">
												Created{' '}
												{new Date(
													doc.createdAt,
												).toLocaleDateString()}
											</p>
										</div>
									</div>
								</div>

								<div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex justify-end space-x-3">
									<Link
										to="/create/preview"
										state={{
											product: doc.product,
											selectedReviews:
												doc.selectedReviews,
											marketingText: doc.marketingText,
											options: doc.options,
										}}
										className="text-primary-600 hover:text-primary-900">
										<Pencil className="h-5 w-5" />
									</Link>
									<button
										onClick={() => handleDelete(doc.id)}
										className="text-red-600 hover:text-red-900">
										<Trash2 className="h-5 w-5" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default HomePage;
