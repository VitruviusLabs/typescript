import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { type SinonFakeTimers, type SinonStub, stub, useFakeTimers } from "sinon";
import { MillisecondEnum, Session, SessionConstantEnum, type SessionDelegateInterface } from "../../../../src/_index.mjs";
import type { JSONObjectType } from "@vitruvius-labs/toolbox";

describe("Session", (): void => {
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date"] });

	beforeEach((): void => {
		CLOCK.reset();
	});

	after((): void => {
		CLOCK.restore();
	});

	describe("constructor", (): void => {
		it("should create a new session", (): void => {
			const DELEGATE: SessionDelegateInterface = {
				fetchData: stub().rejects(),
				saveData: stub().rejects(),
				removeData: stub().rejects(),
			};

			const SESSION: Session = new Session("lorem-ipsum", DELEGATE);

			// @ts-expect-error: For testing purposes
			strictEqual(SESSION.uuid, "lorem-ipsum");
			// @ts-expect-error: For testing purposes
			strictEqual(SESSION.delegate, DELEGATE);
			// @ts-expect-error: For testing purposes
			strictEqual(SESSION.expirationTime, SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE);
			// @ts-expect-error: For testing purposes
			deepStrictEqual(SESSION.data, {});
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			strictEqual(SESSION.getUUID(), "lorem-ipsum");
		});
	});

	describe("isExpired", (): void => {
		it("should return false when the session is not expired", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			CLOCK.now = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;
			strictEqual(SESSION.isExpired(), false);
		});

		it("should return true when the session is expired", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			CLOCK.now = 1 + SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;
			strictEqual(SESSION.isExpired(), true);
		});
	});

	describe("getExpirationDate", (): void => {
		it("should return the expiration date", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			deepStrictEqual(SESSION.getExpirationDate(), new Date(SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE));
		});
	});

	describe("postponeExpiration", (): void => {
		it("should update the expiration date", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			CLOCK.now = 5_000;
			SESSION.postponeExpiration();
			// @ts-expect-error: For testing purposes
			strictEqual(SESSION.expirationTime, 5_000 + SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE);
		});
	});

	describe("getData", (): void => {
		it("should return the data", (): void => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const SESSION: Session = new Session("lorem-ipsum");

			// @ts-expect-error: For testing purposes
			SESSION.data = DATA;

			deepStrictEqual(SESSION.getData(), DATA);
		});
	});

	describe("setData", (): void => {
		it("should keep the data", (): void => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const SESSION: Session = new Session("lorem-ipsum");

			SESSION.setData(DATA);

			// @ts-expect-error: For testing purposes
			deepStrictEqual(SESSION.data, DATA);
		});
	});

	describe("loadData", (): void => {
		it("should load the data", async (): Promise<void> => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const STUB: SinonStub = stub();

			const DELEGATE: SessionDelegateInterface = {
				fetchData: STUB.resolves(DATA),
				saveData: stub().rejects(),
				removeData: stub().rejects(),
			};

			const SESSION: Session = new Session("lorem-ipsum", DELEGATE);

			await SESSION.loadData();

			strictEqual(STUB.calledOnce, true, "fetchData should only be called once");
			deepStrictEqual(STUB.firstCall.args, ["lorem-ipsum"]);
			// @ts-expect-error: For testing purposes
			deepStrictEqual(SESSION.data, DATA);
		});
	});

	describe("saveData", (): void => {
		it("should save the data", async (): Promise<void> => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const STUB: SinonStub = stub();

			const DELEGATE: SessionDelegateInterface = {
				fetchData: stub().rejects(),
				saveData: STUB.resolves(),
				removeData: stub().rejects(),
			};

			const SESSION: Session = new Session("lorem-ipsum", DELEGATE);

			// @ts-expect-error: For testing purposes
			SESSION.data = DATA;

			await SESSION.saveData();

			strictEqual(STUB.calledOnce, true, "saveData should only be called once");
			deepStrictEqual(STUB.firstCall.args, ["lorem-ipsum", DATA]);
		});
	});

	describe("clearData", (): void => {
		it("should clear the data", async (): Promise<void> => {
			const STUB: SinonStub = stub();

			const DELEGATE: SessionDelegateInterface = {
				fetchData: stub().rejects(),
				saveData: stub().rejects(),
				removeData: STUB.resolves(),
			};

			const SESSION: Session = new Session("lorem-ipsum", DELEGATE);

			await SESSION.clearData();

			strictEqual(STUB.calledOnce, true, "clearData should only be called once");
			deepStrictEqual(STUB.firstCall.args, ["lorem-ipsum"]);
			// @ts-expect-error: For testing purposes
			deepStrictEqual(SESSION.data, {});
		});
	});
});
