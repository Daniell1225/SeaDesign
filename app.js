const state={products:[],cart:JSON.parse(localStorage.getItem('seadesign-cart')||'[]'),filter:'all'};
const grid=document.getElementById('productGrid');
const count=document.getElementById('cartCount');
const drawer=document.getElementById('cartDrawer');
const backdrop=document.getElementById('drawerBackdrop');
const cartItems=document.getElementById('cartItems');
const cartTotal=document.getElementById('cartTotal');

fetch('products.json').then(r=>r.json()).then(data=>{state.products=data;renderProducts();renderCart();}).catch(()=>{grid.innerHTML='<p>Неуспешно зареждане на продуктите. Отвори сайта през GitHub Pages или локален сървър.</p>'});

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.filter=btn.dataset.filter;renderProducts();}));

function renderProducts(){const list=state.products.filter(p=>p.id!=='microfiber-catalog'&&(state.filter==='all'||p.type===state.filter));grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}"></div><div class="product-body"><span class="product-badge">${p.type==='premium'?'Premium':'Microfiber'}</span><h3>${p.name}</h3><p class="product-spec">${p.size}<br>${p.material}</p><div class="product-footer"><span class="price">${p.price.toFixed(2)} €</span><button class="add-button" data-id="${p.id}">Добави</button></div></div></article>`).join('');document.querySelectorAll('.add-button').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.id)));}

function addToCart(id){state.cart.push(id);saveCart();openCart();}
function saveCart(){localStorage.setItem('seadesign-cart',JSON.stringify(state.cart));renderCart();}
function removeItem(index){state.cart.splice(index,1);saveCart();}
function renderCart(){count.textContent=state.cart.length;const products=state.cart.map(id=>state.products.find(p=>p.id===id)).filter(Boolean);cartItems.innerHTML=products.length?products.map((p,i)=>`<div class="cart-line"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><br><small>${p.price.toFixed(2)} €</small></div><button data-remove="${i}">Премахни</button></div>`).join(''):'<p>Количката е празна.</p>';cartTotal.textContent=products.reduce((s,p)=>s+p.price,0).toFixed(2);document.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>removeItem(Number(b.dataset.remove))));}
function openCart(){drawer.classList.add('open');backdrop.classList.add('show');drawer.setAttribute('aria-hidden','false')}
function closeCart(){drawer.classList.remove('open');backdrop.classList.remove('show');drawer.setAttribute('aria-hidden','true')}
document.getElementById('cartOpen').addEventListener('click',openCart);document.getElementById('cartClose').addEventListener('click',closeCart);backdrop.addEventListener('click',closeCart);

document.getElementById('addMicrofiber').addEventListener('click',()=>addToCart('microfiber-catalog'));

const catalogDialog=document.getElementById('catalogDialog');document.querySelectorAll('[data-catalog]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('catalogLarge').src=b.dataset.catalog;catalogDialog.showModal();}));document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));

const checkoutDialog=document.getElementById('checkoutDialog');document.getElementById('checkoutButton').addEventListener('click',()=>{if(!state.cart.length)return alert('Количката е празна.');closeCart();checkoutDialog.showModal();});

document.getElementById('checkoutForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target);const lines=state.cart.map(id=>state.products.find(p=>p.id===id)).filter(Boolean).map((p,i)=>`${i+1}. ${p.name} – ${p.price.toFixed(2)} €`);const total=state.cart.map(id=>state.products.find(p=>p.id===id)).filter(Boolean).reduce((s,p)=>s+p.price,0);const text=`ПОРЪЧКА SEADESIGN\n\nИме: ${fd.get('name')}\nТелефон: ${fd.get('phone')}\nАдрес: ${fd.get('address')}\nБележка: ${fd.get('note')||'-'}\n\nАртикули:\n${lines.join('\n')}\n\nОбщо: ${total.toFixed(2)} €`;const out=document.getElementById('orderOutput');out.hidden=false;out.value=text;document.getElementById('copyOrder').hidden=false;});
document.getElementById('copyOrder').addEventListener('click',async()=>{await navigator.clipboard.writeText(document.getElementById('orderOutput').value);alert('Поръчката е копирана.');});

document.getElementById('inquiryForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target);const text=`ЗАПИТВАНЕ SEADESIGN\nИме: ${fd.get('name')}\nТелефон: ${fd.get('phone')}\nУслуга: ${fd.get('service')}\nОписание: ${fd.get('message')}`;navigator.clipboard.writeText(text).then(()=>alert('Запитването е копирано. Изпрати го по предпочитан от вас канал.'));});
