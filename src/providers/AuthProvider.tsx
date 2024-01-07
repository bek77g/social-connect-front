'use client';
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';
import { PropsWithChildren, useEffect } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
	const { user, isLoggedIn } = useAuth();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn) {
			Cookies.set('token', user?.jwt ?? '');
		}
	}, [user, isLoggedIn]);

	useEffect(() => {
		if (pathname !== '/login' && pathname !== '/register') {
			if (!isLoggedIn) router.push('/login');
		}
	}, [pathname]);

	return children;
}
