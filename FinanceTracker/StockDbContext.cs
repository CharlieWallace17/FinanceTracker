using Microsoft.EntityFrameworkCore;

namespace FinanceTracker;

public class StockDbContext(DbContextOptions<StockDbContext> options) : DbContext(options)
{
    public DbSet<Stock> Stocks { get; init; }
}

public class Stock
{
    public int StockId { get; init; }
    public required string Ticker { get; set; }
    public decimal CurrentPrice { get; set; }
}