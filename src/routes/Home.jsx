import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pipePlus } from "../apis"
import { VideoCard } from "../components"
export const Home = () => {
    const dispatch = useDispatch()
    const [trendingStreams, setTrendingStreams] = useState([]);

    const fetchTrendingStreams = async () => {

        try {
            let res = await pipePlus.getTrendingData("IN");
            setTrendingStreams(res);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        fetchTrendingStreams()
    }, [])

    return (
        <div className="h-full flex flex-wrap justify-start gap-4">
            {
                trendingStreams.length > 0 && trendingStreams.map((item) => {
                    return <VideoCard key={item.title} video={item} />
                })

            }
        </div>
    )
}