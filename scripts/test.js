import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { basename, join } from "https://deno.land/std@0.187.0/path/posix.ts";

import Ajv from "https://esm.sh/v114/ajv@8.12.0";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";

import { revisions, VERSION } from "../mod.ts";

const SOURCE_DIR = "./src";
const EXAMPLES_DIR = "examples";

console.log(`Library version: ${VERSION}`);

const ajv = new Ajv({ strict: false });
addFormats(ajv);

for (const rev in revisions) {
  const schema = revisions[rev];
  Deno.test(`[${rev}] core-schema`, () => {
    const valid = ajv.validateSchema(schema);
    if (!valid) {
      throw ajv.errors;
    }
  });
  const validate = ajv.compile(schema);
  for await (const f of Deno.readDir(join(SOURCE_DIR, rev, EXAMPLES_DIR))) {
    Deno.test(`[${rev}] examples/${f.name}`, async () => {
      const example = parse(
        await Deno.readTextFile(join(SOURCE_DIR, rev, EXAMPLES_DIR, f.name)),
      );
      if (!validate(example)) {
        throw validate.errors;
      }
    });
  }
}
