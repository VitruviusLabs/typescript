import type { JSONValueType } from "./json-value.type.mjs";

/**
 * JSON object type
 *
 * @remarks
 * Parsing JSON will often result in this type.
 */
type JSONObjectType = Record<string, JSONValueType>;

export type { JSONObjectType };
