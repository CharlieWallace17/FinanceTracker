using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.CQRS;

public class DeleteStockInfoCommand
{
    public int StockId { get; set; }
}

public class DeleteStockInfoCommandHandler(StockContext dbContext)
{
    public async Task HandleAsync(DeleteStockInfoCommand command)
    {
        var stockInfo = await (from stock in dbContext.Stocks
            where stock.StockId == command.StockId
            select stock).FirstOrDefaultAsync();

        if (stockInfo == null)
            throw new Exception("Stock not found");

        dbContext.Remove(stockInfo);
        await dbContext.SaveChangesAsync();
    }
}