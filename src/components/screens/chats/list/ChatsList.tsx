'use client';
import { $fetch } from '@/$api/api.fetch';
import { ChatListItem } from '@/components/screens/chats/list/ChatListItem';
import Field from '@/components/ui/Field';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

export function ChatsList() {
	const { isLoggedIn } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: ['chats'],
		queryFn: () =>
			$fetch.get<{ data: IChat[] }>(
				'/chats?populate[messages]=*&populate[participants][populate][avatar]=*',
				{},
				true
			),
		enabled: isLoggedIn,
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
				) : data?.data?.length ? (
					data?.data.map(chat => <ChatListItem key={chat.id} {...chat} />)
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</>
	);
}
