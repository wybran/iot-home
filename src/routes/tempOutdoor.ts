import { Router } from 'itty-router';
import { database } from '../database';
import { TempOutdoor } from '../types';

const tempOutdoorRouter = Router({ base: '/api/tempOutdoor'});

tempOutdoorRouter.get('/', async (request, env) => {
	const { tempOutdoor } = await database(env);
	return Response.json(tempOutdoor);
});

tempOutdoorRouter.post('/', async (request, env) => {
	const content = (await request.json()) as TempOutdoor;
	console.log(content);
	const { addTempOutdoor } = await database(env);
	const info = await addTempOutdoor({ ...content, timeStamp: Date.now() });
	return Response.json(info);
});

export default tempOutdoorRouter;