export const addCorsHeaders = (response: Response): Response => {
	const headers = new Headers(response.headers);

	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('access-control-expose-headers', '*');
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
}