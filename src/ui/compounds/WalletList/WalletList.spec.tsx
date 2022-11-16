import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WalletKeeperProvider } from "~/lib/contexts/walletKeeper";
import WalletList from "./WalletList";

const queryClient = new QueryClient();

describe("WalletList", () => {
  it("should render", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <WalletKeeperProvider>
          <WalletList />
        </WalletKeeperProvider>
      </QueryClientProvider>
    );

    // basic render test
    expect(container).toMatchSnapshot();
  });
});
