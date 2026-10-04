const BG_IMAGE_1='https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2='https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';
const SPOTLIGHT_R=260;
document.querySelector('.base').style.backgroundImage=`url("${BG_IMAGE_1}")`;
const reveal=document.querySelector('.reveal');
reveal.style.backgroundImage=`url("${BG_IMAGE_2}")`;
const canvas=document.querySelector('.mask-canvas');
const ctx=canvas.getContext('2d');
const mouse={x:-999,y:-999};
const smooth={x:-999,y:-999};
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
window.addEventListener('touchmove',e=>{const touch=e.touches[0];if(touch){mouse.x=touch.clientX;mouse.y=touch.clientY}},{passive:true});
function animate(){
  smooth.x+=(mouse.x-smooth.x)*.1;smooth.y+=(mouse.y-smooth.y)*.1;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const gradient=ctx.createRadialGradient(smooth.x,smooth.y,0,smooth.x,smooth.y,SPOTLIGHT_R);
  gradient.addColorStop(0,'rgba(255,255,255,1)');gradient.addColorStop(.4,'rgba(255,255,255,1)');gradient.addColorStop(.6,'rgba(255,255,255,.75)');gradient.addColorStop(.75,'rgba(255,255,255,.4)');gradient.addColorStop(.88,'rgba(255,255,255,.12)');gradient.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(smooth.x,smooth.y,SPOTLIGHT_R,0,Math.PI*2);ctx.fill();
  const mask=`url("${canvas.toDataURL()}")`;reveal.style.maskImage=mask;reveal.style.webkitMaskImage=mask;
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate);
document.querySelector('.dig-button').addEventListener('click',()=>{mouse.x=window.innerWidth/2;mouse.y=window.innerHeight/2});
const menuButton=document.querySelector('.menu-button');const mobileMenu=document.querySelector('.mobile-menu');
menuButton.addEventListener('click',()=>{const open=mobileMenu.hidden;mobileMenu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menuButton.querySelector('svg').innerHTML=open?'<path d="M18 6 6 18M6 6l12 12"/>':'<path d="M4 7h16M4 12h16M4 17h16"/>'});
for(const group of [document.querySelector('.nav-pill'),mobileMenu]){group.querySelectorAll('button:not(.mobile-signup)').forEach(button=>button.addEventListener('click',()=>{for(const match of document.querySelectorAll('.nav-pill button,.mobile-menu button:not(.mobile-signup)'))match.classList.toggle('active',match.textContent===button.textContent);mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}))}

