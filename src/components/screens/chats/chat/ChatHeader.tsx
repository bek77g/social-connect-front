import { Avatar } from '@/components/ui/Avatar';
import { IUser } from '@/types/user.types';
import { Search } from 'lucide-react';

export function ChatHeader({ participant }: { participant: IUser }) {
	return (
		<div className='p-layout flex items-center justify-between'>
			<div className=' flex items-center gap-4'>
				<Avatar width={50} height={50} user={participant} />
				<div className='text-sm'>
					<p>{participant?.username}</p>
					<p className='opacity-30'>2 members</p>
				</div>
			</div>
			<button className='text-[#7c7275] hover:text-white transition-colors linear'>
				<Search />
			</button>
		</div>
	);
}
