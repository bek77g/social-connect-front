'use client';
import { cookies } from '@/$api/api.cookie';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
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
		if (unAuthorized && pathname !== '/login' && pathname !== '/register') {
			console.log('not authorized');
			router.push('/login');
		}
		if (authorized) {
			cookies.set('token', user?.jwt ?? '', {
				sameSite: 'None',
				// secure: true,
			});
		}
	}, [loading, unAuthorized, sessionStatus, pathname]);

	if (loading) {
		return <Loader />;
	}

	return children;
}
