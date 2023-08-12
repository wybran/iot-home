import { Line } from "react-chartjs-2";
import {
    HumData,
    TempData,
    TempIndoor,
    WaterFlow
} from "@/features/useSensors/types";
import { timestampToHour } from "@/utils";

export enum ChartType {
    TEMPERATURE,
    HUMIDITY,
    WATERFLOW
}
interface LineChartProps {
    title: string;
    data: TempData[] | HumData[] | WaterFlow[];
    type: ChartType;
}

export const LineChart = ({ title, data, type }: LineChartProps) => {
    const labels = data.map((item) => timestampToHour(item.timestamp));

    const tempDataSets = [
        {
            label: "Temperatura",
            data: data.map((item) => (item as TempData).temperature),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ];
    const humidityDataSets = [
        {
            label: "Wilgotność",
            data: data.map((item) => (item as TempIndoor).humidity),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.5)"
        }
    ];
    const waterflowDataSets = [
        {
            label: "Przepływ",
            data: data.map((item) => (item as WaterFlow).count),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)"
        }
    ];

    const chartData = {
        labels,
        datasets:
            type === ChartType.TEMPERATURE
                ? tempDataSets
                : type === ChartType.HUMIDITY
                ? humidityDataSets
                : waterflowDataSets
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: title
            }
        }
    };

    return (
        <div className="chart">
            <Line data={chartData} options={options} />
        </div>
    );
};
