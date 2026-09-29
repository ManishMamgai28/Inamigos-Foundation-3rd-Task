const header=document.getElementById("header");
const nav=document.getElementById("nav");
const toggle=document.getElementById("navToggle");
const topBtn=document.getElementById("top");

toggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
  topBtn.classList.toggle("show",window.scrollY>650);
},{passive:true});

topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target, target=Number(el.dataset.count), duration=1600, start=performance.now();
    const tick=now=>{
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(target*eased).toLocaleString();
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(el=>counterObserver.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim()||"there";
  document.getElementById("formStatus").textContent=`Thanks, ${name}. Your message has been recorded for this demo.`;
  e.target.reset();
});

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
},{passive:true});
