import { CurrentsUser } from '@/components/screens/chats/CurrentsUser';
import { ChatsList } from '@/components/screens/chats/list/ChatsList';
import type { PropsWithChildren } from 'react';

export default function ChatLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='grid grid-cols-[0.7fr_3fr] h-full'>
			<div className='border-r border-border'>
				<CurrentsUser />
				<ChatsList />
			</div>
			{children}
		</div>
	);
}
