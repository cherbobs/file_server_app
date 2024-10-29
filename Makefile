# Makefile
install:
	docker-compose build

run:
	docker-compose up -d

stop:
	docker-compose down

clean:
	docker-compose down -v

logs:
	docker-compose logs -f app


cd app
npm init -y
npm install express