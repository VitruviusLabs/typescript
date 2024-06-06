import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual } from "node:assert";
import { type SinonFakeTimers, type SinonSpy, type SinonStub, spy, stub, useFakeTimers } from "sinon";
import { MillisecondEnum, ReflectUtility } from "@vitruvius-labs/toolbox";
import { Server, Session, SessionCleanupService, SessionConstantEnum, SessionRegistry } from "../../../../src/_index.mjs";

describe("SessionCleanupService", (): void => {
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
	const SET_INTERVAL_SPY: SinonSpy = spy(CLOCK, "setInterval");
	const CLEAR_INTERVAL_SPY: SinonSpy = spy(CLOCK, "clearInterval");
	const SERVER_HANDLE_ERROR_STUB: SinonStub = stub(Server, "HandleError");
	const CLEANUP_STUB: SinonStub = stub(SessionCleanupService, "Cleanup");
	const CLEAR_DATA_STUB: SinonStub = stub(Session.prototype, "clearData");

	beforeEach((): void => {
		clearInterval(Reflect.get(SessionCleanupService, "TIMER"));
		ReflectUtility.Set(SessionCleanupService, "TIMER", undefined);

		CLOCK.reset();
		SET_INTERVAL_SPY.resetHistory();
		CLEAR_INTERVAL_SPY.resetHistory();
		SERVER_HANDLE_ERROR_STUB.reset();
		SERVER_HANDLE_ERROR_STUB.callThrough();
		CLEANUP_STUB.reset();
		CLEANUP_STUB.resolves();
		CLEAR_DATA_STUB.reset();
		CLEAR_DATA_STUB.resolves();
	});

	after((): void => {
		SET_INTERVAL_SPY.restore();
		CLEAR_INTERVAL_SPY.restore();
		CLOCK.restore();
		SERVER_HANDLE_ERROR_STUB.restore();
		CLEANUP_STUB.restore();
		CLEAR_DATA_STUB.restore();
	});

	describe("Cleanup", (): void => {
		beforeEach((): void => {
			CLEANUP_STUB.callThrough();
		});

		it("should remove expired sessions and clear their data", async (): Promise<void> => {
			const SESSION_1: Session = new Session("A");
			const SESSION_2: Session = new Session("B");
			const SESSION_3: Session = new Session("C");

			SessionRegistry.AddSession(SESSION_1);
			SessionRegistry.AddSession(SESSION_2);
			SessionRegistry.AddSession(SESSION_3);

			ReflectUtility.Set(SESSION_1, "expirationTime", -1);
			ReflectUtility.Set(SESSION_3, "expirationTime", -1);

			await SessionCleanupService.Cleanup();

			deepStrictEqual(ReflectUtility.Get(SessionRegistry, "SESSIONS"), new Map([["B", SESSION_2]]));
			strictEqual(CLEAR_DATA_STUB.callCount, 2, "The 'clearData' method should be called for each expired session");
			deepStrictEqual(CLEAR_DATA_STUB.firstCall.thisValue, SESSION_1);
			deepStrictEqual(CLEAR_DATA_STUB.secondCall.thisValue, SESSION_3);
		});
	});

	describe("StartWatching", (): void => {
		it("should do nothing if the job is already running", (): void => {
			const JOB: unknown = setInterval((): void => {}, 1000);

			SET_INTERVAL_SPY.resetHistory();

			ReflectUtility.Set(SessionCleanupService, "TIMER", JOB);

			SessionCleanupService.StartWatching();

			strictEqual(SET_INTERVAL_SPY.callCount, 0, "'setInterval' should not be called");
		});

		it("should start the job if it is not running", (): void => {
			SessionCleanupService.StartWatching();

			CLOCK.tick(1 + SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE);

			strictEqual(SET_INTERVAL_SPY.callCount, 1, "'setInterval' should be called exactly once");
			strictEqual(ReflectUtility.Get(SessionCleanupService, "TIMER"), SET_INTERVAL_SPY.firstCall.returnValue);
			strictEqual(CLEANUP_STUB.callCount, 1, "The 'Cleanup' method should be called by the job");
		});

		it("should handle errors", async (): Promise<void> => {
			const ERROR: Error = new Error("Test error");

			CLEANUP_STUB.rejects(ERROR);
			SERVER_HANDLE_ERROR_STUB.resolves();

			SessionCleanupService.StartWatching();

			CLOCK.tick(1 + SessionConstantEnum.MINUTES_BETWEEN_CLEANUP * MillisecondEnum.MINUTE);

			strictEqual(SET_INTERVAL_SPY.callCount, 1, "'setInterval' should be called exactly once");
			strictEqual(ReflectUtility.Get(SessionCleanupService, "TIMER"), SET_INTERVAL_SPY.firstCall.returnValue);
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
			strictEqual(ReflectUtility.Get(SessionCleanupService, "TIMER"), undefined);
		});
	});
});
