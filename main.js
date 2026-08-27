const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
if(!reduced){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.section>div,.service-grid article,.quote').forEach(e=>io.observe(e));
}
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{const s=d.querySelector('summary span');if(s)s.textContent=d.open?'−':'+'}));

// Scroll progress + glass navigation + active section
const progress=document.createElement('div');progress.className='scroll-progress';progress.innerHTML='<div class="scroll-progress__bar"></div>';document.body.prepend(progress);
const bar=progress.firstElementChild, nav=document.querySelector('.nav');
const sectionLinks=[...document.querySelectorAll('.nav nav a[href^="#"]')];
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=(max>0?(scrollY/max)*100:0)+'%';
  nav?.classList.toggle('is-scrolled',scrollY>28);
  let current='';
  document.querySelectorAll('main section[id]').forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.38)current=s.id});
  sectionLinks.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+current));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// Soft cursor spotlight and layered hero parallax on fine pointers
if(matchMedia('(pointer:fine)').matches && !reduced){
  document.body.classList.add('has-pointer');
  addEventListener('pointermove',e=>{document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px')},{passive:true});
  const hero=document.querySelector('.hero'), card=document.querySelector('.hero-card'), copy=document.querySelector('.hero-copy');
  hero?.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;if(card)card.style.transform=`translate3d(${x*-13}px,${y*-10}px,0)`;if(copy)copy.style.transform=`translate3d(${x*4}px,${y*3}px,0)`});
  hero?.addEventListener('mouseleave',()=>{if(card)card.style.transform='';if(copy)copy.style.transform=''});

  // restrained 3D tilt / local glow on experience cards
  document.querySelectorAll('.service-grid article').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--cx',x*100+'%');c.style.setProperty('--cy',y*100+'%');c.style.transform=`perspective(900px) rotateX(${(0.5-y)*2.2}deg) rotateY(${(x-.5)*2.2}deg) translateY(-4px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});

  // magnetic CTAs
  document.querySelectorAll('.primary,.navcta,.lang-toggle,.final a').forEach(b=>{b.classList.add('magnetic');b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
}

// Rotating professional roles inside the eyebrow, localized to page language
const eyebrow=document.querySelector('.eyebrow');
if(eyebrow){
  const zh=document.documentElement.lang.toLowerCase().startsWith('zh');
  const words=zh?['临床工作者','督导','创始人','教育者','顾问']:['CLINICIAN','SUPERVISOR','FOUNDER','EDUCATOR','CONSULTANT'];
  const dot=eyebrow.querySelector('span');
  const rot=document.createElement('span');rot.className='role-rotator';
  words.forEach((w,i)=>{const s=document.createElement('span');s.className='role-word'+(i===0?' is-on':'');s.textContent=w;rot.appendChild(s)});
  [...eyebrow.childNodes].filter(n=>n!==dot).forEach(n=>n.remove());eyebrow.append(rot);
  if(!reduced){let i=0;setInterval(()=>{const all=rot.children;all[i].classList.remove('is-on');i=(i+1)%all.length;all[i].classList.add('is-on')},2400)}
}

// Copyable phone feedback without replacing the normal tap-to-call link
const finalLink=document.querySelector('.final a[href^="tel:"]');
if(finalLink && navigator.clipboard){
  const b=document.createElement('button');b.className='copy-phone';b.type='button';b.textContent=document.documentElement.lang.startsWith('zh')?'复制号码':'Copy number';
  finalLink.insertAdjacentElement('afterend',b);
  b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('(346) 808-0603');const old=b.textContent;b.textContent=document.documentElement.lang.startsWith('zh')?'已复制':'Copied';b.classList.add('copied');setTimeout(()=>{b.textContent=old;b.classList.remove('copied')},1500)}catch{}});
}
