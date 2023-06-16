import type { Nullable } from "../index.mjs";

function copyWithNullishProperty<Type>(validObject: Type, propertyName: keyof Type): Nullable<Type>
{
	const COPY: Nullable<Type> = { ...validObject };

	COPY[propertyName] = undefined;

	return COPY;
}

export { copyWithNullishProperty };
