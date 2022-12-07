import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WalletKeeperProvider } from "~/lib/contexts/walletKeeper";

import { readSingleAccountFixture } from "fixtures";

import WalletDetails, { TEST_IDS as WALLET_DETAILS } from "./WalletDetails";
import { TEST_IDS as EXPORT_WALLET } from "./ExportWalletForm";

const queryClient = new QueryClient();

const SAMPLE_PASSWORD = "12345678";

describe("WalletDetails", async () => {
  const singleAccountState = await readSingleAccountFixture();

  const [firstAddress] = Object.keys(singleAccountState.accountsByAddress);

  render(
    <QueryClientProvider client={queryClient}>
      <WalletKeeperProvider initialState={singleAccountState}>
        <WalletDetails address={firstAddress} />
      </WalletKeeperProvider>
    </QueryClientProvider>
  );

  it("should render the correct wallet label", async () => {
    const walletName = await screen.findByTestId(WALLET_DETAILS.walletLabel);

    expect(walletName).toHaveValue("Test1");
  });

  it(
    "should be able to export the private key by entering a password",
    async () => {
      const toggle = await screen.findByTestId(WALLET_DETAILS.exportToggle);

      expect(toggle).toHaveTextContent("Show private key");

      fireEvent.click(toggle);

      const form = await screen.findByTestId(EXPORT_WALLET.form);

      expect(form).toBeVisible();

      expect(toggle).toHaveTextContent("Hide private key");

      const passwordInput = await screen.findByTestId(
        EXPORT_WALLET.formPasswordInput
      );

      const submitButton = await screen.findByTestId(
        EXPORT_WALLET.formSubmitButton
      );

      expect(submitButton).toBeDisabled();

      fireEvent.change(passwordInput, {
        target: {
          value: SAMPLE_PASSWORD,
        },
      });

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

      const privateKey = await screen.findByTestId(EXPORT_WALLET.resultAlert);

      expect(privateKey).toHaveTextContent("Private key:");
    },
    {
      timeout: 10000,
    }
  );
});
