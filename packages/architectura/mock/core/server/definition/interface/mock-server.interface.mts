import type { SinonStub } from "sinon";
import type { BaseMockInterface } from "../../../../_index.mjs";
import type { Server } from "../../../../../src/_index.mjs";

interface MockServerInterface extends BaseMockInterface<Server>
{
	stubs: BaseMockInterface<Server>["stubs"] & {
		handlePublicAssets: SinonStub;
		handleAutomaticPreflight: SinonStub;
		handleEndpoints: SinonStub;
		finalizeResponse: SinonStub;
	};
}

export type { MockServerInterface };
