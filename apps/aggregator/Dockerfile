FROM golang:1.18-alpine AS builder

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o app /app/cmd/main.go


FROM alpine:3.16

WORKDIR /app
COPY --from=builder /app/app .
COPY .env .
COPY creds.json .
CMD [ "/app/app" ]
