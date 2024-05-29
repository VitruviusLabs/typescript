import { after, beforeEach, describe, it } from "node:test";
import { type SinonFakeTimers, stub, useFakeTimers } from "sinon";
import { Session, type SessionDelegateInterface, SessionFactory } from "../../../../src/_index.mjs";
import { deepStrictResolves } from "../../../utils/assert/deep-strict-resolves.mjs";

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

			const EXPECTED: Session = new Session("lorem-ipsum", DELEGATE);

			EXPECTED.setData({ lorem: "ipsum" });

			await deepStrictResolves(SessionFactory.Create("lorem-ipsum", DELEGATE), EXPECTED);
		});
	});
});
