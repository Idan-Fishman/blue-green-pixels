FROM golang:1.19-alpine AS build

WORKDIR /go/src/app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server .


FROM alpine:latest AS release

RUN apk add --no-cache dumb-init ca-certificates \
    && addgroup -g 10001 go \
    && adduser -D -u 10001 -G go go

WORKDIR /app
COPY --from=build --chown=go:go /go/src/app/server .

USER go:go

EXPOSE 3000

ENTRYPOINT ["dumb-init", "./server"]
