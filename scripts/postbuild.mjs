import { writeFile, readFile } from "fs/promises";

console.log("\nRunning 'postbuild' script");

const { version } = await readFile("./package.json", "utf-8").then(JSON.parse);
const manifestJson = await readFile("./public/manifest.json", "utf-8").then(
  JSON.parse
);

const nextManifestJson = JSON.stringify({ ...manifestJson, version }, null, 2);

await writeFile("./public/manifest.json", nextManifestJson);

console.log("\n'postbuild' script finished");
