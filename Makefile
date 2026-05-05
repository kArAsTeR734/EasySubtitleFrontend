IMAGE_NAME := pinn-front-image
CONTAINER_NAME := pinn-front
PORT := 3000:3000

.PHONY: build run stop clean restart

build:
	@docker build -t $(IMAGE_NAME) .

run:
	@docker run --rm --name $(CONTAINER_NAME) -p $(PORT) $(IMAGE_NAME)
	@echo "Приложение доступно по адресу: http://localhost:$(word 1,$(subst :, ,$(PORT)))"

build-and-run: build run

stop:
	@docker stop $(CONTAINER_NAME) || true

clean: stop
	@docker rmi $(IMAGE_NAME) || true

restart: stop build run

logs:
	@docker logs -f $(CONTAINER_NAME)
