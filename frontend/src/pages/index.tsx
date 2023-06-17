import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { ChartType, LineChart } from "@/components/LineChart";
import { useSensors } from "@/features/useSensors";
import { timestampToMoment } from "@/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Home() {
    const {
        indoorTempData,
        outdoorTempData,
        indoorTempAvgData,
        outdoorTempAvgData
    } = useSensors();

    return (
        <>
            <main>
                <div style={{ textAlign: "center" }}>
                    <h1>Ostatni pomiar:</h1>
                    {indoorTempData && (
                        <h3>
                            W środku: {indoorTempData.temperature}°C,{" "}
                            {indoorTempData.humidity}% wilgotności
                        </h3>
                    )}
                    {outdoorTempData && (
                        <h3>Na zewnątrz: {outdoorTempData.temperature}°C</h3>
                    )}
                    <h5>
                        {outdoorTempData &&
                            timestampToMoment(outdoorTempData?.timestamp)}
                    </h5>
                </div>

                <div className="container">
                    {indoorTempAvgData && (
                        <LineChart
                            type={ChartType.INDOOR}
                            data={indoorTempAvgData}
                        />
                    )}
                    {outdoorTempAvgData && (
                        <LineChart
                            type={ChartType.OUTDOOR}
                            data={outdoorTempAvgData}
                        />
                    )}
                </div>
            </main>
        </>
    );
}
