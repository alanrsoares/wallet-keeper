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

import WalletDetails, { TEST_IDS as WALLET_DETAILS } from "./WalletDetails";

import { TEST_IDS as EXPORT_WALLET } from "./ExportWalletForm";
// import { TEST_IDS as DELETE_WALLET } from "./DeleteWalletForm";

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
    const walletName = await findByTestId(
      container,
      WALLET_DETAILS.walletLabel
    );

    expect(walletName).toHaveTextContent("Test1");
  });

  it(
    "should be able to export the private key by entering a password",
    async () => {
      const toggle = await findByTestId(container, WALLET_DETAILS.exportToggle);

      expect(toggle).toHaveTextContent("Show private key");

      fireEvent.click(toggle);

      const form = await findByTestId(container, EXPORT_WALLET.form);

      expect(form).toBeTruthy();

      expect(toggle).toHaveTextContent("Hide private key");

      const passwordInput = await findByTestId(
        container,
        EXPORT_WALLET.formPasswordInput
      );

      const submitButton = await findByTestId(
        container,
        EXPORT_WALLET.formSubmitButton
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
        EXPORT_WALLET.resultAlert
      );

      expect(privateKey).toHaveTextContent("Private key:");
    },
    {
      timeout: 10000,
    }
  );
});
