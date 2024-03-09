using Services.Azoai.Endpoints;

namespace Services.Azoai.Extensions;

public static class HttpRequestPipelineExtensions
{

    public static WebApplication ConfigureHttpRequestPipeline(this WebApplication app)
    {
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.Use(async (context, next) =>
        {
            // Executes at start of middleware pipeline for incoming request
            //Debugger.Break();

            await next.Invoke();

            // Executes at end of middleware pipeline for outgoing response
            //Debugger.Break();
        });

        app.MapWelcomeEndpoints();

        app.MapHealthCheckEndpoints();

        app.MapAzureOpenAIEndpoints();

        return app;
    }
}
