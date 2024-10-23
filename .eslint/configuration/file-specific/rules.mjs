/*
 * List disabled rules to help with configuration inspection
 * It's easier to see the new rules in the unused rules list
**/
const RULES = {
	// Currently buggy for files purely exporting types.
	"@ts/consistent-type-exports": "off",
};

export { RULES as rules };
