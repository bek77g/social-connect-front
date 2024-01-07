import { Button } from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import { AtSign, KeyRound } from 'lucide-react';

interface IAuth {
	type?: 'Login' | 'Legister';
}

export function Auth({ type }: IAuth) {
	return (
		<div className='flex w-screen h-full'>
			<form className='m-auto block max-w-lg w-96 border border-border p-layout'>
				<h1 className='text-center mb-10'>{type}</h1>
				<Field
					placeholder='Enter email'
					type='email'
					Icon={AtSign}
					className='mb-6'
				/>
				<Field
					placeholder='Enter password'
					type='password'
					Icon={KeyRound}
					className='mb-12'
				/>
				<div className='text-center'>
					<Button>{type}</Button>
				</div>
			</form>
		</div>
	);
}
