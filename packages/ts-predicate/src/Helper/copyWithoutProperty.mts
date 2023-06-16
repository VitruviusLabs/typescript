function copyWithoutProperty<Type>(validObject: Type, propertyName: keyof Type): Partial<Type>
{
	const COPY: Partial<Type> = { ...validObject };

	/* eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- Needed for testing */
	delete COPY[propertyName];

	return COPY;
}

export { copyWithoutProperty };
