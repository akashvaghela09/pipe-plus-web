export const Button = ({ children, className, onClick }) => {
    return (
        <div onClick={onClick} className={`bg-[#272727] text-slate-200 hover:bg-[#373737] flex gap-2 items-center justify-center h-fit px-4 py-1  rounded-full cursor-pointer ${className}`}>
            {children}
        </div>
    )
}