"use client"

import { WagmiProvider, cookieToInitialState } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "./config";
import React from "react";

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
    cookie: string | null;
}

export default function Providers({ children, cookie }: Props) {

    const initialState = cookieToInitialState(config, cookie);

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}