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
        outdoorTempAvgData,
        lastHourWaterFlowData,
        waterFlowAvgData
    } = useSensors();

    return (
        <>
            <main>
                <div style={{ textAlign: "center" }}>
                    <h1>Ostatni pomiar:</h1>
                    {indoorTempData && (
                        <h3>
                            🏠 W środku: {indoorTempData.temperature}°C,{" "}
                            {indoorTempData.humidity}% wilgotności
                        </h3>
                    )}
                    {outdoorTempData && (
                        <h3>🌳 Na zewnątrz: {outdoorTempData.temperature}°C</h3>
                    )}
                    <h5>
                        {outdoorTempData &&
                            timestampToMoment(outdoorTempData?.timestamp)}
                    </h5>
                </div>

                <div className="container">
                    {outdoorTempAvgData && (
                        <LineChart
                            title="🌳 Temperatura na zewnątrz"
                            type={ChartType.TEMPERATURE}
                            data={outdoorTempAvgData}
                        />
                    )}
                    {indoorTempAvgData && (
                        <>
                            <LineChart
                                title="🏠 Temperatura wewnątrz"
                                type={ChartType.TEMPERATURE}
                                data={indoorTempAvgData}
                            />
                            <LineChart
                                title="🏠 Wilgotność wewnątrz"
                                type={ChartType.HUMIDITY}
                                data={indoorTempAvgData}
                            />
                        </>
                    )}
                    {lastHourWaterFlowData && waterFlowAvgData && (
                        <LineChart
                            title="🚰 Przepływ wody w ostatniej godzinie"
                            type={ChartType.WATERFLOW}
                            data={lastHourWaterFlowData}
                        />
                    )}
                    {waterFlowAvgData && (
                        <LineChart
                            title="🚰 Średni przepływ wody w ostatnich 24 godzinach"
                            type={ChartType.WATERFLOW}
                            data={waterFlowAvgData}
                        />
                    )}
                </div>
            </main>
        </>
    );
}
