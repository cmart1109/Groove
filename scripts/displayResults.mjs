export function displayResults(songs) {
    const resultsDiv = document.querySelector(".results");
    if (songs.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    } 
    console.log(songs);
    songs.forEach(song => {
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
        })
    });
}

