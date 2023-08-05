import React from 'react';

export const ButtonWrapper = ({ selected, children, text, className, onClick }) => {

    let backgroundColor = selected ? "bg-slate-100" : "bg-[#272727] text-slate-200 hover:bg-[#373737]";

    return (
        <div onClick={onClick} className={`flex items-center gap-4 px-4 py-[6px] ${backgroundColor} text-xl rounded-lg select-none cursor-pointer ${className}`}>
            {children}
            <p className="text-sm ">{text}</p>
        </div>
    )
}