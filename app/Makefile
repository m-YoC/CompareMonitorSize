.DEFAULT_GOAL := help

build: ## Build with dev-style
	yarn webpack
build-prod: ## Build with prod-style
	yarn webpack --config webpack.prod.js
server: ## Start webpack-dev-server
	yarn webpack-dev-server
test: ## Start jest
	yarn run jest
test-oneline: ## Start jest --runInBand
	yarn run jest --runInBand
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
