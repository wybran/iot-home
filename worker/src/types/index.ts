export interface Env {
    DB: D1Database;
    AUTH_TOKEN: string;
    OneSignalAPIKey: string;
    OneSignalAppId: string;
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

export interface WaterFlow {
    count: number;
    timestamp: number;
}
export interface WaterFlowResponse {
    count: number;
    timestamp: string;
}