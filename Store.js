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
