import { Router } from 'itty-router';

const router = Router();

router.get('/api/:device', () => new Response('Todo'));

router.post('*', async (request, env) => {
	const authHeader = await request.headers.get('Authorization');
	if (authHeader !== env.AUTH_TOKEN)
		return new Response('Unauthorized', { status: 401 });
});

router.post('/api/:device', async (request) => {
	const content = await request.json();
	console.log(request.params.device);
	console.log(content);
	return new Response(JSON.stringify(content));
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
