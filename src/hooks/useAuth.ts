import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthHook {
	user: Record<string, any> | null;
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
		signOut();
	};

	return { user, isLoggedIn, sessionStatus, login, logout };
};

export default useAuth;
