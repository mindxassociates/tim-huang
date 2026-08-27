(()=>{
 const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // Mobile navigation generated progressively so desktop markup stays clean.
 const header=q('.nav'), nav=q('.nav nav');
 if(header&&nav){
  const btn=document.createElement('button');btn.className='mobile-menu-btn';btn.type='button';btn.setAttribute('aria-label','Menu');btn.setAttribute('aria-expanded','false');btn.innerHTML='☰';
  const drawer=document.createElement('div');drawer.className='mobile-drawer';drawer.setAttribute('aria-hidden','true');drawer.innerHTML=nav.innerHTML+'<small>DR. TIM HUANG · DSW, LCSW-S</small>';
  header.insertBefore(btn,header.querySelector('.lang'));document.body.appendChild(drawer);
  const close=()=>{drawer.classList.remove('open');document.body.classList.remove('menu-open');btn.innerHTML='☰';btn.setAttribute('aria-expanded','false');drawer.setAttribute('aria-hidden','true')};
  btn.onclick=()=>{const open=!drawer.classList.contains('open');drawer.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);btn.innerHTML=open?'×':'☰';btn.setAttribute('aria-expanded',String(open));drawer.setAttribute('aria-hidden',String(!open))};
  qa('a',drawer).forEach(a=>a.addEventListener('click',close));addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 // Active section navigation.
 const sections=qa('main section[id]'), links=qa('.nav nav a');
 const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>spy.observe(s));
 // A single visual thread connects the page without crossing the portrait.
 if(!reduced){const t=document.createElement('div');t.className='connection-thread';t.innerHTML='<i></i><b></b>';document.body.appendChild(t);const update=()=>{const d=document.documentElement,p=Math.max(0,Math.min(1,d.scrollTop/(d.scrollHeight-d.clientHeight)));t.style.setProperty('--thread',(p*100).toFixed(2)+'%')};addEventListener('scroll',update,{passive:true});update()}
 // Touch-native feedback in place of hover-only interactions.
 if(matchMedia('(pointer:coarse)').matches&&!reduced){qa('.feature-card,.btn,.contact-panel,.milestone').forEach(el=>el.addEventListener('pointerdown',e=>{const r=el.getBoundingClientRect(),s=document.createElement('i');s.className='touch-ripple';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';el.style.position='relative';el.style.overflow='hidden';el.appendChild(s);setTimeout(()=>s.remove(),700)}))}
 // Pause expensive ambient canvas work when the tab is hidden by stopping its visible compositing.
 const stars=q('#stars');document.addEventListener('visibilitychange',()=>{if(stars)stars.style.visibility=document.hidden?'hidden':'visible'});
})();
