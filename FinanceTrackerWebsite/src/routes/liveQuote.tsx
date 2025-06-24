import { createFileRoute } from '@tanstack/react-router'

import { TickerInfoForm } from '../components/TickerInfoForm'



const liveQuote = () => {

    return (
        <>
            <TickerInfoForm />
        </>
    )
}

export const Route = createFileRoute('/liveQuote')({
    component: liveQuote,
})

