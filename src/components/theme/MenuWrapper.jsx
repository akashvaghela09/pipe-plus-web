import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuWrapper = ({ children, text, className, route }) => {
    const navigate = useNavigate();

    const changeRoute = () => {
        navigate(route);
    }

    return (
        <div onClick={changeRoute} className={`flex items-center gap-4 px-4 py-2 text-slate-200 text-xl mx-2 my-[2px] hover:bg-[#272727] rounded-lg select-none cursor-pointer ${className}`}>
            {children}
            <p className="text-sm ">{text}</p>
        </div>
    )
}