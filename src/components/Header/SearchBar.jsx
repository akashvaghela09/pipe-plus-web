import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';

export const SearchBar = () => {

    const [inputFocus, setInputFocus] = useState(false);

    const searchResults = [
        "Search result 1",
        "Search result 2",
        "Search result 3",
        "Search result 4",
        "Search result 5",
        "Search result 6",
        "Search result 7",
    ]

    return (
        <div className='relative border-[#303030] border-[1px] bg-[#121212] flex w-[600px] rounded-full'>
            {
                inputFocus && <BsSearch className='text-lg text-slate-100  absolute top-3 left-5' />
            }
            <input onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} className='w-11/12 bg-transparent outline-none focus:border-[1px] focus:border-[#1C62B9] rounded-l-full px-4 pl-14 text-slate-100' />
            <div className='bg-[#212121] grow flex justify-center items-center py-3 rounded-r-full cursor-pointer'>
                <BsSearch className='text-lg text-slate-100' />
            </div>

            {
                inputFocus &&
                searchResults.length > 0 &&
                <div className='absolute top-[60px] w-[600px] h-fit bg-[#212121] rounded-xl py-3 flex flex-col'>
                    {
                        searchResults.map((result, index) => {
                            return (
                                <div className='hover:bg-[#313131] flex justify-start items-center cursor-pointer' key={index}>
                                    <BsSearch className='text-lg text-slate-100 mx-5 my-2' />
                                    <p className='text-slate-100'>{result}</p>
                                </div>
                            )
                        })}
                </div>
            }
        </div>
    )
}