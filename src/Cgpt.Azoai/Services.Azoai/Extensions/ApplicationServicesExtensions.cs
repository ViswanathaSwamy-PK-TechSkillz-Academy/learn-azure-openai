using Services.Azoai.Repositories;

namespace Services.Azoai.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection ConfigureApplicationServices(this IServiceCollection services)
    {
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        _ = services.AddEndpointsApiExplorer();
        _ = services.AddSwaggerGen();

        _ = services.AddTransient<IAzureOpenAiRepository, AzureOpenAiRepository>();

        return services;
    }

}
