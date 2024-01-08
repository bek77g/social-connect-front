import { Chat } from '@/components/screens/chats/chat/Chat';
import { CurrentsUser } from '@/components/screens/chats/CurrentsUser';
import { ChatsList } from '@/components/screens/chats/list/ChatsList';

export default function ChatPage() {
	return (
		<div className='grid grid-cols-[0.7fr_3fr] h-full'>
			<div className='border-r border-border'>
				<CurrentsUser />
				<ChatsList />
			</div>
			<Chat />
		</div>
	);
}
