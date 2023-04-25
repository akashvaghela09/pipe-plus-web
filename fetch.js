const fs = require('fs')
const axios = require('axios');
const fetchStreamData = async (streamId) => {

    let data = null;

    try { 
        let res = await axios.get(`https://pipedapi.kavin.rocks/streams/${streamId}`);

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
}

const saveStreamDataInJson = async  (streamId) => {

    let data = await fetchStreamData(streamId);
    let videoStreams = data.videoStreams;
    let testdata = { "videoStreams": {}};

    videoStreams.forEach((stream) => {
        if(stream.videoOnly === false && stream.mimeType === "video/mp4") {

            testdata.videoStreams[stream.quality] = stream;
        }
    });

    testdata.thumbnailUrl = data.thumbnailUrl;

    fs.writeFile('./src/data.json', JSON.stringify(testdata), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

saveStreamDataInJson("ElZfdU54Cp8");