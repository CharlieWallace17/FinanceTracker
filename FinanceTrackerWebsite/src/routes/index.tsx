import { createFileRoute } from '@tanstack/react-router'

import { StocksPage } from 'components/StocksPage'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <StocksPage />
  )
}