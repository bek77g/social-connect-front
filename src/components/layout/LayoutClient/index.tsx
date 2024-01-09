import { Sidebar } from '@/components/layout/Sidebar';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import styles from './layoutClient.module.scss';

export default function LayoutClient({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<main className={styles.layout}>
				<Sidebar />
				<section>{children}</section>
			</main>
			<Toaster position='top-right' />
		</>
	);
}
