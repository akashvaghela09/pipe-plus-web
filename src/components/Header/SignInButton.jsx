import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export const SignInButton = () => {
    return (
        <Link to="/signin">
            <div className='flex gap-1 border-[#3EA6FF] text-[#3EA6FF] border-2 opacity-80 p-1 rounded-full mx-2 cursor-pointer'>
                <p className='text-md hidden md:flex'>Sign In</p>
                <HiOutlineUserCircle className='text-2xl' />
            </div>
        </Link>
    )
}