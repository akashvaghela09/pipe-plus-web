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
            let res = await pipePlus.getTrendingData("IN");
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
        <div className="h-full flex flex-wrap justify-start gap-4 p-10" style={{marginLeft: sidepanelOpen ? "270px": "0px"}}>
            {
                trendingStreams.length > 0 && trendingStreams.map((item) => {
                    return <Link to={item.url} key={item.id}>
                    <VideoCard key={item.title} video={item} />
                    </Link>
                })

            }
        </div>
    )
}