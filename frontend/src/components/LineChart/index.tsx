import { useSensors } from "@/features/useSensors";
import { timestampToHour } from "@/utils";
import { Line } from "react-chartjs-2";

export enum ChartType {
    INDOOR = "INDOOR",
    OUTDOOR = "OUTDOOR"
}

export const LineChart = ({ type }: { type: ChartType }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text:
                    type === ChartType.INDOOR
                        ? "Temperatura i wilgotność wewnątrz"
                        : "Temperatura na zewnątrz"
            }
        }
    };

    if (type === ChartType.INDOOR) {
        const { indoorTempAvgData } = useSensors();
        const labels =
            indoorTempAvgData &&
            indoorTempAvgData.map((item) => timestampToHour(item.timestamp));

        const data = {
            labels,
            datasets: [
                {
                    label: "Temperatura",
                    data:
                        indoorTempAvgData &&
                        indoorTempAvgData.map((item) => item.temperature),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)"
                },
                {
                    label: "Wilgotność",
                    data:
                        indoorTempAvgData &&
                        indoorTempAvgData.map((item) => item.humidity),
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.5)"
                }
            ]
        };

        return (
            <>{indoorTempAvgData && <Line data={data} options={options} />}</>
        );
    } else {
        const { outdoorTempAvgData } = useSensors();
        const labels =
            outdoorTempAvgData &&
            outdoorTempAvgData.map((item) => timestampToHour(item.timestamp));
        const data = {
            labels,
            datasets: [
                {
                    label: "Temperatura",
                    data:
                        outdoorTempAvgData &&
                        outdoorTempAvgData.map((item) => item.temperature),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)"
                }
            ]
        };

        return (
            <>{outdoorTempAvgData && <Line data={data} options={options} />}</>
        );
    }
};
