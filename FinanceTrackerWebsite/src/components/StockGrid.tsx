import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { clsx } from 'clsx'

import { Dispatch, SetStateAction, useState } from 'react'
import { StockInfoResultType } from 'types/types'

interface IProps {
    data?: StockInfoResultType[]
    columns: ColumnDef<StockInfoResultType, any>[]
    onSelect?: Dispatch<SetStateAction<any>>
}

export const StockGrid = (props: IProps) => {
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: props.data ?? [],
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        state: { rowSelection },
        onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: false
    })

    return (
        props.data?.length ?
            <div className='overflow-y-scroll h-80 max-w-min'>
                <table className='min-w-200'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}
                                onClick={() => {
                                    row.getToggleSelectedHandler()(row)
                                    if (props?.onSelect)
                                        props.onSelect(row.original)
                                }}
                                className={clsx('border-1', row.getIsSelected() && 'bg-green-600')}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='border-1 text-center'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> :
            <div>No data</div>)
}
