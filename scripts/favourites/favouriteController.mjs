import { displayResults } from "../displayResults.mjs";

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
    console.log(favourites)
    const favouritesDiv = document.querySelector(".favourites-container");
    favouritesDiv.innerHTML = "";
    if (favourites.length === 0) {
        favouritesDiv.innerHTML = "<p>No favourites added</p>";
        return;
    }
    displayResults(favourites)
}
export { getFavourites, addFavourite, deleteFavourite, displayFavourites };