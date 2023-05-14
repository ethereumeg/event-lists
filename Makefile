.PHONY: all build

all: test build

install:
	deno cache *.js scripts/*.js

mod:
	deno run --allow-read mod.js

build:
	deno run --allow-read --allow-write scripts/build.js

test:
	deno test --allow-read scripts/test.js

test-remote:
	deno test --allow-read scripts/test.js remote=true

fmt:
	deno fmt *.js
