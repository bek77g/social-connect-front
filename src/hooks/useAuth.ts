import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthHook {
	user: Record<string, any> | null;
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
}

const useAuth = (): AuthHook => {
	const { data: session, status } = useSession();

	const isLoggedIn: boolean = status === 'authenticated';
	const user: Record<string, any> | null = session?.user || null;

	const login = (): void => {
		signIn();
	};

	const logout = (): void => {
		signOut();
	};

	return { user, isLoggedIn, login, logout };
};

export default useAuth;
