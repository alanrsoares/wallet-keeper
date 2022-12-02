import { render, findByTestId, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";
import WalletList from "./WalletList";
import { readFile } from "fs/promises";

const queryClient = new QueryClient();

const renderWalletList = (initialState: WalletKeeperState) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <WalletKeeperProvider initialState={initialState}>
        <WalletList />
      </WalletKeeperProvider>
    </QueryClientProvider>
  );
};

describe("WalletList", () => {
  describe("Single wallet", async () => {
    const fixture = await readFile("fixtures/single-account.json", "utf-8");
    const initialState = JSON.parse(fixture) as WalletKeeperState;
    const { container } = renderWalletList(initialState);

    it("should render the correct wallet count", async () => {
      const walletCount = await findByTestId(container, "wallet-count");
      expect(walletCount.textContent).toBe("(1)");
    });

    it("should be expanded by default", async () => {
      const walletList = await findByTestId(container, "wallet-list");

      expect(walletList).toBeTruthy();
    });

    it("should collapse the list when the toggle is clicked", async () => {
      const toggle = await findByTestId(container, "wallet-list-toggle");

      expect(toggle.classList.contains("swap-active")).toBe(true);

      fireEvent.click(toggle);

      expect(toggle.classList.contains("swap-active")).toBe(false);
    });
  });
});
