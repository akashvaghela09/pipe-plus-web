import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';
import { RiEqualizerLine } from 'react-icons/ri';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IconWrapper } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayStatus, setPlaybackRate, setQualityUpdateStatus, setStreamLoading, setStreamPlayed, setStreamQuality, setStreamSource } from '../../redux/player/actions';

export const PlayerSettings = (props, ref) => {
    const dispatch = useDispatch();

    const { playbackRate, selectedQuality, streamMetadata, availableQualities, streamValues } = useSelector((state) => state.player);
    const { playableStreams } = streamMetadata;
    const [showSettings, setShowSettings] = useState(false);
    const [settingsType, setSettingsType] = useState('options'); // ['quality', 'speed']
    const playbackRateList = [0.25, 0.50, 0.75, 1, 1.25, 1.5, 1.75, 2];

    // Function to handle click on the settings icon
    const handleSettingsClick = () => {
        setShowSettings(!showSettings);
        setSettingsType('options');
    };

    const handleSettingsOptionChange = (value) => {
        setSettingsType(value);
    }

    const handlePlaybackRateChange = (rate) => {
        dispatch(setPlaybackRate(rate));
        setSettingsType('options');
        setShowSettings(false);
        setShowSettings(true);
    }

    const handlePlaybackQualityChange = (value) => {
        dispatch(setStreamLoading(true));
        dispatch(setQualityUpdateStatus(true));
        dispatch(setStreamSource({}));
        dispatch(setStreamQuality(value));
        setSettingsType('options');
        
        let playedSec = streamValues.playedSeconds;
        dispatch(setStreamPlayed(playedSec));

        let newSource = {...playableStreams[value][0]};
        dispatch(setStreamSource(newSource));

        dispatch(setStreamLoading(false));
    }

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
            <div onClick={() => handleSettingsOptionChange("quality")} className='flex justify-between hover:bg-[#45454543] cursor-pointer select-none'>
                <div className='flex items-center p-2'>
                    <IconWrapper>
                        <RiEqualizerLine />
                    </IconWrapper>
                    <p className='text-xs text-slate-100'>Quality</p>
                </div>
                <div className='flex items-center p-2'>
                    <p className='text-xs text-slate-100'>{selectedQuality}</p>
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
            <div onClick={() => handleSettingsClick()}>
                <IconWrapper>
                    <IoMdSettings />
                </IconWrapper>
            </div>

            {showSettings === true && settingsType === 'options' && (
                <div onMouseLeave={handleSettingsClick} className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <QualitySettingsOption />
                    <SpeedSettingsOption />
                </div>
            )}

            {showSettings === true && settingsType === 'quality' && (
                <div className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <GoBack type='Quality' />
                    <div className='border-t-[1px] border-[#454545]' />

                    {
                        availableQualities.map((stream) => {
                            return (
                                <div
                                    key={stream.id}
                                    onClick={() => handlePlaybackQualityChange(stream.quality)}
                                    className='p-2 pl-10 text-xs text-slate-100 hover:bg-[#45454543] cursor-pointer select-none'>

                                    {
                                        selectedQuality === stream.quality ?
                                            <p className='text-[#3EA6FF] text-xs font-bold'>{stream.quality}</p>
                                            :
                                            <p>{stream.quality}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )}

            {showSettings === true && settingsType === 'speed' && (
                <div className='w-72 h-fit py-2 absolute bottom-[60px] right-2 bg-[#191919] rounded-xl'>
                    <GoBack type='Speed' />
                    <div className='border-t-[1px] border-[#454545]' />

                    {
                        playbackRateList.map((rate, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handlePlaybackRateChange(rate)}
                                    className='p-2 pl-10 text-xs text-slate-100 hover:bg-[#45454543] cursor-pointer select-none'>

                                    {
                                        playbackRate === rate ?
                                            <p className='text-[#3EA6FF] text-xs font-bold'>{rate}</p>
                                            :
                                            <p>{rate}</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
};