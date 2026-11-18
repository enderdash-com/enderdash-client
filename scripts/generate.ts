import { createClient } from "@hey-api/openapi-ts";
import { Effect, Layer } from "effect";

import { GenerateClientError, OpenApiGenerator, generateClient } from "./generate-client.js";

const openApiGeneratorLayer = Layer.succeed(OpenApiGenerator, {
  generate: (config) =>
    Effect.tryPromise({
      try: async () => createClient(config),
      catch: (cause) => new GenerateClientError({ input: config.input, cause }),
    }).pipe(Effect.asVoid),
});

await Effect.runPromise(generateClient().pipe(Effect.provide(openApiGeneratorLayer)));
