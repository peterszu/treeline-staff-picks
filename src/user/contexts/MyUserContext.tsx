import { createContext, useContext, PropsWithChildren } from 'react';
import { useMyUser } from '../hooks/useMyUser.hook';

type TMyUserContext = ReturnType<typeof useMyUser>;

const MyUserContext = createContext<TMyUserContext | undefined>(undefined);

export function MyUserProvider({ children }: PropsWithChildren) {
	const myUser = useMyUser();

	return (
		<MyUserContext.Provider value={myUser}>
			{children}
		</MyUserContext.Provider>
	);
}

export function useMyUserContext() {
	const myUser: TMyUserContext | undefined = useContext(MyUserContext);

	if (typeof myUser === 'undefined') {
		throw new Error('useMyUserContext must be a child of MyUserProvider');
	}

	return {
		isLoading: myUser.isLoading,
		user: myUser?.user ?? null,
		isAnonymous: myUser?.user === null || myUser.isAnonymous,
		userId: myUser?.user?.userID ?? '',
		appUserId: myUser?.isAnonymous ? 0 : myUser?.user?.id,
		userEmailAddress: myUser?.user?.email ?? '',
	};
}
