export const Logo = ({onClick}) => {
    return (
        <div onClick={onClick} className='flex justify-center items-center w-fit h-fit cursor-pointer select-none'>
            <p className='text-red-600 text-2xl font-extrabold font_oswald'>Pipe</p>
            <p className='text-slate-50 text-2xl font-extrabold font_oswald'>Plus</p>
        </div>
    )
}
