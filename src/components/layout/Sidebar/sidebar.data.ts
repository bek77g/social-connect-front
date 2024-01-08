import { Routes } from '@/constants/links.constants';
import { MessagesSquare, Phone, Settings, Users2 } from 'lucide-react';

export const MENU = [
	{
		icon: Users2,
		url: Routes.FRIENDS,
	},
	{
		icon: Phone,
		url: Routes.CALL,
	},
	{
		icon: MessagesSquare,
		url: Routes.CHATS,
	},
	{
		icon: Settings,
		url: Routes.SETTINGS,
	},
];
