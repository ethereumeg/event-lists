import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { join } from "https://deno.land/std@0.187.0/path/posix.ts";

const SCHEMA_DIR = "./schema";
const VERSION = "0.0.3";
const $schemaUrl = (key = "index"): string =>
  `https://event-lists.ethevents.club/schema/${key}.json`;

function $schema(name = "index"): any {
  return parse(Deno.readTextFileSync(join(SCHEMA_DIR, name + ".yaml")));
}

const schema: any = Object.assign({ $id: $schemaUrl() }, $schema());
for (const f of Deno.readDirSync(SCHEMA_DIR)) {
  const match = f.name.match(/^(.*)\.yaml$/);
  if (!match) continue;
  const key = match[1];
  if (key === "index") {
    continue;
  }
  schema["definitions"][key] = Object.assign(
    { $id: $schemaUrl(key) },
    $schema(key),
  );
}

export { schema, VERSION };
