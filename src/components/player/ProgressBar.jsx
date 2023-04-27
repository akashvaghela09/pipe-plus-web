export const ProgressBar = ({progress, amountLoaded, amountPlayed, handleSeek, handleSeekMouseDown, handleSeekMouseUp}) => {

    return (
        <div className='absolute bottom-14 flex flex-col px-4 mx-5' style={{width: `calc(100% - 40px)`}}>
            <div className='absolute top-0 left-0 bg-zinc-800 h-1 mt-1'
                style={{ width: `${100}%` }}
            />
            <div className={`absolute top-0 left-0 w-1/2 bg-zinc-600 h-1 mt-1`}
                style={{ width: `${amountLoaded}%` }}
            />
            <div
                className="absolute top-0 left-0 bg-red-600 h-1 mt-1"
                style={{ width: `${amountPlayed}%` }}
            />
            <input
                type="range"
                min={0}
                max={100}
                step={0.001}
                value={progress}
                onChange={(e) => handleSeek(e.target.value)}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                className='pp_input absolute top-0 left-0 appearance-none w-full h-4 pb-1 bg-transparent cursor-pointer z-50'
            />
            <div />
        </div>
    )
}