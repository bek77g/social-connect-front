import { CurrentsUser } from '@/components/screens/chats/CurrentsUser';
import { ChatsList } from '@/components/screens/chats/list/ChatsList';
import { PropsWithChildren } from 'react';

interface IChatsScreen extends PropsWithChildren {}

export function ChatsScreen({ children }: IChatsScreen) {
	return (
		<div className='grid grid-cols-[0.7fr_3fr] h-full'>
			<div className='border-r border-border'>
				<CurrentsUser />
				<ChatsList />
			</div>
			{<>{children}</> && (
				<p className='p-layout'>Click chat on the left side</p>
			)}
		</div>
	);
}
