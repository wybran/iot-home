import apiRouter from './router';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith('/api/')) {
			return apiRouter.handle(request, env, ctx);
		}

		return Response.redirect('https://wybran.dev');
	}
};
