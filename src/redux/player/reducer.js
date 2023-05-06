import {
    SET_PLAYER,
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS,
    SET_PLAYBACK_RATE,
    SET_VOLUME,
    SET_STREAM_VALUES,
    SET_STREAM_METADATA,
    SET_STREAM_QUALITY,
    SET_AVAILABLE_QUALITIES,
    SET_STREAM_SOURCE
} from './actionTypes';

const initialState = {
    player: null,
    isPlaying: false,
    isFullScreen: false,
    playbackRate: 1,
    volume: 0.5,
    streamValues: {
        duration: 0,
        buffered: 0,
        played: 0,
        seek: 0,
    },
    streamMetadata: {
        audioStreams: [],
        category: "",
        chapters: [],
        description: "",
        dislikes: 0,
        duration: 0,
        likes: 0,
        livestream: false,
        previewFrames: [],
        playableStreams: {},
        relatedStreams: [],
        subtitles: [],
        thumbnailUrl: "",
        title: "",
        uploadDate: "",
        uploader: "",
        uploaderAvatar: "",
        uploaderSubscriberCount: 0,
        uploaderUrl: "",
        videoStreams: [],
        views: 0
    },
    quality: "360p",
    availableQualities: [],
    sourceUrl: ""
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_PLAYER:
            return {
                ...state,
                player: payload
            }
        case SET_PLAY_STATUS:
            return {
                ...state,
                isPlaying: payload
            }
        case SET_FULL_SCREEN_STATUS:
            return {
                ...state,
                isFullScreen: payload
            }
        case SET_PLAYBACK_RATE:
            return {
                ...state,
                playbackRate: payload
            }
        case SET_VOLUME:
            return {
                ...state,
                volume: payload
            }
        case SET_STREAM_VALUES:
            return {
                ...state,
                streamValues: payload
            }
        case SET_STREAM_METADATA:
            // console.log("payload: ", payload)        
            return {
                ...state,
                streamMetadata: payload
            }
        case SET_STREAM_QUALITY:
            return {
                ...state,
                quality: payload
            }
        case SET_AVAILABLE_QUALITIES:
            return {
                ...state,
                availableQualities: [...payload]
            }
        case SET_STREAM_SOURCE:
            return {
                ...state,
                sourceUrl: payload
            }
        default:
            return state
    }
}

export { reducer }