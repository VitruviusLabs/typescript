import type { IncomingMessage } from "node:http";
import type { SinonStub } from "sinon";
import type { BaseMockInterface } from "../../../_index.mjs";
import type { MockSocketInterface } from "./mock-socket.interface.mjs";
import type { RichClientRequest } from "../../../../src/_index.mjs";

/**
 * @privateRemarks
 * - Incoming message methods are excluded from the stubs
 */
interface MockRequestInterface extends BaseMockInterface<RichClientRequest, keyof IncomingMessage>
{
	socket: MockSocketInterface;
	stubs: BaseMockInterface<RichClientRequest, keyof IncomingMessage>["stubs"] & {
		listenForContent: SinonStub;
	};
}

export type { MockRequestInterface };
