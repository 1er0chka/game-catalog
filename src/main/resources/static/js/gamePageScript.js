$.get("http://localhost:3299/eazy-games/getCatalog", function (data) {
    for (let item in Object.keys(data)) {
        if (data[item].name === document.getElementById("main-page-game__text__name__lbl").textContent) {
            let array = [];
            if (localStorage.getItem("favorites") !== null) {
                array = JSON.parse(localStorage.getItem("favorites"));
            }
            if (array.includes("fav" + data[item].image)) {
                document.getElementById("main-page-game__image__btn_favorite").className = "main-page-game__image__btn_favorite";
                document.getElementById("main-page-game__image__btn_favorite").textContent = "В избранном";
            } else {
                document.getElementById("main-page-game__image__btn_favorite").className = "main-page-game__image__btn_not_favorite";
                document.getElementById("main-page-game__image__btn_favorite").textContent = "Добавить в избранное";
            }
            document.getElementById("main-page-game__image__btn_favorite").onclick = function () {
                editFavoriteGame("fav" + data[item].image);
            };
            let category = "";
            for (let i = 0; i < data[item].categories.length; i++) {
                category += data[item].categories[i] + " ";
                console.log(category)
            }
            document.getElementById("main-page-game__text__categories").textContent = category;
            document.getElementById("main-page-game__text__date").textContent = formatDate(data[item].date);
            document.getElementById("main-page-game__text__developer").textContent = data[item].developer;
            document.getElementById("main-page-game__text__age").textContent = data[item].age + "+";
            document.getElementById("main-page-game__text__description").textContent = data[item].description;
            document.getElementById("main-page-game__image__img").src = "../static/image/catalog/ver" + data[item].image + ".png";
            document.getElementById("main-page__main_screenshot__image").src = "../static/image/catalog/" + data[item].image + "-1.png";
            document.getElementById("main-page-game__image__btn_basket").textContent = "В корзину за " + (data[item].price).toFixed(2);
            document.getElementById("main-page-game__image__btn_basket").id = "btn" + data[item].image;
            document.getElementById("btn" + data[item].image).onclick = function () {
                addToBasket("btn" + data[item].image);
            }
            document.getElementById("main-page-screenshots__screenshot__0").src = "../static/image/catalog/" + data[item].image + "-1.png";
            document.getElementById("main-page-screenshots__screenshot__0").onclick = function () {
                document.getElementById("main-page__main_screenshot__image").src = document.getElementById("main-page-screenshots__screenshot__0").src;
            }
            document.getElementById("main-page-screenshots__screenshot__1").src = "../static/image/catalog/" + data[item].image + "-2.png";
            document.getElementById("main-page-screenshots__screenshot__1").onclick = function () {
                document.getElementById("main-page__main_screenshot__image").src = document.getElementById("main-page-screenshots__screenshot__1").src;
            }
            document.getElementById("main-page-screenshots__screenshot__2").src = "../static/image/catalog/" + data[item].image + "-3.png";
            document.getElementById("main-page-screenshots__screenshot__2").onclick = function () {
                document.getElementById("main-page__main_screenshot__image").src = document.getElementById("main-page-screenshots__screenshot__2").src;
            }
            document.getElementById("main-page-screenshots__screenshot__3").src = "../static/image/catalog/" + data[item].image + "-4.png";
            document.getElementById("main-page-screenshots__screenshot__3").onclick = function () {
                document.getElementById("main-page__main_screenshot__image").src = document.getElementById("main-page-screenshots__screenshot__3").src;
            }
        }
    }
})

function editFavoriteGame(id) {
    let array = [];
    if (localStorage.getItem("favorites") !== null) {
        array = JSON.parse(localStorage.getItem("favorites"));
    }
    if (array.includes(id)) {
        // убрать из избранного
        array.splice(array.indexOf(id), 1);
        document.getElementById("main-page-game__image__btn_favorite").className = "main-page-game__image__btn_not_favorite";
        document.getElementById("main-page-game__image__btn_favorite").textContent = "Добавить в избранное";
    } else {
        // добавить в избранное
        array.push(id);
        document.getElementById("main-page-game__image__btn_favorite").className = "main-page-game__image__btn_favorite";
        document.getElementById("main-page-game__image__btn_favorite").textContent = "В избранном";
    }
    console.log(array)
    localStorage.setItem("favorites", JSON.stringify(array));
}

function formatDate(dateString) {
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
