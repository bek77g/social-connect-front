import 'next-auth';

declare module 'next-auth' {
	interface Session {
		user?: User;
	}

	interface User {
		email: string;
		password: string;
		avatar: string;
		id?: string;
		jwt?: string;
	}
}
