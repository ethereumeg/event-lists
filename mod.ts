import { parse } from "https://deno.land/std@0.184.0/yaml/mod.ts";

const schema = parse(await Deno.readTextFile("./src/eventlists.schema.yaml"));
const VERSION = "0.0.1";

export { schema, VERSION };
