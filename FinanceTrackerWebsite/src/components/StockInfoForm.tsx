import { useGetStockInfoQuery } from 'api/stockApiQuery'
import { useState } from 'react'

import { FTButton } from 'components/utility/FTButton'
import { FTFieldData } from 'components/utility/FTFieldData'
import { FTFieldInput } from 'components/utility/FTFieldInput'
import { getDecimalPlaces } from 'components/utility/utils'

import { FormProvider, useForm } from 'react-hook-form'

export const StockInfoForm = () => {
    const [stockId, setStockId] = useState<number | undefined>()

    const { data, refetch, isLoading } = useGetStockInfoQuery(stockId)

    const methods = useForm({ values: { stockId } })

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(data => {
                setStockId(data.stockId)
                if (stockId)
                    refetch()
            })}>
                {data ? <div className='bg-blue-300 p-2 w-200'>
                    <FTFieldData name='Stock ID' data={data.stockId} />
                    <FTFieldData name='Ticker' data={data.ticker} />
                    <FTFieldData name='Current Price' data={`$${getDecimalPlaces(data.currentPrice)}`} />
                </div>
                    : isLoading ? <div>Loading...</div>
                        : <></>}
                <div className='flex'>
                    <FTFieldInput maxLength={5} labelName='Stock ID' inputClassName='h-7 w-40 border-2 rounded border-black' name='stockId' placeholder=' Enter stock ID...' />
                    <FTButton color='alt' text='Get Stock Info' className='ml-1' />
                </div>
            </form>
        </FormProvider>
    )
}