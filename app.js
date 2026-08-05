const premiumProducts = document.getElementById("premiumProducts");
const microProducts = document.getElementById("microProducts");
const kidsProducts = document.getElementById("kidsProducts");
const beddingProducts = document.getElementById("beddingProducts");

let cart = [];

fetch("products.json")
.then(response => response.json())
.then(data => {

    renderProducts(data.premium, premiumProducts);

    renderCatalog(data.microfiberCatalog, microProducts);

    renderCatalog(data.kidsCatalog, kidsProducts);

    renderCatalog(data.ponchoCatalog, beddingProducts);

});

function renderProducts(products, container){

    container.innerHTML="";

    products.forEach(product=>{

        container.innerHTML+=`

        <div class="product">

            <img src="${product.image}" alt="${product.name}">

            <div class="productContent">

                <h3>${product.name}</h3>

                <p>140 × 70 см<br>60% памук • 40% полиестер</p>

                <div class="price">${product.price}</div>

                <button class="buyBtn"
                onclick='addToCart(${JSON.stringify(product)})'>
                Добави в количката
                </button>

            </div>

        </div>

        `;

    });

}

function renderCatalog(catalog,container){

    container.innerHTML="";

    catalog.forEach(item=>{

        container.innerHTML+=`

        <div class="product">

            <img src="${item.image}" alt="${item.title}">

            <div class="productContent">

                <h3>${item.title}</h3>

                <p>

                Изберете желания дизайн по номер
                от каталога и го посочете при
                поръчката.

                </p>

                <div class="price">${item.price}</div>

            </div>

        </div>

        `;

    });

}

function addToCart(product){

    cart.push(product);

    document.getElementById("count").innerHTML=cart.length;

}

document.getElementById("cartBtn").onclick=function(){

    if(cart.length===0){

        alert("Количката е празна.");

        return;

    }

    let total="";

    cart.forEach(item=>{

        total+=item.name+" - "+item.price+"\n";

    });

    alert(total);

};
