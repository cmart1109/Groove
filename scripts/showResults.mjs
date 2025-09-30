const query = localStorage.getItem('searchQuery')
if (query) {
    fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)})`)
        
}

function displayResults(songs) {
    const resultsDiv = document.querySelector(".results");
    if (songs.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    } 
    songs.forEach(song => {
        const songBox = document.createElement("div")
        songBox.classList.add("song");
        songBox.innerHTML = `
        <strong>${song.title}</strong> - ${song.artist.name} <br>
        <audio controls src="${song.preview}"></audio>`;
        resultsDiv.appendChild(songBox)
    });
}