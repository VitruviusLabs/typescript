import { describe, it } from "mocha";
import { expect as chaiExpect } from "chai";
import { mockDefaultMessageInterface } from "../../mock/definition/interface/message.interface.mjs";
import { mockDefaultMessageAttributeInterface } from "../../mock/definition/interface/message-attribute.interface.mjs";
import { assertMessageInterface } from "../../src/predicate/assert-message-interface.mjs";
import type { MessageInterface } from "../../src/definition/interface/message.interface.mjs";

describe("assertMessageInterface", (): void => {
	it("should not throw an error when the value is a valid MessageInterface", (): void => {
		const value: MessageInterface = mockDefaultMessageInterface();

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.not.throw();
	});

	it("should throw an error when given anything but a MessageInterface", (): void => {
		let value: unknown = null;

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();

		value = undefined;

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();

		value = 0;

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();

		value = "foo";

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();

		value = true;

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();

		value = {};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid Attributes property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			Attributes: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an Attributes property containing other elements than MessageAttributesInterface", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			Attributes: [0, mockDefaultMessageAttributeInterface()],
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid MessageId property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			MessageId: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid ReceiptHandle property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			ReceiptHandle: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid Body property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			Body: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid MD5OfBody property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			MD5OfBody: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid MD5OfMessageAttributes property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			MD5OfMessageAttributes: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});

	it("should throw an error when the value is a MessageInterface with an invalid MessageAttributes property", (): void => {
		const value: unknown = {
			...mockDefaultMessageInterface(),
			MessageAttributes: 0,
		};

		chaiExpect((): void => {
			assertMessageInterface(value);
		}).to.throw();
	});
});
