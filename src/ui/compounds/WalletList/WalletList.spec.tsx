import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { findByTestId, fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { readSingleAccountFixture } from "fixtures";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";
import WalletList, { TEST_IDS } from "./WalletList";

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
    const initialState = await readSingleAccountFixture();
    const { container } = renderWalletList(initialState);

    it("should render the correct wallet count", async () => {
      const walletCount = await findByTestId(container, TEST_IDS.walletCount);
      expect(walletCount.textContent).toBe("(1)");
    });

    it("should be expanded by default", async () => {
      const walletList = await findByTestId(container, TEST_IDS.walletList);

      expect(walletList).toBeTruthy();
    });

    it("should collapse the list when the toggle is clicked", async () => {
      const toggle = await findByTestId(container, TEST_IDS.toggleButton);

      expect(toggle.classList.contains("swap-active")).toBe(true);

      fireEvent.click(toggle);

      expect(toggle.classList.contains("swap-active")).toBe(false);
    });
  });
});
