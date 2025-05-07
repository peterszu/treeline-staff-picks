import { Info } from 'lucide-react';

interface InfoAlertProps {
	title?: string;
	children: React.ReactNode;
}

const InfoAlert = ({ title = 'Help', children }: InfoAlertProps) => {
	return (
		<div className="rounded-md bg-blue-50 p-4 mt-6">
			<div className="flex">
				<div className="flex-shrink-0">
					<Info
						className="h-5 w-5 text-blue-400"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-blue-800">
						{title}
					</h3>
					<div className="mt-2 text-sm text-blue-700">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default InfoAlert;
