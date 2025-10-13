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
  const artistContainer = document.querySelector(".artist-container");
  const albumCount = document.querySelector("#album-count");
  albumCount.textContent = albumsData.data.length;

  const albumsWrapper = document.createElement("div");
  albumsWrapper.classList.add("albums");
  albumsWrapper.innerHTML = `<h1>Albums</h1>`;

  albumsData.data.forEach(album => {
    const albumDiv = document.createElement("div");
    albumDiv.classList.add("album");
    albumDiv.innerHTML = `
      <img src="${album.cover_medium}" alt="${album.title}">
      <p>${album.title}</p>
    `;

    albumDiv.addEventListener("click", () => {
      localStorage.setItem("albumIdFromData", album.id);
      window.location.href = "album.html";
    });

    albumsWrapper.appendChild(albumDiv);
  });

  artistContainer.appendChild(albumsWrapper);
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
