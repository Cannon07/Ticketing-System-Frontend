"use client";

import config from "@/config/config.json";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { InkConfig } from 'useink';
import { AlephTestnet } from 'useink/chains';
import { NotificationsProvider } from 'useink/notifications';
import dynamic from 'next/dynamic';
import { GlobalContextProvider } from "../../app/context/globalContext";

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import('useink').then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

const Providers = ({ children }: { children: ReactNode }) => {
  const { default_theme } = config.settings;

  return (
    <UseInkProvider
      config={{
        dappName: "NextGen Ticketing System",
        chains: [AlephTestnet],
      }}
    >
      <NotificationsProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme={default_theme}
          enableColorScheme={false}
        >
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
        </ThemeProvider>
      </NotificationsProvider>
    </UseInkProvider>
  );
};

export default Providers;
