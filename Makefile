.PHONY: all build

all: test

mod:
	deno run --allow-read mod.js

test:
	deno test --allow-read test.js

test-remote:
	deno test --allow-read test.js remote=true

fmt:
	deno fmt *.js
