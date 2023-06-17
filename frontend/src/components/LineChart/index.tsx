import { Line } from "react-chartjs-2";
import { TempIndoor, TempOutdoor } from "@/features/useSensors/types";
import { timestampToHour } from "@/utils";

export enum ChartType {
    INDOOR = "INDOOR",
    OUTDOOR = "OUTDOOR"
}

interface LineChartProps {
    type: ChartType;
    data: TempIndoor[] | TempOutdoor[];
}

export const LineChart = ({ type, data }: LineChartProps) => {
    const labels = data.map((item) => timestampToHour(item.timestamp));

    const chartData = {
        labels,
        datasets: [
            {
                label: "Temperatura",
                data: data.map((item) => item.temperature),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
        ]
    };

    if (type === ChartType.INDOOR) {
        chartData.datasets.push({
            label: "Wilgotność",
            data: data.map((item) => (item as TempIndoor).humidity),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.5)"
        });
    }

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

    return (
        <div className="chart">
            <Line data={chartData} options={options} />
        </div>
    )
};
