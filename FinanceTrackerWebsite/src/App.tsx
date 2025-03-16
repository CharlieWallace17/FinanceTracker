import './index.css'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';
import { useForm } from 'react-hook-form'

function App() {
  const [ticker, setTicker] = useState(undefined);

  const { data, isFetching, refetch, isPending, isSuccess, isRefetching } = useQuery({ queryKey: ['getStockPrice', ticker], queryFn: () => fetch(`${import.meta.env.VITE_SERVER_URL}/tickerInfo/${ticker}`).then(response => response.json()), enabled: !!ticker })

  const { register, handleSubmit } = useForm({ values: { tickerValue: ticker } });


  console.log(data);
  return (
    <div className="!w-full !h-screen">
      <form className="flex flex-col" onSubmit={handleSubmit(data => {
        setTicker(data.tickerValue)
        if (ticker)
          refetch()
      })}>
        {data && !isFetching && !isPending && !isRefetching && isSuccess ? <div className="flex flex-col bg-green-500">
          <div>Current Price: {`$${data.currentPrice}`}</div>
          <div>Price Change: {`$${data.change}`}</div>
          <div>Percentage Change: {`${data.percentChange}%`}</div>
          <div>High: {`$${data.highDailyPrice}`}</div>
        </div>
          :
          <div>Loading...</div>}
        <input maxLength={4} className="h-7 w-40 border-2 rounded border-black" {...register("tickerValue")} placeholder="Enter stock ticker..." />
        <button type="submit" className="rounded border-solid bg-blue-100 border-2 w-20 hover:bg-blue-200 active:bg-blue-300">Click me</button>
      </form>
    </div>
  )
}

export default App
