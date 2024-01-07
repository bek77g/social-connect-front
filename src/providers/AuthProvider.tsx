'use client';
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { PropsWithChildren, useEffect } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
	const { user, isLoggedIn } = useAuth();
	useEffect(() => {
		if (isLoggedIn) {
			Cookies.set('token', user?.jwt ?? '');
		}
	}, [user, isLoggedIn]);
	return children;
}
