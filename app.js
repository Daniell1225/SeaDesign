const premiumProducts = document.getElementById("premiumProducts");
const microProducts = document.getElementById("microProducts");
const kidsProducts = document.getElementById("kidsProducts");
const beddingProducts = document.getElementById("beddingProducts");

let cart = [];

fetch("products.json")
.then(r => r.json())
.then(data => {

render(data.premium,premiumProducts);

render(data.microfiber,microProducts);

render(data.kids,kidsProducts);

render(data.bedding,beddingProducts);

});

function render(products,target){

products.forEach(product=>{

const card=document.createElement("div");

card.className="product";

card.innerHTML=`

<img src="${product.image}" alt="${product.name}">

<div class="productContent">

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="price">${product.price} лв.</div>

<button class="buyBtn">

Добави в количката

</button>

</div>

`;

card.querySelector("button").onclick=()=>{

cart.push(product);

updateCart();

};

target.appendChild(card);

});

}

function updateCart(){

document.getElementById("count").innerText=cart.length;

}

document.getElementById("cartBtn").onclick=()=>{

if(cart.length===0){

alert("Количката е празна.");

return;

}

let text="Вашата количка:\n\n";

let total=0;

cart.forEach(item=>{

text+=item.name+" - "+item.price+" лв.\n";

total+=item.price;

});

text+="\nОбщо: "+total+" лв.";

alert(text);

};
