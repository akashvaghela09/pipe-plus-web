import {
    SET_AUDIO_PLAYER,
    SET_VIDE_PLAYER,
    SET_PLAY_STATUS,
    SET_FULL_SCREEN_STATUS,
    SET_PLAYBACK_RATE,
    SET_VOLUME,
    SET_STREAM_VALUES,
    SET_STREAM_METADATA,
    SET_STREAM_QUALITY,
    SET_AVAILABLE_QUALITIES,
    SET_STREAM_SOURCE,
    SET_QUALITY_UPDATE_STATUS,
    SET_STREAM_PLAYED,
} from './actionTypes';

const initialState = {
    audioPlayer: null,
    videoPlayer: null,
    isPlaying: false,
    isFullScreen: false,
    playbackRate: 1,
    volume: 1,
    streamValues: {
        seek: 0,
        duration: 0,
        loaded: 0,
        loadedSeconds: 0,
        played: 0,
        playedSeconds: 0
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
    selectedQuality: "360p",
    availableQualities: [],
    streamSource: {},
    trackUrl: "",
    qualityUpdateStatus: false,
    streamPlayed: 0
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_AUDIO_PLAYER:
            return {
                ...state,
                audioPlayer: payload
            }
        case SET_VIDE_PLAYER:
            return {
                ...state,
                videoPlayer: payload
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
            return {
                ...state,
                streamMetadata: payload
            }
        case SET_STREAM_QUALITY:
            return {
                ...state,
                selectedQuality: payload
            }
        case SET_AVAILABLE_QUALITIES:
            return {
                ...state,
                availableQualities: [...payload]
            }
        case SET_STREAM_SOURCE:
            return {
                ...state,
                streamSource: payload
            }
        case SET_QUALITY_UPDATE_STATUS:
            return {
                ...state,
                qualityUpdateStatus: payload
            }
        case SET_STREAM_PLAYED:
            return {
                ...state,
                streamPlayed: payload
            }
        default:
            return state
    }
}

export { reducer }