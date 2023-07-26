import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import BlurImagesProvider from "~/components/BlurImagesProvider";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
        primaryColor: "orange",
      }}
    >
      <BlurImagesProvider>
        <Notifications />
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </BlurImagesProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
