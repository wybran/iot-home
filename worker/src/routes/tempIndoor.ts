import { Router } from 'itty-router';
import { database } from '../database';
import { TempIndoor } from '../types';

const tempIndoorRouter = Router({ base: '/api/tempIndoor'});

tempIndoorRouter.get('/', async (request, env) => {
	const { lastTempIndoor } = await database(env);
	const result = await lastTempIndoor();
	return Response.json(result);

});

tempIndoorRouter.get('/avg', async (request, env) => {
	const { last12HoursAvgTempIndoor } = await database(env);
	const result = await last12HoursAvgTempIndoor();
	return Response.json(result);
});

tempIndoorRouter.post('/', async (request, env) => {
	const content = (await request.json()) as TempIndoor;
	const { addTempIndoor } = await database(env);
	const info = await addTempIndoor({ ...content, timestamp: Date.now() });
	return Response.json(info);
});

export default tempIndoorRouter;