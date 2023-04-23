import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { Controls } from "../";
import { requestFullScreenEnter, requestFullScreenExit } from '../../utils';

export const Player = () => {

    const [isReady, setIsReady] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0.5);

    let thumbnailUrl = "https://pipe-plus-proxy.app3.in/vi_webp/ppBe8cHQkTs/maxresdefault.webp?host=i.ytimg.com";
    let videoUrl = 'https://pipedproxy-cdg.kavin.rocks/videoplayback?expire=1690040665&ei=-aS7ZNXRKqGOmLAP6qaa8AU&ip=104.28.211.187&id=o-ABF8xMyi4Dj7dgl1AWjWxobeO5C_e4eDHke4YGTrCCUh&itag=22&source=youtube&requiressl=yes&mh=mY&mm=31%2C29&mn=sn-oguelnzz%2Csn-ogul7nez&ms=au%2Crdu&mv=m&mvi=3&pl=24&initcwndbps=1662500&spc=Ul2Sq8ezI8Ho8zMc-RHoRxvEu7UWddU&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=683.223&lmt=1689705917590181&mt=1690017652&fvip=2&fexp=24007246&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAKprzuQur3sjIByhrmos_IHZIegJCZOOMETDWtEmopZvAiEA6kaNrP0GhSWhZTvzUfIQPEuXT42WwuoCPvV9RprUI2c%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAN4lrvliWCTOJcDVY8vt_yZ3wnpRxPyqM--lu_DNgV0sAiALFNJi4lfWYOlya_DrglUHj7Ub9LAQNXun_CaoZVroNA%3D%3D&cpn=QwWWbg0FankNAyWh&host=rr3---sn-oguelnzz.googlevideo.com';

    const handlePlayback = () => {
        console.log('Play Video Clicked', isPlaying ? 'Pause' : 'Play');
        setIsPlaying(!isPlaying);
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
                            onReady={() => console.log('Player is Ready')}
                        />
                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100'/>
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