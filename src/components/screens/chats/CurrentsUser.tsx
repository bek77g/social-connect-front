'use client';
import { getImageUrl } from '@/configs/get-image-url.config';
import useAuth from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export function CurrentsUser() {
	const { user, logout } = useAuth();

	if (!user) return null;

	return (
		<div className='p-layout flex items-center justify-between'>
			<div className=' flex items-center gap-4'>
				<Image
					className='rounded-lg'
					width={50}
					height={50}
					src={getImageUrl(user.avatar?.url) ?? '/no-avatar.png'}
					alt={user?.email ?? 'USER'}
				/>
				<div className='text-sm'>
					<p>{user?.username}</p>
					<p className='opacity-30'>General user</p>
				</div>
			</div>
			<button
				onClick={logout}
				className='text-[#7c7275] hover:text-white transition-colors linear'>
				<LogOut />
			</button>
		</div>
	);
}
