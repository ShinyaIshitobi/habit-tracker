include .env
export

# ------------
# Docker local
# ------------
.PHONY: dbuild 
dbuild:
	@echo "Building..."
	-@docker build --platform linux/amd64 -t tobby/habit-tracker-notifier:v0.0.0 ./apps/notifier/
	-@docker build --platform linux/amd64 -t tobby/habit-tracker-aggregator:v0.0.0 ./apps/aggregator/
	-@docker build --platform linux/amd64 -t tobby/habit-tracker-registerer:v0.0.0 ./apps/registerer/

.PHONY: drun
drun:
	-@echo "Running..."
	-@docker run --platform linux/amd64 -dit --rm --name habit-tracker-notifier tobby/habit-tracker-notifier:v0.0.0
	-@docker run --platform linux/amd64 -dit -p 50051:50051 --rm --name habit-tracker-registerer tobby/habit-tracker-registerer:v0.0.0
	-@docker run --platform linux/amd64 -dit --rm --name habit-tracker-aggregator tobby/habit-tracker-aggregator:v0.0.0

.PHONY: dstop
dstop:
	@echo "Stopping..."
	-@docker stop habit-tracker-notifier
	-@docker stop habit-tracker-aggregator
	-@docker stop habit-tracker-registerer

.PHONY: dprune
dprune:
	@echo "Pruning..."
	@docker system prune -af

# ------------
# CloudBuild
# ------------
.PHONY: cbuild
cbuild:
	@echo "Building..."
	@gcloud builds submit --config ./infra/cloudbuild/docker_build.yaml --substitutions _PROJECT_ID=$(_PROJECT_ID)

# ------------
# kubernetes
# ------------
.PHONY: _subst
_subst:
	@mkdir -p ./infra/manifests/tmp
	@envsubst < ./infra/manifests/notifier.yaml > ./infra/manifests/tmp/notifier.yaml
	@envsubst < ./infra/manifests/aggregator.yaml > ./infra/manifests/tmp/aggregator.yaml
	@envsubst < ./infra/manifests/registerer.yaml > ./infra/manifests/tmp/registerer.yaml

.PHONY: kapply
kapply:
	@echo "Applying..."
	@make _subst
	@kubectl apply -f ./infra/manifests/tmp/ -R
	@rm -rf ./infra/manifests/tmp

.PHONY: kdelete
kdelete:
	@echo "Deleting..."
	@make _subst
	@kubectl delete -f ./infra/manifests/tmp/ -R
	@rm -rf ./infra/manifests/tmp

# ------------
# grpc node
# ------------
PROTO_SRC=./protobuf
PROTO_DEST_NODE=./apps/registerer/src/proto
GRPC_TOOLS_BIN=./apps/registerer/node_modules/.bin/grpc_tools_node_protoc
GRPC_TOOLS_PLUGIN=./apps/registerer/node_modules/.bin/grpc_tools_node_protoc_plugin
GRPC_TOOLS_TS_BIN=./apps/registerer/node_modules/.bin/protoc-gen-ts

.PHONY: gen_node
gen_node:
	@echo "generating schema for node grpc server by proro..."
	@mkdir -p $(PROTO_DEST_NODE)
	@$(GRPC_TOOLS_BIN) \
		--js_out=import_style=commonjs,binary:$(PROTO_DEST_NODE) \
		--grpc_out=$(PROTO_DEST_NODE) \
		--plugin=protoc-gen-grpc=$(GRPC_TOOLS_PLUGIN) \
		-I $(PROTO_SRC) \
		$(PROTO_SRC)/*
	@$(GRPC_TOOLS_BIN) \
		--plugin=protoc-gen-ts=$(GRPC_TOOLS_TS_BIN) \
		--ts_out=$(PROTO_DEST_NODE) \
		-I $(PROTO_SRC) \
		$(PROTO_SRC)/*.proto

# ------------
# grpc go
# ------------
PROTO_DEST_GO=./apps/aggregator/proto

.PHONY: gen_go
gen_go:
	@echo "generating schema for go grpc server by proro..."
	@mkdir -p $(PROTO_DEST_GO)
	@protoc \
		--go_out=$(PROTO_DEST_GO) --go_opt=paths=source_relative \
		--go-grpc_out=$(PROTO_DEST_GO) --go-grpc_opt=paths=source_relative\
		-I $(PROTO_SRC) \
		$(PROTO_SRC)/*.proto