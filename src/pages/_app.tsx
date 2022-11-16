import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { FC, useState } from "react";

import MainLayout from "~/ui/layouts/MainLayout/MainLayout";
import "~/styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={(pageProps as any)?.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </MainLayout>
  );
};

export default MyApp;
