'use client';
import { $fetch } from '@/$api/api.fetch';
import { ChatContent } from '@/components/screens/chats/chat/ChatContent';
import { ChatHeader } from '@/components/screens/chats/chat/ChatHeader';
import { MessageField } from '@/components/screens/chats/chat/MessageField';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
import { IChat } from '@/types/chat.types';
import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';

export function Chat({ id }) {
	const { user } = useAuth();
	const { data, isLoading } = useQuery({
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
		<div
			className={cn('w-8/12 border-r border-border grid max-h-screen', {
				'grid-rows-[1fr_0.09fr]': isLoading,
				'grid-rows-[0.6fr_6fr_0.6fr]': !isLoading,
			})}>
			{isLoading ? (
				<div className='grid place-content-center'>
					<Loader />
				</div>
			) : (
				<>
					<ChatHeader participant={correspondent} />
					<ChatContent messages={data?.messages} />
				</>
			)}
			<MessageField />
		</div>
	);
}
