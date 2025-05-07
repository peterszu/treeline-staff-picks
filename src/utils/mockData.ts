import type {
	TProduct,
	TReview,
	TUser,
	TUserAvatar,
	TOrganization,
	ProductImageType,
} from '../types';

const mockUsers: TUser[] = [
	{
		createdDate: '2024-01-15T10:00:00Z',
		email: 'sarah.reader@bookstore.com',
		firstName: 'Sarah',
		lastName: 'Reader',
		fullName: 'Sarah Reader',
		id: 1,
		orgCity: 'Portland',
		orgState: 'OR',
		orgID: 'POWELLS1',
		orgName: "Powell's Books",
		classification: 'Bookseller',
		userID: 'SR001',
		phone: '503-555-0123',
		title: 'Senior Bookseller',
	},
	{
		createdDate: '2024-01-20T14:30:00Z',
		email: 'mark.bookman@bookstore.com',
		firstName: 'Mark',
		lastName: 'Bookman',
		fullName: 'Mark Bookman',
		id: 2,
		orgCity: 'Seattle',
		orgState: 'WA',
		orgID: 'ELLIOTT1',
		orgName: 'Elliott Bay Book Company',
		classification: 'Bookseller',
		userID: 'MB001',
		phone: '206-555-0123',
		title: 'Book Buyer',
	},
	{
		createdDate: '2024-01-25T11:20:00Z',
		email: 'emma.chef@bookstore.com',
		firstName: 'Emma',
		lastName: 'Chef',
		fullName: 'Emma Chef',
		id: 3,
		orgCity: 'San Francisco',
		orgState: 'CA',
		orgID: 'GREEN1',
		orgName: 'Green Apple Books',
		classification: 'Bookseller',
		userID: 'EC001',
		phone: '415-555-0123',
		title: 'Cooking Section Manager',
	},
	{
		createdDate: '2024-02-01T09:45:00Z',
		email: 'david.foodie@bookstore.com',
		firstName: 'David',
		lastName: 'Foodie',
		fullName: 'David Foodie',
		id: 4,
		orgCity: 'Austin',
		orgState: 'TX',
		orgID: 'BOOK1',
		orgName: 'BookPeople',
		classification: 'Bookseller',
		userID: 'DF001',
		phone: '512-555-0123',
		title: 'Culinary Books Specialist',
	},
];

const mockUserAvatars: TUserAvatar[] = [
	{
		displayName: 'Sarah Reader',
		hasImage: true,
		initials: 'SR',
		initialsFontClass: 'text-lg',
		size: 'medium',
		appUserId: 1,
		uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
	},
	{
		displayName: 'Mark Bookman',
		hasImage: true,
		initials: 'MB',
		initialsFontClass: 'text-lg',
		size: 'medium',
		appUserId: 2,
		uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
	},
	{
		displayName: 'Emma Chef',
		hasImage: true,
		initials: 'EC',
		initialsFontClass: 'text-lg',
		size: 'medium',
		appUserId: 3,
		uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
	},
	{
		displayName: 'David Foodie',
		hasImage: true,
		initials: 'DF',
		initialsFontClass: 'text-lg',
		size: 'medium',
		appUserId: 4,
		uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
	},
];

const mockOrganizations: TOrganization[] = [
	{
		orgID: 'POWELLS1',
		name: "Powell's Books",
		billingActive: true,
		address: {
			streetAddress1: '1005 W Burnside St',
			streetAddress2: '',
			city: 'Portland',
			stateProvince: 'OR',
			stateId: 38,
			postalCode: '97209',
			country: 'USA',
		},
		billingFee: '0',
		displayName: "Powell's City of Books",
		clientId: 1001,
		primaryGroupId: 1,
	},
	{
		orgID: 'ELLIOTT1',
		name: 'Elliott Bay Book Company',
		billingActive: true,
		address: {
			streetAddress1: '1521 10th Ave',
			streetAddress2: '',
			city: 'Seattle',
			stateProvince: 'WA',
			stateId: 48,
			postalCode: '98122',
			country: 'USA',
		},
		billingFee: '0',
		displayName: 'Elliott Bay Book Company',
		clientId: 1002,
		primaryGroupId: 2,
	},
	{
		orgID: 'GREEN1',
		name: 'Green Apple Books',
		billingActive: true,
		address: {
			streetAddress1: '506 Clement St',
			streetAddress2: '',
			city: 'San Francisco',
			stateProvince: 'CA',
			stateId: 6,
			postalCode: '94118',
			country: 'USA',
		},
		billingFee: '0',
		displayName: 'Green Apple Books',
		clientId: 1003,
		primaryGroupId: 3,
	},
	{
		orgID: 'BOOK1',
		name: 'BookPeople',
		billingActive: true,
		address: {
			streetAddress1: '603 N Lamar Blvd',
			streetAddress2: '',
			city: 'Austin',
			stateProvince: 'TX',
			stateId: 48,
			postalCode: '78703',
			country: 'USA',
		},
		billingFee: '0',
		displayName: 'BookPeople',
		clientId: 1004,
		primaryGroupId: 4,
	},
];

const mockProducts: TProduct[] = [
	{
		sku: '1234567890',
		ean: '9781234567890',
		author: 'Smith, Jane',
		name: 'The Hidden Garden',
		retailPrice: 24.99,
		category: 'Fiction',
		pubDate: '2024-01-01',
		subName: 'A Novel of Mystery and Magic',
		descriptions: {
			summary:
				'A mysterious garden holds secrets that could change everything...',
			authorBio:
				'Jane Smith is an award-winning author of magical realism.',
			quotes: 'Enchanting and beautifully written - The Daily Book Review',
			keynotes:
				'Perfect for fans of magical realism and garden mysteries',
		},
		images: [
			{
				type: 'jacketCover' as ProductImageType,
				uri: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg',
			},
		],
		contributors: [
			{
				firstName: 'Jane',
				lastName: 'Smith',
				sequence: 1,
				onixContributorRoleCode: 'A01',
				localizedContributorRole: 'Author',
			},
		],
	},
	{
		sku: '9876543210',
		ean: '9789876543210',
		author: 'Johnson, Robert',
		name: 'Quantum Cooking',
		retailPrice: 29.99,
		category: 'Cooking',
		pubDate: '2024-02-15',
		descriptions: {
			summary:
				'Revolutionary cooking techniques based on quantum physics principles',
			authorBio:
				'Robert Johnson is a renowned chef and physics enthusiast',
			keynotes: 'Combines science and cooking in innovative ways',
		},
		images: [
			{
				type: 'jacketCover' as ProductImageType,
				uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
			},
		],
		contributors: [
			{
				firstName: 'Robert',
				lastName: 'Johnson',
				sequence: 1,
				onixContributorRoleCode: 'A01',
				localizedContributorRole: 'Author',
			},
		],
	},
];

const mockReviews: Required<TReview>[] = [
	{
		appUserId: 1,
		createdDate: '2024-02-01T09:15:00Z',
		rating: 5,
		sku: '1234567890',
		text: 'A masterpiece of magical realism! The way the author weaves mystery and enchantment throughout the narrative is simply breathtaking. This book kept me engaged from start to finish.',
		user: mockUsers[0],
		userAvatar: mockUserAvatars[0],
		organization: mockOrganizations[0],
	},
	{
		appUserId: 2,
		createdDate: '2024-02-05T16:45:00Z',
		rating: 4,
		sku: '1234567890',
		text: 'Beautifully written with rich character development. The garden descriptions are vivid and immersive.',
		user: mockUsers[1],
		userAvatar: mockUserAvatars[1],
		organization: mockOrganizations[1],
	},
	{
		appUserId: 3,
		createdDate: '2024-02-10T14:30:00Z',
		rating: 5,
		sku: '9876543210',
		text: "As a cooking section manager, I've seen many cookbooks, but this one stands out! The quantum physics approach to cooking is fascinating and actually works. The recipes are innovative and the scientific explanations make perfect sense.",
		user: mockUsers[2],
		userAvatar: mockUserAvatars[2],
		organization: mockOrganizations[2],
	},
	{
		appUserId: 4,
		createdDate: '2024-02-15T11:20:00Z',
		rating: 4,
		sku: '9876543210',
		text: 'A unique blend of science and culinary arts. The quantum cooking techniques have revolutionized how I approach certain recipes. Some concepts might be challenging for beginners, but the results are worth the effort.',
		user: mockUsers[3],
		userAvatar: mockUserAvatars[3],
		organization: mockOrganizations[3],
	},
];

const mockMarketingTexts: Record<string, string> = {
	'1234567890':
		"Step into a world of wonder with this enchanting tale that weaves together mystery, magic, and the timeless allure of a hidden garden. Perfect for readers who love to lose themselves in richly detailed worlds, this story offers a unique blend of suspense and beauty. The author's masterful prose brings every scene to vivid life, making this an unforgettable reading experience. Don't miss this captivating journey - pick up your copy today and discover the secrets that await within these pages.",
	'9876543210':
		"Revolutionize your culinary journey with this groundbreaking cookbook that merges the fascinating world of quantum physics with the art of cooking. Discover how scientific principles can transform your understanding of heat transfer, molecular interactions, and flavor development. From perfectly seared steaks to delicate soufflés, each recipe is backed by scientific research and explained in accessible terms. Whether you're a professional chef or an enthusiastic home cook, this book will change how you think about cooking forever. The innovative techniques and clear explanations make complex scientific concepts approachable, while the stunning photography and detailed instructions ensure success in your kitchen. Don't just cook - understand the science behind every bite. Transform your culinary skills and impress your guests with dishes that are not just delicious, but scientifically perfect. This is more than a cookbook - it's a journey into the future of cooking.",
};

export function getMockProduct(sku: string): Promise<TProduct> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const product = mockProducts.find((p) => p.sku === sku);
			if (product) {
				resolve(product);
			} else {
				reject(new Error('Product not found'));
			}
		}, 800);
	});
}

export function getMockReviews(sku: string): Promise<Required<TReview>[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockReviews.filter((r) => r.sku === sku));
		}, 1000);
	});
}

export async function generateMockMarketingText(sku: string) {
	return new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(mockMarketingTexts[sku] ?? '');
		}, 1500);
	});
}
