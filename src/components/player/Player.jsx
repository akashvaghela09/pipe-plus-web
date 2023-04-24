import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import { Controls, ProgressBar } from "../";
import { requestFullScreenEnter, requestFullScreenExit } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayStatus } from '../../redux/player/actions';

export const Player = () => {

    const dispatch = useDispatch();

    const {
        isPlaying
    } = useSelector(state => state.player);

    const [isReady, setIsReady] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [totalDuration, setTotalDuration] = useState(0);
    const [amountLoaded, setAmountLoaded] = useState(0);
    const [amountPlayed, setAmountPlayed] = useState(0);

    let thumbnailUrl = "https://pipe-plus-proxy.app3.in/vi_webp/ppBe8cHQkTs/maxresdefault.webp?host=i.ytimg.com";
    let videoUrl = 'https://pipe-plus-proxy.app3.in/videoplayback?expire=1690053297&ei=Uda7ZJjQO8eQsfIPl_ypoAM&ip=164.92.105.139&id=o-AErmFBOQVXmWc8wCQPiOCyCJ_WmhWPvDV6E3tfuAxWmJ&itag=18&source=youtube&requiressl=yes&mh=z0&mm=31%2C29&mn=sn-n4v7sns7%2Csn-o097znzk&ms=au%2Crdu&mv=m&mvi=3&pl=21&initcwndbps=230000&spc=Ul2Sq6DOUmxAFO-2zCZy2gJwFjfray4&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=93.738&lmt=1665394396784533&mt=1690031346&fvip=1&fexp=24007246%2C51000022&beids=24350017&c=ANDROID&txp=4530434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgQ-2doYgOoUDyBo3CeqQlkGJ2csJv1mzNeuIY-jnYK_YCIF8isNGuD5T0_vwNDHQA30jk9Cpep28O_qw7dfLA5m30&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAPZIsb0M0J0Y8kIVItjh9bhlri0EPnTB6QguFLUgRlswAiEA6KjOZ7Uc-GRm7fu8Gapf0-nI6GkIEvd2-tWIMreq0eQ%3D&cpn=MSrSFDpozZPzZA-0&host=rr3---sn-n4v7sns7.googlevideo.com';

    const handlePlayback = () => {
        dispatch(setPlayStatus(!isPlaying));
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

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    }

    const handleProgress = (progress) => {
        const { loaded, played } = progress;

        setAmountLoaded(Math.ceil(loaded * 100));
        setAmountPlayed(Math.ceil(played * 100));
    }

    const updateDuration = (duration) => {
        setTotalDuration(duration);
    }

    useEffect(() => {
        console.log('Player Mounted');
    }, []);

    const smPortrait = "relative aspect-video";
    const smLandscape = "landscape:absolute landscape:top-1/2 landscape:left-1/2 landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2 landscape:h-full landscape:w-fit";
    const mdPortrait = "";
    const mdLandscape = "md:landscape:relative md:landscape:top-0 md:landscape:left-0 md:landscape:transform-none md:landscape:translate-x-0 md:landscape:translate-y-0 md:landscape:max-w-[60%] md:landscape:h-fit md:min-w-[60%]";
    const mdLandscapeFullScreen = "";

    return (
        <div className={`bg-black transition-all  ${smPortrait} ${smLandscape} ${mdPortrait} ${isFullScreen ? mdLandscapeFullScreen : mdLandscape}`}>
            {/* <div className={`relative w-full max-h-screen aspect-video border-[1px] border-slate-900 bg-black transition-all landscape:absolute landscape:top-1/2 landscape:left-1/2 landscape:transform landscape:-translate-x-1/2 landscape:-translate-y-1/2 landscape:h-full landscape:w-fit`}> */}
            {
                isReady ?
                    <div className='w-full'>
                        <ReactPlayer
                            url={videoUrl}
                            width='100%'
                            height='100%'
                            playing={isPlaying}
                            controls={false}
                            volume={volume}
                            onProgress={handleProgress}
                            onDuration={updateDuration}
                            onReady={() => console.log('Player is Ready')}
                        />
                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100' />
                        <ProgressBar 
                            amountLoaded={amountLoaded}
                            amountPlayed={amountPlayed}
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