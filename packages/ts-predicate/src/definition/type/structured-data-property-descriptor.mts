import type { StructuredDataIgnoredPropertyDescriptor } from "../interface/structured-data-ignored-property-descriptor.mjs";
import type { StructuredDataRegularPropertyDescriptor } from "../interface/structured-data-regular-property-descriptor.mjs";

type StructuredDataPropertyDescriptor<Type> = StructuredDataIgnoredPropertyDescriptor | StructuredDataRegularPropertyDescriptor<Type>;

export type { StructuredDataPropertyDescriptor };
