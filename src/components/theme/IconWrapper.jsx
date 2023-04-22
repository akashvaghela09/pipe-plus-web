export const IconWrapper = ({ children, className }) => {
    return (
        <div className={`text-slate-50 text-xl mx-2 cursor-pointer ${className}`}>
            {children}
        </div>
    )
}