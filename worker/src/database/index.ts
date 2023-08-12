import { Env, TempIndoor, TempIndoorResponse, TempOutdoor, TempOutdoorResponse, WaterFlow } from '../types';
import { timestampToISO } from '../utils';

export const database = async (env: Env) => {
	const lastTempIndoor = async () => {
		const result = (await env.DB.prepare('SELECT * FROM TempIndoor ORDER BY Id DESC LIMIT 1').first()) as TempIndoor;
		const response: TempIndoorResponse = {
			temperature: result.temperature,
			humidity: result.humidity,
			timestamp: timestampToISO(result.timestamp),
		};
		return response;
	};
	const lastTempOutdoor = async () => {
		const result = (await env.DB.prepare('SELECT * FROM TempOutdoor ORDER BY Id DESC LIMIT 1').first()) as TempOutdoor;
		const response: TempOutdoorResponse = {
			temperature: result.temperature,
			timestamp: timestampToISO(result.timestamp),
		};
		return response;
	};

	const addTempIndoor = async (tempIndoor: TempIndoor) => {
		return await env.DB.prepare('INSERT INTO TempIndoor (temperature, humidity, timestamp) VALUES (?, ?, ?)')
			.bind(tempIndoor.temperature, tempIndoor.humidity, tempIndoor.timestamp)
			.run();
	};
	const addTempOutdoor = async (tempOutdoor: TempOutdoor) => {
		return await env.DB.prepare('INSERT INTO TempOutdoor (temperature, timestamp) VALUES (?, ?)')
			.bind(tempOutdoor.temperature, tempOutdoor.timestamp)
			.run();
	};
	const addWaterFlow = async (waterFlow: WaterFlow) => {
		return await env.DB.prepare('INSERT INTO Waterflow (count, timestamp) VALUES (?, ?)').bind(waterFlow.count, waterFlow.timestamp).run();
	};

	const last12HoursAvgTempIndoor = async () => {
		const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
		const query =
			"SELECT AVG(temperature) as temperature, AVG(humidity) as humidity, datetime(timestamp/1000, 'unixepoch') as timestamp FROM TempIndoor WHERE timestamp >= ? GROUP BY strftime('%Y-%m-%d %H', datetime(timestamp/1000, 'unixepoch', 'localtime')) ORDER BY timestamp ASC";
		const { results } = (await env.DB.prepare(query).bind(twelveHoursAgo).all()) as { results: TempIndoor[] };

		return results.map((entry) => {
			return {
				temperature: parseFloat(entry.temperature.toFixed(2)),
				humidity: parseFloat(entry.humidity.toFixed(2)),
				timestamp: timestampToISO(entry.timestamp),
			};
		});
	};
	const last12HoursAvgTempOutdoor = async () => {
		const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
		const query =
			"SELECT AVG(temperature) as temperature, datetime(timestamp/1000, 'unixepoch') as timestamp FROM TempOutdoor WHERE timestamp >= ? GROUP BY strftime('%Y-%m-%d %H', datetime(timestamp/1000, 'unixepoch', 'localtime')) ORDER BY timestamp ASC";
		const { results } = (await env.DB.prepare(query).bind(twelveHoursAgo).all()) as { results: TempOutdoor[] };

		return results.map((entry) => {
			return {
				temperature: parseFloat(entry.temperature.toFixed(2)),
				timestamp: timestampToISO(entry.timestamp),
			};
		});
	};

	const lastHourWaterFlowCounts = async () => {
		const oneHourAgo = Date.now() - 60 * 60 * 1000;
		const query =
			"SELECT count, datetime(timestamp/1000, 'unixepoch') as timestamp FROM Waterflow WHERE timestamp >= ? ORDER BY timestamp ASC";
		const { results } = (await env.DB.prepare(query).bind(oneHourAgo).all()) as { results: WaterFlow[] };

		return results.map((entry) => {
			return {
				count: entry.count,
				timestamp: timestampToISO(entry.timestamp)
			};
		});
	};

	const last12HoursAvgWaterFlowCounts = async () => {
		const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
		const query =
			"SELECT AVG(count) as count, datetime(timestamp/1000, 'unixepoch') as timestamp FROM Waterflow WHERE timestamp >= ? GROUP BY strftime('%Y-%m-%d %H', datetime(timestamp/1000, 'unixepoch', 'localtime')) ORDER BY timestamp ASC";
		const { results } = (await env.DB.prepare(query).bind(twelveHoursAgo).all()) as { results: WaterFlow[] };

		return results.map((entry) => {
			return {
				count: parseFloat(entry.count.toFixed(2)),
				timestamp: timestampToISO(entry.timestamp)
			};
		});
	};

	return {
		lastTempIndoor,
		lastTempOutdoor,
		addTempIndoor,
		addTempOutdoor,
		addWaterFlow,
		last12HoursAvgTempIndoor,
		last12HoursAvgTempOutdoor,
		lastHourWaterFlowCounts,
		last12HoursAvgWaterFlowCounts,
	};
};
