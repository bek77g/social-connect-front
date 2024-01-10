'use client';
import { $fetch } from '@/$api/api.fetch';
import { ChatHeader } from '@/components/screens/chats/chat/ChatHeader';
import { Message } from '@/components/screens/chats/chat/Message';
import { MessageField } from '@/components/screens/chats/chat/MessageField';
import useAuth from '@/hooks/useAuth';
import { IChat } from '@/types/chat.types';
import { useQuery } from '@tanstack/react-query';

export function Chat({ id }) {
	const { user } = useAuth();
	const { data } = useQuery({
		queryKey: ['chat', id],
		queryFn: () =>
			$fetch.get<{ data: IChat }>(
				`/chats/${id}
				?populate[messages][populate][sender][populate][avatar]=*
				&populate[participants][populate][avatar]=*`
			),
		select: data => data.data,
		enabled: !!id,
	});

	const correspondent = data?.participants.find(u => u.email !== user?.email);

	return (
		<div className='w-8/12 border-r border-border'>
			<ChatHeader participant={correspondent} />
			<div className='p-layout border-t border-border'>
				{data?.messages.map(message => (
					<Message key={message.id} message={message} />
				))}
				ChatHeader
			</div>
			<MessageField />
		</div>
	);
}
