import { FriendsList } from '@/components/screens/friends/list/FriendsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Friends',
};

export default function FriendsPage() {
	return <FriendsList />;
}
