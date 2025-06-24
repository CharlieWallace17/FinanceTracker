import { useMutation } from '@tanstack/react-query'

export const useCreateStockInfoCommand = () => {
    return useMutation({
        mutationFn: (formData: { ticker: string, currentPrice: number }) => fetch(`${import.meta.env.VITE_SERVER_URL}/stock/create`,
            {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(formData)
            })
    })
}

export const useUpdateStockInfoCommand = () => {
    return useMutation({
        mutationFn: (formData: { stockId: number, ticker: string, currentPrice: number }) => fetch(`${import.meta.env.VITE_SERVER_URL}/stock/${formData.stockId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(formData)
            })
    })
}

export const useDeleteStockInfoCommand = () => {
    return useMutation({
        mutationFn: (stockId: number) => fetch(`${import.meta.env.VITE_SERVER_URL}/stock/${stockId}`, { method: 'DELETE', body: JSON.stringify(stockId) })
    })
}