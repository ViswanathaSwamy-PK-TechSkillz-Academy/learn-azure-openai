using Services.Azoai.Extensions;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ConfigureApplicationServices();

// Configure static file serving
builder.WebHost.UseWebRoot("wwwroot");

var app = builder.Build();

app.ConfigureHttpRequestPipeline();

app.Run();

