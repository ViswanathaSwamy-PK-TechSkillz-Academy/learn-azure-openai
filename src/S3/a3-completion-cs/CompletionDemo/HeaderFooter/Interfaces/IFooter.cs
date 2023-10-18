namespace HeaderFooter.Interfaces;

public interface IFooter
{
    void DisplayFooter(char footer, int length = 100, ConsoleColor foregroundColor = ConsoleColor.Yellow);
}
