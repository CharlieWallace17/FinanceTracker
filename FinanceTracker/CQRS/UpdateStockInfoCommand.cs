namespace FinanceTracker.CQRS;

public class UpdateStockInfoCommand
{
    public int StockId { get; set; }
    public string Ticker { get; set; }
    public decimal CurrentPrice { get; set; }
}

public class UpdateStockInfoCommandHandler(StockContext dbContext)
{
    public async Task HandleAsync(UpdateStockInfoCommand command)
    {
        if (command.StockId == default)
            throw new ArgumentNullException(nameof(command.StockId));

        var stock = await dbContext.Stocks.FindAsync(command.StockId);
        if (stock == null)
            throw new ArgumentException($"Stock with id {command.StockId} not found");

        if (command.Ticker.Length > 0)
            stock.Ticker = command.Ticker;

        if (command.CurrentPrice > 0)
            stock.CurrentPrice = command.CurrentPrice;

        await dbContext.SaveChangesAsync();
    }
}