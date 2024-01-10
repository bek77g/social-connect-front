import { $fetch } from '@/$api/api.fetch';
import Field from '@/components/ui/Field';
import useAuth from '@/hooks/useAuth';
import { useReactQuerySubscription } from '@/hooks/useReactQuerySubscription';
import { useMutation } from '@tanstack/react-query';
import { ArrowRightToLine, SendHorizonal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function MessageField() {
	const [message, setMessage] = useState('');
	const { user } = useAuth();
	const send = useReactQuerySubscription();
	const { id } = useParams();

	const { mutate } = useMutation({
		mutationKey: ['updateChat', id],
		mutationFn: () =>
			$fetch.post(
				'/messages',
				{ data: { text: message, sender: user?.id, chat: id } },
				{},
				true
			),
		onSuccess() {
			setMessage('');
			send({
				operation: 'update',
				entity: 'chat',
				id: id.toString(),
			});
		},
	});

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!message) return;
		console.log('Sending message');

		mutate();
	};

	return (
		<form
			onSubmit={onSubmit}
			className='border-t border-border p-layout flex items-center justify-between gap-5'>
			<Field
				placeholder='Write a message...'
				value={message}
				onChange={({ target }) => setMessage(target.value)}
				Icon={ArrowRightToLine}
				className='w-full'
			/>
			<button
				type='submit'
				disabled={!message}
				className='hover:text-primary transition-colors cursor-pointer'>
				<SendHorizonal />
			</button>
		</form>
	);
}
