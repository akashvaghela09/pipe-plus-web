import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bookmark, Channel, ChannelGroups, Downloads, History, Home, Library, LikedVideos, PageNotFound, Playlist, Results, Settings, Shorts, Subscriptions, Watch, WatchLater } from './';

export const AllRoutes = () => {
    return (
        <div className='w-full flex justify-center'>
            <Routes>
                {/* Primary Pages */}
                <Route path='/' element={<Home />} />
                <Route path='/shorts' element={<Shorts />} />
                <Route path='/subscriptions' element={<Subscriptions />} />
                <Route path='/channel-groups' element={<ChannelGroups />} />
                
                {/* Secondary Pages */}
                <Route path='/library' element={<Library />} />
                <Route path='/history' element={<History />} />
                <Route path='/watch-later' element={<WatchLater />} />
                <Route path='/bookmark' element={<Bookmark />} />
                <Route path='/downloads' element={<Downloads />} />

                {/* Utility Pages */}
                <Route path='/watch' element={<Watch />} />
                <Route path='/channel' element={<Channel />} />
                <Route path='/playlist' element={<Playlist />} />
                <Route path='/results' element={<Results />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/liked-video' element={<LikedVideos />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}