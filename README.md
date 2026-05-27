# EnderDash Client

TypeScript client for the EnderDash HTTP API.

The client is generated from EnderDash's OpenAPI document and configured for the tRPC HTTP protocol. It uses `superjson`, matching the EnderDash API transformer.

## Install

```bash
bun add @enderdash/client
```

## Usage

```ts
import { createEnderDashClient } from "@enderdash/client";

const enderdash = createEnderDashClient({
  apiKey: process.env.ENDERDASH_API_KEY,
});

const servers = await enderdash.servers.listServers({
  query: {
    input: {
      organizationSlug: "test",
    },
  },
});
```

Pass `baseUrl` when targeting a local or self-hosted EnderDash app:

```ts
const enderdash = createEnderDashClient({
  apiKey: process.env.ENDERDASH_API_KEY,
  baseUrl: "https://app.enderdash.localhost:1355/api/trpc",
});
```

## Regenerate

```bash
bun run generate
```

By default, generation uses `https://app.enderdash.com/openapi.json`.

To generate from another spec:

```bash
ENDERDASH_OPENAPI_SPEC=./openapi.json bun run generate
```

## Development

```bash
bun install
bun run generate
bun run check
bun run build
```

## Publishing

Publishing runs from GitHub releases through `.github/workflows/publish.yml`.

The workflow uses npm provenance and GitHub's OpenID Connect token. Before the first release, configure npm trusted publishing for `@enderdash/client` with:

- owner: `enderdash-com`
- repository: `enderdash-client`
- workflow: `publish.yml`

Then publish by creating a GitHub release for the version in `package.json`.
