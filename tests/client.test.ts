import assert from "node:assert/strict";
import { test } from "node:test";

import { createEnderdashHeyApiClient, createEnderDashHeyApiClient } from "../src/index.js";

for (const [name, createClient] of [
  ["Enderdash", createEnderdashHeyApiClient],
  // oxlint-disable-next-line typescript/no-deprecated -- This test covers the deprecated compatibility alias.
  ["legacy EnderDash", createEnderDashHeyApiClient],
] as const) {
  test(`${name} client retains custom endpoints and API-key authentication`, async () => {
    const requests: Request[] = [];
    const client = createClient({
      apiKey: "test-api-key",
      baseUrl: "https://example.com/api",
      fetch: (input, init) => {
        requests.push(new Request(input, init));
        return Promise.resolve(Response.json({ ok: true }));
      },
    });

    await client.get({ url: "/health" });

    assert.equal(requests.length, 1);
    const [request] = requests;
    assert.ok(request);
    assert.equal(request.url, "https://example.com/api/health");
    assert.equal(request.headers.get("X-API-Key"), "test-api-key");
  });
}
