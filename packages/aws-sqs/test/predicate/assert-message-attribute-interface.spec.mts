import { describe, it } from "mocha";
import { expect as chaiExpect } from "chai";
import { mockDefaultMessageAttributeInterface } from "../../mocks/definition/interface/message-attribute.interface.mjs";
import { assertMessageAttributeInterface } from "../../src/predicate/assert-message-attribute-interface.mjs";
import type { MessageAttributeInterface } from "../../src/definition/interface/message-attribute.interface.mjs";

describe("assertMessageAttributeInterface", (): void => {
	it("should not throw an error when the value is a valid MessageAttributeInterface", (): void => {
		const value: MessageAttributeInterface = mockDefaultMessageAttributeInterface();

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.not.throw();
	});

	it("should throw an error when given anything but a MessageAttributeInterface", (): void => {
		let value: unknown = null;

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();

		value = undefined;

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();

		value = 0;

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();

		value = "foo";

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();

		value = true;

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();

		value = {};

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageAttributeInterface with an invalid Name", (): void => {
		const value: unknown = {
			...mockDefaultMessageAttributeInterface(),
			Name: 0,
		};

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageAttributeInterface with an invalid Value", (): void => {
		const value: unknown = {
			...mockDefaultMessageAttributeInterface(),
			Value: 0,
		};

		chaiExpect((): void => {
			assertMessageAttributeInterface(value);
		}).to.throw();
	});
});
