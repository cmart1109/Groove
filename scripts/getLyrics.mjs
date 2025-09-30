export function getLyrics(songTitle, artistName) {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(response => response.json())
        .then(data => {
            // Create or select a lyrics container
            let lyricsDiv = document.querySelector('.lyrics');
            if (!lyricsDiv) {
                lyricsDiv = document.createElement('div');
                lyricsDiv.className = 'lyrics';
                document.body.appendChild(lyricsDiv);
            }
            // Display lyrics or error message
            lyricsDiv.innerHTML = data.lyrics
                ? `<h3>Lyrics for "${songTitle}" by ${artistName}:</h3><pre>${data.lyrics}</pre>`
                : `<p>Lyrics not found.</p>`;
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