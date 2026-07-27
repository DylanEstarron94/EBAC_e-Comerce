
const header = document.querySelector("header");

//-----------show cart
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
});

//-------------show lateral menu
const menuIcon = header.firstElementChild;
const lateralMenu = document.querySelector(".lateralMenu");
menuIcon.addEventListener("click", () => {
    lateralMenu.classList.toggle("showMenu");
});

//--------------Close lateral menu
const closeIcon = document.getElementById("close_logo");
closeIcon.addEventListener("click", () => {
    lateralMenu.classList.remove("showMenu");
});

//----------------add product to cart
const buttons = document.querySelectorAll(".products__item__button");
const cartContainer = document.querySelector(".cart__product-container");

buttons.forEach(function (button) {
    button.addEventListener("click", (event) => {
        if (event.target.classList.contains("item__button--no_stock")) {
            alert("Producto sin stock");
            return;
        };

        const parentArticle = event.target.closest(".products__item");

        const productTitle = parentArticle.querySelector(".products__item__h3");
        const productName = productTitle.textContent;
        console.log("Hiciste clic en el producto: " + productName);

        const productPrice = parentArticle.querySelector(".products__item__p");
        const price = productPrice.textContent;
        console.log(price);

        const productImage = parentArticle.querySelector(".products__item__img");
        const image = productImage.getAttribute("src");
        console.log(image);

        const newCartElement = `
            <div class="cart__item">
            <img src="${image}" alt="${productName}" class="cart__item__img" />
            <p class="cart__item__desc">${productName}</p>
            <p class="cart__item__price">${price}</p>
            <i class="cart__item__icon">
            <img src="img/recycle.png" alt="icono quitar" class="delete__icon" /></i>
            </div>
            `;

        cartContainer.insertAdjacentHTML('beforeend', newCartElement);

        addCartNumber();
    });
});


//-------------------delete element on cart
const deleteElement = document.querySelector(".cart__product-container");

deleteElement.addEventListener("click", (event) => {
    const cartItem = event.target.closest(".cart__item");

    if (event.target.classList.contains("delete__icon")) {
        cartItem.remove();
        addCartNumber();
    }
});


//----------------------cart quantity viewer
function addCartNumber() {
    const cartItem = document.querySelectorAll(".cart__item");
    const cartItemQuantity = cartItem.length;
    const cartView = document.getElementById("cart__elements__id");

    if (cartItemQuantity > 0) {
        cartView.classList.replace("empty", "cart__elements");
        document.getElementById("cart__elements__id").innerHTML = cartItemQuantity;
        if (cartItemQuantity > 9) {
            document.getElementById("cart__elements__id").innerHTML = "+9";
        };
    }
    console.log(cartItemQuantity);
    if (cartItemQuantity == 0) {
        cartView.classList.replace("cart__elements", "empty");
        document.getElementById("cart__elements__id").innerHTML = "";
    }

}