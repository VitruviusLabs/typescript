import { config } from "typescript-eslint";
import { configuration as default_configuration } from "./global/default.mjs";
import { configuration as ignores_configuration } from "./global/ignores.mjs";
import { configuration as strict_configuration } from "./strict/config.mjs";
import { configuration as stylistic_configuration } from "./stylistic/config.mjs";
import { configuration as test_configuration } from "./test/config.mjs";

const CONFIGURATIONS = [
	default_configuration,
	ignores_configuration,
	strict_configuration,
	stylistic_configuration,
	test_configuration,
];

export { CONFIGURATIONS as configurations };
