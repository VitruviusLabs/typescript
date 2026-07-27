import type { RepositoryRecord } from "../../base/primary/repository-record.mjs";
import type { LazyReference } from "../../value-object/lazy-reference/lazy-reference.mjs";
import { RequiredTypeDefinition } from "../required/required-type-definition.mjs";

abstract class RelationTypeDefinition<T extends RepositoryRecord> extends RequiredTypeDefinition<LazyReference<T>>
{
}

export { RelationTypeDefinition };
