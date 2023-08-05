import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useDispatch } from "react-redux";
import { setAuthStatus, setUser } from "../../redux/auth/actions";
import { signOutUser } from "../../utils";

export const SignOutButton = () => {

    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await signOutUser();

            dispatch(setAuthStatus(false));
            dispatch(setUser({}));
        } catch (error) {
            alert("Error signing out");
            console.log(error);
        }
    }

    return (
        <div onClick={handleSignOut} className='flex gap-1 border-slate-100 text-slate-100 hover:border-[#3EA6FF] hover:text-[#3EA6FF] border-2 opacity-30 hover:opacity-80 p-1 rounded-full mx-2 cursor-pointer'>
            <p className='text-md hidden md:flex'>Sign Out</p>
            <HiOutlineUserCircle className='text-2xl' />
        </div>
    )
}