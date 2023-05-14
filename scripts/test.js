import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

import Ajv from "https://esm.sh/v114/ajv@8.12.0";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";

import { schema, VERSION } from "../mod.ts";

const EXAMPLES_DIR = "./examples";

console.log(`Schema version: ${VERSION}`);

const ajv = new Ajv({ strict: false });
addFormats(ajv);

Deno.test(`core-schema`, () => {
  const valid = ajv.validateSchema(schema);
  if (!valid) {
    throw ajv.errors;
  }
});
const validate = ajv.compile(schema);
for await (const f of Deno.readDir(EXAMPLES_DIR)) {
  Deno.test(`examples/${f.name}`, async () => {
    const example = parse(await Deno.readTextFile(join(EXAMPLES_DIR, f.name)));
    if (!validate(example)) {
      throw validate.errors;
    }
  });
}
