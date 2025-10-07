function getArtistInfo(artistId) {
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/artist/${artistId}?output=jsonp&callback=handleArtistResponse`;
  document.body.appendChild(script);
}

function handleArtistResponse(data) {
  console.log("🎤 Artista:", data.name);
  console.log("👥 Fans:", data.nb_fan);
  console.log("🖼️ Imagen:", data.picture_medium);
}


