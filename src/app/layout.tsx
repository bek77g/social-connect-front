import LayoutClient from '@/components/layout/LayoutClient';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { Viewport } from 'next/dist/lib/metadata/types/metadata-interface';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Social Connect',
	description: 'Social Connect created by Beknur',
};

export const viewport: Viewport = {
	themeColor: '#0e0b18',
	colorScheme: 'dark',
	icons: '/logo.svg',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Providers>
			<html lang='en'>
				<body className={inter.className}>
					<LayoutClient>{children}</LayoutClient>
				</body>
			</html>
		</Providers>
	);
}
