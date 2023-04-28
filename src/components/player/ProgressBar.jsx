import { useDispatch, useSelector } from "react-redux";
import { setStreamValues } from "../../redux/player/actions";

export const ProgressBar = ({ processStreamValues }) => {

    const dispatch = useDispatch();

    const { player, streamValues } = useSelector(state => state.player);
    const { buffered, played, seek } = streamValues;

    // TODO: Only Seek when player is ready
    const handleSeek = (value) => {
        const desiredPercentageOfSeek = parseFloat(value);
        const duration = player.duration;
        const time = duration * (desiredPercentageOfSeek / 100);

        player.currentTime = time;
        dispatch(setStreamValues({ ...streamValues, seek: desiredPercentageOfSeek }));
    };

    const handleSeekMouseDown = () => {
        if (player) {
            player.removeEventListener('timeupdate', processStreamValues);
            player.pause();
        }
    };

    const handleSeekMouseUp = () => {
        if (player) {
            player.addEventListener('timeupdate', processStreamValues);
            player.play();
        }
    };

    return (
        <div className='absolute bottom-14 flex flex-col px-4 mx-2' style={{ width: `calc(100% - 20px)` }}>
            <div className='absolute top-0 left-0 bg-zinc-800 h-1 mt-1'
                style={{ width: `${100}%` }}
            />
            <div className={`absolute top-0 left-0 w-1/2 bg-zinc-600 h-1 mt-1`}
                style={{ width: `${buffered}%` }}
            />
            <div
                className="absolute top-0 left-0 bg-red-600 h-1 mt-1"
                style={{ width: `${played}%` }}
            />
            <input
                type="range"
                min={0}
                max={100}
                step={0.001}
                value={seek}
                onChange={(e) => handleSeek(e.target.value)}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                className='pp_input absolute top-0 left-0 appearance-none w-full h-4 pb-1 bg-transparent cursor-pointer z-50'
            />
            <div />
        </div>
    )
}