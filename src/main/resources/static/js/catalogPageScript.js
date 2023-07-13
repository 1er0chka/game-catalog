let sort = "new";
let minPrice = 0;
let maxPrice = 0;
let ages = [];
let categories = [];
let developers = [];

acceptFilters();
$.get("http://localhost:3299/eazy-games/getDevelopers", function (data) {
    for (let item in Object.keys(data)){
        let div = document.createElement("div");
        let input = document.createElement("input");
        input.onchange = function () {
            getDevelopers(data[item]);
        }
        input.type = "checkbox";
        let label = document.createElement("label");
        label.for = input;
        label.textContent = data[item];
        div.append(input, label);
        document.getElementById("main-page-filters-filter__developers__modal").append(div);
    }
})
$.get("http://localhost:3299/eazy-games/getCategories", function (data) {
    for (let item in Object.keys(data)){
        let div = document.createElement("div");
        let input = document.createElement("input");
        input.onchange = function () {
            getCategories(data[item]);
        }
        input.type = "checkbox";
        let label = document.createElement("label");
        label.for = input;
        label.textContent = data[item];
        div.append(input, label);
        document.getElementById("main-page-filters-filter__category__modal").append(div);
    }
})

function openFilters() {
    if (document.getElementById("main-page-filters").style.display === "block"){
        document.getElementById("main-page-filters").style.display = "none";
        document.getElementById("main-page-sort__filters").style.color = "#939393";
    } else {
        document.getElementById("main-page-filters").style.display = "block";
        document.getElementById("main-page-sort__filters").style.color = "#FFFFFF";
    }
}

function editSort(){
    sort = document.getElementById('main-page-sort__select').options[document.getElementById('main-page-sort__select').selectedIndex].value;
    acceptFilters();
}

const inputMinPrice = document.getElementById("main-page-filters-filter__cost__min");
const inputMaxPrice = document.getElementById("main-page-filters-filter__cost__max");
inputMinPrice.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        acceptFilters();
    }
});
inputMaxPrice.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        acceptFilters();
    }
});

function addAge(btn){
    const age = btn.textContent.slice(0, -1);
    if (ages.includes(age)){
        ages.splice(ages.indexOf(age), 1);
        btn.style.borderColor = "#939393";
        btn.style.color = "#939393";
    }
    else {
        ages.push(age);
        btn.style.borderColor = "#FFFFFF";
        btn.style.color = "#FFFFFF";
    }
    acceptFilters();
}

function openCategories(){
    if (document.getElementById("main-page-filters-filter__category__modal").style.display === "block"){
        document.getElementById("main-page-filters-filter__category__modal").style.display = "none";
    } else {
        document.getElementById("main-page-filters-filter__category__modal").style.display = "block";
    }
}

function getCategories(text) {
    if (categories.includes(text)){
        categories.splice(categories.indexOf(text), 1);
    }
    else {
        categories.push(text);
    }
    if (categories.length === 0){
        document.getElementById("main-page-filters-filter__category__btn").textContent = "Не выбрано";
    }
    if (categories.length === 1){
        document.getElementById("main-page-filters-filter__category__btn").textContent = text;
    }
    if (categories.length >1){
        document.getElementById("main-page-filters-filter__category__btn").textContent = "Выбрано "+categories.length+" жанра";
    }
    acceptFilters();
}

function openDevelopers(){
    if (document.getElementById("main-page-filters-filter__developers__modal").style.display === "block"){
        document.getElementById("main-page-filters-filter__developers__modal").style.display = "none";
    } else {
        document.getElementById("main-page-filters-filter__developers__modal").style.display = "block";
    }
}

function getDevelopers(text){
    if (developers.includes(text)){
        developers.splice(developers.indexOf(text), 1);
    }
    else {
        developers.push(text);
    }
    if (developers.length === 0){
        document.getElementById("main-page-filters-filter__developers__btn").textContent = "Не выбрано";
    }
    if (developers.length === 1){
        document.getElementById("main-page-filters-filter__developers__btn").textContent = text;
    }
    if (developers.length >1){
        document.getElementById("main-page-filters-filter__developers__btn").textContent = "Выбрано "+developers.length+" разр.";
    }
    acceptFilters();
}

function acceptFilters(){
    minPrice = document.getElementById("main-page-filters-filter__cost__min").value;
    maxPrice = document.getElementById("main-page-filters-filter__cost__max").value;
    let url= "http://localhost:3299/eazy-games/sort?sortBy=" + sort;
    if (minPrice !== 0){
        url += "&minPrice=" + minPrice;
    }
    if (maxPrice !== 0){
        url += "&maxPrice=" + maxPrice;
    }
    if (ages.length !== 0){
        for (let i in ages){
            url += "&age=" + ages[i];
        }
    }
    if (categories.length !== 0){
        for (let i in categories){
            url += "&categories=" + categories[i];
        }
    }
    if (developers.length !== 0){
        for (let i in developers){
            url += "&developers=" + developers[i];
        }
    }
    console.log(url)
    $.get(url, function (data) {
        document.getElementById("main-page-catalog").innerHTML = "";
        createItems(data);
        document.getElementById("main-page-sort__number").textContent = "Найдено " + Object.keys(data).length + " товаров";
    })
}


