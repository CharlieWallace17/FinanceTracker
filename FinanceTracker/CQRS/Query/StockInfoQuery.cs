using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.CQRS;

public class StockInfoQuery
{
    public int StockId { get; init; }
}

public class StockInfoQueryHandler(StockDbContext dbContext)
{
    public async Task<Stock?> HandleAsync(StockInfoQuery query)
    {
        var result = await (from stock in dbContext.Stocks
            where stock.StockId == query.StockId
            select stock).FirstOrDefaultAsync();

        if (result == null)
            throw new Exception("Stock not found");

        return result;
    }
}