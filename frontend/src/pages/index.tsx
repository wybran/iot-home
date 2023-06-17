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
import Head from "next/head";
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
    const { indoorTempData, outdoorTempData } = useSensors();

    return (
        <>
            <Head>
                <title>IoT Woda 🚰</title>
                <meta
                    name="description"
                    content="Inteligentny system nawadniania"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div style={{textAlign: "center"}}>
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
                  <div className="chart">
                    <LineChart type={ChartType.INDOOR}  />
                  </div>
                  <div className="chart">
                    <LineChart type={ChartType.OUTDOOR} />
                  </div>
                </div>
            </main>
        </>
    );
}
