import { useUpdateStockInfoCommand } from 'api/stockApiMutation'

import { FTButton } from 'components/utility/FTButton'
import { FTFieldInput } from 'components/utility/FTFieldInput'

import { FormProvider, useForm } from 'react-hook-form'

import { Dispatch, SetStateAction } from 'react'


interface IProps {
    refetch: () => void
    defaultValues: { stockId?: number, ticker?: string, currentPrice?: number }
    setShowUpdate: Dispatch<SetStateAction<any>>
}

export const UpdateStockForm = (props: IProps) => {
    const { mutateAsync: updateStockCommand } = useUpdateStockInfoCommand()

    const methods = useForm<{ stockId: number, ticker: string, currentPrice: number }>({
        defaultValues: props.defaultValues
    })
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <form className='flex flex-col' onSubmit={handleSubmit(data => updateStockCommand(data).then(() => {
                props.refetch()
                methods.reset()
                props.setShowUpdate(false)
            }
            ))}>
                <FTFieldInput maxLength={5} name='ticker' labelName='Ticker' placeholder=' Enter stock ticker...' />
                <FTFieldInput maxLength={9} name='currentPrice' labelName='Price' placeholder=' Enter stock price...' />
                <div className='flex'>
                    <FTButton color='alt' text='Submit' />
                    <FTButton color='danger' text='Cancel' type='button' onClick={() => props.setShowUpdate(false)} />
                </div>
            </form>
        </FormProvider>
    )
}