export const formatNumbers = (views) => {
  // If views are less than 1000, no need to format
  if (views < 1000) {
    return views;
  } else if (views < 1000000) {
    // For views in thousands (1K to 999K)
    return (views / 1000).toFixed(1) + "K";
  } else {
    // For views in millions (1M and above)
    return (views / 1000000).toFixed(1) + "M";
  }
}

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.ceil(seconds % 60);

  let timeString = "";

  if (hours > 0) {
      timeString += hours + ":";
  }

  if (minutes > 0 || hours > 0) {
      timeString += (minutes < 10 && hours > 0 ? "0" : "") + minutes + ":";
  } else {
      timeString += "0:";
  }

  timeString += (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

  return timeString;
}