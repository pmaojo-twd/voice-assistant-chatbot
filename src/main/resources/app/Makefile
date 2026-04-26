SHELL := /bin/bash
.DEFAULT_GOAL := help

BUN ?= bun

# ---------- Help ----------

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "; printf "\nUsage: make <target>\n\nTargets:\n"} \
		/^[a-zA-Z0-9_.-]+:.*?## / { printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2 } \
		/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)
	@echo ""

##@ Install

.PHONY: install
install: ## Install dependencies with Bun
	$(BUN) install

##@ Develop

.PHONY: dev
dev: ## Run UI watch + dev server in parallel (http://localhost:3001)
	$(BUN) run dev

.PHONY: storybook
storybook: ## UI sandbox without MCP server (http://localhost:6006)
	$(BUN) run storybook

.PHONY: serve
serve: ## Run example HTTP Streamable server only
	$(BUN) run serve

.PHONY: serve-stdio
serve-stdio: ## Run example stdio server (Claude Desktop, VS Code, Cursor)
	$(BUN) run serve:stdio

##@ Quality

.PHONY: lint
lint: ## ESLint
	$(BUN) run lint

.PHONY: format
format: ## Prettier --write
	$(BUN) run format

.PHONY: test
test: ## Vitest (run mode)
	$(BUN) run test

.PHONY: typecheck
typecheck: ## tsc --noEmit (UI + server)
	npx tsc --noEmit
	npx tsc -p tsconfig.server.json

.PHONY: check
check: lint typecheck test ## Lint + typecheck + test (PR gate)

##@ Build

.PHONY: build-ui
build-ui: ## Build single-file dist/mcp-app.html
	$(BUN) run build:ui

.PHONY: build
build: ## Build UI + dev server bundle into dist/
	$(BUN) run build:full

.PHONY: build-storybook
build-storybook: ## Static Storybook build
	$(BUN) run build-storybook

.PHONY: build-docs
build-docs: ## Generate TypeDoc API docs
	$(BUN) run build:docs

##@ Housekeeping

.PHONY: clean
clean: ## Remove dist/, storybook-static/ and docs/
	rm -rf dist storybook-static docs
