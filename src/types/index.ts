export enum ProductImageType {
	JacketCover = 'jacketCover',
	Interior = 'interior',
	NonWatermarkedInterior = 'nonWatermarkedInterior',
	Author = 'author',
}

export type TContributor = {
	firstName: string;
	lastName: string;
	name?: string;
	sequence: number;
	onixContributorRoleCode: string;
	localizedContributorRole: string;
};

export type TProduct = {
	sku: string;
	ean: string;
	author: string;
	name: string;
	retailPrice: number;
	category: string;
	shipDate?: string;
	onSaleDate?: string;
	subName?: string;
	pubDate: string;
	format?: string;
	descriptions?: {
		authorBio?: string;
		quotes?: string;
		summary?: string;
		keynotes?: string;
	};
	images?: Array<{
		type: ProductImageType;
		uri: string;
	}>;
	contributors?: Array<TContributor>;
};

export type TUser = {
	createdDate: string;
	email: string;
	firstName: string;
	fullName: string;
	id: number;
	lastName: string;
	orgCity: string;
	orgState: string;
	orgID: string;
	orgName: string;
	classification: string;
	userID: string;
	phone: string;
	title: string;
};

export type TUserAvatar = {
	displayName: string;
	hasImage: boolean;
	initials: string;
	initialsFontClass: string;
	size: string;
	appUserId: number;
	uri: string;
};

export type TOrganization = {
	orgID: string;
	name: string;
	billingActive: boolean;
	address: {
		streetAddress1: string;
		streetAddress2: string;
		city: string;
		stateProvince: string;
		stateId: number;
		postalCode: string;
		country: string;
	};
	billingFee: string;
	displayName: string;
	clientId: number;
	primaryGroupId: number;
};

export type TReview = {
	appUserId: number;
	createdDate: string;
	rating: number;
	sku: string;
	text?: string;
	user?: TUser;
	userAvatar?: TUserAvatar;
	organization?: TOrganization;
};

export type TReviewAggregate = {
	organizationsById: {
		[orgId: string]: TOrganization;
	};
	reviews: TReview[];
	userAvatarsByAppUserId: {
		[appUserId: number]: TUserAvatar;
	};
	usersById: {
		[userId: number]: TUser;
	};
};

export type TMyCommunitiesResponse = {
	affiliations?: Array<{
		id: number;
	}>;
};

export type TDocument = {
	id: number;
	sku: string;
	product: TProduct;
	selectedReviews: Required<TReview>[];
	marketingText: string;
	createdAt: string;
	options: {
		showJacketCover: boolean;
		showPrice: boolean;
		showMarketingText: boolean;
		showReviews: boolean;
		reviewsLabel: string;
	};
};
