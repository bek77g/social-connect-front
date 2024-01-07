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
			Cookies.set('token', user?.jwt ?? '', { expires: 1 });
		}
	}, [user, isLoggedIn]);

	useEffect(() => {
		if (pathname !== '/login' && pathname !== '/register') {
			const isLoggedIn = !!Cookies.get('token');
			if (!isLoggedIn) router.push('/login');
		}
	}, [pathname]);

	//Надо переделать на middleware

	return children;
}
