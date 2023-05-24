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
