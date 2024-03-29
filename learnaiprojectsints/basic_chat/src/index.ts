import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import { encoding_for_model, get_encoding } from "tiktoken";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["OPENAI_API_KEY"];

if (!endpoint || !azureApiKey) {
    throw new Error("Azure endpoint or OpenAI API key is not defined.");
}

const credential = new AzureKeyCredential(azureApiKey);
const client = new OpenAIClient(endpoint, credential);

console.log("== Basic Chat Sample ==");
console.log("Enter a message to chat with the AI model. Type 'quit' to exit.");

process.stdin.addListener('data', async function (input) {
    const userInput = input.toString().trim();

    const messages: ChatRequestMessage[] = [
        { role: 'system', content: 'You are a helpful chatbot' },
        { role: 'user', content: userInput },
    ];

    const deploymentId = "gpt-35-turbo";
    const response = await client.getChatCompletions(deploymentId, messages);

    console.log(response?.choices[0]?.message?.content)

    if(userInput === 'quit') {
        process.exit(0);
    }
})

// async function main() {
//     await showCompletionSamples();

//     await showChatCompletionsSample();

//     await encodePrompt();
// }

// main().catch((err) => {
//     console.error("The sample encountered an error:", err);
// });

// export default { main };

// async function showChatCompletionsSample() {
//     const messages: ChatRequestMessage[] = [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
//         { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
//         { role: "user", content: "Do other Azure AI services support this too" },
//     ];

//     console.log("== Chat Completions Sample ==");

//     const deploymentId = "gpt-35-turbo";
//     const result = await client.getChatCompletions(deploymentId, messages);

//     for (const choice of result.choices) {
//         console.log(choice.message);
//     }
// }

// async function showCompletionSamples() {

//     console.log("== Get completions Sample ==");

//     const deploymentId = "text-davinci-003-dev-0109";
//     const prompt = "What is an apple?";

//     const result = await client.getCompletions(deploymentId, [prompt]);

//     for (const choice of result.choices) {
//         console.log(choice.text);
//     }
// }

// // Reference: https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken
// async function encodePrompt() {
//     const prompt = "How are you today?"
//     const encoder = encoding_for_model('gpt-3.5-turbo');
//     const words = encoder.encode(prompt);
//     console.log("Encode Prompt: ", words)
//     console.log("Number of Tokens: ", words.length)

//     const encoding = get_encoding("cl100k_base")
//     const decodedBytes = encoding.decode(words);

//     // Convert bytes to string
//     const decodedPrompt = Buffer.from(decodedBytes).toString('utf-8');
//     console.log("Decoded Prompt: ", decodedPrompt);
// }

