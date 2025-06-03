namespace FinanceTracker.Services;

public interface IFinnhubService
{
    Task<StockPriceByTickerQueryResult> GetStockPriceByTicker(string ticker);
}