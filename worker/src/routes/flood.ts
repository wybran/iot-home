import { Router } from 'itty-router';
import { sendPushNotification } from '../utils';

const floodRouter = Router({ base: '/api/flood' });

floodRouter.post('/', async (request, env) => sendPushNotification(env));

export default floodRouter;