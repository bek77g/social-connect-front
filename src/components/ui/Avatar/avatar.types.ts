import { IUser } from '@/types/user.types';

interface IAvatarProps {
	user: IUser;
}

type TypeAvatarProps = HTMLElement<HTMLImageElement> & IAvatarProps;

export interface IAvatar extends TypeAvatarProps {}
