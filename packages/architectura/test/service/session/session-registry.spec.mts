import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual } from "node:assert";
import { assertFunction, assertObject, assertProperty } from "@vitruvius-labs/ts-predicate/type-assertion";
import { Session, SessionRegistry } from "../../../src/_index.mjs";

describe("SessionRegistry", (): void => {
	beforeEach((): void => {
		// @ts-expect-error: Access to private property for testing purposes.
		SessionRegistry.SESSIONS.clear();
	});

	afterEach((): void => {
		// @ts-expect-error: Access to private property for testing purposes.
		SessionRegistry.SESSIONS.clear();
	});

	describe("GetSession", (): void => {
		it("should return undefined if no session exists with this UUID", (): void => {
			strictEqual(SessionRegistry.GetSession("lorem-ipsum"), undefined);
		});

		it("should return an existing session", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			// @ts-expect-error: Access to private property for testing purposes.
			SessionRegistry.SESSIONS.set("lorem-ipsum", SESSION);

			strictEqual(SessionRegistry.GetSession("lorem-ipsum"), SESSION);
		});
	});

	describe("AddSession", (): void => {
		it("should hold onto the session", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			SessionRegistry.AddSession(SESSION);

			// @ts-expect-error: Access to private property for testing purposes.
			deepStrictEqual(SessionRegistry.SESSIONS, new Map([["lorem-ipsum", SESSION]]));
		});
	});

	describe("RemoveSession", (): void => {
		it("should remove the session", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			// @ts-expect-error: Access to private property for testing purposes.
			SessionRegistry.SESSIONS.set("lorem-ipsum", SESSION);

			SessionRegistry.RemoveSession("lorem-ipsum");

			// @ts-expect-error: Access to private property for testing purposes.
			deepStrictEqual(SessionRegistry.SESSIONS, new Map());
		});
	});

	describe("ListSessions", (): void => {
		it("should return an iterator of all registered sessions", (): void => {
			const SESSION: Session = new Session("lorem-ipsum");

			// @ts-expect-error: Access to private property for testing purposes.
			SessionRegistry.SESSIONS.set("lorem-ipsum", SESSION);

			const ITERABLE: IterableIterator<Session> = SessionRegistry.ListSessions();

			doesNotThrow((): void => { assertObject(ITERABLE); });
			doesNotThrow((): void => { assertProperty(ITERABLE, Symbol.iterator); });
			doesNotThrow((): void => { assertFunction(ITERABLE[Symbol.iterator]); });
			deepStrictEqual([...ITERABLE], [SESSION]);
		});
	});
});
