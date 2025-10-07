import { displayResults } from './displayResults.mjs';

function seachSongs() {    
    const query = localStorage.getItem('searchQuery');
    if (query) {
        window.handleDeezerResponse = function(data) {
            const songs = data.data;
            displayResults(songs);
        };
        
        const script = document.createElement("script");
        script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=handleDeezerResponse`;
        document.body.appendChild(script);
    }
}


seachSongs();
export { seachSongs };
