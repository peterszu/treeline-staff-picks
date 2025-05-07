import { useMyUserContext } from '../contexts/MyUserContext';

export function useIsAnonymous(): {
	isAnonymous: boolean;
	isLoading: boolean;
} {
	const { isAnonymous, isLoading } = useMyUserContext();
	return { isAnonymous, isLoading };
}
