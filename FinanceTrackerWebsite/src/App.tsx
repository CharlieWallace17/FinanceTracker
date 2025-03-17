import './index.css'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';
import { useForm } from 'react-hook-form'

type StockPriceResultType = {
  currentPrice?: number
  change?: number
  percentChange?: number
  highDailyPrice?: number
}

function App() {
  const [ticker, setTicker] = useState<string | undefined>(undefined);

  const { data, isFetching, refetch, isSuccess } = useQuery<StockPriceResultType>({ queryKey: ['getStockPrice', ticker], queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/tickerInfo/${ticker}`).then(response => response.json()), enabled: !!ticker })

  const { register, handleSubmit } = useForm({ values: { tickerValue: ticker } });


  console.log(data);
  return (
    <div className="!w-full !h-screen">
      <form className="flex flex-col" onSubmit={handleSubmit(data => {
        setTicker(data.tickerValue?.toUpperCase())
        if (ticker)
          refetch()
      })}>
        {data && !isFetching && isSuccess ? <div className="flex flex-col bg-green-500">
          <div>Current Price: {`$${data.currentPrice}`}</div>
          <div>Price Change: {`$${data.change}`}</div>
          <div>Percentage Change: {`${data.percentChange}%`}</div>
          <div>High: {`$${data.highDailyPrice}`}</div>
        </div>
          :
          <div>Loading...</div>}
        <input maxLength={5} className="h-7 w-40 border-2 rounded border-black" {...register("tickerValue")} placeholder="Enter stock ticker..." />
        <button type="submit" className="rounded border-solid bg-blue-100 border-2 w-28 p-1 hover:bg-blue-200 active:bg-blue-300">Get Quote</button>
      </form>
    </div>
  )
}

export default App
