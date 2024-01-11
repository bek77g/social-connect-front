import { $fetch } from '@/$api/api.fetch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = '/user-relationships';

export const useUserRelations = (userId: number) => {
	const queryClient = useQueryClient();

	const getRelations = async () => {
		const data = await $fetch.get(
			`${API_BASE_URL}?populate[friendshipRelation][populate][avatar]=*&filters[friendshipRelation][id][$eq]=1`,
			{},
			true
		);
		return await data;
	};

	const createRelation = async newRelation => {
		const response = await $fetch.post(API_BASE_URL, newRelation, {}, true);
		return await data;
	};

	const deleteRelation = async relationId => {
		const response = await $fetch.delete(
			`${API_BASE_URL}/${relationId}`,
			{},
			true
		);
		return await data;
	};

	const {
		data: userRelations,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userRelations'],
		queryFn: getRelations,
		select: data =>
			data?.data?.reduce(
				(acc, rec) => [
					...acc,
					...rec?.friendshipRelation.filter(r => r.id !== userId),
				],
				[]
			),
	});

	const createMutation = useMutation({
		mutationKey: 'userRelations',
		mutationFn: createRelation,
		onSuccess: () => {
			queryClient.invalidateQueries('userRelations');
		},
	});

	const deleteMutation = useMutation({
		mutationKey: 'userRelations',
		mutationFn: deleteRelation,
		onSuccess: () => {
			queryClient.invalidateQueries('userRelations');
		},
	});

	return {
		userRelations,
		isLoading,
		isError,
		createRelation: createMutation.mutate,
		deleteRelation: deleteMutation.mutate,
	};
};
