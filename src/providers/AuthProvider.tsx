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

	return children;
}
