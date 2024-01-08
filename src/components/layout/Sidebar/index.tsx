'use client';
import { MENU } from '@/components/layout/Sidebar/sidebar.data';
import useAuth from '@/hooks/useAuth';
import cn from 'clsx';
import { Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.scss';

export function Sidebar() {
	const pathname = usePathname();
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) return null;

	return (
		<aside className={styles.sidebar}>
			<Image src='/logo.svg' priority alt='ICO' width={40} height={40} />
			<ul>
				{MENU.map(({ icon: Icon, url }) => (
					<li
						key={url}
						className={cn({
							[styles.active]: pathname === url,
						})}>
						<Link href={url}>
							<Icon size={27} />
						</Link>
					</li>
				))}
			</ul>
			<Sun />
		</aside>
	);
}
