import fs from "fs/promises";
import { test, Page } from "@playwright/test";

const BASE_URL = "https://www.svgrepo.com";

const ITEMS_PER_PAGE = 50;

type Collection = {
  title: string;
  length: number;
  indexed: boolean;
  url: string | null;
  page: number;
  pages: number;
  iconsSample: string[];
};

async function crawlIndexPage(page: Page, pageIndex = 0) {
  if (!pageIndex) {
    await page.goto(`${BASE_URL}/collections/all`);
  } else {
    await page.goto(`${BASE_URL}/collections/all/${pageIndex}`);
  }

  const collectionLinks = await page.$$(".style_Collection__Dhplh");

  console.log({
    "current page": pageIndex,
    "collections in page": collectionLinks.length,
  });

  const collections = collectionLinks
    .filter((link) => Boolean(link))
    .map(async (link) => {
      const a = await link.$("a");

      const [title, len] = !a
        ? ["unknown", "0"]
        : await a.innerText().then((x) => x.split("\n"));

      const length = Number(len);

      return {
        title,
        length,
        indexed: false,
        url: await link?.getAttribute("href"),
        page: 0,
        pages: Math.ceil(length / ITEMS_PER_PAGE),
        iconsSample: await a
          ?.$$("img")
          .then((imgs) => imgs.map((img) => img.getAttribute("src")))
          .then((xs) => Promise.all(xs))
          .then((xs) => xs.map((x) => `${BASE_URL}${x}`)),
      };
    });

  const results = await Promise.all(collections);

  const fileContent = await fs
    .readFile("icons.json", "utf-8")
    .then<Record<string, Collection>>(JSON.parse);

  const pageContent = results.reduce<Record<string, Collection>>(
    (acc, x) => ({
      ...acc,
      [x.title
        .toLowerCase()
        .split(" ")
        .join("-")
        .replace(/-collection$/, "")]: x as Collection,
    }),
    {}
  );

  await Promise.all([
    fs.writeFile(
      "icons.json",
      JSON.stringify(
        {
          ...fileContent,
          ...pageContent,
        },
        null,
        2
      )
    ),
    fs.writeFile("crawler.json", JSON.stringify({ pageIndex }, null, 2)),
  ]);

  const hasNextPage = await page.getByTitle("Next page").isEnabled();

  if (hasNextPage) {
    await crawlIndexPage(page, pageIndex + 1);
  }

  process.exit(0);
}

test("index stuff", async ({ page }) => {
  test.setTimeout(0);

  const { pageIndex } = await fs.readFile("crawler.json", "utf-8").then<{
    pageIndex: number;
  }>(JSON.parse);

  await crawlIndexPage(page, pageIndex);
});
