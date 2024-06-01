import type { SessionDelegateInterface } from "../src/_index.mjs";
import type { MockSessionDelegateInterface } from "./definition/interface/mock-session-delegate.interface.mjs";
import { type SinonStub, stub } from "sinon";
import { baseMock } from "./base-mock.mjs";

function mockSessionDelegate(): MockSessionDelegateInterface
{
	const FETCH_DATA_STUB: SinonStub = stub();
	const SAVE_DATA_STUB: SinonStub = stub();
	const REMOVE_DATA_STUB: SinonStub = stub();

	const DELEGATE: SessionDelegateInterface = {
		fetchData: FETCH_DATA_STUB,
		saveData: SAVE_DATA_STUB,
		removeData: REMOVE_DATA_STUB,
	};

	return baseMock({
		instance: DELEGATE,
		stubs: {
			fetchData: FETCH_DATA_STUB,
			saveData: SAVE_DATA_STUB,
			removeData: REMOVE_DATA_STUB,
		},
	});
}

export { mockSessionDelegate };
