import React, { useEffect, useState, useRef } from 'react';
import { Controls, ProgressBar } from "../";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayStatus, setPlayer, setStreamValues } from '../../redux/player/actions';
import data from './../../data.json';

export const Player = () => {
    const dispatch = useDispatch();

    const { videoStreams, thumbnailUrl } = data;
    let url360p = videoStreams['360p'].url;
    let url720p = videoStreams['720p'].url;
    const [videoUrl, setVideoUrl] = useState(url720p);
    const playerRef = useRef(null);
    const {
        player,
        isPlaying, 
        isFullScreen,
        volume,
        streamValues
    } = useSelector(state => state.player);

    const [isReady, setIsReady] = useState(true);

    const handlePlayback = () => {
        dispatch(setPlayStatus(!isPlaying));

        // If the video is being played for the first time, 
        // add the 'timeupdate' event listener to the video element
        if(streamValues.played === 0 && streamValues.buffered === 0) {
            player.addEventListener('timeupdate', processStreamValues);
        }

        if (player) {
            if (isPlaying) {
                player.pause();
            } else {
                player.play();
            }
        }
    }

    const handleQualityChange = (event) => {
        const selectedQuality = event.target.value;
        setVideoUrl(selectedQuality);

        if (player) {
            player.load();
            player.play();
        }
    };

    const processStreamValues = () => {
        if (player) {
            const playedFraction = player.currentTime / player.duration;
            const loadedFraction = player.buffered.length ? player.buffered.end(0) / player.duration : 0;
            const playedPercentage = Number(playedFraction * 100).toFixed(2);
            const loadedPercentage = Number(loadedFraction * 100).toFixed(2);

            dispatch(setStreamValues({
                ...streamValues,
                played: playedPercentage,
                buffered: loadedPercentage,
                seek: playedPercentage
            }));

            // If the video has played to the end, pause it
            if (+playedPercentage === 100) {
                dispatch(setPlayStatus(false));
            }
        }
    };

    const storePlayerRef = () => {
        if (playerRef.current) {
            const newPlayer = playerRef.current;
            dispatch(setPlayer(newPlayer));

            // Set default volume
            newPlayer.volume = 1;
        } else {
            console.log("playerRef.current is null");
        }
    }

    useEffect(() => {
        // Set the player reference
        storePlayerRef();
      
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
                        <ProgressBar processStreamValues={processStreamValues}/>
                        <Controls handlePlayback={handlePlayback} />
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