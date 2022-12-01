import {
  render,
  findByTestId,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";
import GenerateWallet, { TEST_IDS } from "./GenerateWallet";

const renderGenerateWallet = (initialState: WalletKeeperState) => {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <WalletKeeperProvider initialState={initialState}>
        <GenerateWallet />
      </WalletKeeperProvider>
    </QueryClientProvider>
  );
};

describe("GenerateWallet", () => {
  /**
   * Functional requirements:
   *
   * 1 - Users would like to click a button to generate a Wallet.
   * 2 - Users would like to see a list of generated wallets.
   * 3 - Users would like to see their private keys by entering their password.
   * 4 - Users would like to see their balance in testnet networks
   */

  // case 1
  describe("Users would like to click a button to generate a Wallet.", () => {
    const { container } = renderGenerateWallet({
      selectedNetwork: "goerli",
      accountsByAddress: {},
    });

    const SAMPLE_PASSWORD = "12345678";

    test("'Generate new wallet' button should open expand the form", async () => {
      const generateWalletButton = await findByTestId(
        container,
        TEST_IDS.generateWalletButton
      );

      expect(generateWalletButton).toBeTruthy();

      expect((generateWalletButton as HTMLButtonElement)?.disabled).toBe(false);

      fireEvent.click(generateWalletButton);

      const submitButton = await findByTestId(container, TEST_IDS.submitButton);

      expect(submitButton).toBeTruthy();
    });

    test("submit button should be disabled", async () => {
      const submitButton = await findByTestId(container, TEST_IDS.submitButton);

      expect(submitButton).toBeTruthy();

      expect((submitButton as HTMLButtonElement)?.disabled).toBe(true);
    });

    test("type in displayName", async () => {
      const inputEl = await findByTestId(container, TEST_IDS.displayNameInput);

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: "displayName" } });

        expect((inputEl as HTMLInputElement)?.value).toBe("displayName");
      }
    });

    test("type in password", async () => {
      const inputEl = await findByTestId(container, TEST_IDS.passwordInput);

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: SAMPLE_PASSWORD } });

        expect((inputEl as HTMLInputElement)?.value).toBe(SAMPLE_PASSWORD);
      }
    });

    test("type in passwordConfirm", async () => {
      const inputEl = await findByTestId(
        container,
        TEST_IDS.passwordConfirmInput
      );

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: SAMPLE_PASSWORD } });

        expect((inputEl as HTMLInputElement)?.value).toBe(SAMPLE_PASSWORD);
      }
    });

    test("submit button should be enabled", async () => {
      const submitButton = await findByTestId(container, TEST_IDS.submitButton);

      expect(submitButton).not.toBeDisabled();

      expect(submitButton).toHaveTextContent("Generate new wallet");
    });

    test(
      "submit and generate wallet",
      async () => {
        const submitButton = await findByTestId(
          container,
          TEST_IDS.submitButton
        );

        fireEvent.submit(submitButton);

        await waitFor(
          () => {
            expect(submitButton).toHaveTextContent("Generating wallet...");
          },
          {
            timeout: 1000,
          }
        );

        await waitFor(
          () => {
            expect(submitButton).toHaveTextContent("100%");
          },
          {
            timeout: 9000,
          }
        );
      },
      {
        timeout: 10000,
      }
    );
  });
});
