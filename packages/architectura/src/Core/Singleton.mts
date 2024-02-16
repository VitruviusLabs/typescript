import type { ConstructorOf } from "../utils/ConstructorOf.mjs";

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

    public static GetInstance<T extends Singleton>(classConstructor: ConstructorOf<T>): T | undefined
    {
        // @ts-expect-error: the value has to be an instance of the constructor
        return INSTANCES.get(classConstructor);
    }
}

export { Singleton };
