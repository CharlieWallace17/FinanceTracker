﻿namespace FinanceTracker.CQRS.Command;

public class CreateStockInfoCommand
{
    public required string Ticker { get; set; }
    public decimal CurrentPrice { get; set; }
}

public class CreateStockInfoCommandHandler(StockDbContext dbContext)
{
    public async Task HandleAsync(CreateStockInfoCommand command)
    {
        if (command.Ticker == null)
            throw new ArgumentNullException(nameof(command.Ticker));

        await dbContext.AddAsync(new Stock
        {
            Ticker = command.Ticker.ToUpper(),
            CurrentPrice = command.CurrentPrice
        });

        await dbContext.SaveChangesAsync();
    }
}