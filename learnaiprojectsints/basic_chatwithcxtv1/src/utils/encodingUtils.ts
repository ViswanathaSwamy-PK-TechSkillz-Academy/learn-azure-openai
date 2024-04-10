import { encoding_for_model, get_encoding } from "tiktoken";

export function encodePrompt(prompt: string) {
    const encoder = encoding_for_model('gpt-3.5-turbo');
    const words = encoder.encode(prompt);
    const encoding = get_encoding("cl100k_base");
    
    const decodedBytes = encoding.decode(words);

    return Buffer.from(decodedBytes).toString('utf-8');
}
