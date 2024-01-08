import useAuth from '@/hooks/useAuth';
import { IChat } from '@/types/chat.types';
import Image from 'next/image';

export function ChatListItem({ participants, messages }: IChat) {
	const { user } = useAuth();
	const correspondent = participants.find(u => u.email !== user?.email);
	const lastMessage = messages.at(-1);

	return (
		<div className='p-layout flex items-center gap-4'>
			<Image
				width={45}
				height={45}
				src={correspondent?.avatar ?? '/no-avatar.png'}
				alt={correspondent?.email ?? 'CORRESPONDENT'}
			/>
			<div className='text-sm'>
				<div>
					<p>{correspondent?.username}</p>
					<p>{lastMessage?.createdAt}</p>
				</div>
				<p className='opacity-30'>{lastMessage?.text}</p>
			</div>
		</div>
	);
}
