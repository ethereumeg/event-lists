import { emptyDir } from "https://deno.land/std@0.187.0/fs/mod.ts";
import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

import { schema, VERSION } from "../mod.ts";

const EXAMPLES_DIR = "./src/examples";
const OUTPUT_DIR = "./dist";
const OUTPUT_SCHEMA_SUBDIR = "schema";
const OUTPUT_EXAMPLES_SUBDIR = "examples";

schema.version = VERSION;

// functions
async function $write(key, data, dir = OUTPUT_SCHEMA_SUBDIR) {
  const fn = join(OUTPUT_DIR, dir, key + ".json");
  await Deno.writeTextFile(fn, JSON.stringify(data, null, 2));
  console.log(`File written: ${fn}`);
}

// clear build
await emptyDir(OUTPUT_DIR);

// schema
await emptyDir(join(OUTPUT_DIR, OUTPUT_SCHEMA_SUBDIR));
await $write("index", schema);
for (const key in schema.definitions) {
  await $write(key, schema.definitions[key]);
}

// examples
await emptyDir(join(OUTPUT_DIR, OUTPUT_EXAMPLES_SUBDIR));
for await (const f of Deno.readDir(EXAMPLES_DIR)) {
  const [_, key] = f.name.match(/^(.+).yaml$/);
  const data = parse(await Deno.readTextFile(join(EXAMPLES_DIR, f.name)));
  await $write(key, data, OUTPUT_EXAMPLES_SUBDIR);
}
