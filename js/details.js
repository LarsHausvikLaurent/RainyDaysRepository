
const detailContainer = document.querySelector(".details");



const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);



const url = "https://bromelainofficial.com/wp-json/wc/store/products/" + id;

console.log(url);

async function fetchGame() {

    try {
        const response = await fetch(url);
        const details = await response.json();


        createHtml(details);

        createShoppingcart(details);


    }
    catch (error) {
        console.log(error);
    }

    /* add to cart */


}

fetchGame();


function createHtml(details) {
    detailContainer.innerHTML = `
    <img src="${details.images[0].src}">
    <div class="name-jacket"><h2>${details.name}</h2></div>
    <p>${details.description}</p>
    <div class="price-jacket"><p>Price: ${details.prices.price}kr</p></div>`;
}


function createShoppingcart(details) {


    let carts = document.querySelectorAll('.add-cart');



    let products = [
        {
            name: details.name,
            tag: details.id,
            image: details.images[0].src,
            price: details.prices.price,
            inCart: 0,
        }
    ]

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i])
            totalCost(products[i])

        })
    }


    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumber');

        if (productNumbers) {
            document.querySelector('.shoppingcart span').textContent = productNumbers;
        }

    }

    onLoadCartNumbers()

    function cartNumbers(product) {
        let productNumbers = localStorage.getItem('cartNumber');

        productNumbers = parseInt(productNumbers);

        if (productNumbers) {
            localStorage.setItem('cartNumber', productNumbers + 1);
            document.querySelector('.shoppingcart span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumber', 1)
            document.querySelector('.shoppingcart span').textContent = 1;
        }

        setItems(product);

    }

    function setItems(product) {

        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);

        if (cartItems != null) {

            if (cartItems[product.tag] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
            }

            cartItems[product.tag].inCart += 1;

        } else {
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
        }

        localStorage.setItem('productsInCart', JSON.stringify(cartItems))

    }

    function totalCost(productPrice) {

        let cartCost = localStorage.getItem('totalCost');


        console.log("my cartCost is", cartCost);
        console.log(typeof cartCost);

        if (cartCost != null) {
            cartCost = parseInt(cartCost);
            productPrice.price = parseInt(productPrice.price)
            localStorage.setItem('totalCost', cartCost + productPrice.price)
        } else {
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', productPrice.price)
        }

    }

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
            <div class="product">
                <img src="./images/close.svg" class="close">
                <img src=${item.image} alt="jacket">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}kr</div>
            <div class="quantity">
            <span>${item.inCart}</span>
            </div>
            <div class="total">
                ${item.inCart * item.price},00kr
            </div>
            `

        })

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                ${cartCost},00kr
            </h4>             
    `

    }

}

displayCart()



/* add to cart */

/* /* ----------- add to cart --------- */



/* let products = [
    {
        name: "Blue Jacket",
        tag: 'jacket_red',
        price: 100,
        inCart: 0
    },
]


let carts = document.querySelectorAll('.add-cart');

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function () {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function productInCart() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.shoppingcart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shoppingcart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.shoppingcart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('My cartItems are', cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {

        localStorage.setItem("totalCost", product.price);

    }
}


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <button class="remove">Remove</button>
                <img src="./images/${item.tag}.jpg" alt="jacket">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `

        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>             
        `
    }

}


productInCart();
displayCart();
 */



const form = document.querySelector("#form");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError")

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError")

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")

const adress = document.querySelector("#adress");
const adressError = document.querySelector("#adressError")



function validateForm() {
    event.preventDefault();

    if (name.value.trim().length > 0) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
    }


    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

}

form.addEventListener("submit", validateForm)


function validateEmail() {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}