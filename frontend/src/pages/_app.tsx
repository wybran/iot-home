import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import runOneSignal from "@/utils";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    useEffect(() => {
        runOneSignal();
    }, []);

    return (
        <>
            <Head>
                <title>IoT Woda 🚰</title>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <meta
                    name="description"
                    content="Inteligentny system nawadniania"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    );
}
