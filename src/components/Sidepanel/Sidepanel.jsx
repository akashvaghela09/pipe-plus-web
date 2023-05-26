import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineWifiProtectedSetup, MdVideoLibrary, MdOutlineWatchLater, MdOutlinePermMedia, MdOutlinePlaylistPlay } from 'react-icons/md';
import { BsCollectionPlayFill } from 'react-icons/bs';
import { SiYoutubemusic } from 'react-icons/si';
import { GoHistory } from 'react-icons/go';
import { BiSolidDownload, BiLike } from 'react-icons/bi';
import { MenuWrapper } from '../';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidePanelValue } from '../../redux/app/actions';

export const Sidepanel = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentPath = location.pathname;

    const { sidepanelOpen } = useSelector((state) => state.app);

    let primaryOptions = [
        {
            name: 'Home',
            icon: <AiFillHome />,
            route: '/'
        },
        {
            name: "Shorts",
            icon: <MdOutlineWifiProtectedSetup />,
            route: '/shorts'
        },
        {
            name: "subscriptions",
            icon: <BsCollectionPlayFill />,
            route: '/subscriptions'
        },
        {
            name: "Youtube Music",
            icon: <SiYoutubemusic />,
            route: '/music'
        },
        {
            name: "Channel Groups",
            icon: <MdOutlinePermMedia />,
            route: '/channel-groups'
        }
    ]

    let secondaryOptions = [
        {
            name: "Library",
            icon: <MdVideoLibrary />,
            route: '/library'
        },
        {
            name: "History",
            icon: <GoHistory />,
            route: '/history'
        },
        {
            name: "Watch Later",
            icon: <MdOutlineWatchLater />,
            route: '/watch-later'
        },
        {
            name: "Downloads",
            icon: <BiSolidDownload />,
            route: '/downloads'
        },
        {
            name: "Liked Videos",
            icon: <BiLike />,
            route: '/liked-videos'
        }
    ]

    let playlists = [
        {
            name: "React playlist",
            icon: <MdOutlinePlaylistPlay />,
            route: '/'
        },
        {
            name: "HTML playlist",
            icon: <MdOutlinePlaylistPlay />,
            route: '/'
        },
        {
            name: "React Native playlist",
            icon: <MdOutlinePlaylistPlay />,
            route: '/'
        },
        {
            name: "JavaScript playlist",
            icon: <MdOutlinePlaylistPlay />,
            route: '/'
        }
    ]

    let allowedRoutes = ["/", "/results"]

    const handleSidepanel = (value) => {
        dispatch(setSidePanelValue(value));
    }

    useEffect(() => {
        if (allowedRoutes.includes(currentPath)) {
            handleSidepanel(true);
        } else {
            handleSidepanel(false);
        }
    }, [currentPath]);

    return (
        <div className='fixed left-0 top-16 shadow-lg z-10 h-full flex' style={{width: (sidepanelOpen === true && allowedRoutes.includes(currentPath) === false) ? "100%" : "fit-content"}}>
            <div className=' bg-[#0f0f0f] w-[270px] h-full flex flex-col pt-2 overflow-hidden' style={{ width: sidepanelOpen === true ? "270px" : "0px" }}>
                {
                    primaryOptions.map((option, index) => {
                        return (
                            <MenuWrapper text={option.name} route={option.route} key={index}>
                                {option.icon}
                            </MenuWrapper>
                        )
                    })
                }

                <div className='border-t-[1px] border-t-[#272727] m-2' />

                {
                    secondaryOptions.map((option, index) => {
                        return (
                            <MenuWrapper text={option.name} route={option.route} key={index}>
                                {option.icon}
                            </MenuWrapper>
                        )
                    })
                }

                <div className='border-t-[1px] border-t-[#272727] m-2' />

                {
                    playlists.map((option, index) => {
                        return (
                            <MenuWrapper text={option.name} route={option.route} key={index}>
                                {option.icon}
                            </MenuWrapper>
                        )
                    })
                }
            </div>
            {
                allowedRoutes.includes(currentPath) === false && 
            <div onClick={() => handleSidepanel(false)} className='bg-black bg-opacity-40 grow'/>
            }
        </div>
    )
}