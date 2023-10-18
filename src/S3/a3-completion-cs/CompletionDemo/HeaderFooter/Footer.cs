using HeaderFooter.Interfaces;

namespace HeaderFooter;

public class Footer : IFooter
{

    public void DisplayFooter(char footer, int length = 100, ConsoleColor foregroundColor = ConsoleColor.Yellow)
    {
        ForegroundColor = foregroundColor;

        WriteLine($"\n{new string(footer, length)}\n");

        ResetColor();
    }

}