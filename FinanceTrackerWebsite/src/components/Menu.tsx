import { FTButton } from "./utility/FTButton"

const menuStyle = 'bg-emerald-500! hover:bg-emerald-600!'

export const Menu = () => {

    return (
        <div className='p-2 col-span-1'>
            <FTButton color='primary' className={menuStyle} text='Investments' link to={'/'} />
            <FTButton color='primary' className={menuStyle} text='Live Quote' link to={'/liveQuote'} />
            <FTButton color='primary' className={menuStyle} text='Stock Lookup' link to={'/stockLookup'} />
        </div>
    )
}