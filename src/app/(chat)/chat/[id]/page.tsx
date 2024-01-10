import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Chat',
	...NO_INDEX_PAGE,
};

export default function ChatPage() {
	return <p className='p-layout'>Здесь будет чат</p>;
}
