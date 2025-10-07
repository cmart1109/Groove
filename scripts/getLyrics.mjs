export function getLyrics(songTitle, artistName) {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(response => response.json())
        .then(data => {
            let lyricsDiv = document.querySelector('.lyrics');
            if (!lyricsDiv) {
                lyricsDiv = document.createElement('div');
                lyricsDiv.className = 'lyrics';
                document.body.appendChild(lyricsDiv);
            }
            const albumCover = localStorage.getItem('lyricsAlbumCover');
            if (data.lyrics) {
                lyricsDiv.innerHTML = `
                <div class="lyrics-header">
                    <img src=${albumCover} alt="Album Cover">
                    <h3>${songTitle}</h3>
                    <h4>by ${artistName}</h4>
                </div>
                <hr>
                    <pre>${data.lyrics}</pre>
                `;
            } else {
                lyricsDiv.innerHTML = `<p>Lyrics not found.</p>`;
            }
        })
        .catch(error => {
            let lyricsDiv = document.querySelector('.lyrics');
            if (!lyricsDiv) {
                lyricsDiv = document.createElement('div');
                lyricsDiv.className = 'lyrics';
                document.body.appendChild(lyricsDiv);
            }
            lyricsDiv.innerHTML = `<p>Error fetching lyrics.</p>`;
            console.error(error);
        });
}