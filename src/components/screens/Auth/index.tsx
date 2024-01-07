'use client';
import { IAuthFormState } from '@/components/screens/Auth/auth.types';
import { Button } from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import { AtSign, KeyRound, User2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/dist/client/components/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IAuth {
	type?: 'Login' | 'Register';
}

export function Auth({ type }: IAuth) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { register, handleSubmit } = useForm<IAuthFormState>({
		model: 'onChange',
	});

	const onSubmit: SubmitHandler<IAuthFormState> = async data => {
		setIsLoading(true);
		const response = await signIn('credentials', {
			redirect: false,
			callbackUrl: '/',
			...data,
		});
		if (response?.error) {
			toast.error(response.error);
			setIsLoading(false);
			return;
		}
		router.push('/');
		setIsLoading(false);
	};

	return (
		<div className='flex w-screen h-full'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='m-auto block max-w-lg w-96 border border-border p-layout'>
				<h1 className='text-center mb-10'>{type}</h1>
				{type === 'Register' && (
					<Field
						{...register('username', {
							required: true,
						})}
						placeholder='Enter username'
						type='text'
						Icon={User2}
						className='mb-6'
					/>
				)}
				<Field
					{...register('email', {
						required: true,
					})}
					placeholder='Enter email'
					type='email'
					Icon={AtSign}
					className='mb-6'
				/>
				<Field
					{...register('password', {
						required: true,
						minLength: {
							value: 6,
							message: 'Min length 6 symbols!',
						},
					})}
					placeholder='Enter password'
					type='password'
					Icon={KeyRound}
					className='mb-12'
				/>
				<div className='text-center'>
					<Button isLoading={isLoading} disabled={isLoading} type='submit'>
						{type}
					</Button>
				</div>
				<Link href={type === 'Login' ? '/register' : '/login'}>
					{type === 'Login' ? 'Регистрация' : 'Вход'}
				</Link>
			</form>
		</div>
	);
}
