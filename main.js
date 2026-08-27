const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const progress=q('.progress'),nav=q('.nav'); addEventListener('scroll',()=>{let h=document.documentElement;progress.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';nav.classList.toggle('scrolled',scrollY>30)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});qa('[data-reveal]').forEach(e=>io.observe(e));
if(matchMedia('(pointer:fine)').matches){const dot=q('.cursor-dot'),ring=q('.cursor-ring');addEventListener('mousemove',e=>{dot.style.left=ring.style.left=e.clientX+'px';dot.style.top=ring.style.top=e.clientY+'px'});qa('a,button,.tilt').forEach(e=>{e.addEventListener('mouseenter',()=>ring.classList.add('hover'));e.addEventListener('mouseleave',()=>ring.classList.remove('hover'))});qa('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{let r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.13}px,${y*.13}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});qa('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{let r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--mx',((x+.5)*100)+'%');el.style.setProperty('--my',((y+.5)*100)+'%');el.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-2px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}
const tl=q('.timeline'),detail=q('.timeline-detail');qa('.milestone').forEach(m=>m.onclick=()=>{qa('.milestone').forEach(x=>x.classList.remove('active'));m.classList.add('active');detail.innerHTML=`<span>${m.dataset.year}</span><h3>${m.dataset.title}</h3><p>${m.dataset.detail}</p>`;tl.classList.add('expanded')});q('.timeline-toggle').onclick=()=>tl.classList.toggle('expanded');
q('.copy').onclick=async e=>{try{await navigator.clipboard.writeText(e.currentTarget.dataset.copy);q('.copy-status').textContent=document.documentElement.lang.startsWith('zh')?'已复制电话号码':'Phone number copied';setTimeout(()=>q('.copy-status').textContent='',1800)}catch{}};
// ambient starfield
const c=q('#stars'),ctx=c.getContext('2d');let pts=[];function resize(){let d=devicePixelRatio||1;c.width=innerWidth*d;c.height=innerHeight*d;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(150,Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.2,a:Math.random()*.7+.15,v:Math.random()*.08+.02}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.y-=p.v;if(p.y<0)p.y=innerHeight;ctx.beginPath();ctx.fillStyle=`rgba(150,205,255,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}resize();addEventListener('resize',resize);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();

// Signature V2 pointer-reactive lighting and hero depth
const root=document.documentElement;
addEventListener('pointermove',e=>{root.style.setProperty('--px',e.clientX+'px');root.style.setProperty('--py',e.clientY+'px');});
// Portrait intentionally remains stable; ambient motion is handled in CSS.
// animate numbers/years into view without changing factual values
qa('.degree>b,.milestone>span').forEach((el,i)=>{el.animate([{opacity:.35,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,delay:200+i*110,fill:'both',easing:'cubic-bezier(.2,.7,.2,1)'});});


// Signature V3 — cinematic interaction layer
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('load',()=>{setTimeout(()=>{q('.preloader')?.classList.add('done');document.body.classList.add('page-ready')},420)});
// Split hero headline into hover-reactive characters while preserving real word spacing.
qa('.hero h1').forEach(h=>{[...h.childNodes].forEach(n=>{if(n.nodeType===3){const frag=document.createDocumentFragment();[...n.textContent].forEach(ch=>{if(ch===' '){const sp=document.createElement('span');sp.className='word-space';sp.setAttribute('aria-hidden','true');sp.textContent=' ';frag.append(sp)}else{let s=document.createElement('span');s.className='char';s.textContent=ch;frag.append(s)}});n.replaceWith(frag)}else if(n.nodeName==='EM'){const txt=n.textContent;n.textContent='';[...txt].forEach(ch=>{if(ch===' '){const sp=document.createElement('span');sp.className='word-space';sp.setAttribute('aria-hidden','true');sp.textContent=' ';n.append(sp)}else{let s=document.createElement('span');s.className='char';s.textContent=ch;n.append(s)}})}})});
qa('.hero h1 .char').forEach((ch,i)=>ch.style.setProperty('--i',i));
if(!reduced&&matchMedia('(pointer:fine)').matches){
 const label=q('.cursor-label');
 addEventListener('pointermove',e=>{label.style.left=e.clientX+'px';label.style.top=e.clientY+'px';
   qa('.hero h1 .char').forEach(ch=>{const r=ch.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy);if(d<130){const f=(130-d)/130;ch.style.transform=`translate(${dx*-0.035*f}px,${dy*-0.06*f}px) translateZ(${24*f}px)`;ch.style.textShadow=`0 0 ${26*f}px rgba(93,183,255,${.55*f})`}else{ch.style.transform='';ch.style.textShadow=''}});
 });
 qa('.feature-card,.milestone,.degree,.contact-panel').forEach(el=>{el.addEventListener('mouseenter',()=>label.classList.add('show'));el.addEventListener('mouseleave',()=>label.classList.remove('show'))});
 q('.contact-panel')?.addEventListener('pointermove',e=>{let r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--cx',e.clientX-r.left+'px');e.currentTarget.style.setProperty('--cy',e.clientY-r.top+'px')});
}
// scroll-linked cinematic transforms
let ticking=false;function cinematic(){ticking=false;const y=scrollY,h=innerHeight;
 const stage=q('.portrait-stage');if(stage&&!reduced){stage.style.transform=`translate3d(0,${Math.min(y*.11,95)}px,0) scale(${1-Math.min(y/h*.045,.045)})`;q('.hero-grid').style.transform=`translateY(${y*.08}px)`}
 qa('.interlude-word').forEach((el,i)=>{const r=el.parentElement.getBoundingClientRect();const p=Math.max(-1,Math.min(1,(h/2-(r.top+r.height/2))/h));const dir=i%2?1:-1;el.style.transform=`translateX(calc(var(--shift) + ${p*dir*18}vw))`});
 const tl=q('.timeline');if(tl){const r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(h*.75-r.top)/(r.height*.85)));q('.timeline-line i').style.width=(p*100)+'%'}
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(cinematic);ticking=true}},{passive:true});cinematic();


// Signature V4 — cursor-origin spotlight + micro-sparks on service cards
if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  qa('.feature-card').forEach(card=>{
    let last=0;
    card.addEventListener('pointerenter',()=>card.classList.add('spark'));
    card.addEventListener('pointerleave',()=>card.classList.remove('spark'));
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      card.style.setProperty('--sx',x+'px'); card.style.setProperty('--sy',y+'px');
      const now=performance.now(); if(now-last<58)return; last=now;
      const p=document.createElement('i'); p.className='spark-particle'; p.style.left=x+'px'; p.style.top=y+'px';
      const a=Math.random()*Math.PI*2,d=12+Math.random()*28;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');
      card.appendChild(p);setTimeout(()=>p.remove(),700);
    });
  });
}


// V4.3 — elegant pointer glints without moving the portrait itself
if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  qa('.glass-card,.degree').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--gx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--gy',((e.clientY-r.top)/r.height*100)+'%')});
  });
}
