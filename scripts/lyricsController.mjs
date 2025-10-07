import { getLyrics } from "./getLyrics.mjs";

const songTitle = localStorage.getItem("lyricsSongTitle");
const artistName = localStorage.getItem("lyricsArtistName");

if (songTitle && artistName) {
    getLyrics(songTitle, artistName);
}
