﻿// Note: the Azure OpenAI client library for .NET is in preview.
// Install the .NET library via NuGet: dotnet add package Azure.AI.OpenAI --version 1.0.0-beta.8

using Azure;
using Azure.AI.OpenAI;
using HeaderFooter;
using Microsoft.Extensions.Configuration;

var _configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<Program>()
    .Build();

Header _header = new();
Footer _footer = new();

OpenAIClient client = new(new Uri(_configuration["CompletionConfiguration:OPEN_API_EndPoint"]!),
                            new AzureKeyCredential(Env.GetEnvironmentVariable("OPENAI_API_KEY")!));

const string prompt = "What are the top 10 countries with highest populations are along with their population count and capital city : \n";

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

_header.DisplayHeader('=', "Azure Open AI Completion Demo");

ForegroundColor = ConsoleColor.DarkCyan;

int index = 0;
foreach (string? text in completionsResponse.Value?.Choices?.Select(c => c.Text)?.ToArray()!)
{
    WriteLine($"{++index}. {text}");
}

_footer.DisplayFooter('-');

ResetColor();

WriteLine("\nPress any key ...");
ReadKey();
