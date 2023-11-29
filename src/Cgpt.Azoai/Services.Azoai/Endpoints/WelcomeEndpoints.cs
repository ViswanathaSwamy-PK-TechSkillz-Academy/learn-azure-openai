namespace Services.Azoai.Endpoints;

public static class WelcomeEndpoints
{
    public static void MapWelcomeEndpoints(this IEndpointRouteBuilder routes)
    {
        const string WelcomeMessage = "Minimal Countries.API. Please visit /swagger for full documentation";

        _ = routes
            .MapGet("/liveness", () => { return "Alive"; })
            .ShortCircuit()
            .WithTags("HealthCheck.API")
            .WithName("Liveness"); ;

        _ = routes
            .MapGet(WelcomeRoutes.Root, () => WelcomeMessage)
            .WithTags("Welcome.API")
            .WithName("GetRootWelcome");

        _ = routes
            .MapGet(WelcomeRoutes.Api, () => WelcomeMessage)
            .WithTags("Welcome.API")
            .WithName("GetApiWelcome");
    }

}
