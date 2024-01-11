import { Avatar } from '@/components/ui/Avatar';
import { Loader } from '@/components/ui/Loader';
import { useJoinChatByFellowId } from '@/hooks/useJoinChatByFellowId';
import { useProfile } from '@/hooks/useProfile';
import { useUserRelations } from '@/hooks/useUserRelations';
import { IUser } from '@/types/user.types';
import { MessageCirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IFriendsListItem {
	user: IUser;
}

export function FriendsListItem({ user }: IFriendsListItem) {
	const router = useRouter();
	const { data: authUser } = useProfile();
	const { createRelation, deleteRelation, getCurrentRelation, isLoading } =
		useUserRelations();
	const { joinChat } = useJoinChatByFellowId();
	const currentRelation = getCurrentRelation(user.id);

	const isFriend = !!currentRelation;

	const onSubmitFriend = () => {
		if (isFriend) {
			deleteRelation(currentRelation.id, {
				onSettled: () => toast.success(`${user?.username} удалён из друзей`),
			});
		} else {
			createRelation(
				{ relatedId: authUser.id, relatingId: user?.id },
				{
					onSettled: () => toast.success(`${user?.username} добавлен в друзья`),
				}
			);
		}
	};

	if (authUser?.id === user.id) return null;

	return (
		<div
			className='relative border border-border border-l-0 border-t-0 p-layout text-center overflow-hidden'
			key={user.id}>
			<Avatar user={user} width={70} height={70} className='mx-auto' />
			<p className='mt-3 text-lg font-medium'>{user.username}</p>
			<button
				onClick={onSubmitFriend}
				className='border-b border-white transition-colors hover:border-primary hover:text-primary'>
				{isFriend ? (
					'Remove from friends'
				) : isLoading ? (
					<Loader />
				) : (
					'Add to friend'
				)}
			</button>
			<button
				onClick={() => joinChat(user.id)}
				className='absolute right-2 top-2 cursor-pointer hover:text-primary transition-colors'>
				<MessageCirclePlus />
			</button>
		</div>
	);
}
