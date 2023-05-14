import Ajv from "https://esm.sh/v114/ajv@8.12.0";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";
import { parse as yamlParse } from "https://deno.land/std@0.187.0/yaml/mod.ts";
import { schema } from "https://deno.land/x/event_lists@0.0.4-1/mod.ts";

const ajv = new Ajv({ strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
/*
const LIST_YAML_FILE = "./src/examples/minimal.yaml";

const list = yamlParse(await Deno.readTextFile(LIST_YAML_FILE));

if (!validate(list)) {
  throw validate.errors;
}

console.log("Event List valid");
*/