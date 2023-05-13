import { parse } from "https://deno.land/std@0.184.0/yaml/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

const SCHEMA_DIR = "./schema";
const VERSION = "0.0.1";
const $schemaUrl = (key = "index") =>
  `https://event-lists.ethevents.club/schema/${key}.json`;

async function $schema(name = "index") {
  return parse(await Deno.readTextFile(join(SCHEMA_DIR, name + ".yaml")));
}

const schema = await $schema();
schema.definitions = {};
for await (const f of Deno.readDir(SCHEMA_DIR)) {
  const [_, key] = f.name.match(/^(.*)\.yaml$/);
  if (key === "index") {
    continue;
  }
  schema.definitions[$schemaUrl(key)] = await $schema(key);
}

export { schema, VERSION };
