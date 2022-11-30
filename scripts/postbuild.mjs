import { exec } from "child_process";
import { writeFile, readFile } from "fs/promises";

console.log("\nRunning postbuild script");

const packageJson = await readFile("./package.json", "utf-8");
const manifestJson = await readFile("./out/manifest.json", "utf-8");

const { version } = JSON.parse(packageJson);
const indexHtml = await readFile("./out/index.html", "utf-8");

const nextIndexHtml = indexHtml.replace(/\_next\//g, "next/");

const nextManifestJson = JSON.stringify(
  { ...JSON.parse(manifestJson), version },
  null,
  2
);

await Promise.all([
  exec("mv out/_next out/next"),
  writeFile("./out/index.html", nextIndexHtml),
  writeFile("./out/manifest.json", nextManifestJson),
]);

console.log("\nPost build script finished");
