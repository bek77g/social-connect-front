import { $fetch } from '@/$api/api.fetch';
import { IUser } from '@/types/user.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const API_BASE_URL = '/user-relationships';

interface IUserRelation {
	friendshipRelation: IUser;
}

export const useUserRelations = () => {
	const { data: session } = useSession();
	const userId = session?.user.id;
	const queryClient = useQueryClient();

	const getRelations = async () => {
		const data = await $fetch.get<IUserRelation[]>(
			`${API_BASE_URL}?populate[friendshipRelation][populate][avatar]=*&filters[friendshipRelation][id][$eq]=${userId}`,
			{},
			true
		);
		return await data;
	};

	const createRelation = async ({ relatedId, relatingId }) => {
		const data = await $fetch.post(
			API_BASE_URL,
			{ data: { friendshipRelation: [relatedId, relatingId] } },
			{},
			true
		);
		return await data;
	};

	const deleteRelation = async relationId => {
		const data = await $fetch.delete(`${API_BASE_URL}/${relationId}`, {}, true);
		return await data;
	};

	const {
		data: userRelations,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userRelations', userId],
		queryFn: getRelations,
		select: data => data?.data,
	});

	const createMutation = useMutation({
		mutationKey: ['userRelations', userId],
		mutationFn: createRelation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userRelations', userId] });
		},
	});

	const deleteMutation = useMutation({
		mutationKey: ['userRelations', userId],
		mutationFn: deleteRelation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userRelations', userId] });
		},
	});

	const getCurrentRelation = (id: number) =>
		userRelations?.find(r => r.friendshipRelation.some(u => u.id === id));

	return {
		userRelations,
		isLoading,
		isError,
		createRelation: createMutation.mutate,
		deleteRelation: deleteMutation.mutate,
		getCurrentRelation,
	};
};
