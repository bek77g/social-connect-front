import { Message } from '@/components/screens/chats/chat/Message';
import { IChat } from '@/types/chat.types';

export function ChatContent({ messages = [] }: IChat) {
	return (
		<div className='p-layout border-t border-border'>
			{messages.map(message => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
}
