import { Router } from 'itty-router';
import { sendPushNotification } from '../utils';

const floodRouter = Router({ base: '/api/flood' });

floodRouter.post('/', async (request, env) => {
	const content = await request.json();
	const state = content.state as number;
	if (state !== 1) return Response.json({ message: 'No flood detected' });
	return sendPushNotification(env);
});

export default floodRouter;
