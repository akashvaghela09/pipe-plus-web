import { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { formatNumbers, formatDate, formatIndianNumbering, formatTime, formatReadableDate } from '../utils';

export const DescriptionWithTitle = ({ title, views, likes, uploadDate, description, isDescriptionOpen, handleDescriptionExpand }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    
    return (
        <div className='bg-[#272727] p-2 rounded-lg'>
            {
                isDescriptionOpen === false &&
                <div onClick={() => handleDescriptionExpand(true)}>
                    <p className='text-slate-100 line-clamp-2'>{title}</p>
                    <div className='flex text-slate-100 gap-2 text-xs text-opacity-50'>
                    <p>{formatNumbers(views)}</p>
                    <p>{formatReadableDate(uploadDate)}</p>
                    <p>... more</p>
                    </div>
                </div>
            }

            {
                isDescriptionOpen === true &&
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-slate-100 font-bold text-lg'>Description</p>
                        <CgClose className='text-slate-100 cursor-pointer text-xl' onClick={() => handleDescriptionExpand(false)}/>
                    </div>
                    <div className='border-t-[1px] border-slate-400 border-opacity-50 my-2'/>
                    <p className='font-bold text-slate-100 text-lg'>{title}</p>
                    <div className='border-t-[1px] border-slate-400 border-opacity-50 my-2'/>
                    <div className='flex justify-evenly'>
                        <div className='flex flex-col items-center'>
                            <p className='font-bold text-slate-100 text-lg'>{formatNumbers(likes)}</p>
                            <p className='text-slate-100 text-opacity-50 text-sm'>Likes</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='font-bold text-slate-100 text-lg'>{formatIndianNumbering(views)}</p>
                            <p className='text-slate-100 text-opacity-50 text-sm'>Views</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='font-bold text-slate-100 text-lg'>{formatDate(uploadDate).year}</p>
                            <p className='text-slate-100 text-opacity-50 text-sm'>{formatDate(uploadDate).date}</p>
                        </div>
                    </div>
                    <div className='border-t-[1px] border-slate-400 border-opacity-50 my-2'/>
                    {
                        isDescriptionExpanded ?
                        <div className='text-slate-100' dangerouslySetInnerHTML={{ __html: description }} />
                        :
                        <div>
                            <div className='text-slate-100 line-clamp-4' dangerouslySetInnerHTML={{ __html: description }} />
                            <p className='text-gray-500 p-2' onClick={() => setIsDescriptionExpanded(true)}>... more</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}