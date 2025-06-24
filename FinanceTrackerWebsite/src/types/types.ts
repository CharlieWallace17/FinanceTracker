export interface TickerInfoResultType {
    currentPrice?: number
    change?: number
    percentChange?: number
    highDailyPrice?: number
}

export interface StockInfoResultType {
    stockId: number
    ticker: string
    currentPrice: number
}