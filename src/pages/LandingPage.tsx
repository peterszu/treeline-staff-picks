import { Link } from 'react-router-dom';
import { BookOpen, Star, Printer } from 'lucide-react';

const LandingPage = () => {
	return (
		<div className="max-w-7xl mx-auto">
			<div className="text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
					Transform Your Book Marketing
				</h1>
				<p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
					Create professional book marketing materials in minutes
					using Edelweiss reviews and comprehensive book data.
				</p>
				<div className="mt-10">
					<Link
						to="/home"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
						Get Started
					</Link>
				</div>
			</div>

			<div className="py-12 px-6 bg-white">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<div className="p-6 border border-gray-100 rounded-lg">
						<BookOpen className="h-12 w-12 text-primary-600 mb-4" />
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							Complete Book Data
						</h3>
						<p className="text-gray-500">
							Access comprehensive bibliographic information
							including covers, descriptions, and pricing details.
						</p>
					</div>

					<div className="p-6 border border-gray-100 rounded-lg">
						<Star className="h-12 w-12 text-primary-600 mb-4" />
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							Curated Reviews
						</h3>
						<p className="text-gray-500">
							Showcase authentic bookseller reviews from the
							Edelweiss community.
						</p>
					</div>

					<div className="p-6 border border-gray-100 rounded-lg">
						<Printer className="h-12 w-12 text-primary-600 mb-4" />
						<h3 className="text-xl font-bold text-gray-900 mb-2">
							Ready to Print
						</h3>
						<p className="text-gray-500">
							Generate professional PDFs perfect for staff picks
							displays and in-store promotions.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
