import React, { useEffect, useState, useRef } from 'react';
import { Controls, ProgressBar, Spinner } from "../";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayStatus, setAudioPlayer, setVideoPlayer, setStreamValues, setQualityUpdateStatus, setStreamPlayed, setPrevProgress, setStreamLoading, setAutoPlayRequest } from '../../redux/player/actions';
import ReactPlayer from 'react-player'
import { pipePlus } from '../../apis';
import { isValid } from '../../utils';

export const Player = () => {
    const dispatch = useDispatch();

    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const {
        videoPlayer,
        audioPlayer,
        playbackRate,
        isPlaying,
        isFullScreen,
        volume,
        streamValues,
        streamSource,
        streamMetadata,
        selectedQuality,
        qualityUpdateStatus,
        streamPlayed,
        prevProgress,
        streamUuid,
        streamLoading,
        autoPlayRequest
    } = useSelector(state => state.player);
    const { thumbnailUrl, playableStreams, duration } = streamMetadata;

    const [isReady, setIsReady] = useState(true);
    const [streamUrl, setStreamUrl] = useState(streamSource.url);
    const [trackUrl, setTrackUrl] = useState(streamSource.track);
    const [isAudioPlaying, setIsAudioPlaying] = useState(isPlaying);

    const handlePlayback = () => {
        dispatch(setPlayStatus(!isPlaying));
        setIsAudioPlaying(!isAudioPlaying);
    }

    const processVideoStreamValues = async (e) => {
        if (isReady === true) {

            let playedSeconds = e.playedSeconds;

            if (isValid(prevProgress) && prevProgress !== 0) {
                // console.log("Previous progress is valid,\nseeking ...", prevProgress);
                dispatch(setStreamLoading(true));
                videoPlayer.seekTo(prevProgress, 'seconds');
                audioPlayer.seekTo(prevProgress, 'seconds');

                dispatch(setPrevProgress(null));
                dispatch(setStreamValues({ ...streamValues, seek: prevProgress, played: prevProgress / duration }));
            } else {
                dispatch(setStreamValues({ ...streamValues, ...e, seek: playedSeconds }));
            }

            if (isPlaying === true && (prevProgress === null || prevProgress === 0) && playedSeconds > 10) {
                // console.log("Updating played seconds ...", playedSeconds);
                let watched = false;

                if(e.played >= 0.90) {
                    watched = true;
                }
                
                let params = {
                    streamUuid: streamUuid,
                    progressAmount: playedSeconds,
                    watched: watched
                }

                let res = await pipePlus.stream.updatePlayed(params);
            } else {
                // console.log("Not updating played seconds ...");
                // console.log("Played seconds: ", playedSeconds);
                // console.log("isPlaying: ", isPlaying);
                // console.log("prevProgress: ", prevProgress);
            }

            if(autoPlayRequest === true && streamLoading === false && isPlaying === false) {
                dispatch(setPlayStatus(true));
                dispatch(setAutoPlayRequest(false));
            }

            // If the video has played to the end, pause it
            if (+e.played === 1) {
                dispatch(setPlayStatus(false));
            }
        }
    };

    const handleReadyToPlay = () => {
        let timeString = new Date().toLocaleTimeString();
        // console.log("Ready to play ...", timeString, streamMetadata.title);
        dispatch(setStreamLoading(false));
        // console.log("Auto play ...", autoPlay);
        // console.log("prevProgress: ", prevProgress);
        // console.log("Previous Played seconds ...", streamPlayed);
    }

    const handleBuffering = () => {
        // console.log("Buffering ...", new Date().toLocaleTimeString());
        dispatch(setStreamLoading(true));
        setPlayStatus(false);
        setIsAudioPlaying(false);
    }

    const handleBufferingEnd = () => {
        // console.log("Buffering ended ...", new Date().toLocaleTimeString());
        dispatch(setStreamLoading(false));

        if (qualityUpdateStatus === true) {
            let seconds = streamPlayed;
            // console.log("Quality update status is true ...", streamPlayed);
            dispatch(setPlayStatus(true));
            videoPlayer.seekTo(seconds, 'seconds');
            audioPlayer.seekTo(seconds, 'seconds');
            dispatch(setQualityUpdateStatus(false));

        } else {
            // console.log("Quality update status is false ...", new Date().toLocaleTimeString());   
            dispatch(setPlayStatus(true));
            setIsAudioPlaying(true);
        }
    }

    const storePlayerRef = () => {
        dispatch(setStreamLoading(true));
        if (videoRef.current) {
            const newPlayer = videoRef.current;
            dispatch(setVideoPlayer(newPlayer));

            // Set default volume
            newPlayer.volume = 1;
        } else {
            console.log("videoRef.current is null");
        }

        if (audioRef.current) {
            const newAudio = audioRef.current;
            dispatch(setAudioPlayer(newAudio));

            // Set default volume
            newAudio.volume = 1;
        }
    }

    useEffect(() => {
        // console.log("Player Mounted ....", new Date().toLocaleTimeString())
        // Set the player reference
        storePlayerRef();
    }, []);

    useEffect(() => {
        setStreamUrl(streamSource.url);
        setTrackUrl(streamSource.track);
    }, [streamSource, selectedQuality]);

    useEffect(() => {
        // console.log("Player is playing ...", isPlaying);
        setIsAudioPlaying(isPlaying);
    }, [isPlaying]);

    const smPortrait = "relative aspect-video";
    const smLandscape = "landscape:absolute landscape:top-1/2 landscape:left-1/2 landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2 landscape:h-full landscape:w-auto";
    const mdPortrait = "";
    const mdLandscape = "md:landscape:relative md:landscape:top-0 md:landscape:left-0 md:landscape:transform-none md:landscape:translate-x-0 md:landscape:translate-y-0 md:landscape:w-full md:landscape:h-fit md:w-[60%]";
    const mdLandscapeFullScreen = "";

    return (
        <div className={`bg-black transition-all  ${smPortrait} ${smLandscape} ${mdPortrait} ${isFullScreen ? mdLandscapeFullScreen : mdLandscape}`}>
            {
                isReady ?
                    <div className='w-full'>
                        {/* Play Audio Stream */}
                        <ReactPlayer
                            ref={audioRef}
                            url={trackUrl}
                            volume={volume}
                            playbackRate={playbackRate}
                            playing={isAudioPlaying}
                            width={0}
                            height={0}
                        />
                        {/* Play Video Stream */}
                        <ReactPlayer
                            ref={videoRef}
                            url={streamUrl}
                            volume={volume}
                            playbackRate={playbackRate}
                            playing={isPlaying}
                            width={isFullScreen ? "100%" : "inherit"}
                            height={isFullScreen ? "100%" : "inherit"}
                            className='w-full h-full object-cover'
                            onBuffer={handleBuffering}
                            onBufferEnd={handleBufferingEnd}
                            onReady={handleReadyToPlay}
                            onProgress={processVideoStreamValues}
                        />
                        {
                            streamLoading === true &&
                            <div className='w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center'>
                                <Spinner />
                            </div>
                        }

                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100' />

                        <ProgressBar />
                        <Controls handlePlayback={handlePlayback} />
                    </div>
                    :
                    <img
                        loading='lazy'
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        onClick={() => setIsReady(true)}
                        className='absolute top-0 left-0 w-full h-full object-cover cursor-pointer'
                    />
            }
        </div>
    )
}