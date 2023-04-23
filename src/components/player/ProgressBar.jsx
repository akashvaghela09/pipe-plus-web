import React, { useEffect, useState } from 'react';

export const ProgressBar = ({amountLoaded, amountPlayed}) => {

    const [progress, setProgress] = useState(0);
    const [bufferWidth, setBufferWidth] = useState(amountLoaded);

    
    const handleCahnge = (value) => {
        setProgress(value);
    }
    
    useEffect(() => {
    }, [amountPlayed, progress]);

    useEffect(() => {
        setBufferWidth(amountLoaded);
    }, [amountLoaded]);

    return (
        <div className='absolute bottom-14 w-full flex flex-col px-4'>
            <div className='absolute top-0 left-0 bg-zinc-800 h-1 mt-1'
                style={{ width: `${100}%` }}
            />
            <div className={`absolute top-0 left-0 w-1/2 bg-zinc-600 h-1 mt-1`}
                style={{ width: `${bufferWidth}%` }}
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
                onChange={(e) => handleCahnge(e.target.value)}
                className='pp_input absolute top-0 left-0 appearance-none w-full h-4 pb-1 bg-transparent cursor-pointer'
            />
            <div />
        </div>
    )
}