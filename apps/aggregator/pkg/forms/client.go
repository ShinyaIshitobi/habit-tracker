package forms

import (
	"context"
	"io/ioutil"
	"log"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/forms/v1"
	"google.golang.org/api/option"
)

type Client struct {
	Svc    *forms.Service
	Quiz   map[string]string
	formID string
}

func NewClient(formID string) (*Client, error) {
	json, err := ioutil.ReadFile("creds.json")
	if err != nil {
		log.Printf("Error failed to read creds.json: %v", err)
		return nil, err
	}

	config, err := google.JWTConfigFromJSON(json, forms.FormsResponsesReadonlyScope, forms.FormsBodyScope)
	if err != nil {
		log.Printf("Error failed to get JWT config: %v", err)
		return nil, err
	}

	ctx := context.Background()
	tokenSource := config.TokenSource(ctx)
	svc, err := forms.NewService(ctx, option.WithTokenSource(tokenSource))
	if err != nil {
		log.Printf("Error failed to create service: %v", err)
	}

	c := &Client{Svc: svc, formID: formID}
	err = c.createQuestionMap()
	if err != nil {
		log.Printf("Error failed to create question map: %v", err)
	}

	return c, nil
}

func (c *Client) createQuestionMap() error {
	form, err := c.GetForm()
	if err != nil {
		return err
	}

	// map title and question id
	m := make(map[string]string)

	for _, item := range form.Items {
		if item.QuestionItem != nil {
			m[item.QuestionItem.Question.QuestionId] = item.Title
		}
	}
	c.Quiz = m
	return nil
}
