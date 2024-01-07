class FetchClient {
	private url: string;
	private defaultHeaders: Record<string, string>;
	private API_URL = process.env.API_URL as string;

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

	async put<T>(
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

	private async fetch(
		body: Record<string, any>,
		method: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
		isAuth: boolean
	): Promise<any> {
		const url = `${this.API_URL}/${path}`;
		const authorizationHeader = isAuth
			? { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
				console.error('Error fetching: ' + data);
				throw new Error('Error fetching: ' + JSON.stringify(data));
			}

			return data;
		} catch (error) {
			console.error('Error fetching: ' + error);
			throw error;
		}
	}
}

export const $fetch = new FetchClient();
