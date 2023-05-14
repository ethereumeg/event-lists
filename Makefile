.PHONY: all build

all: test build

install:
	deno cache *.ts scripts/*.js scripts/*.ts

mod:
	deno run --allow-read mod.js

build:
	deno run --allow-read --allow-write scripts/build.js
	@make landing

build-npm:
	deno run -A scripts/build_npm.ts 0.0.1

landing:
	@echo '<html><head><title>Event Lists</title><meta http-equiv="REFRESH" content="0;url=https://github.com/ethereumeg/event-lists"></head><body>Event Lists - https://github.com/ethereumeg/event-lists</body></html>' > dist/index.html

test:
	deno test --allow-read scripts/test.js

test-remote:
	deno test --allow-read scripts/test.js remote=true

example-deno:
	deno run --allow-read scripts/example_deno.js

fmt:
	deno fmt **/*.js *.md
