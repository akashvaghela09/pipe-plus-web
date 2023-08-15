import { config } from "../configs/config";
import axios from "axios";

export const feed = {
    trending: async (region) => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/trending?region=${region}`)
            data = [...res.data];
        } catch (error) {
            console.log("Failed while fetching trending data", error);
        }

        return data;
    },
    
    suggestions: async (query) => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/suggestions?query=${query}`);
            data = [...res?.data];
        } catch (error) {
            console.log("Failed while fetching suggestions", error);
        }

        return data;
    },

    search: async (query, filter = "all") => {
        let data = null;

        try {
            let res = await axios.get(`${config.baseUrl}/search?q=${query}&filter=${filter}`);
            data = { ...res.data };
        } catch (error) {
            console.log("Failed while fetching search data", error);
        }

        return data;
    },

    dummy: async () => {
        let data = null;

        let channelList = [
            "UC4QZ_LsYcvcq7qOsOhpAX4A",
            "UCtZO3K2p8mqFwiKWb9k7fXA",
            "UCH4BNI0-FOK2dMXoFtViWHw",
            "UCsooa4yRKGN_zEE8iknghZA",
            "UCsXVk37bltHxD1rDPwtNM8Q"
        ]

        try {
            let res = await axios.get(`${config.feedUrl}/feed/unauthenticated?channels=${channelList.join(",")}`);
            data = [ ...res.data ];
        } catch (error) {
            console.log("Failed while fetching dummy feed data", error);
        }

        return data;
    },

    userFeed: async (channelList) => {
        let data = null;

        try {
            let res = await axios.get(`${config.feedUrl}/feed/unauthenticated?channels=${channelList.join(",")}`);
            data = [ ...res.data ];
        } catch (error) {
            console.log("Failed while fetching user feed data", error);
        }

        return data;
    }
};

