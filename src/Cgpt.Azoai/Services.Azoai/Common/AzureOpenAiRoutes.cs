namespace Services.Azoai.Common;

public static partial class Constants
{
    public static class AzureOpenAiRoutes
    {
        public static string Prefix { get; } = "/api/countries";

        public static string Root => "/";
    }
}