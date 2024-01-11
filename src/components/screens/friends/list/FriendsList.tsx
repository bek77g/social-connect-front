'use client';
import { $fetch } from '@/$api/api.fetch';
import { FriendsListItem } from '@/components/screens/friends/list/FriendsListItem';
import { Loader } from '@/components/ui/Loader';
import { useQuery } from '@tanstack/react-query';

export function FriendsList() {
	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: () => $fetch.get<IUser[]>('/users?populate=avatar', true),
	});

	return (
		<div className='w-7/12'>
			<h1 className='p-layout border-r border-b border-border'>People</h1>
			{isLoading ? (
				<div className='p-layout'>
					<Loader />
				</div>
			) : (
				<div className='grid grid-cols-3'>
					{data?.map((user, idx) => (
						<FriendsListItem key={user.id} user={user} idx={idx} />
					))}
				</div>
			)}
		</div>
	);
}
