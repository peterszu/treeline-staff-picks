import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MoreVertical, Download, Save, Settings, Wand2 } from 'lucide-react';
import DocumentOptions from './DocumentOptions';
import type { TDocument } from '../types';
import { getAllowEnhanceWithAi } from '../utils/env.utils';

type ActionMenuProps = {
	onDownload: () => void;
	onSave: () => void;
	onEnhanceText: () => void;
	isEnhancing?: boolean;
	isDownloadDisabled: boolean;
	options: TDocument['options'];
	onOptionsChange: (options: TDocument['options']) => void;
};

const allowEnhanceWithAi = getAllowEnhanceWithAi() === 'true';

const ActionMenu: React.FC<ActionMenuProps> = ({
	onDownload,
	onSave,
	onEnhanceText,
	isEnhancing,
	isDownloadDisabled,
	options,
	onOptionsChange,
}) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className="inline-flex items-center justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					<MoreVertical className="w-5 h-5" />
					<span className="ml-2">Actions</span>
				</button>
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content
					className="w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					sideOffset={5}>
					<div className="py-1">
						<button
							onClick={onDownload}
							disabled={isDownloadDisabled}
							className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
							<Download className="w-4 h-4 mr-3" />
							Download PDF
						</button>

						<button
							onClick={onSave}
							disabled={isDownloadDisabled}
							className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
							<Save className="w-4 h-4 mr-3" />
							Save Document
						</button>

						<button
							onClick={onEnhanceText}
							disabled={isEnhancing || !allowEnhanceWithAi}
							className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
							<Wand2 className="w-4 h-4 mr-3" />
							{isEnhancing
								? 'Enhancing...'
								: 'Enhance Marketing Text'}
						</button>

						<DocumentOptions
							options={options}
							onChange={onOptionsChange}
							trigger={
								<button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									<Settings className="w-4 h-4 mr-3" />
									Display Options
								</button>
							}
						/>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default ActionMenu;
