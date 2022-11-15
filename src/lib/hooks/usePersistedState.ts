import { useEffect, useState } from "react";

import { Maybe } from "~/lib/monads";

export default function usePersistedState<T extends NonNullable<any>>(
  /**
   * @param key - The key to use for local storage
   */
  key: string,
  /**
   * @param defaultValue - The default value to use if the key is not found in local storage
   */
  initialState: T
) {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);

    return Maybe.of(stored).mapOr(initialState, (stored) => JSON.parse(stored));
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
