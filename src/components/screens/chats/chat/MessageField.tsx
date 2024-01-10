import Field from '@/components/ui/Field';
import { ArrowRightToLine, SendHorizonal } from 'lucide-react';
import { useState } from 'react';

interface IMessageField {
	sendMessage: (message: string) => Promise<void>;
}

export function MessageField({ sendMessage }: IMessageField) {
	const [message, setMessage] = useState('');

	const onSubmit = () => {
		message && sendMessage(message);
	};

	return (
		<div className='border-t border-border p-layout flex items-center justify-between gap-5'>
			<Field
				placeholder='Write a message...'
				value={message}
				onChange={({ target }) => setMessage(target.value)}
				Icon={ArrowRightToLine}
				className='w-full'
			/>
			<button
				onClick={() => {}}
				disabled={!message}
				className='hover:text-primary transition-colors cursor-pointer'>
				<SendHorizonal />
			</button>
		</div>
	);
}
