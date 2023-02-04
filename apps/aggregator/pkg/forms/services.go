package forms

import (
	"strconv"
	"time"

	pb "github.com/ShinyaIshitobi/habit-tracker/aggregator/proto"
	"google.golang.org/api/forms/v1"
)

func (c *Client) GetAllAnswers() (*forms.ListFormResponsesResponse, error) {
	res, err := c.Svc.Forms.Responses.List(c.formID).Do()

	if err != nil {
		return nil, err
	}
	return res, nil
}

func (c *Client) GetForm() (*forms.Form, error) {
	form, err := c.Svc.Forms.Get(c.formID).Do()
	if err != nil {
		return nil, err
	}
	return form, nil
}

func (c *Client) SMarshalAnswers(ans *forms.FormResponse) *pb.SProps {
	sprops := &pb.SProps{}

	// cast to yyyy-mm-dd
	sprops.Date = c.GetDate(ans)

	for _, quiz := range ans.Answers {
		switch c.Quiz[quiz.QuestionId] {
		case "12時までに寝ましたか":
			sprops.BedBy12 = quiz.TextAnswers.Answers[0].Value == "はい"
		case "テックブログ読みましたか":
			sprops.TechBlog = quiz.TextAnswers.Answers[0].Value == "はい"
		case "自炊しましたか":
			sprops.Cooking = quiz.TextAnswers.Answers[0].Value == "はい"
		case "瞑想しましたか":
			sprops.Meditation = quiz.TextAnswers.Answers[0].Value == "はい"
		case "筋トレしましたか":
			sprops.Ringfit = quiz.TextAnswers.Answers[0].Value == "はい"
		case "8時に起きましたか":
			sprops.WakeUpBy8 = quiz.TextAnswers.Answers[0].Value == "はい"
		}
	}

	return sprops
}

func (c *Client) HMarshalAnswer(ans *forms.FormResponse) *pb.HProps {
	hprops := &pb.HProps{}

	// cast to yyyy-mm-dd
	hprops.Date = c.GetDate(ans)

	for _, quiz := range ans.Answers {
		switch c.Quiz[quiz.QuestionId] {
		case "12時までに寝ましたか":
			hprops.BedBy12 = quiz.TextAnswers.Answers[0].Value == "はい"
		case "自炊しましたか":
			hprops.Cooking = quiz.TextAnswers.Answers[0].Value == "はい"
		case "瞑想しましたか":
			hprops.Meditation = quiz.TextAnswers.Answers[0].Value == "はい"
		case "筋トレ15分間しましたか":
			hprops.Training = quiz.TextAnswers.Answers[0].Value == "はい"
		}
	}

	return hprops
}

func (c *Client) GetRespondent(ans *forms.FormResponse) string {
	for _, quiz := range ans.Answers {
		if c.Quiz[quiz.QuestionId] == "お名前を教えてください" {
			return quiz.TextAnswers.Answers[0].Value
		}
	}
	return ""
}

func (c *Client) GetDate(ans *forms.FormResponse) string {
	ct := ans.CreateTime
	y, _ := strconv.Atoi(ct[:4])
	mon, _ := strconv.Atoi(ct[5:7])
	d, _ := strconv.Atoi(ct[8:10])
	h, _ := strconv.Atoi(ct[11:13])
	m, _ := strconv.Atoi(ct[14:16])
	s, _ := strconv.Atoi(ct[17:19])

	t := time.Date(y, time.Month(mon), d, h, m, s, 0, time.UTC)
	t = t.Add(9 * time.Hour)
	return t.Format("2006-01-02")
}
