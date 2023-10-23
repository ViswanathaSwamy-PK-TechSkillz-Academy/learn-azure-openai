﻿using Azure;
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

            return Results.Ok("Response From Azure Open AI");

        })
          .AllowAnonymous()
          .WithName("GetAzureOpenAICompletion")
          .ProducesProblem(StatusCodes.Status500InternalServerError)
          .WithOpenApi();
    }

}
