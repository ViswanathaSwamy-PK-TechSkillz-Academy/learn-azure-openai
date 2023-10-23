using Azure;
using Azure.AI.OpenAI;

namespace Services.Azoai.Repositories;

public class AzureOpenAiRepository(IConfiguration configuration)
{
    private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

    public async Task<IReadOnlyList<Choice>?> GetCompletionFromAzureOpenAI(string userInput)
    {
        OpenAIClient client = new(new Uri(_configuration["CompletionConfiguration:OPEN_API_EndPoint"]!),
                            new AzureKeyCredential(Env.GetEnvironmentVariable("OPENAI_API_KEY")!));

        string prompt = $"User Input: {userInput}\n";

        Response<Completions> completionsResponse = await client.GetCompletionsAsync(
            deploymentOrModelName: _configuration["CompletionConfiguration:ModelDeploymentName"]!,
            new CompletionsOptions()
            {
                Prompts = { prompt },
                Temperature = (float)1,
                MaxTokens = 120,
                NucleusSamplingFactor = (float)0.5,
                FrequencyPenalty = (float)0,
                PresencePenalty = (float)0,
                GenerationSampleCount = 1,
                Echo = true
            });

        return completionsResponse.Value?.Choices;
    }

}
