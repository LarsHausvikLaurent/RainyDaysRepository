

/* ---------------- REST API ----------------- */

const baseUrl = "http://bromelainofficial.com/wp-json/wc/store/products?per_page=5";
const jacketContainer = document.querySelector(".jacket-list")


async function getProducts(url) {
    const response = await fetch(url);
    const products = await response.json();


    products.forEach(function (product) {

        jacketContainer.innerHTML += `

        
        <a href="../details.html?id=${product.id}" class="products-jacket">
        <div class="price-jacket"><p>Price: ${product.prices.price}kr</p></div>
        <div class="name-jacket"><h2>${product.name}</h2></div>
        <img src="${product.images[0].src}">
        </a>
        `
    })

}

getProducts(baseUrl);



/* ----------- add to cart --------- */

