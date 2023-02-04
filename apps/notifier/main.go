package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/slack-go/slack"
)

const slackPostUrl = "https://slack.com/api/chat.postMessage"

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	tkn := os.Getenv("BOT_TOKEN")
	gForm := os.Getenv("GOOGLE_FORM_URL")
	c := slack.New(tkn)
	msg := fmt.Sprintf("Please fill out the form: \n%s", gForm)

	_, _, err = c.PostMessage("#habit-tracker", slack.MsgOptionText(msg, false))
	if err != nil {
		log.Fatal(err)
	}
}
