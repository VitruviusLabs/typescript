import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual } from "node:assert";
import { assertFunction, assertObject, assertProperty } from "@vitruvius-labs/ts-predicate/type-assertion";
import { Session, SessionRegistry } from "../../../src/_index.mjs";

describe("SessionRegistry", (): void => {
	beforeEach((): void => {
		Reflect.get(SessionRegistry, "SESSIONS").clear();
	});

	afterEach((): void => {
		Reflect.get(SessionRegistry, "SESSIONS").clear();
	});

	describe("GetSession", (): void => {
		it("should return undefined if no session exists with this UUID", (): void => {
			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), undefined);
		});

		it("should return an existing session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), SESSION);
		});
	});

	describe("AddSession", (): void => {
		it("should hold onto the session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SessionRegistry.AddSession(SESSION);

			deepStrictEqual(Reflect.get(SessionRegistry, "SESSIONS"), new Map([["00000000-0000-0000-0000-000000000000", SESSION]]));
		});
	});

	describe("RemoveSession", (): void => {
		it("should remove the session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			SessionRegistry.RemoveSession("00000000-0000-0000-0000-000000000000");

			deepStrictEqual(Reflect.get(SessionRegistry, "SESSIONS"), new Map());
		});
	});

	describe("ListSessions", (): void => {
		it("should return an iterator of all registered sessions", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			const ITERABLE: IterableIterator<Session> = SessionRegistry.ListSessions();

			doesNotThrow((): void => {
				assertObject(ITERABLE);
				assertProperty(ITERABLE, Symbol.iterator, assertFunction);
			});

			deepStrictEqual([...ITERABLE], [SESSION]);
		});
	});
});
