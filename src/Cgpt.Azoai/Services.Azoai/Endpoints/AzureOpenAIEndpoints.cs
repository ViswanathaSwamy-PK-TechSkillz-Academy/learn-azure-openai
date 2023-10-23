using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using Services.Azoai.Repositories;

namespace Services.Azoai.Endpoints;

public static class AzureOpenAIEndpoints
{

    public static void MapAzureOpenAIEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup(AzureOpenAiRoutes.Prefix).WithTags("AzureOpenAIEndpoints.API");

        _ = group.MapGet(AzureOpenAiRoutes.Root, async ([FromQuery] string userInput, [FromServices] IAzureOpenAiRepository azureOpenAiRepository) =>
        {

            Response<Completions> completionResponse = await azureOpenAiRepository.GetCompletionFromAzureOpenAI(userInput);

            return Results.Ok(completionResponse?.Value?.Choices[0].Text);
        })
          .AllowAnonymous()
          .WithName("GetAzureOpenAICompletion")
          .Produces<string>(StatusCodes.Status200OK)
          .ProducesProblem(StatusCodes.Status500InternalServerError)
          .WithOpenApi();
    }

}
