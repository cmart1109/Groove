export function getLyrics(songTitle, artistName, songAudio) {
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
            const lyricsText = data.lyrics ? data.lyrics : "No lyrics found.";

            lyricsDiv.innerHTML = `
                <div class="lyrics-header">
                    <img src="${albumCover}" alt="Album Cover">
                    <h3>${songTitle}</h3>
                    <h4>by ${artistName}</h4>
                    <audio controls src="${songAudio}"></audio>
                </div>
                <hr>
                <pre>${lyricsText}</pre>
            `;
        })
        .catch(error => {
            let lyricsDiv = document.querySelector('.lyrics');
            if (!lyricsDiv) {
                lyricsDiv = document.createElement('div');
                lyricsDiv.className = 'lyrics';
                document.body.appendChild(lyricsDiv);
            }

            const albumCover = localStorage.getItem('lyricsAlbumCover');

            lyricsDiv.innerHTML = `
                <div class="lyrics-header">
                    <img src="${albumCover}" alt="Album Cover">
                    <h3>${songTitle}</h3>
                    <h4>by ${artistName}</h4>
                    <audio controls src="${songAudio}"></audio>
                </div>
                <hr>
                <pre>Error fetching lyrics.</pre>
            `;
            console.error(error);
        });
}
