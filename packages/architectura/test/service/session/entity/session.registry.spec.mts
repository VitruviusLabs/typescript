import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, strictEqual, throws } from "node:assert";
import { Session, SessionRegistry } from "../../../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("SessionRegistry", (): void => {
	beforeEach((): void => {
		Reflect.get(SessionRegistry, "SESSIONS").clear();
	});

	afterEach((): void => {
		Reflect.get(SessionRegistry, "SESSIONS").clear();
	});

	describe("GetSession", (): void => {
		it("should return undefined if there is no session with this UUID", (): void => {
			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), undefined);
		});

		it("should return the session with this UUID", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			strictEqual(SessionRegistry.GetSession("00000000-0000-0000-0000-000000000000"), SESSION);
		});
	});

	describe("AddSession", (): void => {
		it("should add the session with this UUID", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			SessionRegistry.AddSession(SESSION);

			deepStrictEqual(Reflect.get(SessionRegistry, "SESSIONS"), new Map([["00000000-0000-0000-0000-000000000000", SESSION]]));
		});

		it("should throw if there is already a session with this UUID already", (): void => {
			const SESSION_1: Session = new Session("00000000-0000-0000-0000-000000000000");
			const SESSION_2: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION_1);

			const WRAPPER = (): void => {
				SessionRegistry.AddSession(SESSION_2);
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("RemoveSession", (): void => {
		it("should remove the session with this UUID", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			SessionRegistry.RemoveSession("00000000-0000-0000-0000-000000000000");

			deepStrictEqual(Reflect.get(SessionRegistry, "SESSIONS"), new Map());
		});

		it("should remove the session", (): void => {
			const SESSION: Session = new Session("00000000-0000-0000-0000-000000000000");

			Reflect.get(SessionRegistry, "SESSIONS").set("00000000-0000-0000-0000-000000000000", SESSION);

			SessionRegistry.RemoveSession(SESSION);

			deepStrictEqual(Reflect.get(SessionRegistry, "SESSIONS"), new Map());
		});

		it("should not throw if there is no session with this UUID already", (): void => {
			const WRAPPER = (): void => {
				SessionRegistry.RemoveSession("00000000-0000-0000-0000-000000000000");
			};

			doesNotThrow(WRAPPER);
		});
	});

	describe("ListSessions", (): void => {});
});
