import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { ReflectUtility, deepStrictIterable } from "@vitruvius-labs/toolbox";
import { Session, SessionRegistry } from "../../../src/_index.mjs";

describe("SessionRegistry", (): void => {
	const SESSION_MAP: Map<string, Session> = Reflect.get(SessionRegistry, "SESSIONS");

	beforeEach((): void => {
		SESSION_MAP.clear();
	});

	after((): void => {
		SESSION_MAP.clear();
	});

	describe("GetSession", (): void => {
		it("should return undefined if no session exists with this UUID", (): void => {
			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), undefined);
		});

		it("should return an existing session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SESSION_MAP.set("00000000-0000-0000-0000-000000000000", SESSION);

			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), SESSION);
		});
	});

	describe("AddSession", (): void => {
		it("should hold onto the session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SessionRegistry.AddSession(SESSION);

			deepStrictEqual(ReflectUtility.Get(SessionRegistry, "SESSIONS"), new Map([["00000000-0000-0000-0000-000000000000", SESSION]]));
		});
	});

	describe("RemoveSession", (): void => {
		it("should remove the session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SESSION_MAP.set("00000000-0000-0000-0000-000000000000", SESSION);

			SessionRegistry.RemoveSession("00000000-0000-0000-0000-000000000000");

			deepStrictEqual(ReflectUtility.Get(SessionRegistry, "SESSIONS"), new Map());
		});
	});

	describe("ListSessions", (): void => {
		it("should return an iterator of all registered sessions", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SESSION_MAP.set("00000000-0000-0000-0000-000000000000", SESSION);

			const ITERABLE: IterableIterator<Session> = SessionRegistry.ListSessions();

			deepStrictIterable(ITERABLE, [SESSION]);
		});
	});
});
