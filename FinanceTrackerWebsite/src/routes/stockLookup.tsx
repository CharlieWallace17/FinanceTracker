import { createFileRoute } from '@tanstack/react-router'

import { StockInfoForm } from 'components/StockInfoForm'



const stockLookup = () => {

    return (
        <>
            <StockInfoForm />
        </>
    )
}

export const Route = createFileRoute('/stockLookup')({
    component: stockLookup,
})

