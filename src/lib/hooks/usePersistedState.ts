import { SetStateAction, useEffect, useState } from "react";

import { Maybe } from "~/lib/monads";
import { isFunction } from "~/lib/utils";

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
  const [state, _setState] = useState<T>(initialState);

  useEffect(() => {
    const stored = localStorage.getItem(key);

    Maybe.of(stored).map(JSON.parse).map(_setState);
  }, []);

  const setState = (payload: SetStateAction<T>) => {
    const stored = localStorage.getItem(key);

    const nextState = isFunction(payload) ? payload(state) : payload;

    if (!nextState && stored) {
      return;
    }

    Maybe.of(nextState ?? initialState)
      .map(JSON.stringify)
      .map((x) => localStorage.setItem(key, x));

    _setState(nextState);
  };

  return [state, setState] as const;
}
