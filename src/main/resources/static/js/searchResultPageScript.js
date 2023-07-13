$.get("http://localhost:3299/eazy-games/getSearchResult?request="+document.getElementById("main-page__title__request").textContent, function (data) {
    createItems(data);
})