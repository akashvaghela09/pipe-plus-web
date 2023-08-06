import { useDispatch, useSelector } from "react-redux";
import { setStreamValues } from "../../redux/player/actions";

export const ProgressBar = () => {

    const dispatch = useDispatch();

    const { isPlaying, videoPlayer, audioPlayer, streamValues, streamMetadata: { duration } } = useSelector(state => state.player);
    const { loaded, played, seek } = streamValues;

    // TODO: Only Seek when player is ready
    const handleSeek = (time) => {
        // console.log("Seeking to: ", time);
        // console.log("isPlaying: ", isPlaying);
        videoPlayer.seekTo(time, 'seconds');
        audioPlayer.seekTo(time, 'seconds');

        dispatch(setStreamValues({ ...streamValues, seek: time, played: time / duration }));
    };

    return (
        <div className='absolute bottom-14 flex flex-col px-4 mx-2' style={{ width: `calc(100% - 20px)` }}>
            <div 
                className='absolute top-0 left-0 bg-zinc-800 h-1 mt-1'
                style={{ width: `${100}%` }}
            />
            <div 
                className={`absolute top-0 left-0 w-1/2 bg-zinc-600 h-1 mt-1`}
                style={{ width: `${loaded * 100}%` }}
            />
            <div
                className="absolute top-0 left-0 bg-red-600 h-1 mt-1"
                style={{ width: `${played * 100}%` }}
            />
            <input
                type="range"
                min={0}
                max={duration}
                step={0.001}
                value={seek}
                onChange={(e) => handleSeek(e.target.value)}
                className='pp_input absolute top-0 left-0 appearance-none w-full h-4 pb-1 bg-transparent cursor-pointer z-50'
            />
            <div />
        </div>
    )
}