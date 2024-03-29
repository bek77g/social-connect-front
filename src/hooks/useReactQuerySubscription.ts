import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

interface WebSocketEvent {
	operation: 'invalidate' | 'update';
	entity: string;
	id?: string;
	payload: Record<string, unknown>;
}

interface UpdateData {
	id: string;
	[key: string]: any;
}

export function useReactQuerySubscription() {
	const queryClient = useQueryClient();

	const socket = useRef<Socket>();

	useEffect(() => {
		socket.current = io(process.env.NEXT_PUBLIC_BACK_URL as string);

		socket.current.on('connect', () => {
			console.log('Connected to socket.io server');
		});

		socket.current.on('server-message', (data: WebSocketEvent) => {
			console.log('Server message: ' + JSON.stringify(data));

			queryClient.invalidateQueries({
				queryKey: [data.entity, data.id].filter(Boolean),
			});
		});

		socket.current.on('update', (data: WebSocketEvent) => {
			queryClient.setQueriesData<UpdateData[] | UpdateData | undefined>(
				{ queryKey: ['update', data.entity, data.id] },
				oldData => {
					const update = (entity: UpdateData) => {
						entity.id === data.id ? { ...entity, ...data.payload } : entity;
					};
					return Array.isArray(oldData)
						? oldData.map(update)
						: update(oldData as UpdateData);
				}
			);
		});

		return () => {
			socket.current?.disconnect();
		};
	}, [queryClient]);

	return (input: WebSocketEvent) => {
		socket.current?.emit('client-message', input);
	};
}
