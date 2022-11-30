<div style="display: grid; place-items: center;">

[![logo](public/favicon.png)](https://github.com/alanrsoares/wallet-keeper)

# Wallet Keeper

A minimalistic web3 wallet built for educational purposes

</div>

## Lighthouse score 🤩

[![lightouse-score](/lighthouse/full-100-score.png)](/lighthouse/walletkeeper-lighthouse-report.pdf)

## Getting Started :rocket:

📇 Clone this repo

```bash
git clone git@github.com:alanrsoares/wallet-keeper.git
```

🏗️ Install dependencies

```bash
pnpm i
```

🔨 Run it locally

```bash
pnpm dev
```

## Running tests 🧪

- test - run ui / unit tests with [`vitest`](https://vitest.dev/)

```bash
pnpm test
```

- test:e2e - run end to end tests with [`playwright`](https://playwright.dev/)

```bash
pnpm test:e2e
```

## Running as a [`Manifest V3`](https://developer.chrome.com/docs/extensions/mv3/intro/) browser extension 🧩

- build

```
pnpm build
```

- From chrome/brave, go to [chrome extensions](chrome://extensions/) or [brave extensions](brave://extensions)
- click on `Load unpacked` and select the `out/` folder located at `path/to/wallet-keeper/out`

And you should see the extension:
![Screenshot from 2022-11-30 09-01-51](https://user-images.githubusercontent.com/273334/204653736-aa2f2d46-cdfb-4332-9bf6-b28b283eac70.png)


## Running Storybook 🎨

This will start storybook on https://localhost:6006

```
pnpm storybook
```

## Other commands

- lint - validate application with [`rome`](https://rome.tools)

```bash
pnpm lint
```

---

## Built with :hammer:

- [ethers](https://ethers.io) - Ethereum sdk
- [nextjs](https://nextjs.org) - Nextjs 13 for 100 lighthouse score
- [react-query](https://tanstack.com/query) - query / mutation / cache abstraction
- [tailwindcss](https://tailwindcss.com) - utility first css library
- [daisyui](https://daisyui.com/) - tailwindcss component & theming primitives
- [unstated-next](https://github.com/jamiebuilds/unstated-next) - Tiny wrapper around `react context` for shared state.

## DX :rainbow:

- [storybook](https://storybook.js.org/)
- [rome](https://rome.tools)

---

LICENSE - MIT
