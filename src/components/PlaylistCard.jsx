import React from 'react'
import { TiTick } from 'react-icons/ti';
import { countDuration, countViews } from '../utils';
import { LuListVideo } from 'react-icons/lu';

export const PlaylistCard = ({ video }) => {
    const {
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
        shortDescription,
        videos
    } = video;

    return (
        <div className='w-full flex gap-4'>
            <div className='relative w-[380px] rounded-xl cursor-pointer'>
                <img
                    // onClick={() => window.open(url, '_blank')}
                    src={thumbnail}
                    className='w-full rounded-xl z-10 cursor-pointer'
                />
                <div className='absolute bottom-0 left-0 flex justify-between items-center px-4 w-full h-7 rounded-b-xl text-sm text-slate-50 bg-slate-600 bg-opacity-50 backdrop-blur-sm'>
                    <LuListVideo className='text-lg'/>
                    <p>{videos} videos</p>
                </div>
            </div>

            <div className='flex max-w-xl'>
                <div className='flex flex-col grow'>
                    <p className='text-slate-50 line-clamp-2 leading-6'>{name}</p>
                    <div className='flex items-start justify-start gap-2'>
                        {/* <p className='text-slate-100 opacity-50 text-sm'>{countViews(views)}</p> */}
                        {
                            uploadedDate && <span className='text-slate-100 opacity-50 text-sm flex gap-2'><p>•</p> {uploadedDate}</span>
                        }
                    </div>
                    <div className='flex justify-start items-center gap-2 my-1'>
                        {/* <img src={uploaderAvatar} className='w-7 h-7 rounded-full' /> */}
                        <div className='flex items-center justify-start gap-2 cursor-pointer'>
                            <p className='text-slate-100 opacity-50 text-sm line-clamp-1 hover:opacity-75'>{uploaderName}</p>
                            {
                                uploaderVerified && <TiTick className='text-xs bg-zinc-500 rounded-full' />
                            }

                        </div>
                    </div>
                    {/* <p className='text-slate-100 opacity-50 text-sm'>{shortDescription}</p> */}
                    <p className='text-slate-100 opacity-50 text-sm cursor-pointer hover:opacity-75'>VIEW FULL PLAYLIST</p>
                </div>
            </div>
        </div>
    )
}