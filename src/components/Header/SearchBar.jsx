import React, { useState, useRef, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setInputFocus, setSearchQuery, setSearchResults, setSearchSuggestions } from '../../redux/searchbar/actions';
import { useNavigate } from 'react-router-dom';
import { pipePlus } from '../../apis';
import { isValid } from '../../utils';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isFocused, searchSuggestions, searchQuery } = useSelector((state) => state.searchbar);
    const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
    const searchBarRef = useRef(null);
    const iconRef = useRef(null);

    // Function to handle click on the search icon
    const handleSearchIconClick = () => {
        dispatch(setInputFocus(true));
        handleSearchSubmit();
    };

    const handleSearchQuery = async (query) => {
        dispatch(setSearchQuery(query));

        if (query.length > 0) {
            let data = await pipePlus.feed.suggestions(query);

            if(isValid(data)) {
                dispatch(setSearchSuggestions([...data]));
            }
        }
    }

    const handleSearchSubmit = async () => {
        if (searchQuery.length > 0) {
            let { items, nextpage } = await pipePlus.feed.search(searchQuery);

            dispatch(setSearchSuggestions([]));
            dispatch(setSearchResults([...items]));
            navigate('/results');
        }
    }

    const handleSearchCancel = () => {
        dispatch(setSearchQuery(""));
        dispatch(setSearchSuggestions([]));
    }

    const handleResultClick = (value) => {
        dispatch(setSearchQuery(value));
        handleSearchSubmit();
    }

    // Function to handle click outside the search bar
    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target) &&
            iconRef.current &&
            !iconRef.current.contains(event.target)
        ) {
            dispatch(setInputFocus(false));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        } else if (e.key === 'Escape') {
            handleSearchCancel();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Prevent default scrolling behavior
            setSelectedResultIndex((prevIndex) => Math.min(prevIndex + 1, searchSuggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent default scrolling behavior
            setSelectedResultIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        }
    };

    useEffect(() => {
        if (selectedResultIndex >= 0 && selectedResultIndex < searchSuggestions.length) {
            dispatch(setSearchQuery(searchSuggestions[selectedResultIndex]));
        }
    }, [selectedResultIndex]);

    // Effect to add click event listener for handling clicks outside the search bar
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={searchBarRef}
            className='relative  bg-[#121212] lg:flex w-[600px] rounded-full hidden'
        >
            <div className='rounded-l-full grow flex items-stretch' style={{ border: isFocused === true ? "1px solid #1C62B9" : "1px solid #303030" }}>
                {
                    isFocused &&
                    <div className='w-10 flex justify-end items-center'>
                        <BsSearch className='text-lg text-slate-100 mr-1' />
                    </div>
                }
                <input
                    type='text'
                    value={searchQuery}
                    placeholder='Search'
                    onFocus={() => dispatch(setInputFocus(true))}
                    onChange={(e) => handleSearchQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className='w-11/12 bg-transparent outline-none rounded-l-full px-4 text-slate-100'
                />
                {
                    isFocused && (
                        <div onClick={() => handleSearchCancel()} className='absolute top-1 right-16 hover:bg-[#313131] h-8 w-8 rounded-full flex justify-center items-center cursor-pointer'>
                            <RxCross1 className='text-lg text-slate-100' />
                        </div>
                    )
                }
            </div>
            <div ref={iconRef} onClick={handleSearchIconClick} className='bg-[#212121] flex justify-center items-center py-3 w-14  rounded-r-full cursor-pointer'>
                <BsSearch className='text-lg text-slate-100' />
            </div>
            {isFocused && searchSuggestions.length > 0 && (
                <div className='absolute top-[60px] w-[600px] h-fit bg-[#212121] rounded-xl py-3 flex flex-col'>
                    {searchSuggestions.map((result, index) => {
                        return (
                            <div
                            key={index}
                                className='hover:bg-[#313131] flex justify-start items-center cursor-pointer'
                                style={{backgroundColor: selectedResultIndex === index ? "#313131" : ""}}
                                onClick={() => handleResultClick(result)}
                            >
                                <BsSearch className='text-lg text-slate-100 mx-5 my-2' />
                                <p className='text-slate-100'>{result}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
