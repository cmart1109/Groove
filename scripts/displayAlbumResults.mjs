import { addFavourite, getFavourites, deleteFavourite } from "./favourites/favouriteController.mjs";

export function displayAlbumResults(songs) {
    const resultsDiv = document.querySelector(".results");
    if (songs.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    }

    const favourites = getFavourites();
    songs.forEach(song => {
        let isFavourite = favourites.some(fav => fav.id === song.id);
        console.log(song);

        const songBox = document.createElement("div");
        songBox.classList.add("song");

        songBox.innerHTML = `
        <div class="song-info">
            <div class="song-name">
                <h4><strong>${song.title}</strong></h4>
                <a href="artist.html" class="artist-link">
                    ${song.artist.name}
                </a>
            </div>
            <div class="song-buttons">
                <button class="get-lyrics-btn">
                    <img src="images/icons/lyric.png" width="20" height="20" alt="lyrics button"></img>
                </button>
                <button onclick="window.open('${song.link}', '_blank')">
                    <img src="images/icons/deezer.png" width="20" height="20" alt="deezer button"></img>
                </button>
                <button class="favourite-btn">
                    <img src="images/icons/${isFavourite ? "fav2" : "fav1"}.png" 
                         alt="Add to Favourites" 
                         width="20" 
                         height="20">
                </button>
            </div>
        </div>
        `;

        resultsDiv.appendChild(songBox);

        
        const artistLink = songBox.querySelector(".artist-link");
        artistLink.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.setItem("artistIdFromData", song.artist.id);
            window.location.href = "artist.html";
        });

    
        const lyricsBtn = songBox.querySelector(".get-lyrics-btn");
        lyricsBtn.addEventListener("click", function () {
            const trackId = song.id;
            const callbackName = `deezerCallback_${trackId}`;

            window[callbackName] = function (data) {
                if (data && data.preview) {
                    localStorage.setItem("lyricsSongTitle", data.title);
                    localStorage.setItem("lyricsArtistName", data.artist.name);
                    localStorage.setItem("lyricsAlbumCover", data.album.cover_medium);
                    localStorage.setItem("lyricsAudio", data.preview);
                } else {
                    localStorage.setItem("lyricsSongTitle", song.title);
                    localStorage.setItem("lyricsArtistName", song.artist.name);
                    localStorage.setItem("lyricsAlbumCover", song.album?.cover_medium || "");
                    localStorage.setItem("lyricsAudio", "");
                }

                delete window[callbackName];
                document.body.removeChild(script);
                window.location.href = "lyrics.html";
            };

            const script = document.createElement("script");
            script.src = `https://api.deezer.com/track/${trackId}?output=jsonp&callback=${callbackName}`;
            document.body.appendChild(script);
        });

        
        const favBtn = songBox.querySelector(".favourite-btn");
        const favImg = favBtn.querySelector("img");
        favBtn.addEventListener("click", () => {
            const favourites = getFavourites();
            const currentlyFav = favourites.some(fav => fav.id === song.id);

            if (currentlyFav) {
                deleteFavourite(song);
                favImg.src = "images/icons/fav1.png";
                console.log("Removed from favourites");
            } else {
                const trackId = song.id;
                const callbackName = `deezerFavCallback_${trackId}`;

                window[callbackName] = function (data) {
                    if (data && data.id) {
                        addFavourite(data);
                        favImg.src = "images/icons/fav2.png";
                        console.log("Added to favourites:", data.title);
                    } else {
                        console.warn("No se pudo obtener info completa de la canción.");
                    }

                    delete window[callbackName];
                    document.body.removeChild(script);
                };

                const script = document.createElement("script");
                script.src = `https://api.deezer.com/track/${trackId}?output=jsonp&callback=${callbackName}`;
                document.body.appendChild(script);
            }
        });
    });
}
