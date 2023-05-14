import { emptyDir } from "https://deno.land/std@0.187.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

import { schema, VERSION } from "../mod.js";

const OUTPUT_DIR = "./dist";
const SCHEMA_DIR = "schema";

async function $write(key, data) {
  const fn = join(OUTPUT_DIR, SCHEMA_DIR, key + ".json");
  await Deno.writeTextFile(fn, JSON.stringify(data, null, 2));
  console.log(`File written: ${fn}`);
}

await emptyDir(OUTPUT_DIR);
await emptyDir(join(OUTPUT_DIR, SCHEMA_DIR));

await $write("index", schema);
for (const key in schema.definitions) {
  await $write(key, schema.definitions[key]);
}
