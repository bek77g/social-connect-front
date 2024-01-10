import { Avatar } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { IMessage } from '@/types/chat.types';
import cn from 'clsx';
import dayjs from 'dayjs';

export function Message({ message }: { message: IMessage }) {
	const { user } = useAuth();
	const isSender = user.email === message.sender.email;

	return (
		<div
			className={cn('flex mb-2.5', {
				'justify-end': isSender,
				'justify-start': !isSender,
			})}>
			<div
				className={cn('relative flex items-center', {
					'flex-row-reverse': isSender,
				})}>
				<Avatar
					user={message.sender}
					width={45}
					height={45}
					className='rounded-full'
				/>
				<div
					className={cn('bg-gray-200 p-2 rounded-lg', {
						'mr-3': isSender,
						'ml-3': !isSender,
					})}>
					<p className='text-sm text-gray-800'>{message.text}</p>
					<span className='text-xs text-gray-500 block mt-1'>
						{dayjs(message.createdAt).format('HH:mm')}
					</span>
				</div>
			</div>
		</div>
	);
}
