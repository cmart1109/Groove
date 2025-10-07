function getFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    return favourites;
}

function addFavourite(song) {
    const favourites = getFavourites();
    const alreadyExists = favourites.some(fav => fav.id === song.id);
    if (alreadyExists) return { success: false, message: "Song already in favourites" };
    favourites.push(song);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    return { success: true, message: "Song added to favourites" };
}

function deleteFavourite(song) {
    const favourites = getFavourites();
    const updatedFavourites = favourites.filter(fav => fav.id !== song.id);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    return { success: true, message: "Song removed from favourites" };
}

function displayFavourites() {
    const favourites = getFavourites();
    const favouritesDiv = document.querySelector(".favourites-container");
    favouritesDiv.innerHTML = "";
    if (favourites.length === 0) {
        favouritesDiv.innerHTML = "<p>No favourites added</p>";
        return;
    }

    favourites.forEach(song => {
        const songLink = document.createElement("a");
        songLink.classList.add("get-lyrics-btn");
        songLink.addEventListener("click", function() {
            localStorage.setItem("lyricsSongTitle", song.title);
            localStorage.setItem("lyricsArtistName", song.artist.name);
            localStorage.setItem("lyricsAlbumCover", song.album.cover_medium);
            window.location.href = "lyrics.html";
        });
        const songBox = document.createElement("div")
        const songName = document.createElement("h4");
        const artistName = document.createElement("h5");
        const albumCover = document.createElement("img");
        const removeBtn = document.createElement("button");

        songBox.classList.add("fav-item");
        songName.textContent = song.title;
        artistName.textContent = song.artist.name;
        albumCover.src = song.album.cover_small;
        albumCover.alt = `${song.title} cover`;
        removeBtn.innerHTML = `
        <img src="/images/icons/borrar.png" alt="Remove from Favourites" width="15" height="15">`
        removeBtn.addEventListener("click", function() {
            deleteFavourite(song);
            displayFavourites();
        });
        songBox.appendChild(albumCover);
        songBox.appendChild(songName);
        songBox.appendChild(artistName);
        songBox.appendChild(removeBtn);
        songLink.appendChild(songBox);
        favouritesDiv.appendChild(songBox);
})
}

export { getFavourites, addFavourite, deleteFavourite, displayFavourites };