import { Env, TempIndoor, TempOutdoor } from '../types';

export const database = async (env: Env) => {
	const { results: tempIndoor } = await env.DB.prepare('SELECT * FROM TempIndoor').all();
	const { results: tempOutdoor } = await env.DB.prepare('SELECT * FROM TempOutdoor').all();

	const addTempIndoor = async (tempIndoor: TempIndoor) => {
		return await env.DB.prepare('INSERT INTO TempIndoor (temperature, humidity, timeStamp) VALUES (?, ?, ?)')
			.bind(tempIndoor.temperature, tempIndoor.humidity, tempIndoor.timeStamp)
			.run();
	};

    const addTempOutdoor = async (tempOutdoor: TempOutdoor) => {
        return await env.DB.prepare('INSERT INTO TempOutdoor (temperature, timeStamp) VALUES (?, ?)')
            .bind(tempOutdoor.temperature, tempOutdoor.timeStamp)
            .run();
    };

	return {
		tempIndoor,
        tempOutdoor,
        addTempIndoor,
        addTempOutdoor
	};
};
