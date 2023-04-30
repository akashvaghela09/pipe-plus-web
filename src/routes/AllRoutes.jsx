import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bookmark, Channel, ChannelGroups, Downloads, History, Home, Library, LikedVideos, PageNotFound, Playlist, Settings, Shorts, Subscriptions, Watch, WatchLater } from './';

export const AllRoutes = () => {
    return (
        <div className='bg w-full'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/shorts' element={<Shorts />} />
                <Route path='/subscriptions' element={<Subscriptions />} />
                <Route path='/channel-groups' element={<ChannelGroups />} />
                <Route path='/library' element={<Library />} />
                <Route path='/history' element={<History />} />
                <Route path='/watch' element={<Watch />} />
                <Route path='/watch-later' element={<WatchLater />} />
                <Route path='/downloads' element={<Downloads />} />
                <Route path='/bookmark' element={<Bookmark />} />
                <Route path='/channel' element={<Channel />} />
                <Route path='/playlist' element={<Playlist />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/liked-video' element={<LikedVideos />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}