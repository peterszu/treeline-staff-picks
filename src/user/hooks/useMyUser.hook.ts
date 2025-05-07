import { useQuery } from '@tanstack/react-query';
import { TUser } from '../../types';
import { useRequest } from '../../api-service/useRequest.hook';

export type TUserState = {
	user: TUser | null;
	isAnonymous: boolean;
};

export function useMyUser() {
	const fetchMyUser = useFetchMyUser();

	const { data, isLoading } = useQuery({
		queryKey: ['myUser'],
		queryFn: fetchMyUser,
	});

	return {
		isLoading,
		user: data?.user ?? null,
		isAnonymous: Boolean(data?.isAnonymous),
	};
}

function useFetchMyUser() {
	const request = useRequest();

	return async function fetchMyUser(): Promise<TUserState> {
		try {
			const response = await request('api/v1/me');
			if (response.status === 401) {
				return {
					user: null,
					isAnonymous: true,
				};
			}
			const userData: TUser | undefined = await response.json();
			return {
				user: userData ?? null,
				isAnonymous: !userData,
			};
		} catch (err) {
			console.warn((err as Error).message);
			return {
				user: null,
				isAnonymous: true,
			};
		}
	};
}
