package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/ShinyaIshitobi/habit-tracker/aggregator/pkg/forms"
	pb "github.com/ShinyaIshitobi/habit-tracker/aggregator/proto"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	ctx := context.Background()
	address := "registerer:50051"
	conn, err := grpc.Dial(address, grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		log.Fatalf("Error connecting to server: %v", err)
	}
	defer conn.Close()

	gc := pb.NewHabitTrackerClient(conn)

	formID := os.Getenv("GOOGLE_FORMS_FORM_ID")
	c, err := forms.NewClient(formID)
	if err != nil {
		log.Fatalf("Error creating service: %v", err)
	}

	// Retrieve answers
	answers, err := c.GetAllAnswers()
	if err != nil {
		log.Fatalf("Unable to retrieve form answers: %v", err)
	}

	// Print answers
	h := os.Getenv("H")
	s := os.Getenv("S")
	for _, answer := range answers.Responses {
		fmt.Println("===================")
		fmt.Println("Respondent: ", c.GetRespondent(answer))
		fmt.Println("Date: ", c.GetDate(answer))
		switch c.GetRespondent(answer) {
		case s:
			sprops := c.SMarshalAnswers(answer)
			_, err = gc.RegisterSProps(ctx, sprops)
			if err != nil {
				log.Fatalf("Error calling RegisterSProps: %v", err)
			}
		case h:
			hprops := c.HMarshalAnswer(answer)
			_, err = gc.RegisterHProps(ctx, hprops)
			if err != nil {
				log.Fatalf("Error calling RegisterHProps: %v", err)
			}
		}
	}
}
