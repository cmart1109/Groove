import { displayResults } from "../displayResults.mjs";


function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "__cb" + Math.random().toString(36).substring(2, 10);
    window[callbackName] = (data) => {
      resolve(data);
      delete window[callbackName];
      script.remove();
    };

    const script = document.createElement("script");
    script.src = `${url}${url.includes("?") ? "&" : "?"}output=jsonp&callback=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function searchNewReleaseTracks() {
  try {
    const releases = await jsonp("https://api.deezer.com/editorial/0/releases");
    const trackPromises = releases.data.slice(0, 11).map(async (album) => {
      const albumTracks = await jsonp(`https://api.deezer.com/album/${album.id}/tracks`);
      const firstTrack = albumTracks.data[0];
      if (firstTrack) {
        firstTrack.album = album;
        return firstTrack;
      }
    });
    const tracks = (await Promise.all(trackPromises)).filter(Boolean);
    displayResults(tracks);
  } catch (error) {
    console.error("Error getting releases:", error);
  }
}

searchNewReleaseTracks();
