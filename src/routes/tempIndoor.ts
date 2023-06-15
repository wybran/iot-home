import { Router } from 'itty-router';
import { database } from '../database';
import { TempIndoor } from '../types';

const tempIndoorRouter = Router();

tempIndoorRouter.get('/api/tempIndoor', async (request, env) => {
	const { tempIndoor } = await database(env);
	return Response.json(tempIndoor);
});

tempIndoorRouter.post('/api/tempIndoor', async (request, env) => {
	const content = (await request.json()) as TempIndoor;
	console.log(content);
	const { addTempIndoor } = await database(env);
	const info = await addTempIndoor({ ...content, timeStamp: Date.now() });
	return Response.json(info);
});

export default tempIndoorRouter;