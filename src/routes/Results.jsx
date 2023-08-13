import { useEffect, useState } from 'react';
import { ButtonWrapper } from '../components/theme/ButtonWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterType } from '../redux/searchbar/actions';
import { ChannelCard, PlaylistCard, SuggestionCard } from '../components';
import { Link } from 'react-router-dom';

export const Results = () => {

    const dispatch = useDispatch();
    const { filterType, searchResults } = useSelector((state) => state.searchbar);
    const { sidepanelOpen } = useSelector((state) => state.app);

    const handleFilterSelect = (type) => {
        dispatch(setFilterType(type));
    }

    useEffect(() => {
        return () => {
            dispatch(setFilterType("all"));
        }
    }, [filterType, searchResults]);

    return (
        <div className='flex flex-col'>
            <div className='w-fit'>
                <div className='flex gap-2 items-center mb-4'>
                    <ButtonWrapper onClick={() => handleFilterSelect("all")} text='All' selected={filterType === "all" ? true : false} />
                    <ButtonWrapper onClick={() => handleFilterSelect("videos")} text='Videos' selected={filterType === "videos" ? true : false} />
                    <ButtonWrapper onClick={() => handleFilterSelect("playlists")} text='Playlists' selected={filterType === "playlists" ? true : false} />
                    <ButtonWrapper onClick={() => handleFilterSelect("channels")} text='Channels' selected={filterType === "channels" ? true : false} />
                    {/* <ButtonWrapper onClick={() => handleFilterSelect("music_songs")} text='YT Music | Songs' selected={filterType === "music_songs" ? true : false}/>
                    <ButtonWrapper onClick={() => handleFilterSelect("music_artists")} text='YT Music | Artists' selected={filterType === "music_artists" ? true : false}/>
                    <ButtonWrapper onClick={() => handleFilterSelect("music_playlists")} text='YT Music | Playlists' selected={filterType === "music_playlists" ? true : false}/>
                    <ButtonWrapper onClick={() => handleFilterSelect("music_albums")} text='YT Music | Albums' selected={filterType === "music_albums" ? true : false}/> */}
                </div>

                <div className='flex flex-col gap-4 w-fit'>
                    {
                        searchResults.length > 0 && searchResults.map((item, index) => {
                            if (item.type === "stream") {
                                return <Link to={item.url}>
                                    <SuggestionCard key={index} video={item} />
                                </Link>
                            } else if (item.type === "channel") {
                                return <Link to={item.url}>
                                    <ChannelCard key={index} video={item} />
                                </Link>
                            } else if (item.type === "playlist") {
                                return <Link to={item.url}>
                                    <PlaylistCard key={index} video={item} />
                                </Link>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}