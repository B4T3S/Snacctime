SHELL := /bin/bash

# Misc
.DEFAULT_GOAL = help

# Directory parameter for testing:
d ?=

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
      $(error Undefined $1$(if $2, ($2))))

## Help targets
.PHONY: help
help: ## (Default) Print listing of key targets with their descriptions.
	@printf "\nSnacctime \033[92m<Makefile>\033[90m\n"
	@printf "\n\033[33mUsage:\033[0m\n   make \033[92m[target]\033[90m [argumants]\033[0m\n"
	@grep -F -h "##" $(MAKEFILE_LIST) | grep -F -v grep -F | sed -e 's/\\$$//' | awk 'BEGIN {FS = ":*[[:space:]]*##[[:space:]]*"}; \
	{ \
		if($$2 == "") \
			printf; \
		else if($$0 ~ /^#/) \
			printf "\n\033[33m%s:\033[0m\n", $$2; \
		else if($$1 == "") \
			printf ""; \
		else \
			printf "   \033[92m%-20s\033[0m \033[90m%s\033[0m\n", $$1, $$2; \
	}'

## Docker targets
.PHONY: docker-start
docker-start: ## Start all docker containers
	docker compose -f ./docker/docker-compose.yaml up -d
.PHONY: docker-stop
docker-stop: ## Start all docker containers
	docker compose -f ./docker/docker-compose.yaml down

## NPM targets
.PHONY: install
install: ## Install vendors according to the current composer.lock file
	npm install

.PHONY: update
update: ## Update vendors according to the current composer.json file
	npm update

.PHONY: start
start: docker-start ## Start app
	npm run start

# vim: syntax=make
