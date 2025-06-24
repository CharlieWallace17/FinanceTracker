import { useQuery } from '@tanstack/react-query'

import { StockInfoResultType, TickerInfoResultType } from 'types/types'

export const useTickerInfoQuery = (ticker?: string) => {
    return useQuery<TickerInfoResultType>({
        queryKey: ['useTickerInfoQuery ', ticker],
        queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/tickerInfo/${ticker}`)
            .then(response => response.json()),
        enabled: !!ticker
    })
}

export const useGetStockInfoQuery = (stockId?: number) => {
    return useQuery<StockInfoResultType>({
        queryKey: ['useGetStockInfoQuery', stockId],
        queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/stock/${stockId}`)
            .then(response => {
                return response.json()
            }),
        enabled: !!stockId
    })
}

export const useGetStocksInfoQuery = () => {
    return useQuery<StockInfoResultType[]>({
        queryKey: ['useGetStockeInfoQuery'],
        queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/stocks`, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(response => {
                console.log('RESPONSE', response)
                return response.json()
            })
    })
}