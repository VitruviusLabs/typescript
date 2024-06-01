import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { type SinonFakeTimers, type SinonStub, stub, useFakeTimers } from "sinon";
import { type JSONObjectType, MillisecondEnum, ReflectUtility } from "@vitruvius-labs/toolbox";
import { Session, SessionConstantEnum, type SessionDelegateInterface } from "../../../../src/_index.mjs";

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

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000", DELEGATE);

			strictEqual(ReflectUtility.Get(SESSION, "uuid"), "00000000-0000-0000-0000-000000000000");
			strictEqual(ReflectUtility.Get(SESSION, "delegate"), DELEGATE);
			strictEqual(ReflectUtility.Get(SESSION, "expirationTime"), SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE);
			deepStrictEqual(ReflectUtility.Get(SESSION, "data"), {});
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			strictEqual(SESSION.getUUID(), "00000000-0000-0000-0000-000000000000");
		});
	});

	describe("isExpired", (): void => {
		it("should return false when the session is not expired", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			CLOCK.now = SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;
			strictEqual(SESSION.isExpired(), false);
		});

		it("should return true when the session is expired", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			CLOCK.now = 1 + SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE;
			strictEqual(SESSION.isExpired(), true);
		});
	});

	describe("getExpirationDate", (): void => {
		it("should return the expiration date", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			deepStrictEqual(SESSION.getExpirationDate(), new Date(SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE));
		});
	});

	describe("postponeExpiration", (): void => {
		it("should update the expiration date", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			CLOCK.now = 5_000;
			SESSION.postponeExpiration();

			strictEqual(ReflectUtility.Get(SESSION, "expirationTime"), 5_000 + SessionConstantEnum.MINUTES_TO_LIVE * MillisecondEnum.MINUTE);
		});
	});

	describe("getData", (): void => {
		it("should return the data", (): void => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			ReflectUtility.Set(SESSION, "data", DATA);

			deepStrictEqual(SESSION.getData(), DATA);
		});
	});

	describe("setData", (): void => {
		it("should keep the data", (): void => {
			const DATA: JSONObjectType = { lorem: "ipsum" };

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SESSION.setData(DATA);

			deepStrictEqual(ReflectUtility.Get(SESSION, "data"), DATA);
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

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000", DELEGATE);

			await SESSION.loadData();

			strictEqual(STUB.callCount, 1, "'fetchData' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			deepStrictEqual(ReflectUtility.Get(SESSION, "data"), DATA);
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

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000", DELEGATE);

			ReflectUtility.Set(SESSION, "data", DATA);

			await SESSION.saveData();

			strictEqual(STUB.callCount, 1, "'saveData' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000", DATA]);
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

			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000", DELEGATE);

			await SESSION.clearData();

			strictEqual(STUB.callCount, 1, "'clearData' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			deepStrictEqual(ReflectUtility.Get(SESSION, "data"), {});
		});
	});
});
