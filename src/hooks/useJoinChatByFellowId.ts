import { $fetch } from '@/$api/api.fetch';
import { useProfile } from '@/hooks/useProfile';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
useSession;
export const useJoinChatByFellowId = () => {
	const router = useRouter();
	const { data: authUser } = useProfile();
	const userId = authUser?.id;

	const joinChat = async (fellowId: number) => {
		const currentChat = authUser?.chats.find(chat => {
			let hasAuthUser = chat.participants.some(u => u.id === userId);
			let hasFellowUser = chat.participants.some(u => u.id === fellowId);
			return hasAuthUser && hasFellowUser;
		});
		if (currentChat) {
			return currentChat;
		} else {
			const response = await $fetch.post(
				'/chats',
				{ data: { participants: [userId, fellowId] } },
				{},
				true
			);
			const data = await response;
			return await data.data;
		}
	};

	const joinChatMutation = useMutation({
		mutationKey: ['chats', 'profile'],
		mutationFn: joinChat,
		onSuccess: res => router.push(`/chat/${res.id}`),
	});

	return { ...joinChatMutation, joinChat: joinChatMutation.mutate };
};
