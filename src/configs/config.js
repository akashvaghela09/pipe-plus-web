const availableInstances = [
  "https://pipedapi.kavin.rocks",
  "https://api-piped.mha.fi",
  "https://piped-api.garudalinux.org",
  "https://pipedapi.aeong.one",
  "https://piped-api.lunar.icu",
  "https://ytapi.dc09.ru",
  "https://pipedapi-libre.kavin.rocks",
  "https://piped-api.privacy.com.de",
  "https://api.piped.projectsegfau.lt/",
  "https://pipedapi.in.projectsegfau.lt/",
  "https://pipedapi.us.projectsegfau.lt/",
  "https://watchapi.whatever.social/",
  "https://pipedapi.smnz.de/",
  "https://pipedapi.adminforge.de/",
  "https://pipedapi.qdi.fi/",
  "https://pipedapi.frontendfriendly.xyz/",
  "https://api.piped.yt/",
  "https://pipedapi.osphost.fi/",
  "https://pipedapi.simpleprivacy.fr/"
]

function randomInstance() {
  const index = Math.floor(Math.random() * availableInstances.length);
  return availableInstances[index];
}

const config = {
  baseUrl: randomInstance(),
};

module.exports = {
  config,
};