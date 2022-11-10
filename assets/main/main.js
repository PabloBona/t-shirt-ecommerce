//Const 
const body = document.querySelector("body");
const productContainer = document.querySelector(".products__content");
const header = document.querySelector("#header");
const shopIcon = document.querySelector(".nav__shop")
const cartPrice = document.querySelector(".cart__prices");
const cartShopItems = document.querySelector(".cart__card");





// Night Mode
const mode__night = document.querySelector("#night-button");

mode__night.addEventListener("click", function(){
    body.classList.toggle("dark-theme");
    mode__night.classList.toggle("bx-sun");
});

// Half burguer Menu Show
const menuShow = document.querySelector(".nav__toggle");
menuShow.addEventListener("click", function(){
    menu.classList.toggle("show-menu");
});

// Open & Close Menu
const menu = document.querySelector(".nav__menu");
const closeMenu = document.querySelector(".nav__close");
closeMenu.addEventListener("click", function(){
    menu.classList.remove("show-menu");
    menu.classList.add("nav__menu");
});

// Open & Close Cart
const cart = document.querySelector(".cart")
const cartClose = document.querySelector("#cart-close");
cartClose.addEventListener("click", function(){
    cart.classList.remove("show-cart");
    cart.classList.add("cart");
});

//Db Products
let products = [
    {
        id: 1,
        name: "Hoodies",
        price: 14.00,
        image: "./assets/imagenes/featured1.png",
        category: "hoodies",
        stock: 10,
    },

    {
        id: 2,
        name: "Shirts",
        price: 24.00,
        image: "./assets/imagenes/featured2.png",
        category: "shirts",
        stock: 15,
    },

    {
        id: 3,
        name: "Sweatshirts",
        price: 24.00,
        image: "./assets/imagenes/featured3.png",
        category: "sweatshirts",
        stock: 20,
    },
];

//Menu All/hoodies/shirts/sweat
const productShow = document.querySelector(".products__filters");
productShow.addEventListener("click", (e) => {
    
    if(e.target.classList.contains("products__title") || e.target.classList.contains("products__stock")){
        productContainer.innerHTML = "";
        const showWhat = e.target.getAttribute("data-filter");
        if(showWhat === "all"){
            productContainer.innerHTML = "";
            printWears();
        }
        if(showWhat === ".hoodies"){
            productContainer.innerHTML = "";
            printWearsWithId(1);
        }
        if(showWhat === ".shirts"){
            productContainer.innerHTML = "";
            
            printWearsWithId(2);
        }
        if(showWhat === ".sweatshirts"){
            productContainer.innerHTML = "";
            printWearsWithId(3);
        }
    }

})

//product print
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


// Show products with ID
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

//onscroll Header Event
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

//Toggle cart
shopIcon.addEventListener("click", function(){
    cart.classList.toggle("show-cart");
});




// Cart Shop Values
const cartContainer = document.querySelector(".cart__container");
let objCartShop = {};

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


//control structures Cart
function printCart(e){
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

productContainer.addEventListener("click", printCart);


//Add articles
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

//delete articles
function deleteArticle(idWear){
    delete objCartShop[idWear];
}


//Control Structure add-rest-delete articles
cartContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("bx-minus")){
        const idWear = Number(e.target.getAttribute("data-id"));
        if(objCartShop[idWear].amount === 1){
            deleteArticle(idWear);
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
        deleteArticle(idWear);
        
    }

    printWearInCart();
});


//Count
const cartItemsCount = document.querySelector("#items-count");
const cartCount = document.querySelector("#cart-count");
function countProduct(){
    const arrayCartShop = Object.values(objCartShop);

    let total = arrayCartShop.reduce((acum, curr) => {
        
        acum += curr.amount;
        return acum;
    }, 0);

    cartItemsCount.textContent = total;
    cartCount.textContent = total;
    
}


//Empty cart/Total Amount
const cartPriceTotal = document.querySelector("#cart-total");
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


const sellWear = document.querySelector(".cart__checkout");
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