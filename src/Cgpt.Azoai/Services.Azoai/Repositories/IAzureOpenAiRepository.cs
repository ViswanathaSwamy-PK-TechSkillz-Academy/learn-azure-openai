using Azure.AI.OpenAI;

namespace Services.Azoai.Repositories;

public interface IAzureOpenAiRepository
{
    Task<IReadOnlyList<Choice>?> GetCompletionFromAzureOpenAI(string userInput);
}