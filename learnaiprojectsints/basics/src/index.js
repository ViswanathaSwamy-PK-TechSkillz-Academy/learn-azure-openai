import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["OPENAI_API_KEY"];

const credential = new AzureKeyCredential(azureApiKey);

async function main() {
    console.log("== Get completions Sample ==");

    const client = new OpenAIClient(endpoint, credential);

    const deploymentId = "text-davinci-003-dev-0109";
    const prompt = "Once upon a time, ";

    const result = await client.getCompletions(deploymentId, prompt);

    for (const choice of result.choices) {
        console.log(choice.text);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

export default { main };