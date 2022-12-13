import { readFile } from "fs/promises";
import path from "path";

import { WalletKeeperState } from "~/lib/contexts/walletKeeper";

export const readFixtureAsJson = async <T extends {}>(name: string) => {
  const fileName = name.endsWith(".json") ? name : `${name}.json`;

  const raw = await readFile(path.join(__dirname, fileName), "utf-8");

  return JSON.parse(raw) as T;
};

export const readSingleAccountFixture = () =>
  readFixtureAsJson<WalletKeeperState>("single-account");
