rebuild();

function rebuild() {
    $.get("http://localhost:3299/eazy-games/getCatalog", function (data) {
        let map = new Map();
        if (localStorage.getItem("basket") !== null) {
            map = new Map(JSON.parse(localStorage.getItem("basket")));
        }
        document.getElementById("main-page-basket").innerHTML = '';
        let summa = 0;
        for (let item in Object.keys(data)) {
            if (map.has("btn" + data[item].image)) {
                let basketItem = document.createElement('div');
                basketItem.className = "main-page-basket__item";
                let basketImage = document.createElement('div');
                basketImage.className = "main-page-basket__item__image";
                let linkImage = document.createElement('a');
                linkImage.href = "/eazy-games/game?name=" + data[item].name;
                let image = document.createElement('img');
                image.src = "../static/image/catalog/hor" + data[item].image + ".png";
                let title = document.createElement('div');
                title.className = "main-page-basket__item__title";
                let linkTitle = document.createElement('a');
                linkTitle.textContent = data[item].name;
                linkTitle.href = "/eazy-games/game?name=" + data[item].name;
                let price = document.createElement('div');
                price.textContent = (data[item].price).toFixed(2);
                let sum = document.createElement('div');
                sum.className = "main-page-basket__item__sum";
                let total = document.createElement('div');
                total.className = "main-page-basket__item__sum__total";
                total.textContent = (data[item].price * map.get("btn" + data[item].image)).toFixed(2) + " руб";
                summa += data[item].price * map.get("btn" + data[item].image);
                let buttons = document.createElement('div');
                buttons.className = "main-page-basket__item__sum__buttons";
                let minus = document.createElement('div');
                minus.className = "main-page-basket__item__sum__buttons__button";
                minus.textContent = '-';
                minus.id = "btn" + data[item].image;
                minus.onclick = function () {
                    itemMinus(this.id);
                }
                let number = document.createElement('div');
                number.className = "main-page-basket__item__sum__buttons__button";
                number.textContent = map.get("btn" + data[item].image);
                let plus = document.createElement('div');
                plus.className = "main-page-basket__item__sum__buttons__button";
                plus.textContent = '+';
                plus.id = "btn" + data[item].image;
                plus.onclick = function () {
                    itemPlus(this.id);
                }
                let del = document.createElement('div');
                del.className = "main-page-basket__item__sum__delete";
                del.textContent = "Удалить"
                del.id = "btn" + data[item].image;
                del.onclick = function () {
                    itemDelete(this.id);
                }
                linkImage.append(image);
                basketImage.append(linkImage);
                title.append(linkTitle, price);
                buttons.append(minus, number, plus);
                sum.append(total, buttons, del);
                basketItem.append(basketImage, title, sum);
                document.getElementById("main-page-basket").append(basketItem);
            }
        }
        let total = document.createElement('div');
        total.className = "main-page-basket__total";
        total.id = "main-page-basket__total";
        total.textContent = "Итого: " + summa.toFixed(2) + " руб";
        document.getElementById("main-page-basket").append(total);
        if (map.size === 0) {
            document.getElementById("main-page__btn_basket").remove();
            total.textContent = "Корзина пуста";
        } else {
            document.getElementById("main-page__btn_basket").onclick = function (){
                new Toast({
                    title: "Ошибка операции",
                    text: 'Данная операция временно недоступна.',
                    theme: 'info',
                    autohide: true,
                    interval: 3000
                });
            }
        }
    })
}

function itemMinus(id) {
    let map = new Map();
    if (localStorage.getItem("basket") !== null) {
        map = new Map(JSON.parse(localStorage.getItem("basket")));
    }
    if (map.get(id) === 1) {
        itemDelete(id);
    } else {
        map.set(id, map.get(id) - 1);
        localStorage.setItem("basket", JSON.stringify(Array.from(map)));
        rebuild();
    }
}

function itemPlus(id) {
    let map = new Map();
    if (localStorage.getItem("basket") !== null) {
        map = new Map(JSON.parse(localStorage.getItem("basket")));
    }
    map.set(id, map.get(id) + 1);
    localStorage.setItem("basket", JSON.stringify(Array.from(map)));
    rebuild();
}

function itemDelete(id) {
    let map = new Map();
    if (localStorage.getItem("basket") !== null) {
        map = new Map(JSON.parse(localStorage.getItem("basket")));
    }
    map.delete(id);
    localStorage.setItem("basket", JSON.stringify(Array.from(map)));
    editBadge();
    rebuild();
}