using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.CQRS;

public class StockInfoQuery
{
    public int StockId { get; init; }
}

public class StockInfoQueryHandler(StockContext dbContext)
{
    public async Task<Stock?> HandleAsync(StockInfoQuery stockInfoQuery)
    {
        return await (from stock in dbContext.Stocks
            where stock.StockId == stockInfoQuery.StockId
            select stock).FirstOrDefaultAsync();
    }
}