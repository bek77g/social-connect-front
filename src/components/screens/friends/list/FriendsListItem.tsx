import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
import { useUserRelations } from '@/hooks/useUserRelations';
import { IUser } from '@/types/user.types';

interface IFriendsListItem {
	user: IUser;
}

export function FriendsListItem({ user }: IFriendsListItem) {
	const { user: authUser } = useAuth();
	const { createRelation, deleteRelation, getCurrentRelation, isLoading } =
		useUserRelations();
	const currentRelation = getCurrentRelation(user.id);

	const isFriend = !!currentRelation;

	const onSubmit = () => {
		if (isFriend) {
			deleteRelation(currentRelation.id);
		} else {
			createRelation({ relatedId: authUser.id, relatingId: user?.id });
		}
	};

	if (authUser.id === user.id) return null;

	return (
		<div
			className='border border-border border-l-0 border-t-0 p-layout text-center overflow-hidden'
			key={user.id}>
			<Avatar user={user} width={70} height={70} className='mx-auto' />
			<p className='mt-3 text-lg font-medium'>{user.username}</p>
			<button
				onClick={onSubmit}
				className='border-b border-white transition-colors hover:border-primary hover:text-primary'>
				{isFriend ? (
					'Remove from friends'
				) : isLoading ? (
					<Loader />
				) : (
					'Add to friend'
				)}
			</button>
		</div>
	);
}
