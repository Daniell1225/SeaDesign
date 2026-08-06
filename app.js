emailjs.init("FnQmL6YiQLs-N5CBo");
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

    const existing = cart.find(item => item.id === product.id);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            ...product,
            quantity:1
        });
    }

    document.getElementById("count").innerHTML =
        cart.reduce((sum,item)=>sum+item.quantity,0);

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

        sum += price * item.quantity;

        cartItems.innerHTML+=`

        <div class="cartItem">

            <div>

                <strong>${item.name}</strong><br>

                ${item.quantity} × ${item.price}

            </div>

            <div>

 <button onclick="changeQuantity(${index},-1)">−</button>

<button onclick="changeQuantity(${index},1)">+</button>

<button onclick="removeItem(${index})">🗑</button>

</div>

        </div>

        `;

    });

    total.innerHTML=sum.toFixed(2)+" €";

}

function removeItem(index){

    cart.splice(index,1);

    document.getElementById("count").innerHTML =
    cart.reduce((sum,item)=>sum+item.quantity,0);

    renderCart();

}
function changeQuantity(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity<=0){

        cart.splice(index,1);

    }

    document.getElementById("count").innerHTML =
        cart.reduce((sum,item)=>sum+item.quantity,0);

    renderCart();

}
function openImage(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
document.getElementById("sendOrderBtn").addEventListener("click", function () {

    if(cart.length===0){
        alert("Количката е празна.");
        return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();
    const customerAddress = document.getElementById("customerAddress").value.trim();
    const customerNote = document.getElementById("customerNote").value.trim();

    if(customerName==="" || customerPhone===""){
        alert("Моля попълнете име и телефон.");
        return;
    }

    const order = cart.map(item =>
        `${item.name} × ${item.quantity} - ${item.price}`
    ).join("\n");

    const total = cart.reduce((sum,item)=>
        sum + parseFloat(item.price) * item.quantity
    ,0);

    emailjs.send(
        "service_w97m077",
        "template_tv00i1d",
        {
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_email: customerEmail,
            customer_address: customerAddress,
            customer_note: customerNote,
            order: order,
            total: total.toFixed(2) + " €"
        }
    ).then(function(){

        alert("✅ Поръчката беше изпратена успешно!");

        cart=[];

        document.getElementById("count").innerHTML="0";

        renderCart();

        document.getElementById("orderForm").reset();

        closeCart();

    }).catch(function(error){

    console.error("EmailJS error:", error);

    alert(
        "Грешка при изпращането:\n" +
        (error.text || error.message || JSON.stringify(error))
    );

});
