import { Avatar } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { IMessage } from '@/types/chat.types';
import cn from 'clsx';
import dayjs from 'dayjs';

export function Message({ message }: { message: IMessage }) {
	const { user } = useAuth();
	const isSender = user?.email === message.sender.email;

	return (
		<div
			className={cn('flex mb-2.5', {
				'justify-end': isSender,
				'justify-start': !isSender,
			})}>
			<div
				className={cn('relative flex items-start', {
					'flex-row-reverse': isSender,
				})}>
				<Avatar user={message.sender} className='rounded-full' />
				<div
					className={cn('', {
						'mr-3': isSender,
						'ml-3': !isSender,
					})}>
					<div
						className={cn(
							'text-sm text-white  mt-1 py-1.5 px-3 rounded-lg rounded-2xl',
							{
								'rounded-tr-none bg-primary': isSender,
								'rounded-tl-none bg-border': !isSender,
							}
						)}>
						<p>{message.text}</p>
					</div>
					<span
						className={cn('text-xs text-gray-500 block mt-2', {
							'text-right': isSender,
							'text-left': !isSender,
						})}>
						{dayjs(message.createdAt).format('HH:mm')}
					</span>
				</div>
			</div>
		</div>
	);
}
