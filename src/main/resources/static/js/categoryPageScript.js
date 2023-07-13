$.get("http://localhost:3299/eazy-games/getCategory?category="+document.getElementById("main-page__title__category").textContent, function (data) {
    createItems(data);
})