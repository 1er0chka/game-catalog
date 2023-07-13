const input = document.getElementById("main-page-header__search_field__input");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const link = document.createElement('a');
        link.href = "/eazy-games/search?request=" + document.getElementById("main-page-header__search_field__input").value;
        link.click();
    }
});
