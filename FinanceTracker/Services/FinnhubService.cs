
namespace FinanceTracker.Services;

public class FinnhubResult
{
    // ReSharper disable once InconsistentNaming
    public decimal c { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal d { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal dp { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal h { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal l { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal o { get; init; }

    // ReSharper disable once InconsistentNaming
    public decimal pc { get; init; }
}

public class StockPriceByTickerQueryResult
{
    public decimal CurrentPrice { get; init; }
    public decimal Change { get; init; }
    public decimal PercentChange { get; init; }
    public decimal HighDailyPrice { get; init; }
    public decimal LowDailyPrice { get; init; }
    public decimal OpenPrice { get; init; }
    public decimal PreviousClosePrice { get; init; }
}

public class FinnhubService(HttpClient client) : IFinnhubService
{
    public async Task<StockPriceByTickerQueryResult> GetStockPriceByTicker(string ticker)
    {
        string url = $"quote?symbol={ticker}&token={Constants.ApiKey}";

        var response = await client.GetAsync(url);

        string content = await response.Content.ReadAsStringAsync();

        var apiQuote = System.Text.Json.JsonSerializer.Deserialize<FinnhubResult>(content);

        if (apiQuote == null)
            throw new ApplicationException($"Unable to get stock price for ticker: {ticker}");

        return new StockPriceByTickerQueryResult
        {
            CurrentPrice = apiQuote.c,
            Change = apiQuote.d,
            PercentChange = apiQuote.dp,
            HighDailyPrice = apiQuote.h,
            LowDailyPrice = apiQuote.l,
            OpenPrice = apiQuote.o,
            PreviousClosePrice = apiQuote.pc
        };
    }
}