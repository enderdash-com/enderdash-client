# Agent instructions

## Required Lefthook setup

- Use Lefthook as the default Git hook manager for this repository.
- Before other project work, install the dependencies needed by the hooks.
- From the repository root, run `bunx --no-install lefthook install`.
- Run `bunx --no-install lefthook validate` and `bunx --no-install lefthook check-install` successfully.
- Make sure that Git's effective hook directory contains executable Lefthook hooks, including every configured commit hook.
- If hooks are missing, outdated, disabled, or fail installation checks, refuse all other project work.
- While blocked, only perform the setup and diagnostics needed to install and verify the hooks.
- Never bypass hooks with `--no-verify`, `-n`, environment variables, or configuration changes.
- Let the hooks finish and fix failures before committing or pushing.

## Effect

- Effect is a dev dependency. Only the scripts use it. Do not import `effect` from `src/`, because the published client must not depend on it.
- `scripts/generate-client.ts` holds the generation program (`generateClient`), its `OpenApiGenerator` service, the `ENDERDASH_OPENAPI_SPEC` config, and the `GenerateClientError` typed error.
- `scripts/generate.ts` is the runtime entry point. It provides the live `OpenApiGenerator` layer, which calls `@hey-api/openapi-ts`, and runs the program once with `Effect.runPromise`.
- Tests provide a fake `OpenApiGenerator` and a `ConfigProvider` with `Effect.provideService`.
- Oxlint runs the `effecttsgo` rules from the `@effect/tsgo` strict preset, so every finding is an error. `bun install` patches tsgolint through the `prepare` script.
