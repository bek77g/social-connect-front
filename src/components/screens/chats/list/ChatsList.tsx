import Field from '@/components/ui/Field';
import { Search } from 'lucide-react';

export function ChatsList() {
	return (
		<>
			<div className='border-t border-b border-border p-layout'>
				<Field placeholder='Search chat' Icon={Search} />
				<ul></ul>
			</div>
		</>
	);
}
