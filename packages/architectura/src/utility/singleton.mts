import type { ConstructorOf } from "../definition/type/constructor-of.type.mjs";

// eslint-disable-next-line @typescript-eslint/ban-types -- They're class constructors, not functions
const INSTANCES: Map<Function, object> = new Map();

abstract class Singleton
{
    public constructor()
    {
        if (INSTANCES.has(this.constructor))
        {
            throw new Error('Already instanciated once');
        }

        INSTANCES.set(this.constructor, this);
    }

    public static GetInstance<T extends Singleton>(class_constructor: ConstructorOf<T>): T | undefined
    {
        // @ts-expect-error: the value has to be an instance of the constructor
        return INSTANCES.get(class_constructor);
    }
}

export { Singleton };
