import { Router } from 'itty-router';
import tempIndoorRouter from './routes/tempIndoor';
import tempOutdoorRouter from './routes/tempOutdoor';
import waterFlowRouter from './routes/waterFlow';
import floodRouter from './routes/flood';

const router = Router({ base: '/api' });

router.post('*', async (request, env) => {
	const authHeader = await request.headers.get('Authorization');
	if (authHeader !== env.AUTH_TOKEN) return new Response('Unauthorized', { status: 401 });
});

router.all('/tempIndoor/*', tempIndoorRouter.handle);
router.all('/tempOutdoor/*', tempOutdoorRouter.handle);
router.all('/waterFlow/*', waterFlowRouter.handle);
router.all('/flood/*', floodRouter.handle);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
