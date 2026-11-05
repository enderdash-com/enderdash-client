import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createEnderdashHeyApiClient,
  createEnderDashHeyApiClient,
} from "../src/index.js";

for (const [name, createClient] of [
  ["Enderdash", createEnderdashHeyApiClient],
  ["legacy EnderDash", createEnderDashHeyApiClient],
] as const) {
  test(`${name} client retains custom endpoints and API-key authentication`, async () => {
    const requests: Request[] = [];
    const client = createClient({
      apiKey: "test-api-key",
      baseUrl: "https://example.com/api",
      fetch: async (input, init) => {
        requests.push(new Request(input, init));
        return Response.json({ ok: true });
      },
    });

    await client.get({ url: "/health" });

    assert.equal(requests.length, 1);
    assert.equal(requests[0]?.url, "https://example.com/api/health");
    assert.equal(requests[0]?.headers.get("X-API-Key"), "test-api-key");
  });
}
