import { after, beforeEach, describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { Session, type SessionDelegateInterface, SessionPreHook, SessionRegistry } from "../../../../src/_index.mjs";
import { type MockContextInterface, type MockSessionDelegateInterface, mockContext, mockSessionDelegate } from "../../../../mock/core/_index.mjs";

describe("SessionPreHook", (): void => {
	const CONTEXT: MockContextInterface = mockContext();
	const SESSION_DELEGATE: MockSessionDelegateInterface = mockSessionDelegate();

	const POSTPONE_STUB: SinonStub = stub(Session.prototype, "postponeExpiration");
	const GET_SESSION_STUB: SinonStub = stub(SessionRegistry, "GetSession");
	const ADD_SESSION_STUB: SinonStub = stub(SessionRegistry, "AddSession");

	const DELEGATE: SessionDelegateInterface = {
		fetchData: SESSION_DELEGATE.stubs.fetchData,
		saveData: SESSION_DELEGATE.stubs.saveData,
		removeData: SESSION_DELEGATE.stubs.removeData,
	};

	beforeEach((): void => {
		SESSION_DELEGATE.stubs.fetchData.reset();
		SESSION_DELEGATE.stubs.fetchData.resolves({});
		SESSION_DELEGATE.stubs.saveData.reset();
		SESSION_DELEGATE.stubs.saveData.resolves();
		SESSION_DELEGATE.stubs.removeData.reset();
		SESSION_DELEGATE.stubs.removeData.resolves();
		POSTPONE_STUB.reset();
		POSTPONE_STUB.returns(undefined);
		CONTEXT.stubs.setContextualItem.reset();
		CONTEXT.stubs.setContextualItem.returns(undefined);
		CONTEXT.request.stubs.getCookie.reset();
		CONTEXT.request.stubs.getCookie.returns(undefined);
		CONTEXT.response.stubs.setCookie.reset();
		CONTEXT.response.stubs.setCookie.returns(undefined);
		GET_SESSION_STUB.reset();
		GET_SESSION_STUB.returns(undefined);
		ADD_SESSION_STUB.reset();
		ADD_SESSION_STUB.returns(undefined);
	});

	after((): void => {
		POSTPONE_STUB.restore();
		CONTEXT.stubs.setContextualItem.restore();
		CONTEXT.request.stubs.getCookie.restore();
		CONTEXT.response.stubs.setCookie.restore();
		GET_SESSION_STUB.restore();
		ADD_SESSION_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new session pre-hook", (): void => {
			const HOOK: SessionPreHook = new SessionPreHook(DELEGATE);

			strictEqual(Reflect.get(HOOK, "delegate"), DELEGATE);
		});
	});

	describe("execute", (): void => {
		it("should initialize a session for requests without session cookie", async (): Promise<void> => {
			const HOOK: SessionPreHook = new SessionPreHook(DELEGATE);

			await HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getCookie.callCount, 1, "'RichClientRequest.getCookie' have been called exactly once");
			strictEqual(POSTPONE_STUB.callCount, 1, "'Session.postponeExpiration' should have been called exactly once");
			strictEqual(GET_SESSION_STUB.callCount, 0, "'SessionRegistry.GetSession' should not have been called");
			strictEqual(ADD_SESSION_STUB.callCount, 1, "'SessionRegistry.AddSession' should have been called exactly once");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 1, "'ExecutionContext.setContextualItem' should have been called exactly once");
			strictEqual(CONTEXT.response.stubs.setCookie.callCount, 1, "'RichServerResponse.setCookie' should have been called exactly once");
			strictEqual(SESSION_DELEGATE.stubs.fetchData.callCount, 0, "'SessionDelegate.fetchData' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.saveData.callCount, 0, "'SessionDelegate.saveData' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.removeData.callCount, 0, "'SessionDelegate.removeData' should not have been called");
		});

		it("should refresh a session for requests with session cookie and the session is still in the registry", async (): Promise<void> => {
			CONTEXT.request.stubs.getCookie.returns("00000000-0000-0000-0000-000000000000");
			GET_SESSION_STUB.returns(new Session("00000000-0000-0000-0000-000000000000", DELEGATE));

			// Called by the constructor
			POSTPONE_STUB.resetHistory();

			const HOOK: SessionPreHook = new SessionPreHook(DELEGATE);

			await HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getCookie.callCount, 1, "'RichClientRequest.getCookie' have been called exactly once");
			strictEqual(POSTPONE_STUB.callCount, 1, "'Session.postponeExpiration' should have been called exactly once");
			strictEqual(GET_SESSION_STUB.callCount, 1, "'SessionRegistry.GetSession' should have been called exactly once");
			strictEqual(ADD_SESSION_STUB.callCount, 0, "'SessionRegistry.AddSession' should not have been called");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 1, "'ExecutionContext.setContextualItem' should have been called exactly once");
			strictEqual(CONTEXT.response.stubs.setCookie.callCount, 0, "'RichServerResponse.setCookie' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.fetchData.callCount, 0, "'SessionDelegate.fetchData' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.saveData.callCount, 0, "'SessionDelegate.saveData' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.removeData.callCount, 0, "'SessionDelegate.removeData' should not have been called");
		});

		it("should recreate a session for requests with session cookie but the session is no longer in the registry", async (): Promise<void> => {
			CONTEXT.request.stubs.getCookie.returns("00000000-0000-0000-0000-000000000000");

			const HOOK: SessionPreHook = new SessionPreHook(DELEGATE);

			await HOOK.execute(CONTEXT.instance);

			strictEqual(CONTEXT.request.stubs.getCookie.callCount, 1, "'RichClientRequest.getCookie' have been called exactly once");
			strictEqual(POSTPONE_STUB.callCount, 1, "'Session.postponeExpiration' should have been called exactly once");
			strictEqual(GET_SESSION_STUB.callCount, 1, "'SessionRegistry.GetSession' should have been called exactly once");
			strictEqual(ADD_SESSION_STUB.callCount, 1, "'SessionRegistry.AddSession' should have been called exactly once");
			strictEqual(CONTEXT.stubs.setContextualItem.callCount, 1, "'ExecutionContext.setContextualItem' should have been called exactly once");
			strictEqual(CONTEXT.response.stubs.setCookie.callCount, 0, "'RichServerResponse.setCookie' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.fetchData.callCount, 1, "'SessionDelegate.fetchData' should have been called exactly once");
			strictEqual(SESSION_DELEGATE.stubs.saveData.callCount, 0, "'SessionDelegate.saveData' should not have been called");
			strictEqual(SESSION_DELEGATE.stubs.removeData.callCount, 0, "'SessionDelegate.removeData' should not have been called");
		});
	});
});
