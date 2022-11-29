import { exec } from "child_process";
import { writeFile, readFile } from "fs/promises";

import packageJson from "../package.json" assert { type: "json" };
import manifestJson from "../out/manifest.json" assert { type: "json" };

async function main() {
  const version = packageJson.version;
  const indexHtml = await readFile("./out/index.html", "utf-8");

  const nextIndexHtml = indexHtml.replace(/\_next\//g, "next/");

  const manifest = { ...manifestJson, version };

  await Promise.all([
    exec("mv out/_next out/next"),
    writeFile("./out/index.html", nextIndexHtml),
    writeFile("./out/manifest.json", JSON.stringify(manifest, null, 2)),
  ]);
}

main();
