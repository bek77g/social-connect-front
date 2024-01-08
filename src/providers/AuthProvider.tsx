'use client';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';
import { PropsWithChildren, useEffect } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
	const { user, sessionStatus } = useAuth();
	const pathname = usePathname();
	const router = useRouter();

	const authorized = sessionStatus === 'authenticated';
	const unAuthorized = sessionStatus === 'unauthenticated';
	const loading = sessionStatus === 'loading';

	useEffect(() => {
		if (loading) return;
		if (unAuthorized) {
			console.log('not authorized');
			router.push('/login');
		}
		if (authorized) {
			Cookies.set('token', user?.jwt ?? '', { expires: 1 });
		}
	}, [loading, unAuthorized, sessionStatus, pathname]);

	if (loading) {
		return <Loader />;
	}

	return children;
}
