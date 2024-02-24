// cspell:ignore dolor, amet
import { default as assert } from 'node:assert/strict';

import { describe, it } from 'node:test';

import { LoggerService } from "../../src/index.mjs";

global.console = {
	...global.console,
	log: (): void => { }
};

describe(
	"LoggerService",
	(): void =>
	{
		// describe(
		// 	"Write",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[(?:DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY)\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Write(LogLevelEnum.INFO, MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		describe(
			"LogError",
			(): void =>
			{
				// it(
				// 	"should write in the console output with the correct format",
				// 	(): void =>
				// 	{
				// 		const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[(?:DEBUG|INFO|NOTICE|WARNING|ERROR|CRITICAL|ALERT|EMERGENCY)\] - An error occurred!\n-------------------------\nMessage: "This is a test message\."\nStack trace:\n.*/;

				// 		const CONSOLE_SPY: SinonSpy = spy(console, "log");

				// 		const ERROR: Error = new Error("This is a test message.");

				// 		LoggerService.LogError(ERROR);

				// 		expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

				// 		CONSOLE_SPY.restore();
				// 	}
				// );

				it(
					"should throw an Error when trying to log anything but an instance of Error",
					(): void =>
					{
						assert.throws(
							(): void =>
							{
								LoggerService.LogError("Lorem ipsum dolor sit amet.");
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError(1);
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError(undefined);
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError({});
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError(new Date());
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError(/^[0-9]+$/);
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);

						assert.throws(
							(): void =>
							{
								LoggerService.LogError(["foo", "bar"]);
							},
							new Error("LoggerService.logError can only handle Error and it's derivates.")
						);
					}
				);
			}
		);

		// describe(
		// 	"Debug",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[DEBUG\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Debug(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Informational",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[INFO\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Informational(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Info",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[INFO\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Info(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);

		// 		it(
		// 			"should call the Informational method",
		// 			(): void =>
		// 			{
		// 				const LOGGER_INFORMATIONAL_SPY: SinonSpy = spy(LoggerService, "Informational");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Info(MESSAGE);

		// 				expect(LOGGER_INFORMATIONAL_SPY.calledWithExactly(MESSAGE)).to.be.true;

		// 				LOGGER_INFORMATIONAL_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Notice",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[NOTICE\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Notice(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Warning",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[WARNING\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Warning(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Error",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[ERROR\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Error(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Critical",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[CRITICAL\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Critical(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Alert",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[ALERT\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Alert(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );

		// describe(
		// 	"Emergency",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should write in the console output with the correct format",
		// 			(): void =>
		// 			{
		// 				const TESTING_REGEXP: RegExp = /^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\] \[EMERGENCY\] - This is a test message\.\n$/;

		// 				const CONSOLE_SPY: SinonSpy = spy(console, "log");

		// 				const MESSAGE: string = "This is a test message.";

		// 				LoggerService.Emergency(MESSAGE);

		// 				expect(CONSOLE_SPY.firstCall.args[0]).to.match(TESTING_REGEXP);

		// 				CONSOLE_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );
	}
);
