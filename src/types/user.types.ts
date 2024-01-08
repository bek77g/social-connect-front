export interface IUser {
	username: string;
	email: string;
	confirmed: boolean;
	role: string;
	avatar: { url: string };
}

export type UserJwt = {
	user: IUser;
	jwt: string;
};
