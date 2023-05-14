import { emptyDir } from "https://deno.land/std@0.187.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

import { schema, VERSION } from "../mod.js";

const OUTPUT_DIR = "./dist";
const SCHEMA_DIR = "schema";

await emptyDir(OUTPUT_DIR);
await emptyDir(join(OUTPUT_DIR, SCHEMA_DIR));

const bundleFn = join(OUTPUT_DIR, SCHEMA_DIR, "index.json")
await Deno.writeTextFile(bundleFn, JSON.stringify(schema, null, 2))
console.log(`File written: ${bundleFn}`)