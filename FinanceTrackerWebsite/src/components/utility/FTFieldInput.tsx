import { useFormContext } from 'react-hook-form'

import { clsx } from 'clsx'

interface IProps {
    name: string
    labelName?: string
    placeholder?: string
    maxLength?: number
    inputClassName?: string
    labelClassName?: string
}

export const FTFieldInput = (props: IProps) => {

    const { register } = useFormContext()

    return (
        <div className='flex my-1'>
            <label className={clsx('mr-2', props.labelClassName)}>{props.labelName ?? props.name}</label>
            <input maxLength={props.maxLength} className={clsx('h-7 min-w-40 border-2 rounded border-black p-1', props.inputClassName)} {...register(props.name)} placeholder={props.placeholder} />
        </div>
    )
}