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

	return (
		<div
			style={{ width, height, minWidth: width }}
			className={cn(
				`rounded-lg grid place-content-center bg-[#ede7f6] text-white select-none overflow-hidden text-2xl`,
				className
			)}>
			{hasAvatar ? (
				<Image
					className='w-full h-full'
					width={width}
					height={height}
					src={getImageUrl(user.avatar?.url) ?? '/no-avatar.png'}
					alt={user?.email ?? 'USER'}
				/>
			) : (
				usernameInitial
			)}
		</div>
	);
}
