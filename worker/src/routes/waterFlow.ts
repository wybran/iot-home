import { Router } from 'itty-router';
import { database } from '../database';
import { WaterFlow } from '../types';

const waterFlowRouter = Router({ base: '/api/waterFlow' });

waterFlowRouter.get('/', async (request, env) => {
	const { lastHourWaterFlowCounts } = await database(env);
	const result = await lastHourWaterFlowCounts();
	return Response.json(result);
});

waterFlowRouter.get('/avg', async (request, env) => {
	const { last12HoursAvgWaterFlowCounts } = await database(env);
	const result = await last12HoursAvgWaterFlowCounts();
	return Response.json(result);
});

waterFlowRouter.post('/', async (request, env) => {
	const content = (await request.json()) as WaterFlow;
	const count = content.count;
	console.log(`Waterflow count: ${count}`);
	if (count == 0) return Response.json({ message: 'No waterflow detected' });

	const { addWaterFlow } = await database(env);
	const info = await addWaterFlow({ ...content, timestamp: Date.now() });
	return Response.json(info);
});

export default waterFlowRouter;
