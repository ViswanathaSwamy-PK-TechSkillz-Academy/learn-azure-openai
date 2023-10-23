using Microsoft.AspNetCore.Mvc;

namespace Services.Azoai.Endpoints;

public static class AzureOpenAIEndpoints
{

    public static void MapCountriesEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup(AzureOpenAiRoutes.Prefix).WithTags("AzureOpenAIEndpoints.API");

        _ = group.MapGet(AzureOpenAiRoutes.Root, async ([FromServices] ICountriesBusiness countriesBusiness) =>
        {
            return Results.Ok(await countriesBusiness.GetAllCountries());

        })
          .AllowAnonymous()
          .WithName("GetAllCountries")
          .Produces<IReadOnlyCollection<CountryInfo>>(StatusCodes.Status200OK)
          .ProducesProblem(StatusCodes.Status500InternalServerError)
          .WithOpenApi();
    }

}
