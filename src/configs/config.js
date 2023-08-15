import instanceList from "../instances.json";

const streamUrls = instanceList.filter((instance) => instance.stream === true);
const dataUrls = instanceList.filter((instance) => instance.data === true);
const feedUrls = instanceList.filter((instance) => instance.feed === true);

const randomInstance = (instances) => {
  const randomIndex = Math.floor(Math.random() * instances.length);
  return instances[randomIndex];
};

export const config = {
  baseUrl: process.env.REACT_APP_PIPED_BASE_URL || randomInstance(instanceList).url,
  feedUrl: "https://pipedapi.kavin.rocks",
};