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
};

