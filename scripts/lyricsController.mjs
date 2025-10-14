import { getLyrics } from "./getLyrics.mjs";

const songTitle = localStorage.getItem("lyricsSongTitle");
const artistName = localStorage.getItem("lyricsArtistName");
const songAudio = localStorage.getItem("lyricsAudio")

if (songTitle && artistName) {
    getLyrics(songTitle, artistName, songAudio);
}
