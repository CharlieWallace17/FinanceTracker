namespace FinanceTracker.CQRS;

public class CreateStockInfoCommand
{
    public string Ticker { get; set; }
    public decimal CurrentPrice { get; set; }
}

public class CreateStockInfoCommandHandler(StockContext dbContext)
{
    public async Task HandleAsync(CreateStockInfoCommand command)
    {
        if (command.Ticker == null)
            throw new ArgumentNullException(nameof(command.Ticker));

        await dbContext.AddAsync(new Stock
        {
            Ticker = command.Ticker,
            CurrentPrice = command.CurrentPrice
        });

        await dbContext.SaveChangesAsync();
    }
}