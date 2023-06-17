import { useQuery } from "@tanstack/react-query";
import { TempIndoor, TempOutdoor} from "./types";
import { API_URL } from "../../../config";

export const useSensors = () => {
    const {
        data: indoorTempData,
        isError: indoorTempIsError,
        isLoading: indoorTempIsLoading
    } = useQuery<TempIndoor>(
        ["indoorTemp"],
        async () => await (await fetch(`${API_URL}/tempIndoor`)).json()
    );
    const {
        data: outdoorTempData,
        isError: outdoorTempIsError,
        isLoading: outdoorTempIsLoading
    } = useQuery<TempOutdoor>(
        ["outdoorTemp"],
        async () => await (await fetch(`${API_URL}/tempOutdoor`)).json()
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

    return {
        indoorTempData,
        indoorTempIsError,
        indoorTempIsLoading,
        outdoorTempData,
        outdoorTempIsError,
        outdoorTempIsLoading,
        indoorTempAvgData: indoorTempAvgData ?? [],
        indoorTempAvgIsError,
        indoorTempAvgIsLoading,
        outdoorTempAvgData: outdoorTempAvgData ?? [],
        outdoorTempAvgIsError,
        outdoorTempAvgIsLoading
    };
};