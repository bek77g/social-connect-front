import { Avatar } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { IChat } from '@/types/chat.types';
import dayjs from 'dayjs';
import Link from 'next/link';

export function ChatsListItem({ participants, messages, id }: IChat) {
	const { user } = useAuth();
	const correspondent = participants.find(u => u.email !== user?.email);
	const lastMessage = messages.at(-1);

	return (
		<Link
			href={`/chat/${id}`}
			className='p-layout flex items-center gap-4 border-b border-border duration-300 ease-linear transition-colors hover:bg-border animation-slide-fade'>
			<Avatar user={correspondent} width={45} height={45} />
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					<p>{correspondent?.username}</p>
					<p className='text-xs opacity-30'>
						{dayjs(lastMessage?.createdAt).format('HH:mm')}
					</p>
				</div>
				<p className='opacity-30 mt-0.5'>{lastMessage?.text}</p>
			</div>
		</Link>
	);
}
