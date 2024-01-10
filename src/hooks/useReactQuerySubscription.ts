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

		socket.current.on('invalidate', (data: WebSocketEvent) => {
			queryClient.invalidateQueries();
		});

		socket.current.on('update', (data: WebSocketEvent) => {
			queryClient.setQueriesData(
				{ queryKey: [data.entity] },
				(oldData: UpdateData) => {
					const update = entity => {
						entity.id === data.id ? { ...entity, ...data.payload } : entity;
					};
					return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
				}
			);
		});

		// socket.current.on('message', (data: WebSocketEvent) => {
		// 	console.log('Received message from server: ' + JSON.stringify(data));
		// });

		return () => {
			socket.current?.close();
		};
	}, [queryClient]);

	return input => {};
}
