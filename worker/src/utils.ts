import { Env } from './types';

export const addCorsHeaders = (response: Response): Response => {
	const headers = new Headers(response.headers);

	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('access-control-expose-headers', '*');
	headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
	headers.set('Cache-Control', 'max-age=10');
	headers.set('Content-Type', 'application/json');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: headers,
	});
};

export const timestampToISO = (timestamp: number): string => {
	return new Date(timestamp).toISOString();
};

export const sendPushNotification = async (env: Env): Promise<Response> => {
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			Authorization: `Basic ${env.OneSignalAPIKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			included_segments: ['Subscribed Users'],
			headings: { en: 'Flood detect! 💦', pl: 'Wykryto zalanie! 💦' },
			contents: { en: 'Flood sensor detected water!', pl: 'Czujnik zalania wykrył wodę!' },
			app_id: env.OneSignalAppId,
			priority: 10
		}),
	};

	const notification = await fetch('https://onesignal.com/api/v1/notifications', options);
	const response = await notification.json();
	return Response.json(response);
};
