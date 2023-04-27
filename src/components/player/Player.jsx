import React, { useEffect, useState, useRef } from 'react';
import { Controls, ProgressBar } from "../";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayStatus } from '../../redux/player/actions';
import data from './../../data.json';

export const Player = () => {
    const dispatch = useDispatch();

    const { videoStreams, thumbnailUrl } = data;
    let url360p = videoStreams['360p'].url;
    let url720p = videoStreams['720p'].url;
    const [videoUrl, setVideoUrl] = useState(url360p);
    const [amountLoaded, setAmountLoaded] = useState(0);
    const [amountPlayed, setAmountPlayed] = useState(0);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const {
        isPlaying, isFullScreen
    } = useSelector(state => state.player);

    const [isReady, setIsReady] = useState(true);
    const [volume, setVolume] = useState(0.5);

    const handlePlayback = () => {
        dispatch(setPlayStatus(!isPlaying));

        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
        }
    }

    const handleQualityChange = (event) => {
        const selectedQuality = event.target.value;
        setVideoUrl(selectedQuality);

        if (playerRef.current) {
            playerRef.current.load();
            playerRef.current.play();
        }
    };

    const handleSeek = (value) => {
        const player = playerRef.current;
        const desiredPercentageOfSeek = parseFloat(value);
        const duration = player.duration;
        const time = duration * (desiredPercentageOfSeek / 100);

        player.currentTime = time;
        setProgress(desiredPercentageOfSeek);
    };

    const handleSeekMouseDown = () => {
        if (playerRef.current) {
            const player = playerRef.current;
            player.removeEventListener('timeupdate', processStreamValues);
            player.pause();
        }
    };

    const handleSeekMouseUp = () => {
        if (playerRef.current) {
            const player = playerRef.current;
            player.addEventListener('timeupdate', processStreamValues);
            player.play();
        }
    };

    const processStreamValues = () => {
        if (playerRef.current) {
            const video = playerRef.current;
            const playedFraction = video.currentTime / video.duration;
            const loadedFraction = video.buffered.length ? video.buffered.end(0) / video.duration : 0;
            const playedPercentage = Number(playedFraction * 100).toFixed(2);
            const loadedPercentage = Number(loadedFraction * 100).toFixed(2);
            setProgress(playedPercentage);
            setAmountPlayed(playedPercentage);
            setAmountLoaded(loadedPercentage);

            // If the video has played to the end, pause it
            if (+playedPercentage === 100) {
                dispatch(setPlayStatus(false));
            }
        }
    };

    const handleVolumeChange = (newVolume) => {
        let player = playerRef.current;
        player.volume = newVolume;
        setVolume(newVolume);
    }

    useEffect(() => {
        // Add the 'progress' event listener to the video element
        if (playerRef.current) {
            playerRef.current.addEventListener('timeupdate', processStreamValues);

            // Set default volume
            playerRef.current.volume = 0.5;
        }

        // Remove the event listener when the component is unmounted
        return () => {
            if (playerRef.current) {
                playerRef.current.removeEventListener('timeupdate', processStreamValues);
            }
        };
    }, []);

    const smPortrait = "relative aspect-video";
    const smLandscape = "landscape:absolute landscape:top-1/2 landscape:left-1/2 landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2 landscape:h-full landscape:w-fit";
    const mdPortrait = "";
    const mdLandscape = "md:landscape:relative md:landscape:top-0 md:landscape:left-0 md:landscape:transform-none md:landscape:translate-x-0 md:landscape:translate-y-0 md:landscape:max-w-[60%] md:landscape:h-fit md:min-w-[60%]";
    const mdLandscapeFullScreen = "";

    return (
        <div className={`bg-black transition-all  ${smPortrait} ${smLandscape} ${mdPortrait} ${isFullScreen ? mdLandscapeFullScreen : mdLandscape}`}>
            {
                isReady ?
                    <div className='w-full'>
                        <video
                            src={videoUrl}
                            ref={playerRef}
                            className='w-full h-full object-cover'
                            volume={volume}
                        />

                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100' />
                        <ProgressBar
                            progress={progress}
                            amountLoaded={amountLoaded}
                            amountPlayed={amountPlayed}
                            handleSeek={handleSeek}
                            handleSeekMouseDown={handleSeekMouseDown}
                            handleSeekMouseUp={handleSeekMouseUp}
                        />
                        <Controls
                            isPlaying={isPlaying}
                            handlePlayback={handlePlayback}
                            handleVolumeChange={handleVolumeChange}
                        />
                    </div>
                    :
                    <img
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        onClick={() => setIsReady(true)}
                        className='absolute top-0 left-0 w-full h-full object-cover cursor-pointer'
                    />
            }
        </div>
    )
}