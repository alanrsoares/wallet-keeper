import { exec } from "child_process";
import { writeFile, readFile } from "fs/promises";

console.log("\nRunning postbuild script");

const nextIndexHtml = await readFile("./out/index.html", "utf-8").then((x) =>
  x.replace(/\_next\//g, "next/")
);

await Promise.all([
  exec("mv out/_next out/next"),
  writeFile("./out/index.html", nextIndexHtml),
]);

console.log("\nPost build script finished");
