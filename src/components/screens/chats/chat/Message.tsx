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
				'justify-start': isSender,
				'justify-end': !isSender,
			})}>
			<div
				className={cn('relative flex items-start', {
					'flex-row-reverse': !isSender,
				})}>
				<Avatar user={message.sender} className='rounded-full' />
				<div
					className={cn('', {
						'ml-3': isSender,
						'mr-3': !isSender,
					})}>
					<div
						className={cn(
							'text-sm text-white bg-gray-200 mt-1 py-1.5 px-3 rounded-lg rounded-2xl',
							{
								'rounded-tl-none bg-border': isSender,
								'rounded-tr-none bg-primary': !isSender,
							}
						)}>
						<p>{message.text}</p>
					</div>
					<span
						className={cn('text-xs text-gray-500 block mt-2', {
							'text-left': isSender,
							'text-right': !isSender,
						})}>
						{dayjs(message.createdAt).format('HH:mm')}
					</span>
				</div>
			</div>
		</div>
	);
}
