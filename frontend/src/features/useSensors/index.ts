import { useQuery } from "@tanstack/react-query";
import { TempIndoor, TempOutdoor, WaterFlow} from "./types";
import { API_URL } from "../../../config";

export const useSensors = () => {
    const {
        data: indoorTempData,
        isError: indoorTempIsError,
        isLoading: indoorTempIsLoading
    } = useQuery<TempIndoor>(
        ["indoorTemp"],
        async () => await (await fetch(`${API_URL}/tempIndoor`)).json(), {
            refetchInterval: 10000
        }
    );
    const {
        data: outdoorTempData,
        isError: outdoorTempIsError,
        isLoading: outdoorTempIsLoading
    } = useQuery<TempOutdoor>(
        ["outdoorTemp"],
        async () => await (await fetch(`${API_URL}/tempOutdoor`)).json(), {
            refetchInterval: 10000
        }
    );
    const {
        data: lastHourWaterFlowData,
        isError: lastHourWaterFlowDataIsError,
        isLoading: lastHourWaterFlowDataIsLoading
    } = useQuery<WaterFlow[]>(
        ["lastHourWaterFlow"],
        async () => await (await fetch(`${API_URL}/waterFlow`)).json(), {
            refetchInterval: 10000
        }
    );
    const {
        data: indoorTempAvgData,
        isError: indoorTempAvgIsError,
        isLoading: indoorTempAvgIsLoading
    } = useQuery<TempIndoor[]>(
        ["indoorTempAvg"],
        async () => await (await fetch(`${API_URL}/tempIndoor/avg`)).json()
    );
    const {
        data: outdoorTempAvgData,
        isError: outdoorTempAvgIsError,
        isLoading: outdoorTempAvgIsLoading
    } = useQuery<TempOutdoor[]>(
        ["outdoorTempAvg"],
        async () => await (await fetch(`${API_URL}/tempOutdoor/avg`)).json()
    );
    const {
        data: waterFlowAvgData,
        isError: waterFlowAvgIsError,
        isLoading: waterFlowAvgIsLoading
    } = useQuery<WaterFlow[]>(
        ["waterFlowAvg"],
        async () => await (await fetch(`${API_URL}/waterFlow/avg`)).json()
    );

    return {
        indoorTempData,
        indoorTempIsError,
        indoorTempIsLoading,
        outdoorTempData,
        outdoorTempIsError,
        outdoorTempIsLoading,
        lastHourWaterFlowData: lastHourWaterFlowData ?? [],
        lastHourWaterFlowDataIsError,
        lastHourWaterFlowDataIsLoading,
        indoorTempAvgData: indoorTempAvgData ?? [],
        indoorTempAvgIsError,
        indoorTempAvgIsLoading,
        outdoorTempAvgData: outdoorTempAvgData ?? [],
        outdoorTempAvgIsError,
        outdoorTempAvgIsLoading,
        waterFlowAvgData: waterFlowAvgData ?? [],
        waterFlowAvgIsError,
        waterFlowAvgIsLoading
    };
};