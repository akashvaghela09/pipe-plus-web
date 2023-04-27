import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { PiCaretRightBold } from 'react-icons/pi';
import { RiEqualizerLine } from 'react-icons/ri';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IconWrapper } from '../';

export const PlayerSettings = forwardRef((props, ref) => {
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);
    const iconRef = useRef(null);
    const [settingsType, setSettingsType] = useState('options'); // ['quality', 'speed']

    // Function to handle click on the settings icon
    const handleSettingsClick = () => {
        setShowSettings((prevShowSettings) => !prevShowSettings);
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

    const QualitySettings = () => {
        return (
            <div className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
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

    const SpeedSettings = () => {
        return (
            <div className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
                        <div className='flex items-center p-2'>
                            <IconWrapper>
                                <BsSpeedometer2 />
                            </IconWrapper>
                            <p className='text-xs text-slate-100'>Playback Speed</p>
                        </div>
                        <div className='flex items-center p-2'>
                            <p className='text-xs text-slate-100'>Normal</p>
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
                <div ref={settingsRef} className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <QualitySettings />
                    <SpeedSettings />
                </div>
            )}
        </div>
    );
});