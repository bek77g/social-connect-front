import { cookies } from '@/$api/api.cookie';

class FetchClient {
	private url: string;
	private defaultHeaders: Record<string, string>;
	private API_URL = process.env.NEXT_PUBLIC_API_URL as string;

	constructor(url: string, defaultHeaders: Record<string, string> = {}) {
		this.url = this.API_URL + url;
		this.defaultHeaders = defaultHeaders;
	}

	async get<T>(
		path: string,
		headers?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.fetch<T>(path, 'GET', undefined, headers, isAuth);
	}

	async post<T>(
		path: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.fetch<T>(path, 'POST', body, headers, isAuth);
	}

	async put<T>(
		path: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.fetch<T>(path, 'PUT', body, headers, isAuth);
	}

	async delete<T>(
		path: string,
		headers?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.fetch<T>(path, 'DELETE', undefined, headers, isAuth);
	}

	async patch<T>(
		path: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
		isAuth: boolean = false
	): Promise<T> {
		return this.fetch<T>(path, 'PATCH', body, headers, isAuth);
	}

	private async fetch<T>(
		path: string,
		method: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
		isAuth: boolean
	): Promise<T> {
		const url = `${this.API_URL}${path}`;
		console.log(url);

		const authorizationHeader = isAuth
			? { Authorization: `Bearer ${cookies.get('token')}` }
			: {};

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					...this.defaultHeaders,
					...authorizationHeader,
					...headers,
				},
				body: body ? JSON.stringify(body) : null,
			});

			const data = await response.json();

			if (!response.ok) {
				throw data?.error;
			}

			return data;
		} catch (error) {
			console.log(JSON.stringify(error));
			throw error;
		}
	}
}

export const $fetch = new FetchClient();
