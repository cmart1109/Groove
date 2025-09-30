const form = document.querySelector('.search-form')

function saveSearchURL(params) {
   const query = params.get("searchQuery");
   if (query) {
       localStorage.setItem("searchQuery", query);
   }
}

form.addEventListener("submit", async function() {
    saveSearchURL(new URLSearchParams(new FormData(this)))
    })