FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache sqlite

RUN mkdir -p /data

COPY init.sql /app/

VOLUME /data

CMD ["sh", "-c", "sqlite3 /data/database.sqlite < /app/init.sql && tail -f /dev/null"]
