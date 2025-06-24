import { createColumnHelper } from '@tanstack/react-table'
import { useDeleteStockInfoCommand } from 'api/stockApiMutation'
import { useGetStocksInfoQuery } from 'api/stockApiQuery'

import { CreateStockForm } from 'components/CreateStockForm'
import { StockGrid } from 'components/StockGrid'
import { UpdateStockForm } from 'components/UpdateStockForm'
import { useState } from 'react'

import { StockInfoResultType } from 'types/types'

import { FTButton } from 'components/utility/FTButton'
import { getDecimalPlaces } from 'components/utility/utils'


export const StocksPage = () => {
    const [showUpdate, setShowUpdate] = useState(false)
    const [selectedRow, setSelectedRow] = useState<{ stockId: number, ticker: string, currentPrice: number }>()

    const { data, refetch } = useGetStocksInfoQuery()
    const { mutateAsync: deleteStockCommand } = useDeleteStockInfoCommand()

    const columnHelper = createColumnHelper<StockInfoResultType>()

    const columns = [
        columnHelper.accessor('stockId', {
            cell: info => info.getValue(),
            header: 'Stock ID'
        }),
        columnHelper.accessor('ticker', {
            cell: info => info.getValue(),
            header: 'Ticker'
        }),
        columnHelper.accessor('currentPrice', {
            cell: info => `$${getDecimalPlaces(info.getValue())}`,
            header: 'Current Price'
        }),
        columnHelper.display({
            cell: info => <div>
                <FTButton color='alt' onClick={() => setShowUpdate(true)} text='Update' />
                <FTButton color='danger' onClick={() => deleteStockCommand(info.row.original.stockId).then(() => refetch())} text='Delete' />
            </div>,
            header: 'Actions'
        })
    ]

    return (
        <>
            <StockGrid data={data} columns={columns} onSelect={setSelectedRow} />
            {showUpdate && <UpdateStockForm
                refetch={refetch}
                defaultValues={{
                    stockId: selectedRow?.stockId,
                    ticker: selectedRow?.ticker,
                    currentPrice: selectedRow?.currentPrice
                }}
                setShowUpdate={setShowUpdate}
            />}
            <CreateStockForm refetch={refetch} />
        </>
    )
}