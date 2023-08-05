import { useState } from 'react'
import { formatNumbers } from '../utils';

export const DescriptionCard = ({ views, uploadDate, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        if(isExpanded === false){
            setIsExpanded(true);
        }
    }

    return (
       
        <div className={`bg-[#272727] ${isExpanded === false && "hover:bg-[#373737]"}  p-4 cursor-pointer rounded-xl`}>
            <div className='flex flex-col items-start gap-4 text-slate-100 text-sm' onClick={() => handleExpand()}>
                <span className='flex'>
                    <p>{formatNumbers(views)} Views</p>
                    <p className="mx-2">•</p>
                    <p>{uploadDate}</p>
                </span>
                <div dangerouslySetInnerHTML={{ __html: description }} className={`text-slate-100 rounded-lg ${isExpanded === false && "line-clamp-2"}`} />

                {
                    isExpanded === true &&
                    <button onClick={() => setIsExpanded(false)} className='mt-4 text-xl font-bold text-slate-300 hover:text-slate-100'>
                        Show less
                    </button>
                }
            </div>
        </div>
    )
}