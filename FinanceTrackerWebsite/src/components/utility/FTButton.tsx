import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

interface IProps {
    color: string,
    text: string,
    onClick?: () => void,
    type?: 'submit' | 'reset' | 'button'
    className?: string
    link?: boolean
    to?: string
}

enum ButtonTypes {
    Primary = 'primary',
    Alternative = 'alt',
    Danger = 'danger'
}

const fTButtonStyle = 'rounded border-solid my-0.5 mr-1 h-7 my-1 cursor-pointer'

export const FTButton = (props: IProps) => {

    if (props.link) {
        if (props.color === ButtonTypes.Primary)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-green-100 border-2 w-28 hover:bg-green-200 active:bg-green-300', props?.className)}>
                <Link to={props.to}>{props.text}</Link>
            </button>

        if (props.color === ButtonTypes.Alternative)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-blue-100 border-2 w-28 hover:bg-blue-200 active:bg-blue-300', props?.className)}>
                <Link to={props.to}>{props.text}</Link>
            </button>

        if (props.color === ButtonTypes.Danger)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-red-100 border-2 w-28 hover:bg-red-200 active:bg-red-300', props?.className)}>
                <Link to={props.to}>{props.text}</Link>
            </button>
    } else {
        if (props.color === ButtonTypes.Primary)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-green-100 border-2 w-28 hover:bg-green-200 active:bg-green-300', props?.className)}>{props.text}</button>

        if (props.color === ButtonTypes.Alternative)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-blue-100 border-2 w-28 hover:bg-blue-200 active:bg-blue-300', props?.className)}>{props.text}</button>

        if (props.color === ButtonTypes.Danger)
            return <button
                type={props.type ?? 'submit'}
                onClick={props.onClick}
                className={clsx(fTButtonStyle, 'bg-red-100 border-2 w-28 hover:bg-red-200 active:bg-red-300', props?.className)}>{props.text}</button>
    }
}