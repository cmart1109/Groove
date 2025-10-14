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

async function loadDeveloperPlaylist() {
  try {

    const playlistId = "14425391341";


    const playlistData = await jsonp(`https://api.deezer.com/playlist/${playlistId}`);


    const tracks = playlistData.tracks.data;


    displayResults(tracks);
  } catch (error) {
    console.error("Error cargando la playlist:", error);
  }
}

loadDeveloperPlaylist();
