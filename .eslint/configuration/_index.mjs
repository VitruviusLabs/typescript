import { configuration as disabled_configuration } from "./disabled/config.mjs";
import { configuration as default_configuration } from "./global/default.mjs";
import { configuration as ignores_configuration } from "./global/ignores.mjs";
import { configuration as strict_configuration } from "./strict/config.mjs";
import { configuration as style_configuration } from "./style/config.mjs";
import { configuration as test_configuration } from "./test/config.mjs";
import { configurations as file_specific_configurations } from "./file-specific/config.mjs";

const CONFIGURATIONS = [
	disabled_configuration,
	default_configuration,
	ignores_configuration,
	strict_configuration,
	style_configuration,
	test_configuration,
	...file_specific_configurations,
];

export { CONFIGURATIONS as configurations };
