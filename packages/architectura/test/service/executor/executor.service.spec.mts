import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, ok, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { type ExecutorInstantiationInterface, ExecutorService } from "../../../src/_index.mjs";

describe("ExecutorService", (): void => {
	// @ts-expect-error: Stubbing a private method
	const TIMEOUT_STUB: SinonStub = stub(ExecutorService, "Timeout");

	beforeEach((): void => {
		TIMEOUT_STUB.reset();
		TIMEOUT_STUB.resolves();
	});

	after((): void => {
		TIMEOUT_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new executor service", (): void => {
			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 1,
				retryDelay: 5,
				callable: (): void => {},
				customDelayComputor: (failed_tries: number, retry_delay: number): number => {
					return failed_tries * retry_delay;
				},
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			strictEqual(EXECUTOR["maxTries"], PARAMETERS.maxTries);
			strictEqual(EXECUTOR["retryDelay"], PARAMETERS.retryDelay);
			strictEqual(EXECUTOR["callable"], PARAMETERS.callable);
			strictEqual(EXECUTOR["customComputeDelay"], PARAMETERS.customDelayComputor);
		});
	});

	describe("execute", (): void => {
		it("should execute the callable", async (): Promise<void> => {
			const CALLABLE_STUB: SinonStub = stub().resolves();

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 1,
				retryDelay: 5,
				callable: CALLABLE_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await EXECUTOR.execute();

			strictEqual(CALLABLE_STUB.callCount, 1, "The callable must be called at least once.");
		});

		it("should retry executing the callable as many times as necessary up to the limit", async (): Promise<void> => {
			const CALLABLE_STUB: SinonStub = stub();

			CALLABLE_STUB.onFirstCall().rejects();
			CALLABLE_STUB.onSecondCall().rejects();
			CALLABLE_STUB.onThirdCall().resolves();

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 3,
				retryDelay: 5,
				callable: CALLABLE_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await EXECUTOR.execute();

			strictEqual(CALLABLE_STUB.callCount, 3, "The callable should have been called as many times as necessary.");
		});

		it("should throw if it failed to execute the callable before reaching the limit", async (): Promise<void> => {
			const CALLABLE_STUB: SinonStub = stub().rejects();

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 3,
				retryDelay: 5,
				callable: CALLABLE_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await rejects(EXECUTOR.execute());

			strictEqual(CALLABLE_STUB.callCount, 3, "The callable should have been called as many times as necessary.");
		});

		it("should wait between each attempt. (default formula)", async (): Promise<void> => {
			const CALLABLE_STUB: SinonStub = stub();

			CALLABLE_STUB.onFirstCall().rejects();
			CALLABLE_STUB.onSecondCall().rejects();
			CALLABLE_STUB.onThirdCall().resolves();

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 3,
				retryDelay: 20,
				callable: CALLABLE_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await EXECUTOR.execute();

			strictEqual(CALLABLE_STUB.callCount, 3, "The callable should have been called as many times as necessary.");
			strictEqual(TIMEOUT_STUB.callCount, 2, "You must wait between each attempt, and only in between.");
			ok(CALLABLE_STUB.firstCall.calledBefore(TIMEOUT_STUB.firstCall), "The first attempt must be immediate.");
			ok(TIMEOUT_STUB.firstCall.calledBefore(CALLABLE_STUB.secondCall), "You must wait before the second attempt.");
			deepStrictEqual(TIMEOUT_STUB.firstCall.args, [20], "Incorrect delay before the second attempt.");
			ok(CALLABLE_STUB.secondCall.calledBefore(TIMEOUT_STUB.secondCall), "The second attempt should occur after the wait time.");
			ok(TIMEOUT_STUB.secondCall.calledBefore(CALLABLE_STUB.thirdCall), "You must wait before the third attempt.");
			deepStrictEqual(TIMEOUT_STUB.secondCall.args, [40], "Incorrect delay before the third attempt.");
		});

		it("should wait between each attempt. (default formula)", async (): Promise<void> => {
			const MAX_TRIES: number = 5;
			const RETRY_DELAY: number = 15;
			const CALLABLE_STUB: SinonStub = stub();

			for (let attempt: number = 1; attempt < MAX_TRIES; ++attempt)
			{
				CALLABLE_STUB.onCall(attempt - 1).rejects();
			}

			CALLABLE_STUB.onCall(MAX_TRIES - 1).resolves();

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: MAX_TRIES,
				retryDelay: RETRY_DELAY,
				callable: CALLABLE_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await EXECUTOR.execute();

			strictEqual(CALLABLE_STUB.callCount, MAX_TRIES, "The callable should have been called as many times as necessary.");
			strictEqual(TIMEOUT_STUB.callCount, MAX_TRIES - 1, "You must wait between each attempt, and only in between.");

			for (let attempt: number = 1; attempt < MAX_TRIES; ++attempt)
			{
				const MESSAGE: string = attempt === 1 ? "The first attempt must be immediate." : `You must wait before attempt #${attempt.toFixed(0)}.`;

				ok(CALLABLE_STUB.getCall(attempt - 1).calledBefore(TIMEOUT_STUB.getCall(attempt - 1)), MESSAGE);
				ok(TIMEOUT_STUB.getCall(attempt - 1).calledBefore(CALLABLE_STUB.getCall(attempt)), `Attempt #${attempt.toFixed(0)} should occur after the wait time.`);
				deepStrictEqual(TIMEOUT_STUB.getCall(attempt - 1).args, [RETRY_DELAY * attempt], `Incorrect delay before attempt #${attempt.toFixed(0)}.`);
			}
		});

		it("should use the custom delay computer when provided", async (): Promise<void> => {
			const CALLABLE_STUB: SinonStub = stub();
			const COMPUTOR_STUB: SinonStub = stub();

			CALLABLE_STUB.onFirstCall().rejects();
			CALLABLE_STUB.onSecondCall().rejects();
			CALLABLE_STUB.onThirdCall().resolves();

			COMPUTOR_STUB.onFirstCall().returns(31);
			COMPUTOR_STUB.onSecondCall().returns(71);

			const PARAMETERS: ExecutorInstantiationInterface = {
				maxTries: 3,
				retryDelay: 20,
				callable: CALLABLE_STUB,
				customDelayComputor: COMPUTOR_STUB,
			};

			const EXECUTOR: ExecutorService = new ExecutorService(PARAMETERS);

			await EXECUTOR.execute();

			strictEqual(CALLABLE_STUB.callCount, 3, "The callable should have been called as many times as necessary.");
			strictEqual(COMPUTOR_STUB.callCount, 2, "You must call the computor for each wait.");
			strictEqual(TIMEOUT_STUB.callCount, 2, "You must wait between each attempt, and only in between.");

			ok(CALLABLE_STUB.firstCall.calledBefore(COMPUTOR_STUB.firstCall), "The first attempt must be immediate.");
			ok(COMPUTOR_STUB.firstCall.calledBefore(TIMEOUT_STUB.firstCall), "You must compute the first waiting duration.");
			deepStrictEqual(COMPUTOR_STUB.firstCall.args, [1, 20], "Incorrect parameters given to the custom delay computor.");
			ok(TIMEOUT_STUB.firstCall.calledBefore(CALLABLE_STUB.secondCall), "You must wait before the second attempt.");
			deepStrictEqual(TIMEOUT_STUB.firstCall.args, [31], "Incorrect delay before the second attempt.");
			ok(CALLABLE_STUB.secondCall.calledBefore(COMPUTOR_STUB.secondCall), "The second attempt should occur after the wait time.");
			ok(COMPUTOR_STUB.secondCall.calledBefore(TIMEOUT_STUB.secondCall), "You must compute the second waiting duration.");
			deepStrictEqual(COMPUTOR_STUB.secondCall.args, [2, 20], "Incorrect parameters given to the custom delay computor.");
			ok(TIMEOUT_STUB.secondCall.calledBefore(CALLABLE_STUB.thirdCall), "You must wait before the third attempt.");
			deepStrictEqual(TIMEOUT_STUB.secondCall.args, [71], "Incorrect delay before the third attempt.");
		});
	});
});
