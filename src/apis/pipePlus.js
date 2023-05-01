import { config } from "../configs/config";
import axios from "axios";

export const pipePlus = {
    getStreamData: async (streamId) => {

        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/streams/${streamId}`);

            let resourceList = [];

            let {
                description,
                dislikes,
                likes,
                audioStreams,
                relatedStreams,
                thumbnailUrl,
                title,
                uploadDate,
                uploader,
                uploaderAvatar,
                uploaderSubscriberCount,
                uploaderUrl,
                videoStreams,
                views
            } = res.data;

            // Sort audioStreams based on bitrate/quality
            audioStreams.sort((a, b) => {
                return b.bitrate - a.bitrate;
            });

            // Extract required data from videoStreams
            videoStreams.forEach((stream) => {
                let tempObj = {
                    url: stream.url,
                    track: audioStreams[0].url,
                    mimeType: stream.mimeType,
                    quality: stream.quality,
                    videoOnly: stream.videoOnly,
                    height: stream.height,
                    width: stream.width,
                }

                resourceList.push(tempObj);
            });

            data = {
                description,
                dislikes,
                likes,
                audioStreams,
                relatedStreams,
                thumbnailUrl,
                title,
                uploadDate,
                uploader,
                uploaderAvatar,
                uploaderSubscriberCount,
                uploaderUrl,
                videoStreams: [...resourceList],
                views
            };

            return data;

        } catch (error) {
            console.log("Failed to get stream data", error);
        }
        return data;
    },

    getTrendingData: async (region) => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/trending?region=${region}`)
            data = [...res.data];
        } catch (error) {
            console.log("Failed while fetching trending data", error);
        }

        return data;
    },

    getSuggestions: async (query) => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/suggestions?query=${query}`);
            data = [...res.data];
        } catch (error) {
            console.log("Failed while fetching suggestions", error);
        }

        return data;
    },

    getSearchData: async (query, filter = "all") => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/search?q=${query}&filter=${filter}`);
            data = { ...res.data };
        } catch (error) {
            console.log("Failed while fetching search data", error);
        }

        return data;
    },
};