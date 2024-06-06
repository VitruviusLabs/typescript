import type { BinaryLike, KeyObject } from "node:crypto";

/**
 * Possible types of JWT secret
 */
type SecretType = BinaryLike | KeyObject;

export type { SecretType };
