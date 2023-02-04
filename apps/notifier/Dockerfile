FROM golang:1.18-alpine AS builder

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o app /app/main.go


FROM alpine:3.16

WORKDIR /app
COPY --from=builder /app/app .
COPY .env .
EXPOSE 8080
CMD [ "/app/app" ]
