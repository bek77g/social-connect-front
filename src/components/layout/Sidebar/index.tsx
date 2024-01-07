import siderbarLinks from '@/components/layout/Sidebar/siderbarLinks';
import { Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.scss';

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<Image src='/logo.svg' alt='ICO' width={50} height={50} />
			<ul>
				{siderbarLinks.map(({ icon: Icon, link }, idx) => (
					<li key={idx}>
						<Link href={link}>
							<Icon />
						</Link>
					</li>
				))}
			</ul>
			<Sun />
		</aside>
	);
}
