import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { Controls } from "../";

export const Player = () => {

    const [isReady, setIsReady] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    let thumbnailUrl = "https://pipe-plus-proxy.app3.in/vi/Bw8b9YV0EPA/maxresdefault.jpg?host=i.ytimg.com";
    let videoUrl = 'https://pipe-plus-proxy.app3.in/videoplayback?expire=1689998282&ei=av-6ZOz2CceTsfIP6tKGoAg&ip=164.92.105.139&id=o-AIFQTwmwXgQss6WZVkalXICLTOAQr-r_BPtQ7jyqXWs8&itag=22&source=youtube&requiressl=yes&mh=Ky&mm=31%2C29&mn=sn-n4v7snly%2Csn-o097znzr&ms=au%2Crdu&mv=m&mvi=2&pl=19&initcwndbps=233750&spc=Ul2Sq-EO2S-OzTw0b1HkQtDmPFoFNMk&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=1273.335&lmt=1689661163746276&mt=1689976398&fvip=5&fexp=24007246%2C24362688%2C24363393%2C51000011&c=ANDROID&txp=4432434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAPx4j7ENG8VrFqzlU1kogWjTGBun0nHzfLBq2_Va5S8jAiEA1gljyAabbJO-w-ybXtUj1if3uPNcxmkaMrwP8zS8SOk%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgRNb1lyAAfvZFoSky5kAzX-SRqLLJ939QK4yz-HdaGpECIHgQSYqn0Pc-88ZMmE-jB0YjuljY426nC6J5iv1hIPsm&cpn=z9_QXeZFSzrQzUja&host=rr2---sn-n4v7snly.googlevideo.com';

    const handlePlayback = () => {
        console.log('Play Video Clicked', isPlaying ? 'Pause' : 'Play');
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        console.log('Player Mounted');
    }, []);

    return (
        <div className='relative w-full max-w-[60%] aspect-video border-[1px] border-slate-900 bg-black'>
            {
                isReady ?
                    <div className='w-full'>
                        <ReactPlayer
                            url={videoUrl}
                            width='100%'
                            height='100%'
                            playing={isPlaying}
                            onReady={() => console.log('Player is Ready')}
                        />
                        <div onClick={() => handlePlayback()} className='w-full h-full absolute top-0 left-0 opacity-100'/>
                        <Controls
                            isPlaying={isPlaying}
                            handlePlayback={handlePlayback}
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