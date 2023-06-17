import apiRouter from './router';
import { Env } from './types';
import { addCorsHeaders } from './utils';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith('/api/')) {
			const response = await apiRouter.handle(request, env, ctx);
			return addCorsHeaders(response);
		}

		return Response.redirect('https://iot.wybran.dev');
	}
};