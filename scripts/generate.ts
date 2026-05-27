import { createClient } from "@hey-api/openapi-ts";
import { createTRPCHeyApiTypeResolvers } from "@trpc/openapi/heyapi";

const input =
  process.env.ENDERDASH_OPENAPI_SPEC ?? "https://app.enderdash.com/openapi.json";

await createClient({
  input,
  output: "src/generated",
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
});
