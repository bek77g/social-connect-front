'use client';
import { $fetch } from '@/$api/api.fetch';
import { ChatListItem } from '@/components/screens/chats/list/ChatListItem';
import Field from '@/components/ui/Field';
import { Loader } from '@/components/ui/Loader';
import { IChat } from '@/types/chat.types';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

export function ChatsList() {
	const { data, isLoading } = useQuery({
		queryKey: ['chats'],
		queryFn: () => $fetch.get<IChat[]>('/cahts', {}, true),
	});

	return (
		<>
			<div className='border-t border-b border-border p-layout'>
				<Field placeholder='Search chat' Icon={Search} />
			</div>
			<div>
				{isLoading ? (
					<div className='p-layout'>
						<Loader />
					</div>
				) : data?.length ? (
					data.map(chat => <ChatListItem key={chat.id} {...chat} />)
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</>
	);
}
