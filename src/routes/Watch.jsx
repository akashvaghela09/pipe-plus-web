import { useSearchParams } from "react-router-dom";
import { Player } from "../components";
import { useEffect } from "react";
import { pipePlus } from "../apis/pipePlus";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableQualities, setStreamMetadata, setStreamSource } from "../redux/player/actions";
import { v4 as uuid } from 'uuid';

export const Watch = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const videoId = searchParams.get('v')

    const { streamMetadata, quality } = useSelector(state => state.player);
    const { title, thumbnailUrl, description } = streamMetadata;

    const handleVideoId = async () => {
        let res = await pipePlus.getStreamData(videoId);
        console.log("Got the data from pipeplus")
        const { videoStreams } = res;

        // prepare stream resources 
        let listOfStreams = {};

        for(let i = 0; i < videoStreams.length; i++) {
            let stream = videoStreams[i];

            if(listOfStreams[stream.quality]) {
                listOfStreams[stream.quality].push(stream);
            } else {
                listOfStreams[stream.quality] = [stream];
            }
        }

        let availableQuality = Object.keys(listOfStreams);
        let sourceUrl = "";

        if(quality) {
            sourceUrl = listOfStreams[quality][0].url;
        } else {
            sourceUrl = listOfStreams[availableQuality[0]].url;
        }

        console.log("Target Url : ", sourceUrl);

        let qualityList = []

        for(let i = 0; i < availableQuality.length; i++) {
            let obj = {};
            obj.id = uuid();
            obj.quality = availableQuality[i];

            qualityList.push(obj);
        }

        // console.log("selected quality: ", quality);
        // console.log("available quality: ", availableQuality);
        // console.log("sourceList: ", sourceList);
        // console.log("listOfStreams: ", listOfStreams);


        dispatch(setStreamSource(sourceUrl));
        dispatch(setAvailableQualities(qualityList));
        dispatch(setStreamMetadata({...res, playableStreams: listOfStreams}));
    }

    useEffect(() => {
        handleVideoId()
    }, [videoId])

    return (
        <div className="w-full pt-10 flex justify-center">
            <div className="w-[60%] flex flex-col gap-4">
                <Player videoId={videoId} />
                <div className="">
                    <p className="text-slate-100 text-2xl">{title}</p>
                    {/* <p>{description}</p> */}
                </div>
            </div>
            <div className="w-[400px]">

            </div>
        </div>
    )
}