import { stub } from "sinon";
import { Server, type ServerInstantiationType } from "../../../src/_index.mjs";
import { type MockServerInterface, baseMock } from "../../_index.mjs";

function mockServer(parameters?: ServerInstantiationType): MockServerInterface
{
	const instantiation: ServerInstantiationType = parameters ?? {
		https: false,
		port: 80,
	};

	// @ts-expect-error: We are mocking a server instance.
	const instance: Server = new Server(instantiation);

	const MOCK: MockServerInterface = baseMock({
		instance: instance,
		stubs: {
			start: stub(instance, "start"),
			isHTTPS: stub(instance, "isHTTPS"),
			handleError: stub(instance, "handleError"),
			requestListener: stub(instance, "requestListener"),
			// @ts-expect-error: Private method
			handlePublicAssets: stub(instance, "handlePublicAssets"),
			// @ts-expect-error: Private method
			handleAutomaticPreflight: stub(instance, "handleAutomaticPreflight"),
			// @ts-expect-error: Private method
			handleEndpoints: stub(instance, "handleEndpoints"),
			// @ts-expect-error: Private method
			finalizeResponse: stub(instance, "finalizeResponse"),
		},
	});

	MOCK.callThroughAllStubs();

	return MOCK;
}

export { mockServer };
