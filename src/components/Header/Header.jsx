import React from 'react'
import { Logo, SearchBar } from '../';
import { FiMenu } from 'react-icons/fi';

export const Header = () => {
    return (
        <div className='flex items-center justify-between h-16 w-full pl-2'>
            <div className='w-[250px] flex justify-start items-center'>
                <div className='cursor-pointer hover:bg-[#272727] flex justify-center items-center h-10 w-10 rounded-full mx-2'>
                    <FiMenu className='text-slate-50 text-2xl' />
                </div>
                <Logo />
            </div>
            <SearchBar />
            <div className='w-[250px]' />
        </div>
    )
}