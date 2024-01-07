import siderbarLinks from '@/components/layout/Sidebar/siderbarLinks';
import { Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.scss';

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<Image src='/logo.svg' priority alt='ICO' width={40} height={40} />
			<ul>
				{siderbarLinks.map(({ icon: Icon, link }, idx) => (
					<li key={idx}>
						<Link href={link}>
							<Icon size={27} />
						</Link>
					</li>
				))}
			</ul>
			<Sun />
		</aside>
	);
}
