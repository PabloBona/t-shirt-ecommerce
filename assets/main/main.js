

const body = document.querySelector("body");
const productContainer = document.querySelector(".products__content");
const header = document.querySelector(".header");
const showMenu = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");
const closeMenu = document.querySelector(".nav__close");
const modeNight = document.querySelector("#theme-button");
const shopIcon = document.querySelector(".nav__shop")
const cart = document.querySelector(".cart")
const closeCart = document.querySelector("#cart-close");
let products = [
    {
        id: 1,
        name: "Hoodies",
        price: 14.00,
        image: "./assets/img/featured1.png",
        category: "hoodies",
        stock: 10,
    },

    {
        id: 2,
        name: "Shirts",
        price: 24.00,
        image: "./assets/img/featured2.png",
        category: "shirts",
        stock: 15,
    },

    {
        id: 3,
        name: "Sweatshirts",
        price: 24.00,
        image: "./assets/img/featured3.png",
        category: "sweatshirts",
        stock: 20,
    },
];
const cartContainer = document.querySelector(".cart__container");
const cartPrice = document.querySelector(".cart__prices");
const cartShopItems = document.querySelector(".cart__card");
const cartItemsCount = document.querySelector("#items-count");
const cartCount = document.querySelector("#cart-count");
const cartPriceTotal = document.querySelector("#cart-total");
const sellWear = document.querySelector(".cart__checkout");
let objCartShop = {};
const productShow = document.querySelector(".products__filters");





function printWears(){
    let html = "";
    products.forEach((product) => {
        html += `
        <article class="products__card ${product.category}">
            <div class="products__shape">
                <img src="${product.image}" alt="${product.category}" class="products__img">
            </div>
        
            <div class="products__data">
                <h2 class="products__price">$${product.price}.00 <span class="products__quantity">| Stock: ${product.stock}</span></h2>
                <h3 class="products__name">${product.name}</h3>
            
                <button class="button products__button">
                    <i class="bx bx-plus" data-id="${product.id}"></i>
                </button>
            </div>
        </article>
        `;
    });
    productContainer.innerHTML = html;
}

printWears();

function printWearsWithId(idWear){
    const currentWear = products.find((product) => product.id === idWear);
    let html = "";
        html += `
        <article class="products__card ${currentWear.category}">
            <div class="products__shape">
                <img src="${currentWear.image}" alt="${currentWear.category}" class="products__img">
            </div>
        
            <div class="products__data">
                <h2 class="products__price">$${currentWear.price}.00 <span class="products__quantity">| Stock: ${currentWear.stock}</span></h2>
                <h3 class="products__name">${currentWear.name}</h3>
            
                <button class="button products__button">
                    <i class="bx bx-plus" data-id="${currentWear.id}"></i>
                </button>
            </div>
        </article>
        `;
    productContainer.innerHTML = html;
}


function scrollHead(){ 
    window.onscroll = function() {
        if(Number(window.scrollY) > 144.4){
            header.classList.add("scroll-header");
        }
        if(Number(window.scrollY) < 144.4){
            header.classList.remove("scroll-header");
        }
    };
}
scrollHead();


showMenu.addEventListener("click", function(){
    menu.classList.toggle("show-menu");
});



closeMenu.addEventListener("click", function(){
    menu.classList.remove("show-menu");
    menu.classList.add("nav__menu");
});



modeNight.addEventListener("click", function(){
    body.classList.toggle("dark-theme");
    modeNight.classList.toggle("bx-sun");
});


shopIcon.addEventListener("click", function(){
    cart.classList.toggle("show-cart");
});


closeCart.addEventListener("click", function(){
    cart.classList.remove("show-cart");
    cart.classList.add("cart");
});



productShow.addEventListener("click", (e) => {
    
    if(e.target.classList.contains("products__title") || e.target.classList.contains("products__stock")){
        productContainer.innerHTML = "";
        const showWhat = e.target.getAttribute("data-filter");
        if(showWhat === "all"){
            productContainer.innerHTML = "";
            console.log("Hola goo0");
            printWears();
        }

        if(showWhat === ".hoodies"){
            productContainer.innerHTML = "";
            console.log("Hola goo1");
            printWearsWithId(1);
        }

        if(showWhat === ".shirts"){
            productContainer.innerHTML = "";
            console.log("Hola goo2");
            printWearsWithId(2);
        }

        if(showWhat === ".sweatshirts"){
            productContainer.innerHTML = "";
            console.log("Hola goo3");
            printWearsWithId(3);
        }
    }

})



function printWearInCart() {
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, image, stock, amount, subTotal }) => {
        subTotal = amount * price;
        html += `
        <div class="cart__card">
            <div class="box">
                <img src="${image}" alt="${name}" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title">${name}</h3>
                <span class="cart__details">
                    Stock: ${stock} | 
                    <span class="cart__price"> $${price}.00</span>
                </span>
                <span class="cart__subtotal"> Subtotal: $${subTotal}.00</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box minus" >
                            <i class="bx bx-minus" data-id="${id}">
                            </i>
                        </span>
                        <span class="cart__amount-number">${amount} units</span>
                        <span class="cart__amount-box plus" >
                            <i class="bx bx-plus" data-id="${id}">
                            </i>
                        </span>
                    </div>
                    <i class="bx bx-trash-alt cart__amount" data-id="${id}">
                    </i>
                </div>
            </div>
        </div>
    `;
    });

    cartContainer.innerHTML = html;

    countProduct();
    printTotal();
}



function pintarCarta(e){
    if(e.target.classList.contains("bx-plus")) {
        const idWear = parseInt(e.target.getAttribute("data-id"));

        const currentWear = products.find((product) => product.id === idWear);
        if(!currentWear.stock){
            return alert("Sorry, we are out of stock");
        }

        if(objCartShop[currentWear.id]){
            addWear(idWear);
        }else {
            objCartShop[currentWear.id] = {...currentWear};
            objCartShop[currentWear.id].amount = 1;
        }

        printWearInCart();
    }
}

productContainer.addEventListener("click", pintarCarta);



function addWear(idWear){
    const currentWear = products.find((product) => product.id === idWear);

    if(!currentWear.stock){
        return alert("Sorry, we are out of stock");
    }

    if(currentWear.stock === objCartShop[idWear].amount){
        return alert("Sorry, we are out of stock");
    }
    objCartShop[currentWear.id].amount++;
}

function deletefood(idWear){
    delete objCartShop[idWear];
}



cartContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("bx-minus")){
        const idWear = Number(e.target.getAttribute("data-id"));
        if(objCartShop[idWear].amount === 1){
            deletefood(idWear);
        }else{
            objCartShop[idWear].amount--;
        }
        
    }

    if(e.target.classList.contains("bx-plus")){
        const idWear = Number(e.target.getAttribute("data-id"));
        addWear(idWear);
    }

    if(e.target.classList.contains("bx-trash-alt")){
        const idWear = Number(e.target.getAttribute("data-id"));
        deletefood(idWear);
        
    }

    printWearInCart();
});



function countProduct(){
    const arrayCartShop = Object.values(objCartShop);

    let total = arrayCartShop.reduce((acum, curr) => {
        
        acum += curr.amount;
        return acum;
    }, 0);

    cartItemsCount.textContent = total;
    cartCount.textContent = total;
    
}



function printTotal(){
    const arrayCartShop = Object.values(objCartShop);

    if(!arrayCartShop.length){
        return (cartContainer.innerHTML = `
        <div class="cart__empty">
            <img src="./assets/img/empty-cart.png" alt="empty cart">
            <h2>Your cart is empty</h2>
            <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
        </div>
        `);
    }

    let montoTotal = arrayCartShop.reduce((acum, curr) => {
        acum += curr.price * curr.amount;
        return acum;
    }, 0);

    cartPriceTotal.textContent = `$${montoTotal}.00`;

    
}



sellWear.addEventListener("click", (e) => {
    if(e.target.classList.contains("cart__btn")){
        products = products.map((product) => {
            if(objCartShop[product.id]?.id === product.id){
                cartPriceTotal.textContent = `$0.00`;
                return{
                    ...product,
                    stock: (product.stock - objCartShop[product.id].amount),
                };
            }else{
                return product;
            }
        });

        objCartShop = {};
        printWears();
        printWearInCart();
    }
});

printWears();
printTotal();