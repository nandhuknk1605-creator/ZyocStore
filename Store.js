const cars=[
	"https://images.unsplash.com/photo-1502877338535-766e1452684a",
	"https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
	"https://images.unsplash.com/photo-1542362567-b07e54358753"
];

function changeCar(index,btn){
	document.getElementById("carImage").src=cars[index];
	document.querySelectorAll(".model-buttons button").forEach(b=>b.classList.remove("active"));
	btn.classList.add("active");
}

const sections=document.querySelectorAll("section");
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const style=getComputedStyle(entry.target);
document.documentElement.style.setProperty('--bg-color',style.getPropertyValue('--section-bg'));
document.documentElement.style.setProperty('--text-color',style.getPropertyValue('--section-text'));
}
});
},{threshold:0.6});

sections.forEach(section=>observer.observe(section));

function addToCart(index){
	// products list (must match index used in HTML)
	const products=[
		{id:0,name:'women panty 01',price:1299,img:'Images/IMG20260119092805.png'},
		{id:1,name:'Women panty 02',price:1799,img:'Images/IMG20260119093111.png'},
		{id:2,name:'Women panty 03',price:699,img:'Images/IMG20260119093748.png'},
		{id:3,name:'Women panty 04',price:2499,img:'Images/IMG20260119094241.png'},
		{id:4,name:'Women panty 05',price:1599,img:'Images/Front.png'}
	];

	// Initialize cart from localStorage
	window.cart = window.cart || JSON.parse(localStorage.getItem('zyoc_cart') || '[]');

	const p = products[index] || {id:-1,name:'Item',price:0,img:''};
	const existing = window.cart.find(i=>i.id === p.id);
	if(existing){ existing.qty += 1; } else { window.cart.push({...p,qty:1}); }
	localStorage.setItem('zyoc_cart', JSON.stringify(window.cart));
	updateCartCount();
	renderCartPanel();
	console.log('addToCart', index, p, window.cart);
}

function updateCartCount(){
	const countEl = document.getElementById('cartCount');
	if(!countEl) return;
	const count = (window.cart || []).reduce((s,i)=>s + (i.qty||0),0);
	countEl.textContent = count;
}

function renderCartPanel(){
	const panel = document.getElementById('cartPanel');
	if(!panel) return;
	const list = panel.querySelector('.cart-items');
	if(!list) return;
	const items = window.cart || [];
	if(items.length === 0){
		list.innerHTML = '<p>Your cart is empty.</p>';
		panel.querySelector('.cart-total').textContent = 'Total: ₹0';
		return;
	}
	list.innerHTML = items.map((it,idx)=>`
		<div class="cart-item">
			<img src="${it.img}" alt="${it.name}">
			<div class="ci-info">
				<div class="ci-name">${it.name}</div>
				<div>₹${it.price} × ${it.qty}</div>
			</div>
			<button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button>
		</div>
	`).join('');
	const total = items.reduce((s,i)=>s + i.price * i.qty, 0);
	panel.querySelector('.cart-total').textContent = 'Total: ₹' + total;
}

function toggleCartPanel(){
	const panel = document.getElementById('cartPanel');
	if(!panel) return;
	panel.classList.toggle('open');
	panel.setAttribute('aria-hidden', panel.classList.contains('open') ? 'false' : 'true');
	renderCartPanel();
}

function removeFromCart(idx){
	window.cart = window.cart || [];
	window.cart.splice(idx,1);
	localStorage.setItem('zyoc_cart', JSON.stringify(window.cart));
	updateCartCount();
	renderCartPanel();
}

// Initialize UI once DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{
	window.cart = JSON.parse(localStorage.getItem('zyoc_cart') || '[]');
	updateCartCount();
	const cartBtn = document.getElementById('cartBtn');
	if(cartBtn) cartBtn.addEventListener('click', toggleCartPanel);
	const closeBtn = document.getElementById('closeCart');
	if(closeBtn) closeBtn.addEventListener('click', toggleCartPanel);
	renderCartPanel();
});
