export interface TempIndoor {
    temperature: number;
    humidity: number;
    timestamp: string;
}
export interface TempOutdoor {
    temperature: number;
    timestamp: string;
}
export interface TempData {
    temperature: number;
    timestamp: string;
}
export interface HumData {
    humidity: number;
    timestamp: string;
}
export interface WaterFlow {
    count: number;
    timestamp: string;
}