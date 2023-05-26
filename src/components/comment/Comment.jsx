import React from 'react';
import { useSelector } from 'react-redux';
import { TbPinned } from 'react-icons/tb';
import { BiLike, BiDislike } from 'react-icons/bi';
import { formatNumbers } from '../../utils';

export const Comment = ({ comment }) => {
    const {
        commentText,
        author,
        commentedTime,
        commentorUrl,
        likeCount,
        pinned,
        thumbnail
    } = comment;

    const { streamMetadata: { uploader, uploaderUrl } } = useSelector(state => state.player);

    return (
        <div className='border-slate-700 flex'>
            <img className='h-10 w-10 rounded-full' src={thumbnail} />
            <div className='px-4'>
                {
                    pinned && <p className='text-slate-100 text-opacity-50 text-xs flex items-center'> <TbPinned className='text-lg' /> Pinned by <b className='mx-1'>{uploader}</b></p>
                }
                {
                    uploaderUrl === commentorUrl ?
                        <div className='flex items-baseline gap-2 w-fit my-1 text-slate-100 text-xs'>
                            <p className=' bg-[#888888] text-xs font-semibold flex items-center px-2 py-[2px] rounded-full cursor-pointer'>{author}</p>
                            <p className='text-slate-100 text-opacity-70'>{commentedTime}</p>
                        </div>
                        :
                        <div className='flex items-baseline gap-2 w-fit my-1 text-slate-100 text-xs cursor-pointer'>
                            <p className='text-xs font-semibold flex items-center'>{author}</p>
                            <p className='text-slate-100 text-opacity-70'>{commentedTime}</p>
                        </div>
                }
                <div className='flex flex-col'>
                    <p dangerouslySetInnerHTML={{ __html: commentText }} className={`text-slate-100 rounded-lg text-sm break-all`} />
                    <div className='flex items-center ml-[-8px]'>
                        <span className='p-2 hover:bg-[#272727] text-xl text-slate-300 rounded-full cursor-pointer'>
                            <BiLike />
                        </span>
                        <p className='text-slate-100 text-sm mr-3'>{formatNumbers(likeCount)}</p>
                        <span className='p-2 hover:bg-[#272727] text-xl text-slate-300 rounded-full cursor-pointer'>
                            <BiDislike />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}