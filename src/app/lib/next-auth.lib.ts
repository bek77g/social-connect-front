import { $fetch } from '@/$api/api.fetch';
import { IAuthFromState } from '@/components/screens/Auth/auth.types';
import { IUser } from '@/types/user.types';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Enter email',
					type: 'string',
				},
				password: {
					label: 'Enter password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const { email, password } = credentials as IAuthFromState;

				const data = await $fetch.get<IUser[]>(
					`/users?filters[email][$eq]=${email}`
				);

				console.log(data);

				// if (!user) {
				// 	const { userCreate } = await grafbase.request(CreateUserByEmail);
				// }
			},
		}),
	],
});
