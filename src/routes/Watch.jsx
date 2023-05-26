import { useSearchParams } from "react-router-dom";
import { Button, ButtonWrapper, CommentSection, DescriptionCard, Player } from "../components";
import { useEffect } from "react";
import { pipePlus } from "../apis/pipePlus";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableQualities, setStreamMetadata, setStreamSource } from "../redux/player/actions";
import { v4 as uuid } from 'uuid';
import { formatNumbers } from "../utils";
import { TiTick } from 'react-icons/ti';
import { BiSolidDownload, BiLike, BiDislike } from 'react-icons/bi';

export const Watch = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const streamId = searchParams.get('v')

    const { streamMetadata, selectedQuality, streamSource } = useSelector(state => state.player);
    const { 
        title, 
        thumbnailUrl, 
        description, 
        uploaderAvatar, 
        uploader, 
        uploaderSubscriberCount, 
        likes,
        dislikes,
        views,
        uploadDate,
        relatedStreams 
    } = streamMetadata;

    const handleVideoId = async () => {
        let res = await pipePlus.getStreamData(streamId);
        // console.log("Got the data from pipeplus")
        const { videoStreams } = res;

        // prepare stream resources 
        let listOfStreams = {};

        for (let i = 0; i < videoStreams.length; i++) {
            let stream = videoStreams[i];

            if (listOfStreams[stream.quality]) {
                listOfStreams[stream.quality].push(stream);
            } else {
                listOfStreams[stream.quality] = [stream];
            }
        }

        let availableQuality = Object.keys(listOfStreams);
        let streamSource = {};

        if (selectedQuality) {
            streamSource = listOfStreams[selectedQuality][0];
        } else {
            streamSource = listOfStreams[availableQuality[0]][0];
        }

        // console.log("Target Urls : ", streamSource);

        let qualityList = []

        for (let i = 0; i < availableQuality.length; i++) {
            let obj = {};
            obj.id = uuid();
            obj.quality = availableQuality[i];

            qualityList.push(obj);
        }

        dispatch(setStreamSource(streamSource));
        dispatch(setAvailableQualities(qualityList));
        dispatch(setStreamMetadata({ ...res, playableStreams: listOfStreams }));
    }

    

    useEffect(() => {
        handleVideoId()
    }, [streamId])

    return (
        <div className="w-10/12 max-w-10/12 pt-6 flex justify-center">
            <div className="grow flex flex-col gap-4">
                {/* Player section */}
                <Player />

                {/* Stream Metadata section */}
                <div className="flex flex-col gap-2">
                    <p className="text-slate-100 text-xl font-medium font-sans">{title}</p>

                    <div className="flex justify-between items-center">
                        <div className="py-2 flex gap-3 justify-start items-center">
                            <img src={uploaderAvatar} className="rounded-full" />
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-2">
                                    <p className="text-slate-200 text-sm">{uploader} </p>
                                    <TiTick className="bg-slate-50 bg-opacity-50 rounded-full text-xs" />
                                </div>
                                <p className="text-slate-200 text-sm">{formatNumbers(uploaderSubscriberCount)} subscribers</p>
                            </div>
                            <Button className="mx-5">
                                Subscribe
                            </Button>
                        </div>
                        <div className="flex gap-4">
                            <Button>
                                <BiLike className="text-xl" />
                                {formatNumbers(likes)}
                            </Button>
                            <Button>
                                <BiDislike className="text-xl" />
                                {formatNumbers(dislikes)}
                            </Button>
                            <Button>
                                <BiSolidDownload className="text-xl" />
                                Download
                            </Button>
                        </div>
                    </div>

                    <div className="w-full">
                        <DescriptionCard
                            views={views}
                            uploadDate={uploadDate}
                            description={description}
                        />
                    </div>

                    <CommentSection streamId={streamId}/>
                </div>
            </div>
            <div className="w-[450px] min-w-[450px]">

            </div>
        </div>
    )
}