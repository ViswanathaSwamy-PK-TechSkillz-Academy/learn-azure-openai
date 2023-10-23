using Azure;
using Azure.AI.OpenAI;

namespace Services.Azoai.Repositories;

public interface IAzureOpenAiRepository
{
    Task<Response<Completions>> GetCompletionFromAzureOpenAI(string userInput);
}