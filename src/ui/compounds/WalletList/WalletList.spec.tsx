import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { readSingleAccountFixture } from "fixtures";

import { WalletKeeperProvider } from "~/lib/contexts/walletKeeper";
import WalletList, { TEST_IDS } from "./WalletList";

const queryClient = new QueryClient();

describe("WalletList", () => {
  describe("Single wallet", async () => {
    const initialState = await readSingleAccountFixture();

    render(
      <QueryClientProvider client={queryClient}>
        <WalletKeeperProvider initialState={initialState}>
          <WalletList />
        </WalletKeeperProvider>
      </QueryClientProvider>
    );

    it("should render the correct wallet count", async () => {
      const walletCount = await screen.findByTestId(TEST_IDS.walletCount);
      expect(walletCount.textContent).toBe("(1)");
    });

    it("should be expanded by default", async () => {
      const walletList = await screen.findByTestId(TEST_IDS.walletList);

      expect(walletList).toBeVisible();
    });

    it("should collapse the list when the toggle is clicked", async () => {
      const toggle = await screen.findByTestId(TEST_IDS.toggleButton);

      expect(toggle).toHaveClass("swap-active");

      fireEvent.click(toggle);

      const walletList = screen.queryByTestId(TEST_IDS.walletList);

      expect(toggle).not.toHaveClass("swap-active");

      expect(walletList).not.toBeTruthy();
    });
  });
});
