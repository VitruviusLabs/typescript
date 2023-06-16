import type { AnythingBut, Invalid } from "../index.mjs";

function copyWithInvalidProperty<Type, Property extends keyof Type>(validObject: Type, propertyName: Property, value: AnythingBut<Type[Property]>): Invalid<Type>
{
	// @ts-expect-error: Temporary have a correct value
	const COPY: Invalid<Type> = { ...validObject };

	COPY[propertyName] = value;

	return COPY;
}

export { copyWithInvalidProperty };
