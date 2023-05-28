import React from 'react'
import { TiTick } from 'react-icons/ti';
import { FiRadio } from 'react-icons/fi';
import { formatTime, formatNumbers } from '../utils';

export const ResultCard = ({ video, size = "lg" }) => {
    const {
        title,
        type,
        name,
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

    let sectionGap = {
        "sm": "gap-2",
        "lg": "gap-4",
    }

    let thumbContainer = {
        "sm": "w-fit h-[103px] rounded-lg",
    }

    let thumb = {
        "sm": "w-[320px] h-fit",
    }

    let streamTitle = {
        "sm": "text-sm font-semibold leading-6",
    }

    return (
        <div className={`flex ${sectionGap[size]} `}>
            <div className={`relative ${thumbContainer[size]}`}>
                <img
                    loading='lazy'
                    src={thumbnail}
                    className={`rounded-lg ${thumb[size]} z-10 cursor-pointer`}
                />

                {
                    type === "stream" &&
                    <p className='absolute bottom-1 right-1 px-1 rounded-md text-sm text-slate-50 bg-black'>{formatTime(duration)}</p>
                }

                {
                    type === "playlist" &&
                    <div className='absolute p-1 bottom-0 left-0 w-full rounded-b-md text-md text-slate-50 bg-opacity-30 backdrop-blur-sm flex justify-center bg-black'>
                        <FiRadio className='text-lg' />
                    </div>
                }
            </div>

            <div className='flex w-full'>
                <div className='flex flex-col grow'>

                    {
                        type === "stream" &&
                        <p className={`text-slate-50 line-clamp-2 leading-6 ${streamTitle[size]}`}>{title}</p>
                    }

                    {
                        type === "playlist" &&
                        <p className={`text-slate-50 line-clamp-2 leading-6 ${streamTitle[size]}`}>{name}</p>
                    }

                    {size === "sm" &&
                        <span className=''>
                            <div className='flex items-center justify-start gap-2 mt-1'>
                                <p className='text-slate-100 opacity-50 text-xs line-clamp-1 hover:opacity-70 cursor-pointer'>{uploaderName}</p>
                                {
                                    uploaderVerified && <TiTick className='text-xs bg-zinc-500 rounded-full' />
                                }

                            </div>
                            <div className='flex items-start justify-start gap-2'>
                                {
                                    type === "stream" &&
                                    <p className='text-slate-100 opacity-50 text-xs'>{formatNumbers(views)} views</p>
                                }

                                {
                                    uploadedDate && <span className='text-slate-100 opacity-50 text-xs flex gap-2'><p>•</p> {uploadedDate}</span>
                                }
                            </div>
                        </span>
                    }

                    {size === "lg" &&
                        <span>
                            <div className='flex items-start justify-start gap-2'>
                                <p className='text-slate-100 opacity-50 text-sm'>{formatNumbers(views)} views</p>
                                {
                                    uploadedDate && <span className='text-slate-100 opacity-50 text-sm flex gap-2'><p>•</p> {uploadedDate}</span>
                                }
                            </div>


                            <div className='flex justify-start items-center gap-2 my-4'>
                                <img loading='lazy' src={uploaderAvatar} className='w-7 h-7 rounded-full' />
                                <div className='flex items-center justify-start gap-2'>
                                    <p className='text-slate-100 opacity-50 text-sm line-clamp-1 hover:opacity-70 cursor-pointer'>{uploaderName}</p>
                                    {
                                        uploaderVerified && <TiTick className='text-xs bg-zinc-500 rounded-full' />
                                    }

                                </div>
                            </div>
                            <p className='text-slate-100 opacity-50 text-sm'>{shortDescription}</p>


                        </span>
                    }
                </div>
            </div>
        </div>
    )
}