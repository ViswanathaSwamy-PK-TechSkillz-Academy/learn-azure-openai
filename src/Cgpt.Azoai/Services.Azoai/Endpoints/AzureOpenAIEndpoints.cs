using Microsoft.AspNetCore.Mvc;

namespace Services.Azoai.Endpoints;

public static class AzureOpenAIEndpoints
{

    public static void MapAzureOpenAIEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup(AzureOpenAiRoutes.Prefix).WithTags("AzureOpenAIEndpoints.API");

        _ = group.MapGet(AzureOpenAiRoutes.Root, async ([FromQuery] string userInput) =>
        {
            Task.CompletedTask.Wait();

            return Results.Ok("Response From Azure Open AI");

        })
          .AllowAnonymous()
          .WithName("GetAzureOpenAICompletion")
          .ProducesProblem(StatusCodes.Status500InternalServerError)
          .WithOpenApi();
    }

}
