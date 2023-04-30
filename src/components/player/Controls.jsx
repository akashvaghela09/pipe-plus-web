import React, { useState } from 'react';
import { IoMdPause } from 'react-icons/io';
import { FaPlay, FaPauseCircle, } from 'react-icons/fa';
import { ImVolumeHigh, ImVolumeMedium, ImVolumeLow, ImVolumeMute, ImVolumeMute2 } from 'react-icons/im';
import { IconWrapper } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { PlayerSettings } from './PlayerSettings';
import { PlayerFullScreen } from './PlayerFullScreen';
import { setPlayerVolume } from '../../redux/player/actions';

export const Controls = ({ handlePlayback }) => {
    const dispatch = useDispatch();
    const { isPlaying, player, volume } = useSelector(state => state.player);
    const [volumeBarVisible, setVolumeBarVisible] = useState(false);

    const handleVolumeChange = (e) => {
        let newVolume = e.target.value;
        player.volume = newVolume;
        dispatch(setPlayerVolume(newVolume));
    }

    return (
        <div className="absolute bottom-0 w-full flex justify-between">
            <div className='flex gap-3 p-3 items-center'>
                <IconWrapper>
                    {
                        isPlaying ?
                            <IoMdPause onClick={() => handlePlayback()} />
                            :
                            <FaPlay onClick={() => handlePlayback()} />
                    }
                </IconWrapper>

                {/* Volume Icon and Slider Comatiner */}
                <div
                    className='flex items-center gap-3'
                    onMouseEnter={() => setVolumeBarVisible(true)}
                    onMouseLeave={() => setVolumeBarVisible(false)}
                >
                    <span
                        className='w-full'
                    >
                        <IconWrapper>
                            {
                                volume < 0.01 &&
                                <ImVolumeMute2 />
                            }
                            {
                                volume >= 0.01 && volume <= 0.25 &&
                                <ImVolumeMute />
                            }
                            {
                                volume > 0.25 && volume <= 0.5 &&
                                <ImVolumeLow />
                            }
                            {
                                volume > 0.5 && volume <= 0.75 &&
                                <ImVolumeMedium />
                            }
                            {
                                volume > 0.75 &&
                                <ImVolumeHigh />
                            }
                        </IconWrapper>
                    </span>
                    {
                        volumeBarVisible &&
                        <input
                            value={volume}
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(e) => handleVolumeChange(e)}
                        />
                    }

                    {/* Add buffer area for comfertable volume change. this gives extra area to mouseleave event */}
                    {
                        volumeBarVisible &&
                        <div className='ml-2' />
                    }
                </div>
                <p className='text-gray-400 text-xs whitespace-nowrap'>
                    00:00 / 00:00
                </p>
            </div>
            <div className='flex gap-3 p-3 items-center'>
                <PlayerSettings />
                <PlayerFullScreen />
            </div>
        </div>
    )
};
