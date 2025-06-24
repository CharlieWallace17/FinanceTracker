import { useTickerInfoQuery } from 'api/stockApiQuery'

import { useState } from 'react'

import { FTButton } from 'components/utility/FTButton'
import { FTFieldInput } from 'components/utility/FTFieldInput'

import { FTFieldData } from 'components/utility/FTFieldData'

import { FormProvider, useForm } from 'react-hook-form'

import { getChangeColor, getDecimalPlaces } from 'components/utility/utils'


export const TickerInfoForm = () => {
    const [ticker, setTicker] = useState<string | undefined>()

    const { data, refetch, isLoading } = useTickerInfoQuery(ticker)

    const methods = useForm({ values: { ticker } })

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(data => {
                setTicker(data.ticker?.toUpperCase())
                if (ticker)
                    refetch()
            })}>
                {data ? <div className='bg-green-300 p-2 w-200'>
                    <FTFieldData name='Current Price' data={`$${getDecimalPlaces(data.currentPrice)}`} />
                    <FTFieldData name='Price Change' data={`$${data.change}`} dataClassName={getChangeColor(data.percentChange)} />
                    <FTFieldData name='% Change' data={data.percentChange} dataClassName={getChangeColor(data.percentChange)} />
                    <FTFieldData name='Daily High' data={`$${getDecimalPlaces(data.highDailyPrice)}`} />
                </div>
                    : isLoading ? <div>Loading...</div>
                        : <></>
                }
                <div className='flex'>
                    <FTFieldInput maxLength={5} name='ticker' placeholder=' Enter stock ticker...' labelName='Ticker' />
                    <FTButton color='alt' text='Get Quote' className='ml-1' />
                </div>
            </form>
        </FormProvider>
    )
}