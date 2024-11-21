import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, rejects, strictEqual } from "node:assert";
import { type SinonFakeTimers, type SinonSpy, type SinonStub, spy, stub, useFakeTimers } from "sinon";
import { MillisecondEnum, ReflectUtility } from "@vitruvius-labs/toolbox";
import { Server, Session, SessionCleanupService, SessionConstantEnum, SessionRegistry } from "../../../../src/_index.mjs";
import { type MockSessionDelegateInterface, mockSessionDelegate } from "../../../../mock/core/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("SessionCleanupService", (): void => {
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
	const SET_INTERVAL_SPY: SinonSpy = spy(CLOCK, "setInterval");
	const CLEAR_INTERVAL_SPY: SinonSpy = spy(CLOCK, "clearInterval");
	const SERVER_HANDLE_ERROR_STUB: SinonStub = stub(Server, "HandleError");
	const CLEANUP_STUB: SinonStub = stub(SessionCleanupService, "Cleanup");
	const CLEAR_DATA_STUB: SinonStub = stub(Session.prototype, "clearData");
	const IS_EXPIRED_STUB: SinonStub = stub(Session.prototype, "isExpired");
	const REMOVE_SESSION_STUB: SinonStub = stub(SessionRegistry, "RemoveSession");
	const LIST_SESSIONS_STUB: SinonStub = stub(SessionRegistry, "ListSessions");

	beforeEach((): void => {
		clearInterval(Reflect.get(SessionCleanupService, "TIMER"));
		ReflectUtility.Set(SessionCleanupService, "TIMER", undefined);
		ReflectUtility.Set(SessionRegistry, "SESSIONS", new Map());

		CLOCK.reset();
		SET_INTERVAL_SPY.resetHistory();
		CLEAR_INTERVAL_SPY.resetHistory();
		SERVER_HANDLE_ERROR_STUB.reset();
		SERVER_HANDLE_ERROR_STUB.callThrough();
		CLEANUP_STUB.reset();
		CLEANUP_STUB.callThrough();
		CLEAR_DATA_STUB.reset();
		CLEAR_DATA_STUB.callThrough();
		IS_EXPIRED_STUB.reset();
		IS_EXPIRED_STUB.callThrough();
		REMOVE_SESSION_STUB.reset();
		REMOVE_SESSION_STUB.callThrough();
		LIST_SESSIONS_STUB.reset();
		LIST_SESSIONS_STUB.callThrough();
	});

	after((): void => {
		clearInterval(Reflect.get(SessionCleanupService, "TIMER"));
		ReflectUtility.Set(SessionCleanupService, "TIMER", undefined);
		ReflectUtility.Set(SessionRegistry, "SESSIONS", new Map());

		SET_INTERVAL_SPY.restore();
		CLEAR_INTERVAL_SPY.restore();
		CLOCK.restore();
		SERVER_HANDLE_ERROR_STUB.restore();
		CLEANUP_STUB.restore();
		CLEAR_DATA_STUB.restore();
		IS_EXPIRED_STUB.restore();
		REMOVE_SESSION_STUB.restore();
		LIST_SESSIONS_STUB.restore();
	});

	describe("Cleanup", (): void => {
		it("should remove expired sessions and clear their data", async (): Promise<void> => {
			const SESSION_1: Session = new Session("A");
			const SESSION_2: Session = new Session("B");
			const SESSION_3: Session = new Session("C");

			IS_EXPIRED_STUB.onFirstCall().returns(true);
			IS_EXPIRED_STUB.onSecondCall().returns(false);
			IS_EXPIRED_STUB.onThirdCall().returns(true);

			REMOVE_SESSION_STUB.onFirstCall().returns(undefined);
			REMOVE_SESSION_STUB.onSecondCall().returns(undefined);

			const MAP: Map<string, Session> = new Map([["A", SESSION_1], ["B", SESSION_2], ["C", SESSION_3]]);

			LIST_SESSIONS_STUB.returns(MAP.values());

			await SessionCleanupService.Cleanup();

			strictEqual(IS_EXPIRED_STUB.callCount, 3, "The 'isExpired' method should be called for each session");
			strictEqual(IS_EXPIRED_STUB.firstCall.thisValue, SESSION_1);
			strictEqual(IS_EXPIRED_STUB.secondCall.thisValue, SESSION_2);
			strictEqual(IS_EXPIRED_STUB.thirdCall.thisValue, SESSION_3);
			strictEqual(REMOVE_SESSION_STUB.callCount, 2, "The 'SessionRegistry.RemoveSession' method should be called for each expired session");
			deepStrictEqual(REMOVE_SESSION_STUB.firstCall.args, [SESSION_1]);
			deepStrictEqual(REMOVE_SESSION_STUB.secondCall.args, [SESSION_3]);
			strictEqual(CLEAR_DATA_STUB.callCount, 2, "The 'clearData' method should be called for each expired session");
			deepStrictEqual(CLEAR_DATA_STUB.firstCall.thisValue, SESSION_1);
			deepStrictEqual(CLEAR_DATA_STUB.secondCall.thisValue, SESSION_3);
		});

		it("should handle errors while clearing data", async (): Promise<void> => {
			const ERRORS: Array<Error> = [
				new Error("Test error 1"),
				new Error("Test error 2"),
				new Error("Test error 3"),
			];

			const MOCK_DELEGATE: MockSessionDelegateInterface = mockSessionDelegate();

			MOCK_DELEGATE.stubs.removeData.onFirstCall().rejects(ERRORS[0]);
			MOCK_DELEGATE.stubs.removeData.onSecondCall().rejects(ERRORS[1]);
			MOCK_DELEGATE.stubs.removeData.onThirdCall().rejects(ERRORS[2]);

			const SESSION_1: Session = new Session("A", MOCK_DELEGATE.instance);
			const SESSION_2: Session = new Session("B", MOCK_DELEGATE.instance);
			const SESSION_3: Session = new Session("C", MOCK_DELEGATE.instance);

			IS_EXPIRED_STUB.returns(true);
			REMOVE_SESSION_STUB.callThrough();

			const MAP: Map<string, Session> = new Map([["A", SESSION_1], ["B", SESSION_2], ["C", SESSION_3]]);

			LIST_SESSIONS_STUB.returns(MAP.values());

			await rejects(SessionCleanupService.Cleanup(), createErrorTest(new AggregateError(ERRORS, "Failed to cleanup some expired sessions")));
		});
	});

	describe("StartWatching", (): void => {
		it("should do nothing if the job is already running", (): void => {
			CLEANUP_STUB.resolves();

			const JOB: unknown = setInterval((): void => {}, 1000);

			SET_INTERVAL_SPY.resetHistory();

			ReflectUtility.Set(SessionCleanupService, "TIMER", JOB);

			SessionCleanupService.StartWatching();

			strictEqual(SET_INTERVAL_SPY.callCount, 0, "'setInterval' should not be called");
		});

		it("should start the job if it is not running", (): void => {
			CLEANUP_STUB.resolves();

			SessionCleanupService.StartWatching();

			CLOCK.tick(1 + SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE);

			strictEqual(SET_INTERVAL_SPY.callCount, 1, "'setInterval' should be called exactly once");
			strictEqual(SessionCleanupService["TIMER"], SET_INTERVAL_SPY.firstCall.returnValue);
			strictEqual(CLEANUP_STUB.callCount, 1, "The 'Cleanup' method should be called by the job");
		});

		it("should handle errors", async (): Promise<void> => {
			const ERROR: Error = new Error("Test error");

			CLEANUP_STUB.rejects(ERROR);
			SERVER_HANDLE_ERROR_STUB.resolves();

			SessionCleanupService.StartWatching();

			CLOCK.tick(1 + SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE);

			strictEqual(SET_INTERVAL_SPY.callCount, 1, "'setInterval' should be called exactly once");
			strictEqual(SessionCleanupService["TIMER"], SET_INTERVAL_SPY.firstCall.returnValue);
			strictEqual(CLEANUP_STUB.callCount, 1, "The 'Cleanup' method should be called by the job");

			await Promise.allSettled([CLEANUP_STUB.firstCall.returnValue]);

			strictEqual(SERVER_HANDLE_ERROR_STUB.called, true, "'Server.HandleError' should be called to handle the error");
			deepStrictEqual(SERVER_HANDLE_ERROR_STUB.firstCall.args, [ERROR]);
		});
	});

	describe("StopWatching", (): void => {
		it("should do nothing if the job is not running", (): void => {
			const WRAPPER = (): void => {
				SessionCleanupService.StopWatching();
			};

			doesNotThrow(WRAPPER);

			strictEqual(CLEAR_INTERVAL_SPY.callCount, 0, "'clearInterval' should not be called");
		});

		it("should stop the job if it is running", (): void => {
			const JOB: unknown = setInterval((): void => {}, 1000);

			ReflectUtility.Set(SessionCleanupService, "TIMER", JOB);

			SessionCleanupService.StopWatching();

			strictEqual(CLEAR_INTERVAL_SPY.callCount, 1, "'clearInterval' should be called exactly once");
			deepStrictEqual(CLEAR_INTERVAL_SPY.firstCall.args, [JOB]);
			strictEqual(SessionCleanupService["TIMER"], undefined);
		});
	});
});
