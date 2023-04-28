import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';
import { RiEqualizerLine } from 'react-icons/ri';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IconWrapper } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaybackRate } from '../../redux/player/actions';

export const PlayerSettings = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const { player, playbackRate } = useSelector((state) => state.player);
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);
    const iconRef = useRef(null);
    const [settingsType, setSettingsType] = useState('options'); // ['quality', 'speed']
    const playbackRateList = [0.25, 0.50, 0.75, 1, 1.25, 1.5, 1.75, 2];

    // Function to handle click on the settings icon
    const handleSettingsClick = () => {
        setShowSettings((prevShowSettings) => !prevShowSettings);
        setSettingsType('options');
    };

    // Function to handle click outside the settings div
    const handleClickOutside = (event) => {
        if (
            settingsRef.current &&
            !settingsRef.current.contains(event.target) &&
            iconRef.current &&
            !iconRef.current.contains(event.target)
        ) {
            setShowSettings(false);
        }
    };

    // Function to handle click inside the settings div
    const handleClickInside = (event) => {
        event.stopPropagation();
    };

    const HandlePlaybackRateChange = (rate) => {
        player.playbackRate = rate;

        dispatch(setPlaybackRate(rate));
        setSettingsType('options');
        setShowSettings(false);
        setShowSettings(true);
    }

    // Effect to add click event listener for handling clicks outside the settings div
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Expose a method to close the settings div from parent components using ref
    useImperativeHandle(ref, () => ({
        closeSettings() {
            setShowSettings(false);
        },
    }));


    // Settings Options Components ******************************************************

    const GoBack = ({ type }) => {
        return (
            <div onClick={() => setSettingsType("options")} className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
                <div className='flex items-center p-2'>
                    <IconWrapper>
                        <PiCaretLeftBold />
                    </IconWrapper>
                    <p className='text-xs text-slate-100'>{type}</p>
                </div>
            </div>
        )
    }

    const QualitySettingsOption = () => {
        return (
            <div onClick={() => setSettingsType("options")} className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
                <div className='flex items-center p-2'>
                    <IconWrapper>
                        <RiEqualizerLine />
                    </IconWrapper>
                    <p className='text-xs text-slate-100'>Quality</p>
                </div>
                <div className='flex items-center p-2'>
                    <p className='text-xs text-slate-100'>360p</p>
                    <IconWrapper>
                        <PiCaretRightBold />
                    </IconWrapper>
                </div>
            </div>
        )
    }

    const SpeedSettingsOption = () => {
        return (
            <div onClick={() => setSettingsType("speed")} className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
                <div className='flex items-center p-2'>
                    <IconWrapper>
                        <BsSpeedometer2 />
                    </IconWrapper>
                    <p className='text-xs text-slate-100'>Playback Speed</p>
                </div>
                <div className='flex items-center p-2'>
                    <p className='text-xs text-slate-100'>{playbackRate === 1 ? "Normal" : playbackRate}</p>
                    <IconWrapper>
                        <PiCaretRightBold />
                    </IconWrapper>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div ref={iconRef} onClick={handleSettingsClick}>
                <IconWrapper>
                    <IoMdSettings />
                </IconWrapper>
            </div>
            {showSettings === true && settingsType === 'options' && (
                <div onClick={handleClickInside} ref={settingsRef} className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <QualitySettingsOption />
                    <SpeedSettingsOption />
                </div>
            )}


            {showSettings === true && settingsType === 'speed' && (
                <div onClick={handleClickInside} ref={settingsRef} className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <GoBack type='Speed' />
                    <div className='border-t-[1px] border-[#454545]' />

                    {
                        playbackRateList.map((rate, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => HandlePlaybackRateChange(rate)}
                                    className='p-2 pl-10 text-xs text-slate-100 hover:bg-[#45454543] cursor-pointer select-none'>
                                    
                                    {
                                        playbackRate === rate ?
                                                <p className='text-[#3EA6FF] text-xs font-bold'>{rate}</p>
                                                :
                                                <p>{rate}</p>
                                    }
                                </p>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
});