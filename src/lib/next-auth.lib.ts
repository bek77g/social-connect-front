import { $fetch } from '@/$api/api.fetch';
import { IAuthFromState } from '@/components/screens/Auth/auth.types';
import { UserJwt } from '@/types/user.types';
import { User } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					type: 'string',
				},
				username: {
					type: 'string',
				},
				password: {
					type: 'password',
				},
			},
			async authorize(credentials): Promise<UserJwt | null> {
				const { email, username, password } = credentials as IAuthFromState;
				if (!email || !password) return null;
				if (username) {
					try {
						const { user, jwt } = await $fetch.post<UserJwt>(
							`/auth/local/register`,
							credentials
						);
						return { ...user, jwt };
					} catch (error) {
						return Promise.reject(error);
					}
				}

				try {
					const { user, jwt } = await $fetch.post<UserJwt>(`/auth/local`, {
						identifier: email,
						password: password,
					});
					return { ...user, jwt };
				} catch (error) {
					return Promise.reject(error);
				}
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			return { ...token, ...user };
		},
		session({ session, token }) {
			session.user = token as User;
			return session;
		},
	},
});
