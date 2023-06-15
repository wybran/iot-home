export interface Env {
    DB: D1Database;
    AUTH_TOKEN: string;
}

export interface TempIndoor {
    temperature: number;
    humidity: number;
    timeStamp?: number;
}
export interface TempOutdoor {
    temperature: number;
    timeStamp?: number;
}