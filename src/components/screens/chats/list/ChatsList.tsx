import Field from '@/components/ui/Field';
import { Search } from 'lucide-react';

export function ChatsList() {
	return (
		<div className='p-layout'>
			<Field placeholder='Search chat' Icon={Search} />
		</div>
	);
}
