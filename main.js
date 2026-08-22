const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out',fill:'both'});io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.section>div,.service-grid article,.quote').forEach(e=>io.observe(e));document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{const s=d.querySelector('summary span');if(s)s.textContent=d.open?'−':'+'}));

// Subtle cursor parallax in the hero (desktop only)
const hero=document.querySelector('.hero'), card=document.querySelector('.hero-card');
if(hero&&card&&matchMedia('(pointer:fine)').matches){hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translate3d(${x*-10}px,${y*-8}px,0)`});hero.addEventListener('mouseleave',()=>card.style.transform='translate3d(0,0,0)')}
