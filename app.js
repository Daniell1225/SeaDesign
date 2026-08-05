const premiumProducts = document.getElementById("premiumProducts");
const microProducts = document.getElementById("microProducts");
const kidsProducts = document.getElementById("kidsProducts");
const ponchoProducts = document.getElementById("beddingProducts");

let cart = [];

fetch("products.json")
.then(response => response.json())
.then(data => {

    renderProducts(data.premium, premiumProducts);

    renderCatalog(data.microfiberCatalog, microProducts);

    renderCatalog(data.kidsCatalog, kidsProducts);

    renderCatalog(data.ponchoCatalog, ponchoProducts);

});

function renderProducts(products, container){

    container.innerHTML="";

    products.forEach(product=>{

        container.innerHTML+=`

        <div class="product">

            <img src="${product.image}" alt="${product.name}" onclick="openImage('${product.image}')">

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

            <img src="${item.image}" alt="${item.title}" onclick="openImage('${item.image}')">

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

    renderCart();

}

document.getElementById("cartBtn").onclick = function () {

    renderCart();

    document.getElementById("cartModal").style.display = "flex";

};

function closeCart(){

    document.getElementById("cartModal").style.display = "none";

}

function renderCart(){

    const cartItems=document.getElementById("cartItems");

    const total=document.getElementById("cartTotal");

    cartItems.innerHTML="";

    let sum=0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Количката е празна.</p>";

        total.innerHTML="0 €";

        return;

    }

    cart.forEach((item,index)=>{

        const price=parseFloat(item.price);

        sum+=price;

        cartItems.innerHTML+=`

        <div class="cartItem">

            <div>

                <strong>${item.name}</strong><br>

                ${item.price}

            </div>

            <button onclick="removeItem(${index})">

                🗑

            </button>

        </div>

        `;

    });

    total.innerHTML=sum.toFixed(2)+" €";

}

function removeItem(index){

    cart.splice(index,1);

    document.getElementById("count").innerHTML=cart.length;

    renderCart();

}
function openImage(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
