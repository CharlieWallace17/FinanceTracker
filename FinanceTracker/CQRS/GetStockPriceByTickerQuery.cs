using FinanceTracker.Services;

namespace FinanceTracker.CQRS;

public class GetStockPriceByTickerQuery
{
    public required string Ticker { get; init; }
}

public class GetStockPriceByTickerQueryHandler(IFinnhubService finnhubService)
{
    public async Task<GetStockPriceByTickerResult> HandleAsync(GetStockPriceByTickerQuery query)
    {
        var result = await finnhubService.GetStockPriceByTicker(query.Ticker);

        return result;
    }
}