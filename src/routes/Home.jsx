import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pipePlus } from "../apis";
import { VideoCard } from "../components";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export const Home = () => {
    const dispatch = useDispatch()
    const { sidepanelOpen } = useSelector((state) => state.app);
    const { authStatus } = useSelector((state) => state.auth);
    const [trendingStreams, setTrendingStreams] = useState([]);

    const fetchTrendingStreams = async () => {
        try {
            let res = await pipePlus.feed.trending("IN");
            res.forEach((item) => {
                item.id = uuid();
            });

            setTrendingStreams(res);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        fetchTrendingStreams()
    }, [])

    return (
        <div className="h-full w-full flex">
            {
                sidepanelOpen && <div className="w-[300px] hidden sm:border-spacing-0 md:flex" />
            }
            <div className="w-full h-full grid grid-cols-1 p-4 gap-5 home_page">
                {
                    trendingStreams.length > 0 && trendingStreams.map((item) => {
                        return <Link to={item.url} key={item.id}>
                            <VideoCard key={item.title} video={item} />
                        </Link>
                    })

                }
            </div>
        </div>
    )
}