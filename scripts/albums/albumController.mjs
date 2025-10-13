import { displayAlbumResults } from "../displayAlbumResults.mjs";

export function getAlbumInfo(albumId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/album/${albumId}?output=jsonp&callback=handleAlbumResponse`;
  document.body.appendChild(script);
}

function handleAlbumResponse(albumData) {
  const albumContainer = document.querySelector(".album-container");

  albumContainer.innerHTML = `
    <div class="album-main-info">
      <img src="${albumData.cover_big}" alt="${albumData.title}">
      <h1>${albumData.title}</h1>
      <p>By <a href="artist.html" id="artist-link">${albumData.artist.name}</a></p>
      <p>Release date: ${albumData.release_date}</p>
    </div>
  `;

  
  const artistLink = document.querySelector("#artist-link");
  artistLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("artistIdFromData", albumData.artist.id);
    window.location.href = "artist.html";
  });


  getAlbumTracks(albumData.id);
}

function getAlbumTracks(albumId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/album/${albumId}/tracks?output=jsonp&callback=handleAlbumTracks`;
  document.body.appendChild(script);
}

function handleAlbumTracks(trackData) {
  displayAlbumResults(trackData.data);
}


window.handleAlbumResponse = handleAlbumResponse;
window.handleAlbumTracks = handleAlbumTracks;


const albumId = localStorage.getItem("albumIdFromData");
if (albumId) getAlbumInfo(albumId);
