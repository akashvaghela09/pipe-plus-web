import { useEffect, useState, useRef } from 'react';
import { Comment, Spinner } from '../';
import { formatNumbers } from '../../utils';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { BsArrowReturnRight } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setCommentData } from '../../redux/player/actions';
import { pipePlus } from '../../apis';
import { CgClose } from 'react-icons/cg';

export const CommentSection = ({ streamId }) => {
    const dispatch = useDispatch();

    const { commentData } = useSelector(state => state.player);
    const { count, list, nextPage, replyIndex, isLoading } = commentData;
    const [commentExpanded, setCommentExpanded] = useState(false);
    const windowWidth = window.innerWidth;

    const commentSectionRef = useRef(null);

    const loadStreamComments = async () => {
        let data = await pipePlus.stream.comments.get(streamId);
        const { commentCount, comments, nextpage } = data;

        comments.forEach(comment => {
            comment.id = uuid();
            comment.replyOpen = false;
            comment.replies = [];
            comment.loading = false;
        });

        dispatch(setCommentData({
            ...commentData,
            count: commentCount,
            list: [...comments],
            nextPage: nextpage,
        }))
    }

    const loadMoreComments = async () => {
        dispatch(setCommentData({
            ...commentData,
            isLoading: true,
        }));

        if (nextPage === null || nextPage === undefined || nextPage === '') {
            console.log("No more comments to load, reached the end");
            dispatch(setCommentData({
                ...commentData,
                isLoading: false,
            }));
            return;
        }

        let data = await pipePlus.stream.comments.getNextPage(streamId, nextPage);

        if (data !== null && data !== undefined && data !== '') {
            const { comments, nextpage } = data;

            comments.forEach(comment => {
                comment.id = uuid();
                comment.replyOpen = false;
                comment.replies = [];
                comment.loading = false;
            });

            dispatch(setCommentData({
                ...commentData,
                list: [...list, ...comments],
                nextPage: nextpage,
                isLoading: false,
            }));
        } else {
            console.log("Failed to load more comments");
            dispatch(setCommentData({
                ...commentData,
                isLoading: false,
            }));
        }
    }

    const loadCommentReplies = async (index) => {
        list[index].loading = true;
        let repliesPage = list[index].repliesPage;

        if (repliesPage === null || repliesPage === undefined || repliesPage === '') {
            console.log("No replies to load, reached the end");
            list[index].loading = false;
            return;
        }

        let data = await pipePlus.stream.comments.getNextPage(streamId, repliesPage);

        if (data !== null && data !== undefined && data !== '') {
            const { comments, nextpage } = data;

            comments.forEach(comment => {
                comment.id = uuid();
            });

            list[index].replies = [...list[index].replies, ...comments];
            list[index].repliesPage = nextpage ? nextpage : "Done";
            list[index].loading = false;

            dispatch(setCommentData({
                ...commentData,
                list: [...list],
            }));
        } else {
            console.log("Failed to load replies");
            list[index].loading = false;
        }
    }

    const handleReplyOpen = async (index) => {
        list[index].loading = true;
        dispatch(setCommentData({
            ...commentData,
            list: [...list],
            replyIndex: index,
        }));

        if (list[index].replyOpen === false) {
            list[index].replyOpen = true;
            await loadCommentReplies(index);
        } else {
            list[index].replyOpen = false;
            dispatch(setCommentData({
                ...commentData,
                list: [...list],
                replyIndex: -1,
            }));
        }

        dispatch(setCommentData({
            ...commentData,
            list: [...list],
        }));
    }

    useEffect(() => {
        loadStreamComments();
    }, [streamId]);

    useEffect(() => {
        const handleScroll = () => {
            if (windowWidth < 400) {
                return;
            }

            const commentSectionElement = commentSectionRef.current;
            let commentSectionHeight = commentSectionElement.clientHeight;
            let pageScroll = window.scrollY;
            let differece = commentSectionHeight - pageScroll;

            if (differece < 0) {
                // console.log("Load new comments");
                loadMoreComments();
            }
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [list, replyIndex, streamId]);

    return (
        <div className='mt-3 lg:my-5 lg:py-5 bg-[#272727] lg:bg-transparent rounded-lg'>

            {/* for small screens | header */}
            {
                commentExpanded === false &&
                <span onClick={() => setCommentExpanded(true)} className='flex text-slate-100 lg:hidden gap-2 items-baseline p-2'>
                    <p className='text-lg font-bold'>Comments</p>
                    <p className='text-slate-100 text-opacity-50 text-sm'>{count}</p>
                </span>
            }

            {/* for small screens | comment section */}
            {
                commentExpanded &&
                <div className='lg:hidden'>
                    <div onClick={() => setCommentExpanded(false)} className='flex items-center justify-between p-2'>
                        <span className='flex text-slate-100 lg:hidden gap-2 items-baseline'>
                            <p className='text-lg font-bold'>Comments</p>
                            <p className='text-slate-100 text-opacity-50 text-sm'>{count}</p>
                        </span>
                        <CgClose className='text-slate-100 text-opacity-50 text-2xl' />
                    </div>
                </div>
            }

            {/* for large screens | header */}
            <h1 className='text-slate-100 lg:flex hidden'><b>{count}</b> Comments</h1>

            {/* comment section */}
            {
                (windowWidth > 400 || commentExpanded === true) &&
                <div ref={commentSectionRef} className='p-2'>
                    {
                        list.map((comment, index) => {
                            return (
                                <div className='my-4' key={comment.id}>
                                    {/* Stream comment */}
                                    <Comment comment={comment} />
                                    {
                                        (comment.repliesPage !== null || comment.repliesPage === "Done") &&
                                        <div className='ml-14'>
                                            <div onClick={() => handleReplyOpen(index, comment.repliesPage)} className='flex items-center text-sm hover:bg-[#275D8C] hover:bg-opacity-75 rounded-full p-2 px-3 cursor-pointer w-fit'>
                                                {
                                                    comment.replyOpen === true ?
                                                        <PiCaretUpBold className='text-xl text-[#3EA6FF]' />
                                                        :
                                                        <PiCaretDownBold className='text-xl text-[#3EA6FF]' />
                                                }
                                                <span className='mx-1 text-[#3EA6FF]'>{formatNumbers(comment.replyCount)} replies</span>
                                            </div>

                                            {
                                                comment.replyOpen === true &&
                                                <div className='h-fit flex flex-col gap-4 py-4'>
                                                    {/* Individual comment reply*/}
                                                    {
                                                        comment.replies.map((reply, index) => {
                                                            return (
                                                                <Comment key={reply.id} comment={reply} iconSize="sm" />
                                                            )
                                                        }
                                                        )
                                                    }

                                                    {/* Show more button if nextpage is available */}
                                                    {
                                                        (comment.repliesPage !== null && comment.repliesPage !== "Done" && comment.loading === false) &&
                                                        <div onClick={() => loadCommentReplies(index)} className='flex items-center text-sm hover:bg-[#275D8C] hover:bg-opacity-75 rounded-full p-2 px-3 cursor-pointer w-fit'>
                                                            <BsArrowReturnRight className='text-xl text-[#3EA6FF]' />
                                                            <span className='mx-1 text-[#3EA6FF]'>Show More replies</span>
                                                        </div>
                                                    }

                                                    {/* Loading while we get replies from server */}
                                                    {
                                                        comment.loading === true &&
                                                        <div className='p-4'>
                                                            <Spinner size="sm" />
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }

                    {/* Load while we get next page comments */}
                    {
                        isLoading &&
                        <div className='flex justify-center py-4 h-28'>
                            <Spinner size="sm" />
                        </div>
                    }

                    {
                        (nextPage !== null && nextPage !== undefined && nextPage !== '') &&
                        <div className='flex justify-center lg:hidden' onClick={() => loadMoreComments()}>
                            <PiCaretDownBold className='text-2xl text-slate-100' />
                        </div>
                    }
                </div>
            }
        </div>
    )
}


