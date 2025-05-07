import { useQuery } from '@tanstack/react-query';
import type { TReview } from '../types';
import { getMockReviews } from '../utils/mockData';
import { getApiUrl, getUseTestData } from '../utils/env.utils';
import { useIsAnonymous } from '../user';

export function useReviews(sku: string) {
	const { isAnonymous, isLoading } = useIsAnonymous();

	return useQuery({
		queryKey: ['reviews', sku],
		queryFn: async () => {
			if (getUseTestData() === 'true') {
				return getMockReviews(sku);
			}

			// Step 1: Fetch user's communities
			let communityIds: number[] = [];

			if (isAnonymous) {
				communityIds = [
					66639, 150424, 151432, 151566, 177725, 189689, 196967,
					216771, 386200,
				];
			} else {
				const communityResponse = await fetch(
					`${getApiUrl()}/api/affiliations/me?options=basic,joinedAffiliationsOnly`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
					},
				);

				if (!communityResponse.ok) {
					throw new Error('Failed to fetch communities');
				}

				const communitiesData = await communityResponse.json();

				communityIds =
					communitiesData.affiliations?.map(
						(aff: { id: number }) => aff.id,
					) || [];
			}

			// Step 2: Fetch reviews using community IDs
			const reviewsResponse = await fetch(
				`${getApiUrl()}/api/v2/affiliations/reviews`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						appUserIds: [],
						communityIds,
						skus: [sku],
					}),
				},
			);

			if (!reviewsResponse.ok) {
				throw new Error('Failed to fetch reviews');
			}

			const reviewsData = await reviewsResponse.json();

			// Process and return complete reviews
			return reviewsData.reviews
				.filter((review: TReview) => Boolean(review.text))
				.map((review: TReview) => {
					const user = reviewsData.usersById[review.appUserId];
					const userAvatar =
						reviewsData.userAvatarsByAppUserId[review.appUserId];
					const organization = user?.orgID
						? reviewsData.organizationsById[
								user.orgID.toLowerCase()
							]
						: undefined;

					return {
						...review,
						rating: getRating(review.rating || 0),
						user: user || {},
						userAvatar: userAvatar || {},
						organization: organization || {},
					};
				}) as Array<Required<TReview>>;
		},
		enabled: Boolean(sku) && !isLoading,
	});
}

function getRating(rating: number): number {
	if (rating === 0) {
		return 0;
	}
	return rating / 2;
}
