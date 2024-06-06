import type { Socket } from "node:net";
import type { BaseMockInterface } from "./base-mock.interface.mjs";

interface MockSocketInterface extends BaseMockInterface<Socket, keyof Socket>
{
}

export type { MockSocketInterface };
