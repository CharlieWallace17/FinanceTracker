using FinanceTracker.CQRS;
using FinanceTracker.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddHttpClient<IFinnhubService, FinnhubService>(client =>
{
    client.BaseAddress = new Uri("https://finnhub.io/api/v1/");
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<GetStockPriceByTickerQueryHandler>();

string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
        policy => { policy.WithOrigins("http://localhost:5173").AllowAnyHeader(); });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(myAllowSpecificOrigins);
app.UseHttpsRedirection();

app.MapGet("/tickerInfo/{ticker}", async (string ticker, GetStockPriceByTickerQueryHandler handler) =>
    {
        var result = await handler.HandleAsync(new GetStockPriceByTickerQuery { Ticker = ticker });

        Console.WriteLine("RESULT ******:" + result);
        return Results.Ok(result);
    })
    .WithOpenApi();

app.Run();