const menu=document.getElementById('menu');const mobile=document.getElementById('mobileNav');const theme=document.getElementById('theme');const lang=document.getElementById('language');
menu.onclick=()=>mobile.classList.toggle('open');
document.querySelectorAll('#mobileNav a').forEach(a=>a.onclick=()=>mobile.classList.remove('open'));
theme.onclick=()=>{document.body.classList.toggle('light');theme.textContent=document.body.classList.contains('light')?'🌙':'☀️'};
lang.onchange=()=>alert('DronaMentor multilingual learning is being built. More languages will be added as the platform grows.');