import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import { encoding_for_model, get_encoding } from "tiktoken";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["OPENAI_API_KEY"];

if (!endpoint || !azureApiKey) {
    throw new Error("Azure endpoint or OpenAI API key is not defined.");
}

const credential = new AzureKeyCredential(azureApiKey);
const openAiClient = new OpenAIClient(endpoint, credential);
const deploymentId = "gpt-35-turbo";
const encoder = encoding_for_model('gpt-3.5-turbo');
const MAX_TOKENS = Number(process.env["MAX_TOKENS"]);

const chatRequestMessages: ChatRequestMessage[] = [
    { role: 'system', content: 'You are a helpful chatbot' }
];

async function createChatCompletion() {
    const response = await openAiClient.getChatCompletions(deploymentId, chatRequestMessages);
    const responseMessage = response?.choices[0]?.message;
    chatRequestMessages.push({ role: 'assistant', content: responseMessage?.content! });

    if (response.usage && response.usage.totalTokens > MAX_TOKENS) {
        console.log(`\x1b[31mCurrent tokens are ${response.usage.totalTokens}. Deleting the older messages ... \x1b[0m`);

        deleteOlderMessages();
    }

    console.log(`\x1b[36m${response?.choices[0]?.message?.role}: ${response?.choices[0]?.message?.content}\x1b[0m`);

    // console.log(`\x1b[43mInfo :: Current tokens are ${response?.usage?.totalTokens} and Max Tokens: ${MAX_TOKENS}. \x1b[0m`);
    // console.log(`\x1b[35mInfo :: Current tokens are ${response?.usage?.totalTokens}. \x1b[0m`);
    // console.log(`\x1b[38;5;217mInfo :: Current Tokens: ${response?.usage?.totalTokens} :: Max Tokens: ${MAX_TOKENS}. \x1b[0m`);
    console.log(`\x1b[38;5;131m\x1b[48;5;252mInfo :: Current Tokens: ${response?.usage?.totalTokens} :: Max Tokens: ${MAX_TOKENS}. \x1b[0m`);
}

console.log("\x1b[32m========== Basic Chat Sample ==========\x1b[0m");
displayMessage();

process.stdin.addListener('data', async function (input) {
    const userInput = input.toString().trim();

    if (userInput?.toLowerCase() === 'quit') {
        console.log(`\x1b[36mThank You for using Chat Application. Please Visit us again !!!\n\n\x1b[0m`);
        process.exit(0);
    }

    encodePrompt(userInput);

    chatRequestMessages.push({ role: 'user', content: userInput });

    await createChatCompletion();

    displayMessage();
})


async function displayMessage() {
    console.log("\n\x1b[33mEnter a message to chat with the AI model. Type 'quit' to exit.\x1b[0m"); // Yellow color for instruction
}

function deleteOlderMessages() {
    let contextLength = getContextLength();

    while (contextLength > MAX_TOKENS) {
        for (let i = 0; i < chatRequestMessages.length; i++) {
            const message = chatRequestMessages[i];

            if (message.role != 'system') {
                chatRequestMessages.splice(i, 1);
                contextLength = getContextLength();
                console.log('New context length: ' + contextLength);
                break;
            }
        }
    }
}

function getContextLength() {
    let length = 0;

    chatRequestMessages.forEach((message: ChatRequestMessage) => {
        if (typeof message.content == 'string') {
            length += encoder.encode(message.content).length;
        } else if (Array.isArray(message.content)) {
            message.content.forEach((messageContent) => {
                if (messageContent.type == 'text') {
                    length += encoder.encode(messageContent.text).length;
                }
            })
        }
    })

    return length
}

// Reference: https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken
async function encodePrompt(prompt: string) {
    // const prompt = "How are you today?"
    const encoder = encoding_for_model('gpt-3.5-turbo');
    const words = encoder.encode(prompt);

    const encoding = get_encoding("cl100k_base")
    const decodedBytes = encoding.decode(words);

    // Convert bytes to string
    const decodedPrompt = Buffer.from(decodedBytes).toString('utf-8');
}
