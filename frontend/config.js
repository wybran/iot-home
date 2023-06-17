const env = process.env.NODE_ENV
export const API_URL = env === 'development'
                             ? 'http://localhost:8787/api'
                             : 'https:/iot-home-wybran.wybran.workers.dev/api'