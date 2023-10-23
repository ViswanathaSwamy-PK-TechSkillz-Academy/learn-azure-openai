//using Microsoft.AspNetCore.Mvc;

//namespace Services.Azoai.Endpoints;

//public static class CountriesEndpoints
//{

//    public static void MapCountriesEndpoints(this IEndpointRouteBuilder routes)
//    {
//        var group = routes.MapGroup(CountriesRoutes.Prefix).WithTags(nameof(CountryInfo));

//        _ = group.MapGet(CountriesRoutes.Root, async ([FromServices] ICountriesBusiness countriesBusiness) =>
//        {
//            return Results.Ok(await countriesBusiness.GetAllCountries());

//        })
//          .AllowAnonymous()
//          .WithName("GetAllCountries")
//          .Produces<IReadOnlyCollection<CountryInfo>>(StatusCodes.Status200OK)
//          .ProducesProblem(StatusCodes.Status500InternalServerError)
//          .WithOpenApi();
//    }

//}
