using FinanceTracker.Services;

namespace FinanceTracker.CQRS;

public class StockPriceByTickerQuery
{
    public required string Ticker { get; init; }
}

public class StockPriceByTickerQueryHandler(IFinnhubService finnhubService)
{
    public async Task<StockPriceByTickerQueryResult> HandleAsync(StockPriceByTickerQuery query)
    {
        var result = await finnhubService.GetStockPriceByTicker(query.Ticker);

        return result;
    }
}