import React from 'react'
import { TiTick } from 'react-icons/ti';
import { formatTime, formatNumbers } from '../utils';

export const ResultCard = ({ video }) => {
    const {
        title,
        duration,
        thumbnail,
        uploadedDate,
        uploaderAvatar,
        uploaderName,
        // uploaderUrl, 
        uploaderVerified,
        // url, 
        views,
        shortDescription
    } = video;

    return (
        <div className='w-full flex gap-4'>
            <div className='relative w-[380px] rounded-xl'>
                <img
                    // onClick={() => window.open(url, '_blank')}
                    src={thumbnail}
                    className='w-full rounded-xl z-10 cursor-pointer'
                />
                <p className='absolute bottom-1 right-1 px-1 rounded-md text-sm text-slate-50 bg-black'>{formatTime(duration)}</p>
            </div>

            <div className='flex max-w-xl'>
                <div className='flex flex-col grow'>
                    <p className='text-slate-50 line-clamp-2 leading-6'>{title}</p>
                    <div className='flex items-start justify-start gap-2'>
                        <p className='text-slate-100 opacity-50 text-sm'>{formatNumbers(views)} views</p>
                        {
                            uploadedDate && <span className='text-slate-100 opacity-50 text-sm flex gap-2'><p>•</p> {uploadedDate}</span>
                        }
                    </div>
                    <div className='flex justify-start items-center gap-2 my-4'>
                        <img src={uploaderAvatar} className='w-7 h-7 rounded-full' />
                        <div className='flex items-center justify-start gap-2'>
                            <p className='text-slate-100 opacity-50 text-sm line-clamp-1 hover:opacity-70 cursor-pointer'>{uploaderName}</p>
                            {
                                uploaderVerified && <TiTick className='text-xs bg-zinc-500 rounded-full' />
                            }

                        </div>
                    </div>
                    <p className='text-slate-100 opacity-50 text-sm'>{shortDescription}</p>
                </div>
            </div>
        </div>
    )
}