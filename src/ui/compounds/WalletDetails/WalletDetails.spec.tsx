import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { findByTestId, fireEvent, render } from "@testing-library/react";
import { readFile } from "fs/promises";
import { describe, expect, it } from "vitest";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";

import WalletDetails from "./WalletDetails";

const queryClient = new QueryClient();

const renderWalletDetails = (initialState: WalletKeeperState) => {
  const firstAddress = Object.keys(initialState.accountsByAddress)[0];

  return render(
    <QueryClientProvider client={queryClient}>
      <WalletKeeperProvider initialState={initialState}>
        <WalletDetails address={firstAddress} />
      </WalletKeeperProvider>
    </QueryClientProvider>
  );
};

describe("WalletDetails", async () => {
  const fixture = await readFile("fixtures/single-account.json", "utf-8");
  const initialState = JSON.parse(fixture) as WalletKeeperState;
  const { container, ...fd } = renderWalletDetails(initialState);

  it("should render the correct wallet label", async () => {
    const walletName = await findByTestId(container, "wallet-label");

    expect(walletName).toHaveTextContent("Test1");
  });

  it("should be able to toggle the export wallet form", async () => {
    const toggle = await findByTestId(container, "wallet-export-toggle");

    expect(toggle).toHaveTextContent("Show private key");

    fireEvent.click(toggle);

    const form = await findByTestId(container, "export-wallet-form");

    expect(form).toBeTruthy();

    expect(toggle).toHaveTextContent("Hide private key");
  });
});
