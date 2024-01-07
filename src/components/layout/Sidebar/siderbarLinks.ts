import { Routes } from '@/configs/links.config';
import { MessagesSquare, Phone, Settings, Users2 } from 'lucide-react';

export default [
	{
		icon: Users2,
		link: Routes.FRIENDS,
	},
	{
		icon: Phone,
		link: Routes.CALL,
	},
	{
		icon: MessagesSquare,
		link: Routes.CHATS,
	},
	{
		icon: Settings,
		link: Routes.SETTINGS,
	},
];
