import { TContributor, TProduct } from '../types';

export function getContributorsNameDisplay(product: TProduct): string {
	const contributors = product.contributors;

	if (!contributors) {
		return formatAuthorName(product);
	}

	let contributorString = '';

	product.contributors?.forEach((contributor, idx) => {
		if (idx === 0) {
			contributorString += '';
		} else if (idx < contributors.length - 1) {
			contributorString += ', ';
		} else {
			contributorString += ' and ';
		}
		contributorString +=
			contributor.onixContributorRoleCode === 'A01'
				? getContributorNameDisplay(contributor)
				: `${getContributorNameDisplay(contributor)} (${
						contributor.localizedContributorRole
					})`;
	});

	return contributorString;
}

function getContributorNameDisplay(c: TContributor): string {
	if (c.name) {
		return c.name;
	}
	return (c.firstName ? c.firstName + ' ' : '') + (c.lastName ?? '');
}

function formatAuthorName(product: TProduct): string {
	const author = product.author;
	if (!author) return '';
	return author.split(', ').reverse().join(' ');
}
