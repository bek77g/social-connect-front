'use client';
import { Avatar } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { LogOut } from 'lucide-react';

export function CurrentsUser() {
	const { logout } = useAuth();
	const { data: user } = useProfile();

	if (!user) return null;

	return (
		<div className='p-layout flex items-center justify-between'>
			<div className=' flex items-center gap-4'>
				<Avatar width={50} height={50} user={user} />
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
