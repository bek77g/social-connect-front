import { Sidebar } from '@/components/layout/Sidebar';
import type { PropsWithChildren } from 'react';
import styles from './layoutClient.module.scss';

export default function LayoutClient({ children }: PropsWithChildren<unknown>) {
	return (
		<main className={styles.layout}>
			<Sidebar />
			<section>{children}</section>
		</main>
	);
}
