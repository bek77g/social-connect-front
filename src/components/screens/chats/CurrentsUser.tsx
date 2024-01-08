'use client';
import useAuth from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export function CurrentsUser() {
	const { user, logout } = useAuth();

	return (
		<div className='p-layout flex items-center justify-between'>
			<div className=' flex items-center gap-4'>
				<Image
					width={50}
					height={50}
					src={user?.avatar ?? '/no-avatar.png'}
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
