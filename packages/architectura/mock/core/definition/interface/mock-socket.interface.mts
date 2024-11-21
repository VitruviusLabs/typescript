import type { Socket } from "node:net";
import type { BaseMockInterface } from "../../../_index.mjs";

interface MockSocketInterface extends BaseMockInterface<Socket, keyof Socket>
{
}

export type { MockSocketInterface };
