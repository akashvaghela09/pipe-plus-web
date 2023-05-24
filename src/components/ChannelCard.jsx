import React from 'react'
import { TiTick } from 'react-icons/ti';
import { formatTime, formatNumbers } from '../utils';

export const ChannelCard = ({ video }) => {
    const {
        name,
        thumbnail,
        verified,
        description,
        subscribers,
        // url,
    } = video;

    return (
        <div className='w-full flex gap-4'>
            <div className='relative w-[380px] flex justify-center'>
                <img
                    src={thumbnail}
                    className='w-44 h-44 rounded-full z-10 cursor-pointer'
                />
            </div>

            <div className='flex max-w-xl w-full'>
                <div className='flex flex-col grow'>
                    <div className='flex items-center gap-2'>
                        <p className='text-slate-50 text-lg line-clamp-2 leading-6'>{name}</p>
                        {
                            verified && <TiTick className='text-xs bg-slate-400 rounded-full' />
                        }
                    </div>
                    <div className='flex items-start justify-start gap-2'>
                        <p className='text-slate-100 opacity-50 text-sm'>{name}</p>
                        <p className='text-slate-100 opacity-50 text-sm'>•</p>
                        <p className='text-slate-100 opacity-50 text-sm'> {formatNumbers(subscribers)} subscribers</p>
                    </div>
                        <p className='text-slate-100 opacity-50 text-sm mt-4'>{description}</p>
                </div>
            </div>
        </div>
    )
}