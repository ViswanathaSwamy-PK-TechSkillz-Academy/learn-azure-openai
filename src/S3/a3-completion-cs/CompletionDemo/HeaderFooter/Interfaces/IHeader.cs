namespace HeaderFooter.Interfaces;

public interface IHeader
{
    void DisplayHeader(char header, string title, int length = 100, ConsoleColor foregroundColor = ConsoleColor.Yellow);
}
