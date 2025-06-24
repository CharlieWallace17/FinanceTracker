using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.CQRS.Query;

public class StocksInfoQuery;

public class StocksInfoQueryHandler(StockDbContext dbContext)
{
    public async Task<List<Stock>> HandleAsync(StocksInfoQuery query)
    {
        var result = await (from stock in dbContext.Stocks
            select stock).ToListAsync();

        if (result.Count < 0)
            throw new Exception("Stock not found");

        return result;
    }
}