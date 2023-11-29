namespace Services.Azoai.Endpoints;

public static class HealthCheckEndpoints
{
    public static void MapHealthCheckEndpoints(this IEndpointRouteBuilder routes)
    {
        _ = routes
            .MapGet(HealthCheckRoutes.Root, () => { return "Alive"; })
            .ShortCircuit()
            .WithTags("HealthCheck.API")
            .WithName("Liveness"); ;
    }

}
