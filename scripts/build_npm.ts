import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "event-lists",
    version: Deno.args[0],
    description: "deno run -A scripts/build_npm.ts 0.1.0",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/ethereumeg/event-lists.git",
    },
    bugs: {
      url: "https://github.com/ethereumeg/event-lists/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});