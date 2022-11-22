import { execSync } from "child_process";
import { writeFile, readFile } from "fs/promises";

import pkg from "../package.json" assert { type: "json" };
import currentManifest from "../out/manifest.json" assert { type: "json" };

async function main() {
  const version = pkg.version;
  const indexHtml = await readFile("./out/index.html", "utf-8");

  execSync("mv out/_next out/next");

  const nextIndexHtml = indexHtml.replace(/\_next\//g, "next/");

  const nextManifest = {
    ...currentManifest,
    version,
  };

  await writeFile("./out/index.html", nextIndexHtml);
  await writeFile("./out/manifest.json", JSON.stringify(nextManifest, null, 2));
}

main();
