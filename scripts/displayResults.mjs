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
        <div class="song-info">
        <img src="${song.album.cover_small}" alt="${song.title} cover">
        <strong>${song.title}</strong> - ${song.artist.name} <br>
        <button class="get-lyrics-btn">Get Lyrics</button>
        <button onclick="window.open('${song.link}', '_blank')">Listen on Deezer</button>
        </div>
        <audio controls src="${song.preview}"></audio>`;
        resultsDiv.appendChild(songBox)
        const lyricsBtn = songBox.querySelector(".get-lyrics-btn");
        lyricsBtn.addEventListener("click", function() {
            localStorage.setItem("lyricsSongTitle", song.title);
            localStorage.setItem("lyricsArtistName", song.artist.name);
            window.location.href = "lyrics.html";
        })
    });
}

