import { OpenaiClient } from "./api/openaiClient";
import { encodePrompt } from "./utils/encodingUtils";
import { AzureConfig } from "./constants/azureConfig";
import { MAX_TOKENS } from "./constants/chatConstants";
import { ChatRequestMessage } from "@azure/openai";

if (!AzureConfig.endpoint || !AzureConfig.apiKey) {
    throw new Error("Azure endpoint or OpenAI API key is not defined.");
}

const openAiClient = new OpenaiClient(AzureConfig.endpoint, AzureConfig.apiKey);
const deploymentId = "gpt-35-turbo";
const chatRequestMessages: ChatRequestMessage[] = [{ role: 'system', content: 'You are a helpful chatbot' }];

async function createChatCompletion() {
    const response = await openAiClient.getChatCompletions(deploymentId, chatRequestMessages);
    const responseMessage = response?.choices[0]?.message;
    chatRequestMessages.push({ role: 'assistant', content: responseMessage?.content! });

    if (response.usage && response.usage.totalTokens > MAX_TOKENS) {
        console.log(`\x1b[31mSystem: Current tokens are ${response.usage.totalTokens}. Deleting the older messages ... \x1b[0m`);

        deleteOlderMessages();
    }

    console.log(`\x1b[36m${response?.choices[0]?.message?.role}: ${response?.choices[0]?.message?.content}\x1b[0m`);

    console.log(`\x1b[38;5;230mSystem Info :: Current Tokens: ${response?.usage?.totalTokens} :: Max Tokens: ${MAX_TOKENS}. \x1b[0m`);
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
            length += encodePrompt(message.content).length;
        } else if (Array.isArray(message.content)) {
            message.content.forEach((messageContent) => {
                if (messageContent.type == 'text') {
                    length += encodePrompt(messageContent.text).length;
                }
            })
        }
    })

    return length
}

async function main() {
    console.log("\x1b[32m========== Basic Chat Sample ==========\x1b[0m");
    console.log("\n\x1b[33mSystem: Enter a message to chat with the AI model. Type 'quit' to exit.\x1b[0m"); // Yellow color for instruction
    process.stdout.write('User: ');

    process.stdin.addListener('data', async function (input) {
        const userInput = input.toString().trim();

        if (userInput?.toLowerCase() === 'quit') {
            console.log(`\x1b[36mSystem: Thank You for using Chat Application. Please Visit us again !!!\n\n\x1b[0m`);
            process.exit(0);
        }

        chatRequestMessages.push({ role: 'user', content: userInput });

        await createChatCompletion();

        console.log("\n\x1b[33mSystem: Enter a message to chat with the AI model. Type 'quit' to exit.\x1b[0m"); // Yellow color for instruction
        process.stdout.write('User: ');
    });
}

main();

