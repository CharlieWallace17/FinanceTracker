
export const getChangeColor = (input?: string | number) => {
    if (input?.toString().includes('-'))
        return 'text-red-500'
    else
        return 'text-green-600'
}

export const getDecimalPlaces = (input?: string | number, decimalPlaces = 2) => {

    if (typeof input != 'string')
        input = input?.toString()

    const base = input?.split('.')[0]
    const decimals = input?.split('.')[1]

    if (!decimals || decimals?.length != 2) {
        return (base ?? '0') + '.' + (decimals ?? '').padEnd(decimalPlaces, '0')
    }

    return input
}