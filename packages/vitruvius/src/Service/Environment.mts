/* eslint-disable @typescript-eslint/member-ordering -- This is to avoid having the massive mapping at the beginning of the declaration. */
import { TypeGuard } from "@vitruvius-lab/ts-predicate";

import type { EnvironmentDescriptorInterface } from "./Environment/EnvironmentDescriptorInterface.mjs";

import type { EnvironmentItemDescriptorInterface } from "./Environment/EnvironmentItemDescriptorInterface.mjs";

class Environment
{
	private static readonly ServerPort: number;

	private static readonly UserSessionDuration: number;

	private static readonly NodeEnvironment: string;

	public static EnvironmentDescriptorInterface: EnvironmentDescriptorInterface = {
		SERVER_PORT: {
			identifier: "ServerPort",
			type: "number"
		},
		USER_SESSION_DURATION: {
			identifier: "UserSessionDuration",
			type: "number"
		},
		NODE_ENV: {
			identifier: "NodeEnvironment",
			type: "string"
		},
  };

  /**
   * This is a static block for the Environment class.
   * It is executed when the class is loaded for the first time.
   *
   * It is a relatively complex code that will initialize the class by doing the following operations:
   *
   *    1. The environmentDescriptor constant is used to describe the environment and how it should exist within process.env.
   *    2. It will then go through each key of environmentDescriptor and attempt to find the corresponding value in process.env.
   *        2a. If there are no defined values in process.env and the key is mandatory, an error will be thrown.
   *        2b. If there are no defined values in process.env and the key is not mandatory, the default value will be used.
   *    3. It will then called the private setter for each value.
   *        => Note that having a private setter is
   */
	static
	{
		// @ts-expect-error - TypeScript does not infer Object.keys() as Array<keyof EnvironmentDescriptorInterface> because it could yield other keys if the class gets inherited.
		const ALL_KEYS: Array<keyof EnvironmentDescriptorInterface> = Object.keys(this.EnvironmentDescriptorInterface);

		for (const KEY of ALL_KEYS)
		{
			const ITEM_CONFIGURATION: EnvironmentItemDescriptorInterface<[string, unknown]> = this.EnvironmentDescriptorInterface[KEY];

			const VALUE: string | undefined = process.env[KEY];

			if (VALUE === undefined)
			{
				if (!TypeGuard.hasNullableProperty(ITEM_CONFIGURATION, "defaultValue"))
				{
					throw new Error(`Missing environment variable: ${KEY}`);
				}

				Environment.Set(this.EnvironmentDescriptorInterface[KEY].identifier, ITEM_CONFIGURATION.defaultValue);
				continue;
			}

			if (ITEM_CONFIGURATION.type === "boolean")
			{
				if (!["true", "false"].includes(VALUE))
				{
					throw new Error(`Invalid environment variable: ${KEY}`);
				}

				Environment.Set(this.EnvironmentDescriptorInterface[KEY].identifier, VALUE === "true");
				continue;
			}

			if (ITEM_CONFIGURATION.type === "number")
			{
				const PARSED_VALUE: number = parseInt(VALUE, 10);

				if (isNaN(PARSED_VALUE))
				{
					throw new Error(`Invalid environment variable: ${KEY}`);
				}

				Environment.Set(this.EnvironmentDescriptorInterface[KEY].identifier, PARSED_VALUE);
				continue;
			}

			if (ITEM_CONFIGURATION.type === "string")
			{
				if (VALUE === "")
				{
					throw new Error(`Invalid environment variable: ${KEY}`);
				}

				Environment.Set(this.EnvironmentDescriptorInterface[KEY].identifier, VALUE);
				continue;
			}

			throw new Error("Invalid environment variable type");
		}
	}

	/**
	 * GetServerPort
	 *
	 * This static method will return the value of the SERVER_PORT environment variable.
	 *
	 * @returns {number} - The value of the SERVER_PORT environment variable.
	 */
	public static GetServerPort(): number
	{
		return this.ServerPort;
	}

	/**
	 * GetUserSessionDuration
	 *
	 * This static method will return the value of the USER_SESSION_DURATION environment variable.
	 *
	 * @returns {number} - The value of the USER_SESSION_DURATION environment variable.
	 */
	public static GetUserSessionDuration(): number
	{
		return this.UserSessionDuration;
	}

	/**
	 * GetNodeEnvironment
	 *
	 * This static method will return the value of the NODE_ENV environment variable.
	 *
	 * @returns {string} - The value of the NODE_ENV environment variable.
	 */
	public static GetNodeEnvironment(): string
	{
		return this.NodeEnvironment;
	}

	private static Set(key: string, value: unknown): void
	{
		Object.defineProperty(Environment, key, { value: value });
	}
}

export { Environment };
/* eslint-enable @typescript-eslint/member-ordering -- This is to avoid having the massive mapping at the beginning of the declaration. */
