import { Router } from 'itty-router';
import { database } from '../database';
import { TempOutdoor } from '../types';

const tempOutdoorRouter = Router({ base: '/api/tempOutdoor'});

tempOutdoorRouter.get('/', async (request, env) => {
	const { lastTempOutdoor } = await database(env);
	const result = await lastTempOutdoor();
	return Response.json(result);
});

tempOutdoorRouter.get('/avg', async (request, env) => {
	const { last12HoursAvgTempOutdoor } = await database(env);
	const result = await last12HoursAvgTempOutdoor();
	return Response.json(result);
});

tempOutdoorRouter.post('/', async (request, env) => {
	const content = (await request.json()) as TempOutdoor;
	const { addTempOutdoor } = await database(env);
	const info = await addTempOutdoor({ ...content, timestamp: Date.now() });
	return Response.json(info);
});

export default tempOutdoorRouter;