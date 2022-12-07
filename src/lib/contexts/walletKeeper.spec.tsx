import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { expect, test } from "vitest";

import { readSingleAccountFixture } from "fixtures";

import { useWalletKeeper, WalletKeeperProvider } from "./walletKeeper";

test("should generate a new wallet", async () => {
  const singleAccountState = await readSingleAccountFixture();

  const { result } = renderHook(
    () => {
      const { mutations, state } = useWalletKeeper();

      return {
        state,
        generateWallet: mutations.generateWallet(),
      };
    },
    {
      wrapper: ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={new QueryClient()}>
          <WalletKeeperProvider initialState={singleAccountState}>
            {children}
          </WalletKeeperProvider>
        </QueryClientProvider>
      ),
    }
  );

  await act(async () => {
    const { generateWallet } = result.current;

    await generateWallet.mutateAsync({
      displayName: "Test2",
      password: "password",
    });
  });

  const addresses = Object.keys(result.current.state.accountsByAddress);

  expect(addresses).toHaveLength(2);
});
