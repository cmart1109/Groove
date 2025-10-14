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

async function searchMostStreamed() {
  try {
    const data = await jsonp("https://api.deezer.com/chart/0/tracks");

    const topTracks = data.data.slice(0, 30);


    displayResults(topTracks);
  } catch (error) {
    console.error("Error getting Streamed songs:", error);
  }
}

searchMostStreamed();
