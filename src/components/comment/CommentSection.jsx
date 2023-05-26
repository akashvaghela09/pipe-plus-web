import { useEffect, useState, useRef } from 'react';
import { pipePlus } from '../../apis/pipePlus';
import { Comment, Spinner } from '../';
import { formatNumbers } from '../../utils';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { BsArrowReturnRight } from 'react-icons/bs';
import { v4 as uuid } from 'uuid';

export const CommentSection = ({ streamId }) => {
    const commentSectionRef = useRef(null);
    const [commentCount, setCommentCount] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    const [replyIndex, setReplyIndex] = useState(-1);

    const loadStreamComments = async () => {
        let data = await pipePlus.getComments(streamId);
        const { commentCount, comments, nextpage } = data;

        comments.forEach(comment => {
            comment.id = uuid();
            comment.replyOpen = false;
            comment.replies = [];
            comment.loading = false;
        });

        setCommentCount(commentCount);
        setCommentList([...comments]);
        setNextPage(nextpage);
    }

    const loadMoreComments = async () => {
        setIsCommentsLoading(true);

        if (nextPage === null || nextPage === undefined || nextPage === '') {
            console.log("No more comments to load, reached the end");
            setIsCommentsLoading(false);
            return;
        }

        let data = await pipePlus.getNextPageComments(streamId, nextPage);

        if (data !== null && data !== undefined && data !== '') {
            const { comments, nextpage } = data;

            comments.forEach(comment => {
                comment.id = uuid();
                comment.replyOpen = false;
                comment.replies = [];
                comment.loading = false;
            });

            setCommentList([...commentList, ...comments]);
            setNextPage(nextpage);
            setIsCommentsLoading(false);
        } else {
            console.log("Failed to load more comments");
            setIsCommentsLoading(false);
        }
    }

    const loadCommentReplies = async (index) => {
        commentList[index].loading = true;
        let repliesPage = commentList[index].repliesPage;

        if (repliesPage === null || repliesPage === undefined || repliesPage === '') {
            console.log("No replies to load, reached the end");
            commentList[index].loading = false;
            return;
        }

        let data = await pipePlus.getNextPageComments(streamId, repliesPage);

        if (data !== null && data !== undefined && data !== '') {
            const { comments, nextpage } = data;

            comments.forEach(comment => {
                comment.id = uuid();
            });

            commentList[index].replies = [...commentList[index].replies, ...comments];
            commentList[index].repliesPage = nextpage ? nextpage : "Done";
            commentList[index].loading = false;

            setCommentList([...commentList]);
        } else {
            console.log("Failed to load replies");
            commentList[index].loading = false;
        }
    }

    const handleReplyOpen = async (index) => {
        console.log("Reply open clicked", index);
        commentList[index].loading = true;
        setReplyIndex(index);

        if (commentList[index].replyOpen === false) {
            commentList[index].replyOpen = true;
            await loadCommentReplies(index);

        } else {
            commentList[index].replyOpen = false;
            setReplyIndex(-1);
        }

        setCommentList([...commentList]);
    }

    useEffect(() => {
        loadStreamComments();
    }, [streamId]);

    useEffect(() => {
        const handleScroll = () => {
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
    }, [commentList, replyIndex]);

    return (
        <div className='my-5 py-5'>
            <h1 className='text-slate-100 '><b>{commentCount}</b> Comments</h1>

            <div ref={commentSectionRef}>
                {
                    commentList.map((comment, index) => {
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
                                                            <Comment key={reply.id} comment={reply} />
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
                    isCommentsLoading &&
                    <div className='flex justify-center py-4 h-28'>
                        <Spinner size="sm" />
                    </div>
                }
            </div>
        </div>
    )
}


