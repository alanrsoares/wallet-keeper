import {
  render,
  findByTestId,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  WalletKeeperProvider,
  WalletKeeperState,
} from "~/lib/contexts/walletKeeper";
import WalletList from "./WalletList";

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

const getters = <T extends HTMLElement>(container: HTMLElement) => ({
  walletListContainer: () =>
    findByTestId<T>(container, "wallet-list-container"),
  generateWalletButtonExpanded: () =>
    findByTestId<HTMLButtonElement>(
      container,
      "generate-wallet-button-expanded"
    ),
  generateWalletButtonCollapsed: () =>
    findByTestId<HTMLButtonElement>(
      container,
      "generate-wallet-button-collapsed"
    ),
  generateWalletDisplayNameField: () =>
    container.querySelector<HTMLInputElement>("input[name=displayName]"),
  generateWalletPasswordField: () =>
    container.querySelector<HTMLInputElement>("input[name=password]"),
  generateWalletPasswordConfirmField: () =>
    container.querySelector<HTMLInputElement>("input[name=passwordConfirm]"),
});

describe("WalletList", () => {
  describe("When there are no wallets", () => {
    it("renders the 'generate wallet' form", async () => {
      const { container } = renderWalletList({
        selectedNetwork: "goerli",
        accountsByAddress: {},
      });

      const generateWalletExpanded = await findByTestId(
        container,
        "generate-wallet-button-expanded"
      );

      // expect(generateWalletCollapsed).not.toBeTruthy();
      expect(generateWalletExpanded).toBeTruthy();
    });
  });

  describe("When there are wallets", () => {
    it("renders the 'wallet list'", async () => {
      const { container } = renderWalletList({
        selectedNetwork: "goerli",
        accountsByAddress: {
          "0x123": {
            address: "0x123",
            encryptedJson: "encryptedJson",
            displayName: "displayName",
          },
        },
      });

      const walletListContainer = await findByTestId(
        container,
        "wallet-list-container"
      );

      expect(walletListContainer).toBeTruthy();
    });
  });

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
    const { container, rerender } = renderWalletList({
      selectedNetwork: "goerli",
      accountsByAddress: {},
    });

    test("submit button should be disabled", async () => {
      const submitButton = await getters(
        container
      ).generateWalletButtonExpanded();

      expect(submitButton).toBeTruthy();

      expect((submitButton as HTMLButtonElement)?.disabled).toBe(true);
    });

    test("type in displayName", async () => {
      const inputEl = getters(container).generateWalletDisplayNameField();

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: "displayName" } });

        expect((inputEl as HTMLInputElement)?.value).toBe("displayName");
      }
    });

    test("type in password", async () => {
      const inputEl = getters(container).generateWalletPasswordField();

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: "password1234" } });

        expect((inputEl as HTMLInputElement)?.value).toBe("password1234");
      }
    });

    test("type in passwordConfirm", async () => {
      const inputEl = getters(container).generateWalletPasswordConfirmField();

      expect(inputEl).toBeTruthy();

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: "password1234" } });

        expect((inputEl as HTMLInputElement)?.value).toBe("password1234");
      }
    });

    test("submit button should be enabled", async () => {
      const submitButton = await getters(
        container
      ).generateWalletButtonExpanded();

      expect(submitButton.disabled).toBeFalsy();

      expect(submitButton.innerText).toContain("Generate new wallet");
    });

    test(
      "submit and generate wallet",
      async () => {
        const submitButton = await getters(
          container
        ).generateWalletButtonExpanded();

        fireEvent.submit(submitButton);

        await waitFor(
          () => {
            expect(submitButton.innerText).toContain("Generating wallet...");
          },
          {
            timeout: 1000,
          }
        );

        await waitFor(
          () => {
            expect((submitButton as HTMLButtonElement)?.innerText).toContain(
              "100%"
            );
          },
          {
            timeout: 9000,
          }
        );

        const walletListContainer = await getters(
          container
        ).walletListContainer();

        expect(walletListContainer).toBeTruthy();
      },
      {
        timeout: 10000,
      }
    );
  });
});
