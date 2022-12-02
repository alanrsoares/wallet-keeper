import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  findByTestId,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
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

  it(
    "should be able to export the private key by entering a password",
    async () => {
      const toggle = await findByTestId(container, "wallet-export-toggle");

      expect(toggle).toHaveTextContent("Show private key");

      fireEvent.click(toggle);

      const form = await findByTestId(container, "export-wallet-form");

      expect(form).toBeTruthy();

      expect(toggle).toHaveTextContent("Hide private key");

      const passwordInput = await findByTestId(
        container,
        "export-wallet-form-password"
      );
      const submitButton = await findByTestId(
        container,
        "export-wallet-form-submit"
      );

      expect(submitButton).toBeDisabled();

      fireEvent.change(passwordInput, { target: { value: "12345678" } });

      expect(submitButton).not.toBeDisabled();

      expect(submitButton).toHaveTextContent("Unlock");

      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(submitButton).toHaveTextContent("Unlocking...");
      });

      await waitFor(
        () => {
          expect(submitButton).toHaveTextContent("100%");
        },
        {
          timeout: 5000,
        }
      );

      const privateKey = await findByTestId(
        container,
        "export-wallet-result-alert"
      );

      expect(privateKey).toHaveTextContent("Private key:");
    },
    {
      timeout: 10000,
    }
  );
});
