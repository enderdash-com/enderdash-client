# Enderdash Client

TypeScript client for the Enderdash HTTP API.

The client is generated from Enderdash's OpenAPI document and configured for the tRPC HTTP protocol. It uses `superjson`, matching the Enderdash API transformer.

## Install

```bash
bun add @enderdash/client
```

## Usage

```ts
import { createEnderdashClient } from "@enderdash/client";

const enderdash = createEnderdashClient({
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

Pass `baseUrl` when targeting a local or self-hosted Enderdash app:

```ts
const enderdash = createEnderdashClient({
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

The workflow publishes to npm and JSR with GitHub OpenID Connect tokens.

Before the first npm release, configure npm trusted publishing for `@enderdash/client` with:

- owner: `enderdash-com`
- repository: `enderdash-client`
- workflow: `publish.yml`

Before the first JSR release, create or open `@enderdash/client` on JSR, then link it to:

- repository: `enderdash-com/enderdash-client`

Then publish by creating a GitHub release for the version in `package.json`.

## Contributing and support

Read [the contribution guide](CONTRIBUTING.md) for development and review.
Use [the support guide](SUPPORT.md) for questions and issue routing.

The former `EnderDash` client exports remain available as deprecated aliases. Use the `Enderdash` exports in new integrations.
