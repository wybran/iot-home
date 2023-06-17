export interface Env {
    DB: D1Database;
    AUTH_TOKEN: string;
}

export interface TempIndoor {
    temperature: number;
    humidity: number;
    timestamp: number;
}
export interface TempIndoorResponse {
    temperature: number;
    humidity: number;
    timestamp: string;
}

export interface TempOutdoor {
    temperature: number;
    timestamp: number;
}
export interface TempOutdoorResponse {
    temperature: number;
    timestamp: string;
}