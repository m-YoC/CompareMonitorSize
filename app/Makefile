.DEFAULT_GOAL := help

build: ## Build with dev-style
	yarn webpack
build-prod: ## Build with prod-style
	yarn webpack --config webpack.prod.js
server: ## Start webpack-dev-server
	yarn webpack-dev-server
test: ## Test *.test.ts in src/js/
	yarn run jest
test-oneline: ## Test *.test.ts in src/js/ (run with single worker)
	yarn run jest --runInBand
license-summary: ## Get license summary of npm packages
	yarn license-checker --summary
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[1;36m%-20s\033[0m \033[32m%s\033[0m\n", $$1, $$2}'
