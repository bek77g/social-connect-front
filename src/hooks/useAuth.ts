import { cookies } from '@/$api/api.cookie';
import { IUser } from '@/types/user.types';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthHook {
	user: IUser;
	isLoggedIn: boolean;
	sessionStatus: string;
	login: () => void;
	logout: () => void;
}

const useAuth = (): AuthHook => {
	const { data: session, status: sessionStatus } = useSession();

	const isLoggedIn: boolean = sessionStatus === 'authenticated';

	const user: Record<string, any> | null = session?.user || null;

	const login = (): void => {
		signIn();
	};

	const logout = (): void => {
		signOut().then(() => cookies.remove('token'));
	};

	return { user, isLoggedIn, sessionStatus, login, logout };
};

export default useAuth;
