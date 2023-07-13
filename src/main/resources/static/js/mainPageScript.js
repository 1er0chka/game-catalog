$.get("http://localhost:3299/eazy-games/getLeader", function (data) {
    createItems(data);
})

$.get("http://localhost:3299/eazy-games/getMainNew", function (data) {
    let array = [];
    if (localStorage.getItem("favorites") !== null) {
        array = JSON.parse(localStorage.getItem("favorites"));
    }
    for (let item in Object.keys(data)) {
        let catalogItem = document.createElement('div');
        catalogItem.className = "main-page-catalog__4item";
        let btnFav = document.createElement('button');
        btnFav.id = "fav" + data[item].image;
        btnFav.onclick = function () {
            editFavorite4(this.id)
        };
        if (array.includes(btnFav.id)) {
            btnFav.className = "main-page-catalog__4item__btn_favorite";
        } else {
            btnFav.className = "main-page-catalog__4item__btn_not_favorite";
        }
        let linkImage = document.createElement('a');
        linkImage.href = "/eazy-games/game?name=" + data[item].name;
        let image = document.createElement('img');
        image.className = "main-page-catalog__item__img";
        image.src = "../static/image/catalog/ver" + data[item].image + ".png";
        let linkTitle = document.createElement('a');
        linkTitle.href = "/eazy-games/game?name=" + data[item].name;
        linkTitle.className = "main-page-catalog__item__title";
        let title = document.createElement('div');
        title.textContent = data[item].name;
        let linkSubtitle = document.createElement('a');
        linkSubtitle.href = "/eazy-games/game?name=" + data[item].name;
        linkSubtitle.className = "main-page-catalog__item__subtitle";
        linkSubtitle.textContent = data[item].description;
        let btnBasket = document.createElement('button');
        btnBasket.className = "main-page-catalog__4item__btn_basket";
        btnBasket.textContent = "В корзину за " + (data[item].price).toFixed(2);
        btnBasket.id = "btn" + data[item].image;
        btnBasket.onclick = function (){
            addToBasket(this.id);
        }
        linkImage.append(image)
        linkTitle.append(title);
        catalogItem.append(btnFav, linkImage,linkTitle, linkSubtitle, btnBasket);
        document.getElementById("main-page-new").append(catalogItem);
    }
})

function editFavorite4(id) {
    let array = [];
    if (localStorage.getItem("favorites") !== null) {
        array = JSON.parse(localStorage.getItem("favorites"));
    }
    if (array.includes(id)) {
        // убрать из избранного
        array.splice(array.indexOf(id), 1);
        document.getElementById(id).classList.remove("main-page-catalog__4item__btn_favorite");
        document.getElementById(id).classList.add("main-page-catalog__4item__btn_not_favorite");

    } else {
        // добавить в избранное
        array.push(id);
        document.getElementById(id).classList.remove("main-page-catalog__4item__btn_not_favorite");
        document.getElementById(id).classList.add("main-page-catalog__4item__btn_favorite");
    }
    console.log(array)
    localStorage.setItem("favorites", JSON.stringify(array));
}