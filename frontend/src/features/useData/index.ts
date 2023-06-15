import { useQuery } from "@tanstack/react-query";
import config from "../../../config.json";
import { TempIndoor } from "./types";

export const useData = () => {
    const {
        data: tempIndoorData,
        isError: tempIndoorIsError,
        isLoading: tempIndoorIsLoading
    } = useQuery<TempIndoor[]>(
        ["tempIndoor"],
        async () => await (await fetch(`${config.API_URL}/tempIndoor`)).json()
    );
    return {
        tempIndoorData: tempIndoorData ?? [],
        tempIndoorIsError,
        tempIndoorIsLoading
    };
};