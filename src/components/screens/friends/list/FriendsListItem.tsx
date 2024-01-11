import { Avatar } from '@/components/ui/Avatar';
import { useProfile } from '@/hooks/useProfile';
import { IUser } from '@/types/user.types';

interface IFriendsListItem {
	user: IUser;
	idx: number;
}

export function FriendsListItem({ user, idx }: IFriendsListItem) {
	const { data: authUser } = useProfile();
	// const isFriend = authUser?.friends?.some(u => u.id === authUser.id);

	return (
		<div
			className='border border-border border-l-0 border-t-0 p-layout text-center'
			key={user.id}>
			<Avatar user={user} width={70} height={70} className='mx-auto' />
			<p className='mt-3 text-lg font-medium'>{user.username}</p>
			<button className='border-b border-white transition-colors hover:border-primary hover:text-primary'>
				{/* {isFriend ? 'Remove from friends' : 'Add to friend'} */}
			</button>
		</div>
	);
}
