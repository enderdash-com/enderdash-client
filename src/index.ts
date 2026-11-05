/**
 * Generated TypeScript client for the Enderdash HTTP API.
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

export interface EnderdashClientOptions {
  apiKey?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

export function configureEnderdashClient(
  targetClient: Client,
  options: EnderdashClientOptions = {},
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

export function createEnderdashHeyApiClient(
  options: EnderdashClientOptions = {},
) {
  const targetClient = createHeyApiClient(
    createConfig({
      baseUrl: options.baseUrl ?? "https://app.enderdash.com/api/trpc",
    }),
  );

  return configureEnderdashClient(targetClient, options);
}

export function createEnderdashClient(options: EnderdashClientOptions = {}) {
  return new Sdk({ client: createEnderdashHeyApiClient(options) });
}

/** @deprecated Use EnderdashClientOptions. */
export type EnderDashClientOptions = EnderdashClientOptions;

/** @deprecated Use configureEnderdashClient. */
export const configureEnderDashClient = configureEnderdashClient;

/** @deprecated Use createEnderdashHeyApiClient. */
export const createEnderDashHeyApiClient = createEnderdashHeyApiClient;

/** @deprecated Use createEnderdashClient. */
export const createEnderDashClient = createEnderdashClient;
