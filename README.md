# VCGamers

## Seller's App

Repository akan disediakan oleh VCGamers, beserta setup dan pipeline untuk CI/CD nya.

Setiap hari akan ada daily report meliputi Apa yang dikerjakan kemarin, Apa yang akan dikerjakan hari ini, Obstacle/Blocker yang sedang dihadapi.

## Feature Branch Rules

Branch Naming Convention: Branches should be named `<username>/<role>/<details>.`

Branch Lifespan: Branches should be short-lived and merged into the trunk as soon as the feature is complete.

_Branch from Trunk: Always create new branches from the trunk._

_Rebase Often: Rebase your branch from the trunk frequently to minimize merge conflicts._

## Commit Rules

Commit messages should follow these conventions:

- add: for new features (Example: add: User registration feature)
- fix: for bug fixes (Example: fix: Resolve login bug)
- cicd: for changes to the CI/CD pipeline (Example: cicd: Update test pipeline)
- chore: for routine tasks or maintenance activities (Example: chore: Update dependencies)
- docs: for changes to documentation (Example: docs: Update API reference)
- refactor: for code changes that neither fix a bug nor add a feature (Example: refactor: Simplify authentication logic)
- style: for changes that do not affect the meaning of the code (like formatting) (Example: style: Fix indentations)
- test: for adding or correcting existing tests (Example: test: Add unit tests for user registration)
- deploy: for changes in the deployment process using Argo CD (Example: deploy: Update Argo CD manifest)
- plugin: for adding or updating plugins in KrakenD (Example: plugin: Add rate limiting plugin in KrakenD)
- helm: for updating or adding Helm charts (Example: helm: Update chart for new service)

# Docs

This project was bootstrapped with [Create T3 App](https://github.com/t3-oss/create-t3-app).
For more documentation, you can go to their [docs site](https://create.t3.gg/).

## Directory Structure

`├──`[`.gitlab`](.gitlab) — Gitlab specific configuration including Merge Request Templates<br>
`├──`[`src`](./src) — Front-end code root built with [NextJS](https://nextjs.org/) and [Material UI](https://mui.com/core/)<br>
`│  ├──`[`atom`](./src/atom) — Jotai Atom location<br>
`│  ├──`[`components`](./src/components) — Component folder (following Atomic Design)<br>
`│  │  ├──`[`atomic`](./src/components/atomic) — Atomic component folder<br>
`│  │  ├──`[`icons`](./src/components/icons) — Custom icon component folder<br>
`│  │  ├──`[`molecule`](./src/components/molecule) — Molecule component folder<br>
`│  │  └──`[`organism`](./src/components/organism) — Organism Component folder<br>
`│  ├──`[`layout`](./src/layout) — Layout Folder (primarily for common page layout)<br>
`│  ├──`[`pages`](./src/pages) — [NextJS File-based routing directory](https://nextjs.org/docs/pages/building-your-application/routing)<br>
`│  │  ├──`[`seller`](./src/pages/seller) — Seller root folder<br>
`│  │  │  ├──`[`obrolan`](./src/pages/seller/obrolan) — Seller - Chat & Moderation feature folder<br>
`│  │  │  │  ├──`[`komplain`](./src/pages/seller/obrolan/komplain) — Seller - Moderation feature folder<br>
`│  │  │  │  │  └──`[`[[..chatId]].tsx`](./src/pages/seller/obrolan/komplain/[[...chatId]].tsx) — Seller - Moderation Page<br>
`│  │  │  │  └──`[`percakapan`](./src/pages/seller/obrolan/percakapan) — Seller - Chat feature folder<br>
`│  │  │  │  │  └──`[`[[..chatId]].tsx`](./src/pages/seller/obrolan/percakapan/[[...chatId]].tsx) — Seller - Chat Page<br>
`│  │  │  ├──`[`pengaturan`](./src/pages/seller/pengaturan) — Seller - Setting feature folder<br>
`│  │  │  │  ├──`[`jadwal-toko.tsx`](./src/pages/seller/pengaturan/jadwal-toko.tsx) — Seller - Jadwal Toko Page<br>
`│  │  │  │  └──`[`profil-toko.tsx`](./src/pages/seller/pengaturan/profil-toko.tsx) — Seller - Profil Toko Page<br>
`│  │  │  ├──`[`produk`](./src/pages/seller/produk) — Seller - Product feature folder<br>
`│  │  │  │  ├──`[`edit-produk-massal.tsx`](./src/pages/seller/produk/edit-produk-massal.tsx) — Seller - Edit Produk Massal Page<br>
`│  │  │  │  ├──`[`edit-produk.tsx`](./src/pages/seller/produk/edit-produk.tsx) — Seller - Edit Produk Page<br>
`│  │  │  │  ├──`[`kelola-produk.tsx`](./src/pages/seller/produk/kelola-produk.tsx) — Seller - Kelola Produk Page<br>
`│  │  │  │  ├──`[`kelola-voucher.tsx`](./src/pages/seller/produk/kelola-voucher.tsx) — Seller - Kelola Voucher Page<br>
`│  │  │  │  └──`[`tambah-produk.tsx`](./src/pages/seller/produk/tambah-produk.tsx) — Seller - Tambah Produk Page<br>
`│  │  │  ├──`[`request`](./src/pages/seller/request) — Seller - Request feature folder<br>
`│  │  │  │  └──`[`vip-seller`](./src/pages/seller/request/vip-seller) — Seller - VIP Seller folder<br>
`│  │  │  │  │  ├──`[`api-integration.tsx`](./src/pages/seller/request/vip-seller/api-integration.tsx) — Seller - VIP - API Integration Page<br>
`│  │  │  │  │  ├──`[`index.tsx`](./src/pages/seller/request/vip-seller/index.tsx) — Seller - VIP Seller Page<br>
`│  │  │  │  │  ├──`[`join-campaign.tsx`](./src/pages/seller/request/vip-seller/join-campaign.tsx) — Seller - VIP - Join Campaign Page<br>
`│  │  │  │  │  └──`[`manage-promo.tsx`](./src/pages/seller/request/vip-seller/manage-promo.tsx) — Seller - VIP - Manage Promo Page<br>
`│  │  │  │  ├──`[`instant.tsx`](./src/pages/seller/request/instant.tsx) — Seller - Instant Page<br>
`│  │  │  │  └──`[`proses-kilat.tsx`](./src/pages/seller/request/proses-kilat.tsx) — Seller - Proses Kilat Page<br>
`│  │  │  ├──`[`toko`](./src/pages/seller/toko) — Seller - Shop feature folder<br>
`│  │  │  │  ├──`[`daftar-penjualan`](./src/pages/seller/toko/daftar-penjualan) — Seller - Notification Page<br>
`│  │  │  │  ├──`[`index.tsx`](./src/pages/seller/toko/index.tsx) — Seller - Dashboard Page<br>
`│  │  │  │  └──`[`saldo-toko.tsx`](./src/pages/seller/toko/saldo-toko.tsx) — Seller - Balance Page<br>
`│  │  │  └──`[`notifikasi.tsx`](./src/pages/seller/notifikasi.tsx) — Seller - Notification Page<br>
`│  │  ├──`[`_app.tsx`](./src/pages/_app.tsx) — [NextJS Top level component for each page](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)<br>
`│  │  └──`[`_document.tsx`](./src/pages/_document.tsx) — [NextJS HTML Custom Document](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)<br>
`│  ├──`[`services`](./src/services) — API call and custom hook folder<br>
`│  ├──`[`types`](./src/types) — Types folder<br>
`│  ├──`[`utils`](./src/utils) — Utility folder<br>
`│  └──`[`env.mjs`](./src/env.mjs) — Global Env configuration<br>
`├──`[`public`](./public) — NextJS static assets folder<br>
`└──`[`tsconfig.json`](./tsconfig.json) — The TypeScript configuration<br>

> Some pages dynamically display content using React State. This is achieved by dynamically loading the component on the page's route.
> - [Kelola Voucher Page](./src/pages/seller/produk/kelola-voucher.tsx)
> - [VIP Seller Page](./src/pages/seller/request/vip-seller/index.tsx) - redirect to [Join Campaign Page](./src/pages/seller/request/vip-seller/instant.tsx) if seller is a VIP Seller
> - [Chat Page](./src/pages/seller/obrolan/percakapan/[[...chatId]].tsx) - handling desktop and mobile view. for mobile view, there's a handler for routing to chat list and chat room
> - [Moderation Page](./src/pages/seller/obrolan/komplain/[[...chatId]].tsx) - handling desktop and mobile view. for mobile view, there's a handler for routing to chat list and chat room

## Tech Stack

- [Create T3 App](https://create.t3.gg/) - Scaffold and env management
- [Typescript](https://www.typescriptlang.org/) - Main Language for this project, supersede Javascript
- [NextJS](https://nextjs.org/) - Meta-framework (fullstack framework) using [React](https://react.dev/)
- [Material UI](https://next.material-ui.com/) - UI Library
- [Jotai](https://jotai.org/) - Light-weight state management
- [Tanstack Query](https://tanstack.com/query/v4) - Async state management (for fetching and mutate data to server)
- [React Hook Form](https://react-hook-form.com/) - performant Handling Form in React
- [Zod](https://zod.dev/) - Typescript schema validator (for validating data from Form)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Toast in React
- [Vitest](https://vitest.dev/) - Testing Library

## Getting Started

Clone repository and copy .env.example and start the app:

```
$ git clone https://gitlab.com/dev1662/seller-apps
$ cd ./seller-apps
$ yarn install
$ yarn dev
```

The app will become available at [http://localhost:3300/](http://localhost:3300/).

## Scripts

- `yarn dev` — Launches the app in development mode on [http://localhost:3300/](http://localhost:3300/)
- `yarn build` — Compiles and bundles the app for deployment
- `yarn build:tsc` — Validate the code using TypeScript compiler
- `yarn lint` — Validate the code using ESLint
- `yarn test` — Run unit tests with Vitest, Supertest
- `yarn coverage` — Run coverage on unit tests
