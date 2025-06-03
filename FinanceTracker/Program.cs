using FinanceTracker;
using FinanceTracker.CQRS;
using FinanceTracker.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
// Register Finnhub API
builder.Services.AddHttpClient<IFinnhubService, FinnhubService>(client =>
{
    client.BaseAddress = new Uri("https://finnhub.io/api/v1/");
    client.Timeout = TimeSpan.FromSeconds(30);
});

// Register CQRS
builder.Services.AddScoped<StockPriceByTickerQueryHandler>();
builder.Services.AddScoped<StockInfoQueryHandler>();
builder.Services.AddScoped<CreateStockInfoCommandHandler>();
builder.Services.AddScoped<UpdateStockInfoCommandHandler>();
builder.Services.AddScoped<DeleteStockInfoCommandHandler>();

// Add CORS for Client App
const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
        policy => { policy.WithOrigins("http://localhost:5173").AllowAnyHeader(); });
});

// Connect to local db
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                          ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<StockContext>(options => options.UseSqlite(connectionString));

var app = builder.Build();

// Generate OpenAPI documentation 
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // TODO: may want to add SwaggerUI here for API testing
}

app.MapGet("/tickerInfo/{ticker}", async (string ticker, StockPriceByTickerQueryHandler handler) =>
{
    var result = await handler.HandleAsync(new StockPriceByTickerQuery { Ticker = ticker });

    return Results.Ok(result);
});

app.MapGet("/stock/{stockId:int}", async (int stockId, StockInfoQueryHandler handler) =>
{
    var result = await handler.HandleAsync(new StockInfoQuery { StockId = stockId });

    return Results.Ok(result);
});

app.MapPost("/stock/create", async (CreateStockInfoCommandHandler handler, string ticker, decimal currentPrice) =>
{
    await handler.HandleAsync(new CreateStockInfoCommand { Ticker = ticker, CurrentPrice = currentPrice });

    return Results.Ok("Stock added");
});

app.MapPost("/stock/{stockId:int}", async (UpdateStockInfoCommandHandler handler, int stockId, string ticker, decimal currentPrice) =>
{
    await handler.HandleAsync(new UpdateStockInfoCommand { StockId = stockId, Ticker = ticker, CurrentPrice = currentPrice });

    return Results.Ok("Stock added");
});

app.MapDelete("/stock/{stockId:int}", async (DeleteStockInfoCommandHandler handler, int stockId) =>
{
    await handler.HandleAsync(new DeleteStockInfoCommand { StockId = stockId });

    return Results.Ok("Stock deleted");
});

app.UseCors(myAllowSpecificOrigins);
app.UseHttpsRedirection();

app.Run();