/**
 * Generated TypeScript client for the EnderDash HTTP API.
 *
 * @module
 */
import { configureTRPCHeyApiClient } from "@trpc/openapi/heyapi";
import superjson from "superjson";
import { client } from "./generated/client.gen.js";
import {
  createClient as createHeyApiClient,
  createConfig,
  type Client,
} from "./generated/client/index.js";
import { Sdk } from "./generated/sdk.gen.js";

export { client } from "./generated/client.gen.js";
export type { Client } from "./generated/client/index.js";
export { Sdk } from "./generated/sdk.gen.js";
export * from "./generated/types.gen.js";

export interface EnderDashClientOptions {
  apiKey?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

export function configureEnderDashClient(
  targetClient: Client,
  options: EnderDashClientOptions = {},
) {
  const headers = new Headers(options.headers);
  if (options.apiKey) {
    headers.set("X-API-Key", options.apiKey);
  }

  configureTRPCHeyApiClient(targetClient, {
    baseUrl: options.baseUrl ?? "https://app.enderdash.com/api/trpc",
    fetch: options.fetch,
    headers,
    transformer: superjson,
  });

  return targetClient;
}

export function createEnderDashHeyApiClient(
  options: EnderDashClientOptions = {},
) {
  const targetClient = createHeyApiClient(
    createConfig({
      baseUrl: options.baseUrl ?? "https://app.enderdash.com/api/trpc",
    }),
  );

  return configureEnderDashClient(targetClient, options);
}

export function createEnderDashClient(options: EnderDashClientOptions = {}) {
  return new Sdk({ client: createEnderDashHeyApiClient(options) });
}
