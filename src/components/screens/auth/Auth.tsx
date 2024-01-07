interface IAuth {
	type?: 'login' | 'register';
}

export function Auth({ type }: IAuth) {
	return <div>Auth</div>;
}
