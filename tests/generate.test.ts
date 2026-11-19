import assert from "node:assert/strict";
import { test } from "node:test";

import { ConfigProvider, Effect, Result } from "effect";

import {
  type ClientConfig,
  DEFAULT_OPENAPI_SPEC,
  GENERATED_OUTPUT,
  GenerateClientError,
  OpenApiGenerator,
  generateClient,
} from "../scripts/generate-client.js";

async function runGenerate(env: Record<string, string>, fail?: unknown) {
  const configs: ClientConfig[] = [];
  const result = await Effect.runPromise(
    generateClient().pipe(
      Effect.provideService(OpenApiGenerator, {
        generate: (config) => {
          configs.push(config);
          return fail === undefined
            ? Effect.void
            : Effect.fail(GenerateClientError.make({ input: config.input, cause: fail }));
        },
      }),
      Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env })),
      Effect.result,
    ),
  );
  return { configs, result };
}

test("generation uses the production spec by default", async () => {
  const { configs, result } = await runGenerate({});

  assert.ok(Result.isSuccess(result));
  assert.equal(configs.length, 1);
  const [config] = configs;
  assert.ok(config);
  assert.equal(config.input, DEFAULT_OPENAPI_SPEC);
  assert.equal(config.output, GENERATED_OUTPUT);
});

test("ENDERDASH_OPENAPI_SPEC overrides the spec source", async () => {
  const { configs } = await runGenerate({ ENDERDASH_OPENAPI_SPEC: "./openapi.json" });

  assert.equal(configs[0]?.input, "./openapi.json");
});

test("generator failures surface as a typed error with the spec source", async () => {
  const { result } = await runGenerate({ ENDERDASH_OPENAPI_SPEC: "./missing.json" }, "boom");

  assert.ok(Result.isFailure(result));
  assert.ok(result.failure instanceof GenerateClientError);
  assert.equal(result.failure.message, "Could not generate the client from ./missing.json");
});
