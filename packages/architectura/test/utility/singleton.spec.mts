import { doesNotThrow, throws } from "node:assert";
import { default as assert } from "node:assert/strict";
import { describe, it } from "node:test";
import { Singleton } from "../../src/utility/singleton.mjs";

describe(
    "singleton",
	(): void =>
	{
		describe(
			"constructor",
			(): void =>
			{
				it(
					"should create an instance of the singleton class and add it to the internal map.",
					(): void =>
					{
                        class MySingleton extends Singleton
                        {
                            public constructor()
                            {
                                super();
                            }
                        }

                        const INSTANCE: MySingleton = new MySingleton();

                        const INSTANCE2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

                        assert.strictEqual(INSTANCE, INSTANCE2);
					}
				);

                it(
                    "should throw an error when the constructor is called more than once.",
                    (): void =>
                    {
                        class MySingleton extends Singleton
                        {
                            public constructor()
                            {
                                super();
                            }
                        }

                        doesNotThrow((): void =>
{
                            new MySingleton();
                        });

                        throws((): void =>
{
                            new MySingleton();
                        });
                    }
                );
			}
		);

        describe(
            "GetInstance",
            (): void =>
            {
                it(
                    "should return the instance of the singleton class.",
                    (): void =>
                    {
                        class MySingleton extends Singleton
                        {
                            public constructor()
                            {
                                super();
                            }
                        }

                        const INSTANCE: MySingleton = new MySingleton();

                        const INSTANCE2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

                        assert.strictEqual(INSTANCE, INSTANCE2);
                    }
                );
            }
        );

        describe(
            "Clear",
            (): void =>
            {
                it(
                    "should clear the instance of the singleton class.",
                    (): void =>
                    {
                        class MySingleton extends Singleton
                        {
                            public constructor()
                            {
                                super();
                            }
                        }

                        new MySingleton();

                        MySingleton.Clear(MySingleton);

                        const INSTANCE2: MySingleton | undefined = MySingleton.GetInstance(MySingleton);

                        assert.strictEqual(INSTANCE2, undefined);
                    }
                );
            }
        );
	}
);
