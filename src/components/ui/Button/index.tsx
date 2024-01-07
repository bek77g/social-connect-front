import { Loader } from '@/components/ui/Loader';
import { InputHTMLAttributes } from 'react';
import styles from './button.module.scss';

interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}

export function Button({ isLoading, children }: IButton) {
	return (
		<button className={styles.button} disabled={isLoading}>
			{isLoading ? <Loader /> : children}
		</button>
	);
}
