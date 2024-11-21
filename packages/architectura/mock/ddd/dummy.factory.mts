import type { DummyModel } from "./dummy.model.mjs";
import { BaseFactory } from "../../src/_index.mjs";

class DummyFactory extends BaseFactory<DummyModel, typeof DummyModel> {}

export { DummyFactory };
