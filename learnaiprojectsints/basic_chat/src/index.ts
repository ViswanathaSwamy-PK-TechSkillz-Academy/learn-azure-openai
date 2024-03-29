import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import { encoding_for_model, get_encoding } from "tiktoken";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["OPENAI_API_KEY"];

if (!endpoint || !azureApiKey) {
    throw new Error("Azure endpoint or OpenAI API key is not defined.");
}

const credential = new AzureKeyCredential(azureApiKey);
const openAiClient = new OpenAIClient(endpoint, credential);

console.log("\x1b[32m========== Basic Chat Sample ==========\x1b[0m");
displayMessage();

process.stdin.addListener('data', async function (input) {
    const userInput = input.toString().trim();

    encodePrompt(userInput);

    const messages: ChatRequestMessage[] = [
        { role: 'system', content: 'You are a helpful chatbot' },
        { role: 'user', content: userInput },
    ];

    const deploymentId = "gpt-35-turbo";
    const response = await openAiClient.getChatCompletions(deploymentId, messages);

    // \x1b[35m$
    console.log(`\x1b[36m${response?.choices[0]?.message?.content}\x1b[0m`);

    if (userInput === 'quit') {
        process.exit(0);
    }

    displayMessage();
})


// Reference: https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken
async function encodePrompt(prompt: string) {
    // const prompt = "How are you today?"
    const encoder = encoding_for_model('gpt-3.5-turbo');
    const words = encoder.encode(prompt);
    // console.log("Encode Prompt: ", words)
    // console.log("Number of Tokens: ", words.length)

    const encoding = get_encoding("cl100k_base")
    const decodedBytes = encoding.decode(words);

    // Convert bytes to string
    const decodedPrompt = Buffer.from(decodedBytes).toString('utf-8');
    // console.log("Decoded Prompt: ", decodedPrompt);
}

async function displayMessage() {
    console.log("\n\x1b[33mEnter a message to chat with the AI model. Type 'quit' to exit.\x1b[0m"); // Yellow color for instruction
}

// Color codes for console output
// \x1b[31m Red
// \x1b[32m Green
// \x1b[33m Yellow
// \x1b[34m Blue
// \x1b[35m Magenta
// \x1b[36m Cyan
// \x1b[37m White
// \x1b[90m Gray
// \x1b[0m Reset color
