import { emptyDir } from "https://deno.land/std@0.187.0/fs/mod.ts";
import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

import { revisions, VERSION } from "../mod.ts";

const SOURCE_DIR = "./src";
const EXAMPLES_DIR = "examples";
const OUTPUT_DIR = "./dist";
const OUTPUT_SCHEMA_SUBDIR = "schema";
const OUTPUT_EXAMPLES_SUBDIR = "examples";

// functions
async function $write(key, data, revision, dir = OUTPUT_SCHEMA_SUBDIR) {
  const fn = join(OUTPUT_DIR, revision, dir, key + ".json");
  await Deno.writeTextFile(fn, JSON.stringify(data, null, 2));
  console.log(`File written: ${fn}`);
}

// clear build
await emptyDir(OUTPUT_DIR);

// process all revisions
for (const rev in revisions) {
  const schema = revisions[rev];

  // schema
  await emptyDir(join(OUTPUT_DIR, rev, OUTPUT_SCHEMA_SUBDIR));
  await $write("index", schema, rev);
  for (const key in schema.definitions) {
    await $write(key, schema.definitions[key], rev);
  }

  // examples
  await emptyDir(join(OUTPUT_DIR, rev, OUTPUT_EXAMPLES_SUBDIR));
  for await (const f of Deno.readDir(join(SOURCE_DIR, rev, EXAMPLES_DIR))) {
    const [_, key] = f.name.match(/^(.+).yaml$/);
    const data = parse(
      await Deno.readTextFile(join(SOURCE_DIR, rev, EXAMPLES_DIR, f.name)),
    );
    await $write(key, data, rev, OUTPUT_EXAMPLES_SUBDIR);
  }
}
