import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject } from "node:assert";
import { type SinonFakeTimers, stub, useFakeTimers } from "sinon";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { Session, type SessionDelegateInterface, SessionFactory } from "../../../../src/_index.mjs";

describe("SessionFactory", (): void => {
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date"] });

	beforeEach((): void => {
		CLOCK.reset();
	});

	after((): void => {
		CLOCK.restore();
	});

	describe("Create", (): void => {
		it("should create a new session", async (): Promise<void> => {
			const DELEGATE: SessionDelegateInterface = {
				fetchData: stub().resolves({ lorem: "ipsum" }),
				saveData: stub().rejects(),
				removeData: stub().rejects(),
			};

			const EXPECTED: Session = new Session("00000000-0000-0000-0000-000000000000", DELEGATE);

			EXPECTED.setData({ lorem: "ipsum" });

			const RESULT: unknown = SessionFactory.Create("00000000-0000-0000-0000-000000000000", DELEGATE);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});
});
