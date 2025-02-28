import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { type SinonSpy, type SinonSpyCall, type SinonStub, spy, stub } from "sinon";
import { RootAssertion } from "../../src/assertion/_internal.mjs";

describe("RootAssertion", (): void => {
	describe("constructor", (): void => {
		it("should create a new instance", (): void => {
			const SYMBOL: unique symbol = Symbol("test");

			const ASSERTION: RootAssertion = new RootAssertion(SYMBOL);

			strictEqual(Reflect.get(ASSERTION, "root"), ASSERTION);
			strictEqual(Reflect.get(ASSERTION, "parent"), ASSERTION);
			strictEqual(Reflect.get(ASSERTION, "actualValue"), SYMBOL);
			strictEqual(Reflect.get(ASSERTION, "name"), "value");
		});

		it("should create a new instance (callable)", (): void => {
			const CALLABLE = (): void => {};

			const ASSERTION: RootAssertion = new RootAssertion(CALLABLE);

			strictEqual(Reflect.get(ASSERTION, "actualValue"), CALLABLE);
			strictEqual(Reflect.get(ASSERTION, "name"), "callable");
		});

		it("should create a new instance (SinonSpy)", (): void => {
			class Dummy
			{
				public method(): void {}
			}

			const DUMMY: Dummy = new Dummy();
			const SPY_NAMED: SinonSpy = spy(DUMMY, "method");
			const SPY_ANONYMOUS: SinonSpy = spy();

			const ASSERTION_NAMED: RootAssertion = new RootAssertion(SPY_NAMED);
			const ASSERTION_ANONYMOUS: RootAssertion = new RootAssertion(SPY_ANONYMOUS);

			strictEqual(Reflect.get(ASSERTION_NAMED, "actualValue"), SPY_NAMED);
			strictEqual(Reflect.get(ASSERTION_NAMED, "name"), 'spy of "method"');

			strictEqual(Reflect.get(ASSERTION_ANONYMOUS, "actualValue"), SPY_ANONYMOUS);
			strictEqual(Reflect.get(ASSERTION_ANONYMOUS, "name"), "spy");
		});

		it("should create a new instance (SinonSpyCall)", (): void => {
			class Dummy
			{
				public method(): void {}
			}

			const DUMMY: Dummy = new Dummy();
			const SPY: SinonSpy = spy(DUMMY, "method");

			DUMMY.method();

			const SPY_CALL: SinonSpyCall = SPY.firstCall;

			const ASSERTION_NAMED: RootAssertion = new RootAssertion(SPY_CALL);

			strictEqual(Reflect.get(ASSERTION_NAMED, "actualValue"), SPY_CALL);
			strictEqual(Reflect.get(ASSERTION_NAMED, "name"), "spy call");
		});

		it("should create a new instance (SinonStub)", (): void => {
			class Dummy
			{
				public method(): void {}
			}

			const DUMMY: Dummy = new Dummy();
			const SPY_NAMED: SinonStub = stub(DUMMY, "method");
			const SPY_ANONYMOUS: SinonStub = stub();

			const ASSERTION_NAMED: RootAssertion = new RootAssertion(SPY_NAMED);
			const ASSERTION_ANONYMOUS: RootAssertion = new RootAssertion(SPY_ANONYMOUS);

			strictEqual(Reflect.get(ASSERTION_NAMED, "actualValue"), SPY_NAMED);
			strictEqual(Reflect.get(ASSERTION_NAMED, "name"), 'spy of "method"');

			strictEqual(Reflect.get(ASSERTION_ANONYMOUS, "actualValue"), SPY_ANONYMOUS);
			strictEqual(Reflect.get(ASSERTION_ANONYMOUS, "name"), "spy");
		});
	});
});
