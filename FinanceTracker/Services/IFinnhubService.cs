namespace FinanceTracker.Services;

public interface IFinnhubService
{
    Task<GetStockPriceByTickerResult> GetStockPriceByTicker(string ticker);
}