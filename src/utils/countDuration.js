export const countDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = "";

    if (hours > 0) {
        timeString += hours + ":";
    }

    if (minutes > 0 || hours > 0) {
        timeString += (minutes < 10 && hours > 0 ? "0" : "") + minutes + ":";
    }

    timeString += (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    return timeString;
}