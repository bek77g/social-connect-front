import { Avatar } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { useUserRelations } from '@/hooks/useUserRelations';
import { IUser } from '@/types/user.types';

interface IFriendsListItem {
	user: IUser;
	idx: number;
}

export function FriendsListItem({ user, idx }: IFriendsListItem) {
	const { user: authUser } = useAuth();
	const { userRelations } = useUserRelations(authUser.id);
	const isFriend = userRelations?.some(u => u.id === user.id);

	return (
		<div
			className='border border-border border-l-0 border-t-0 p-layout text-center'
			key={user.id}>
			<Avatar user={user} width={70} height={70} className='mx-auto' />
			<p className='mt-3 text-lg font-medium'>{user.username}</p>
			<button className='border-b border-white transition-colors hover:border-primary hover:text-primary'>
				{isFriend ? 'Remove from friends' : 'Add to friend'}
			</button>
		</div>
	);
}
