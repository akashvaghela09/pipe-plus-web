import React, { useEffect, useState, useRef } from 'react';
import { Controls, ProgressBar } from "../";
import { requestFullScreenEnter, requestFullScreenExit } from '../../utils';
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
    const videoRef = useRef(null);
    const {
        isPlaying
    } = useSelector(state => state.player);

    const [isReady, setIsReady] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handlePlayback = () => {
        dispatch(setPlayStatus(!isPlaying));

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }

    const handleFullScreen = () => {
        if (!isFullScreen) {
            requestFullScreenEnter();
            setIsFullScreen(true);
        } else {
            requestFullScreenExit();
            setIsFullScreen(false);
        }
    };

    const handleQualityChange = (event) => {
        const selectedQuality = event.target.value;
        setVideoUrl(selectedQuality);

        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        }
    };

    const handleSeek = (value) => {
        const desiredPercentageOfSeek = parseFloat(value);
        const video = videoRef.current;
        const duration = video.duration;
        const time = duration * (desiredPercentageOfSeek / 100);
        
        video.currentTime = time;
        setProgress(desiredPercentageOfSeek);
    };

    const processStreamValues = () => {
        if (videoRef.current) {
            const video = videoRef.current;
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
        let player = videoRef.current;
        player.volume = newVolume;
        setVolume(newVolume);
    }

    useEffect(() => {
        // Add the 'progress' event listener to the video element
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', processStreamValues);
        }

        // Remove the event listener when the component is unmounted
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', processStreamValues);
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
                            ref={videoRef} 
                            className='w-full h-full object-cover'
                            volume={volume}
                        />

                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100' />
                        <ProgressBar 
                            progress={progress}
                            amountLoaded={amountLoaded}
                            amountPlayed={amountPlayed}
                            handleSeek={handleSeek}
                        />
                        <Controls
                            isPlaying={isPlaying}
                            handlePlayback={handlePlayback}
                            handleFullScreen={handleFullScreen}
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