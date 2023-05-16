import { parse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { join, basename } from "https://deno.land/std@0.187.0/path/posix.ts";

const SOURCE_DIR = "./src";
const SCHEMA_DIR = "schema";

const VERSION = "0.0.4";
const $schemaUrl = (revision: string, key = "index"): string =>
  `https://event-lists.ethevents.club/${revision}/schema/${key}.json`;

function $schema(revision: string, name = "index"): any {
  return parse(Deno.readTextFileSync(join(SOURCE_DIR, revision, SCHEMA_DIR, name + ".yaml")));
}

// collection available revisions
const revisions: { [key: string]: any } = {};
for (const rd of Deno.readDirSync(SOURCE_DIR)) {
  const rev = basename(rd.name);
  const current: any = Object.assign({ $id: $schemaUrl(rev, "index") }, $schema(rev));
  for (const f of Deno.readDirSync(join(SOURCE_DIR, rev, SCHEMA_DIR))) {
    const key = (f.name.match(/^(.*)\.yaml$/) || [])[1];
    if (!key) continue;
    if (key === "index") {
      continue;
    }
    current["definitions"][key] = Object.assign(
      { $id: $schemaUrl(rev, key) },
      $schema(rev, key),
    );
  }
  revisions[rev] = current;
}

const schema = revisions[revisions.length-1];

export { schema, VERSION, revisions };
