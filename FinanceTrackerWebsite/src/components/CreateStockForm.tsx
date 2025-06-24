import { useCreateStockInfoCommand } from 'api/stockApiMutation'

import { useState } from 'react'

import { FTButton } from 'components/utility/FTButton'
import { FTFieldInput } from 'components/utility/FTFieldInput'

import { FormProvider, useForm } from 'react-hook-form'


interface IProps {
    refetch: () => void
}

export const CreateStockForm = (props: IProps) => {
    const [showAdd, setShowAdd] = useState(false)

    const { mutateAsync: createStockCommand } = useCreateStockInfoCommand()

    const methods = useForm<{ ticker: string, currentPrice: number }>()
    const { handleSubmit } = methods

    return (
        showAdd ?
            <FormProvider {...methods}>
                <form className='flex flex-col' onSubmit={handleSubmit(data => createStockCommand(data).then(() => {
                    props.refetch()
                    methods.reset()
                    setShowAdd(false)
                }
                ))}>
                    <FTFieldInput maxLength={5} name='ticker' labelName='Ticker' placeholder=' Enter new stock ticker...' />
                    <FTFieldInput maxLength={9} name='currentPrice' labelName='Price' placeholder=' Enter new stock price...' />
                    <div className='flex'>
                        <FTButton color='alt' text='Submit' />
                        <FTButton color='danger' text='Cancel' type='button' onClick={() => setShowAdd(false)} />
                    </div>
                </form>
            </FormProvider>
            : <FTButton color='primary' text='Add Stock' onClick={() => setShowAdd(true)} />
    )
}