using Microsoft.EntityFrameworkCore;

namespace FinanceTracker;

public class StockContext : DbContext
{
    public DbSet<Stock> Stocks { get; init; }

    public StockContext(DbContextOptions<StockContext> options)
    {
    }
}

public class Stock
{
    public int StockId { get; init; }
    public string Ticker { get; set; }
    public decimal CurrentPrice { get; set; }
}