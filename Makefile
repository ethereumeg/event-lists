.PHONY: all build

all: test

mod:
	deno run --allow-read mod.ts

test:
	deno run --allow-read test.ts

fmt:
	deno fmt *.ts