import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.OPENAI_API_KEY;

const credential = new AzureKeyCredential(azureApiKey);

async function main() {
    await showCompletionSamples();
    await showChatCompletionsSample();
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

export default { main };

async function showChatCompletionsSample() {
    const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
        { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
        { role: "user", content: "Do other Azure AI services support this too" },
    ];

    console.log("== Chat Completions Sample ==");

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "gpt-35-turbo";
    const result = await client.getChatCompletions(deploymentId, messages);

    for (const choice of result.choices) {
        console.log(choice.message);
    }
}

async function showCompletionSamples() {
    console.log("== Get completions Sample ==");

    const client = new OpenAIClient(endpoint, credential);

    const deploymentId = "text-davinci-003-dev-0109";
    const prompt = "What is an apple?";

    const result = await client.getCompletions(deploymentId, prompt);

    for (const choice of result.choices) {
        console.log(choice.text);
    }
}
