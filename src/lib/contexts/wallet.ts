import { createContainer } from "unstated-next";

import usePersistedState from "~/lib/hooks/usePersistedState";

export const STORAGE_KEY = "@walletkeeper/state/v1";

const { Provider: WalletProvider, useContainer: useWallet } = createContainer(
  () => {
    const [state, setState] = usePersistedState(STORAGE_KEY, {});

    return {
      state,
      setState,
    };
  }
);

export { WalletProvider, useWallet };
