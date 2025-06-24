namespace FinanceTracker.CQRS.Command;

public class UpdateStockInfoCommand
{
    public int StockId { get; init; }
    public required string Ticker { get; init; }
    public decimal CurrentPrice { get; init; }
}

public class UpdateStockInfoCommandHandler(StockDbContext dbContext)
{
    public async Task HandleAsync(UpdateStockInfoCommand command)
    {
        if (command.StockId == 0)
            throw new ArgumentNullException(nameof(command.StockId));

        var stock = await dbContext.Stocks.FindAsync(command.StockId);
        if (stock == null)
            throw new ArgumentException($"Stock with id {command.StockId} not found");

        if (command.Ticker.Length > 0)
            stock.Ticker = command.Ticker.ToUpper();

        if (command.CurrentPrice > 0)
            stock.CurrentPrice = command.CurrentPrice;

        await dbContext.SaveChangesAsync();
    }
}