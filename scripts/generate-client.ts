import type { UserConfig } from "@hey-api/openapi-ts";
import { createTRPCHeyApiTypeResolvers } from "@trpc/openapi/heyapi";
import { Config, Context, Effect, Schema } from "effect";

export const DEFAULT_OPENAPI_SPEC = "https://app.enderdash.com/openapi.json";
export const GENERATED_OUTPUT = "src/generated";

export class GenerateClientError extends Schema.TaggedError<
  GenerateClientError,
  { readonly brand: unique symbol }
>()("GenerateClientError", {
  input: Schema.String,
  cause: Schema.Unknown,
}) {
  override get message(): string {
    return `Could not generate the client from ${this.input}`;
  }
}

export type ClientConfig = UserConfig & { readonly input: string };

export class OpenApiGenerator extends Context.Service<
  OpenApiGenerator,
  {
    readonly generate: (config: ClientConfig) => Effect.Effect<void, GenerateClientError>;
  }
>()("@enderdash/client/scripts/generate-client/OpenApiGenerator") {}

const openApiSpec = Config.String("ENDERDASH_OPENAPI_SPEC").pipe(
  Config.withDefault(DEFAULT_OPENAPI_SPEC),
);

function clientConfig(input: string): ClientConfig {
  return {
    input,
    output: GENERATED_OUTPUT,
    plugins: [
      {
        name: "@hey-api/typescript",
        "~resolvers": createTRPCHeyApiTypeResolvers(),
      },
      "@hey-api/client-fetch",
      {
        name: "@hey-api/sdk",
        operations: { strategy: "single" },
      },
    ],
  };
}

export const generateClient = Effect.fn("Client.generate")(function* () {
  const input = yield* openApiSpec;
  const generator = yield* OpenApiGenerator;
  yield* generator.generate(clientConfig(input));
});
