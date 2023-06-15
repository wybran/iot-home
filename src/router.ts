import { Router } from 'itty-router';
import { TempIndoor, TempOutdoor } from './types';
import { database } from './database';

const router = Router();

//router.get('/api/:device', () => new Response('Todo'));

router.post('*', async (request, env) => {
	const authHeader = await request.headers.get('Authorization');
	if (authHeader !== env.AUTH_TOKEN) return new Response('Unauthorized', { status: 401 });
});

router.post('/api/:device', async (request, env) => {
	switch (request.params.device) {
		case 'tempIndoor': {
			const content = (await request.json()) as TempIndoor;
			console.log(content);
			const { addTempIndoor } = await database(env);
			const info = await addTempIndoor({ ...content, timeStamp: Date.now() });
			return Response.json(info);
		}
		case 'tempOutdoor': {
			const content = (await request.json()) as TempOutdoor;
			console.log(content);
			const { addTempOutdoor } = await database(env);
			const info = await addTempOutdoor({ ...content, timeStamp: Date.now() });
			return Response.json(info);
		}
		default:
			return new Response('Not Found.', { status: 404 });
	}
});

router.get('/api/tempIndoor', async (request, env) => {
	const { tempIndoor } = await database(env);
	return Response.json(tempIndoor);
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
