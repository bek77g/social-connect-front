'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
	return (
		<NextAuthProvider>
			<AuthProvider>{children}</AuthProvider>
		</NextAuthProvider>
	);
}
