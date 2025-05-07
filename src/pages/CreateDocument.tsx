import SkuInput from '../components/SkuInput';
import InfoAlert from '../components/InfoAlert';

const CreateDocument = () => {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">
				Create New Document
			</h1>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Enter Book SKU
				</h2>
				<p className="text-gray-500 mb-6">
					Please enter a valid SKU (10 or 13 characters) to begin
					creating your marketing document.
				</p>
				<SkuInput />
				<InfoAlert title="Example SKUs">
					<p className="mb-2">
						Here are some example SKUs to get started:
					</p>
					<ul className="list-disc list-inside space-y-1">
						<li>9780316576055</li>
						<li>9780316575140</li>
						<li>9781538710500</li>
						<li>9780316577137</li>
						<li>9780316574716</li>
					</ul>
				</InfoAlert>
			</div>
		</div>
	);
};

export default CreateDocument;
