package main

import (
	"context"
	"fmt"
	"os"

	"github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
)

func main() {
	azureOpenAIKey := os.Getenv("OPENAI_API_KEY")
	modelDeploymentID := "text-davinci-003-dev-0109"

	azureOpenAIEndpoint := os.Getenv("AZURE_OPENAI_ENDPOINT")

	if azureOpenAIKey == "" || modelDeploymentID == "" || azureOpenAIEndpoint == "" {
		fmt.Fprintf(os.Stderr, "Skipping example, environment variables missing\n")
		return
	}

	keyCredential, err := azopenai.NewKeyCredential(azureOpenAIKey)

	if err != nil {
		// TODO: handle error
	}

	client, err := azopenai.NewClientWithKeyCredential(azureOpenAIEndpoint, keyCredential, nil)

	if err != nil {
		// TODO: handle error
	}

	resp, err := client.GetCompletions(context.TODO(), azopenai.CompletionsOptions{
		Prompt:      []string{"What is Azure OpenAI, in 20 words or less"},
		MaxTokens:   to.Ptr(int32(2048)),
		Temperature: to.Ptr(float32(0.0)),
	}, nil)

	if err != nil {
		// TODO: handle error
	}

	for _, choice := range resp.Choices {
		fmt.Fprintf(os.Stderr, "Result: %s\n", *choice.Text)
	}

}
