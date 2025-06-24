import clsx from 'clsx'

interface IProps {
    name: string
    data?: string | number
    dataClassName?: string
}

export const FTFieldData = (props: IProps) => {

    return (
        <div className='grid grid-cols-12'>
            <div className='mr-1 font-bold col-span-2'>{`${props.name}:`}</div>
            <div className={clsx(props?.dataClassName, 'col-start-3')}>{props.data}</div>
        </div>
    )

}