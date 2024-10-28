import type { BasePreHook } from "../../base.pre-hook.mjs";
import type { BasePostHook } from "../../base.post-hook.mjs";
import type { BaseErrorHook } from "../../base.error-hook.mjs";

type HookRunnerType<T extends BasePreHook | BasePostHook | BaseErrorHook> = (hook: T) => Promise<void>;

export type { HookRunnerType };
