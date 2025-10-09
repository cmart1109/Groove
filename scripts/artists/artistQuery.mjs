import { displayResults } from "../displayResults.mjs";


export function getArtistInfo(artistId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/artist/${artistId}?output=jsonp&callback=handleArtistResponse`;
  document.body.appendChild(script);
}

function handleArtistResponse(artistData) {
  const artistContainer = document.querySelector(".artist-container");
  artistContainer.innerHTML = `
    <div class="artist-main-info">
      <h1>${artistData.name}</h1>
      <img src="${artistData.picture_big}" alt="${artistData.name}" />
      <p>Albums: <span id="album-count">Cargando...</span></p>
    </div>
    <div class="results"></div>
    <div class="albums"></div>
  `;

  
  getTopSongs(artistData.id);
  getArtistAlbums(artistData.id);
}

function getArtistAlbums(artistId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/artist/${artistId}/albums?output=jsonp&callback=handleAlbumsResponse`;
  document.body.appendChild(script);
}

function handleAlbumsResponse(albumsData) {
  const albumsContainer = document.querySelector(".albums");
  const albumCount = document.querySelector("#album-count");
  albumCount.textContent = albumsData.data.length;

  const albumsHTML = albumsData.data.map(album => `
    <div class="album">
      <img src="${album.cover_medium}" alt="${album.title}">
      <p>${album.title}</p>
    </div>
  `).join("");

  albumsContainer.innerHTML = `<h2>Albums</h2>${albumsHTML}`;
}


function getTopSongs(artistId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/artist/${artistId}/top?limit=5&output=jsonp&callback=handleTopSongs`;
  document.body.appendChild(script);
}

function handleTopSongs(data) {
  const topTracksContainer = document.querySelector(".top-tracks");
  displayResults(data.data, ".top-tracks");
}

window.handleArtistResponse = handleArtistResponse;
window.handleAlbumsResponse = handleAlbumsResponse;
window.handleTopSongs = handleTopSongs;

const artistId = localStorage.getItem("artistIdFromData");
if (artistId) {
  getArtistInfo(artistId);
}
