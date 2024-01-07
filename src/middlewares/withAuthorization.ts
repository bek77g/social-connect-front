import { getToken } from 'next-auth/jwt';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';

export default function withAuthorization(middleware: NextMiddleware) {
	return async (request: NextRequest, next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		if (pathname.startsWith('/_next')) {
			return NextResponse.next();
		}
		if (!pathname.startsWith('/login') && !pathname.startsWith('/register')) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET,
			});
			if (!token) {
				const url = new URL(`/login`, request.url);
				url.searchParams.set('callbackUrl ', encodeURI(request.url));
				return NextResponse.redirect(url);
			}
		}
		return middleware(request, next);
	};
}
