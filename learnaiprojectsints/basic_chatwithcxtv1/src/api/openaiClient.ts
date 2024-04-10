import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";

export class OpenaiClient {
    private client: OpenAIClient;

    constructor(endpoint: string, apiKey: string) {
        const credential = new AzureKeyCredential(apiKey);
        this.client = new OpenAIClient(endpoint, credential);
    }

    async getChatCompletions(deploymentId: string, messages: ChatRequestMessage[]) {
        return await this.client.getChatCompletions(deploymentId, messages);
    }
}
