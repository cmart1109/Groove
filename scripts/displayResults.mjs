import { addFavourite, getFavourites, deleteFavourite } from "./favourites/favouriteController.mjs";


export function displayResults(songs) {
    const resultsDiv = document.querySelector(".results");
    if (songs.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    } 
    const favourites = getFavourites();
    songs.forEach(song => {
        let isFavourite = favourites.some(fav => fav.id === song.id);
        console.log(song);
        const songBox = document.createElement("div")
        songBox.classList.add("song");
        songBox.innerHTML = `
        <img src="${song.album.cover_medium}" alt="${song.title} cover">
        <div class="song-info">
        <h4>
        <strong>${song.title}</strong>
        </h4>
        <h5>
        ${song.artist.name}
        </h5>
        <button class="get-lyrics-btn">Get Lyrics</button>
        <button onclick="window.open('${song.link}', '_blank')">Listen on Deezer</button>
        <button class="favourite-btn">
        <img    src="/images/icons/${isFavourite ? "fav2":"fav1"}.png" 
                alt="Add to Favourites" 
                width="20" 
                height="20">
        </button>
        <audio controls src="${song.preview}"></audio>
        </div>
        `;
        resultsDiv.appendChild(songBox)
        const lyricsBtn = songBox.querySelector(".get-lyrics-btn");
        lyricsBtn.addEventListener("click", function() {
            localStorage.setItem("lyricsSongTitle", song.title);
            localStorage.setItem("lyricsArtistName", song.artist.name);
            localStorage.setItem("lyricsAlbumCover", song.album.cover_medium);
            window.location.href = "lyrics.html";
        });
        const favBtn = songBox.querySelector(".favourite-btn");
        const favImg = favBtn.querySelector("img");
        favBtn.addEventListener("click", () => {
            const favourites = getFavourites();
            const currentlyFav = favourites.some(fav => fav.id === song.id);

            if (currentlyFav) {
                deleteFavourite(song);
                favImg.src = "/images/icons/fav1.png";
                console.log("Removed from favourites");
            } else {
                addFavourite(song);
                favImg.src = "/images/icons/fav2.png";
                console.log("Added to favourites");
            }
        })
    });
    }