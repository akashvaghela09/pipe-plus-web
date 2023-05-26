import React from 'react'
import { Logo, SearchBar } from '../';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setSidePanelValue } from "../../redux/app/actions";
import { Link } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch();

    const { sidepanelOpen } = useSelector((state) => state.app);

    const toggleSidePanel = () => {
        dispatch(setSidePanelValue(!sidepanelOpen));
    }

    return (
        <div className='sticky top-0 bg-[#0f0f0f] flex items-center justify-between h-16 w-full pl-2 z-50'>
            <div className='w-[250px] flex justify-start items-center'>
                <div onClick={toggleSidePanel} className='cursor-pointer hover:bg-[#272727] flex justify-center items-center h-10 w-10 rounded-full mx-2'>
                    <FiMenu className='text-slate-50 text-2xl'/>
                </div>
                <Link to={"/"}>
                    <Logo />
                </Link>
            </div>
            <SearchBar />
            <div className='w-[250px]' />
        </div>
    )
}