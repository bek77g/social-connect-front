import { IAvatar } from '@/components/ui/Avatar/avatar.types';
import { getImageUrl } from '@/configs/get-image-url.config';
import cn from 'clsx';
import Image from 'next/image';

export function Avatar({
	user,
	width = 50,
	height = 50,
	className,
	...restProps
}: IAvatar) {
	const hasAvatar = !!user.avatar?.url;
	const usernameInitial = user?.username[0].toUpperCase() ?? '';
	console.log(user);

	return (
		<>
			{hasAvatar ? (
				<Image
					className={cn('rounded-lg', className)}
					width={width}
					height={height}
					src={getImageUrl(user.avatar?.url) ?? '/no-avatar.png'}
					alt={user?.email ?? 'USER'}
				/>
			) : (
				<div
					style={{ width, height, minWidth: width }}
					className={cn(
						`rounded-lg grid place-content-center bg-border text-white select-none`,
						className
					)}>
					{usernameInitial}
				</div>
			)}
		</>
	);
}
