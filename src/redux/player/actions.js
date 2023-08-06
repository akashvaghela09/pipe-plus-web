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
    SET_COMMENT_DATA,
    SET_PREV_PROGRESS,
    SET_STREAM_UUID,
} from './actionTypes';

export const setAudioPlayer = (payload) => {
    return {
        type: SET_AUDIO_PLAYER,
        payload
    }
}

export const setVideoPlayer = (payload) => {
    return {
        type: SET_VIDE_PLAYER,
        payload
    }
}

export const setPlayStatus = (payload) => {
    return {
        type: SET_PLAY_STATUS,
        payload
    }
}

export const setFullScreenStatus = (payload) => {
    return {
        type: SET_FULL_SCREEN_STATUS,
        payload
    }
}

export const setPlaybackRate = (payload) => {
    return {
        type: SET_PLAYBACK_RATE,
        payload
    }
}

export const setPlayerVolume = (payload) => {
    return {
        type: SET_VOLUME,
        payload
    }
}

export const setStreamValues = (payload) => {
    return {
        type: SET_STREAM_VALUES,
        payload
    }
}

export const setStreamMetadata = (payload) => {
    return {
        type: SET_STREAM_METADATA,
        payload
    }
}

export const setStreamQuality = (payload) => {
    return {
        type: SET_STREAM_QUALITY,
        payload
    }
}

export const setAvailableQualities = (payload) => {
    return {
        type: SET_AVAILABLE_QUALITIES,
        payload
    }
}

export const setStreamSource = (payload) => {
    return {
        type: SET_STREAM_SOURCE,
        payload
    }
}

export const setQualityUpdateStatus = (payload) => {
    return {
        type: SET_QUALITY_UPDATE_STATUS,
        payload
    }
}

export const setStreamPlayed = (payload) => {
    return {
        type: SET_STREAM_PLAYED,
        payload
    }
}

export const setCommentData = (payload) => {
    return {
        type: SET_COMMENT_DATA,
        payload
    }
}

export const setPrevProgress = (payload) => {
    return {
        type: SET_PREV_PROGRESS,
        payload
    }
}

export const setStreamUUID = (payload) => {
    return {
        type: SET_STREAM_UUID,
        payload
    }
}