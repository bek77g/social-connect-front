import { IUser } from '@/types/user.types';
import { HTMLProps } from 'react';

interface IAvatarProps {
	user: IUser;
}

type TypeAvatarProps = HTMLProps<HTMLImageElement> & IAvatarProps;

export interface IAvatar extends TypeAvatarProps {}
