// Tayyub Yaqoob · portfolio interactions (multi-page)
(function(){
'use strict';

// ── Spotlight follow ──
(function(){
  const s=document.getElementById('spot');if(!s)return;
  let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
  (function tick(){cx+=(tx-cx)*.1;cy+=(ty-cy)*.1;s.style.left=cx+'px';s.style.top=cy+'px';requestAnimationFrame(tick);})();
  addEventListener('mouseleave',()=>{s.style.opacity='0'});
  addEventListener('mouseenter',()=>{s.style.opacity='1'});
})();

// ── Cursor glow on cards ──
document.querySelectorAll('.cap,.product,.feat-card,.ccn,.pub,.tl-item,.letter,.cdx,.tst,.lg-tile,.ev-item,.rec-card,.repo-card,.cred,.tst-card,.bio,.facts,.asset-card,.pick-row,.archive-card,.proof-panel,.quote-card,.contact-card').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');
    el.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});

// ── Magnet + tilt ──
document.querySelectorAll('[data-magnet]').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const dx=(e.clientX-(r.left+r.width/2))/r.width;
    const dy=(e.clientY-(r.top+r.height/2))/r.height;
    el.style.transform=`translate(${dx*6}px,${dy*6}px)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform=''});
});
document.querySelectorAll('[data-tilt]').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const dx=(e.clientX-(r.left+r.width/2))/r.width;
    const dy=(e.clientY-(r.top+r.height/2))/r.height;
    el.style.transform=`perspective(900px) rotateX(${-dy*3}deg) rotateY(${dx*3}deg) translateY(-2px)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform=''});
});

// ── Click ripple on buttons ──
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.setProperty('--rx',(e.clientX-r.left)+'px');
    btn.style.setProperty('--ry',(e.clientY-r.top)+'px');
    btn.classList.remove('rippling');
    void btn.offsetWidth;
    btn.classList.add('rippling');
  });
});

// ── Hero parallax ──
(function(){
  const els=document.querySelectorAll('[data-parallax]');
  if(!els.length)return;
  addEventListener('mousemove',e=>{
    const dx=(e.clientX-innerWidth/2)/innerWidth;
    const dy=(e.clientY-innerHeight/2)/innerHeight;
    els.forEach(el=>{
      const m=+el.dataset.parallax||4;
      el.style.transform=`translate(${dx*m}px,${dy*m}px)`;
    });
  });
})();

// ── Reveal on scroll ──
(function(){
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();

// ── Counter tick-up ──
(function(){
  const easeOut=t=>1-Math.pow(1-t,3);
  const animate=el=>{
    const target=+el.dataset.count||0;
    const dur=1200;
    const start=performance.now();
    const step=now=>{
      const t=Math.min(1,(now-start)/dur);
      el.textContent=Math.round(target*easeOut(t));
      if(t<1)requestAnimationFrame(step);
      else el.textContent=target;
    };
    requestAnimationFrame(step);
  };
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){animate(e.target);io.unobserve(e.target);}
    });
  },{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
})();

// ── Expandable case studies ──
(function(){
  document.querySelectorAll('[data-expand]').forEach(card=>{
    const head=card.querySelector('.case-l-head');
    const toggle=card.querySelector('.case-l-toggle');
    if(!head)return;
    const open=()=>{
      card.classList.toggle('open');
      if(toggle)toggle.setAttribute('aria-expanded',card.classList.contains('open'));
    };
    head.addEventListener('click',e=>{
      if(e.target.tagName==='A')return;
      open();
    });
  });
})();

// ── Publication filter ──
(function(){
  const tabs=document.querySelectorAll('.pub-tab');
  const items=document.querySelectorAll('[data-pub-grid] .pub');
  if(!tabs.length)return;
  tabs.forEach(t=>{
    t.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.remove('on'));t.classList.add('on');
      const f=t.dataset.filter;
      items.forEach(it=>{
        const m=f==='all'||it.dataset.theme===f;
        it.classList.toggle('dim',!m);
      });
    });
  });
})();

// ── Case-study filter + off-screen pause ──
(function(){
  const chips=document.querySelectorAll('.cdx-chip');
  const cards=document.querySelectorAll('.cdx[data-cat]');
  if(chips.length){
    chips.forEach(c=>{
      c.addEventListener('click',()=>{
        chips.forEach(x=>x.classList.remove('on'));c.classList.add('on');
        const f=c.dataset.cat;
        cards.forEach(card=>{
          const cats=(card.dataset.cat||'').split(/\s+/);
          card.classList.toggle('hidden',f!=='all'&&!cats.includes(f));
        });
      });
    });
  }
  const vizs=document.querySelectorAll('.cdx-viz');
  if(!vizs.length)return;
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{ e.target.classList.toggle('paused',!e.isIntersecting); });
  },{threshold:.01});
  vizs.forEach(v=>{v.classList.add('paused');io.observe(v);});
})();

// ── Evidence filter chips + jumper ──
(function(){
  const chips=document.querySelectorAll('#ev-chips .ev-chip');
  const items=document.querySelectorAll('.ev-item[data-s]');
  if(chips.length){
    chips.forEach(c=>{
      c.addEventListener('click',()=>{
        chips.forEach(x=>x.classList.remove('on'));c.classList.add('on');
        const s=c.dataset.s;
        items.forEach(it=>{
          it.classList.toggle('hidden',s!=='all'&&it.dataset.s!==s);
        });
      });
    });
  }
  const jumper=document.getElementById('ev-jumper');
  if(!jumper)return;
  const sects=[...document.querySelectorAll('section[id^="cat-"]')];
  const links=jumper.querySelectorAll('a');
  function upd(){
    const y=scrollY+160;
    let active=null;
    sects.forEach(s=>{
      const top=s.getBoundingClientRect().top+scrollY;
      if(top<=y)active=s.id;
    });
    links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+active));
  }
  addEventListener('scroll',upd,{passive:true});upd();
})();

// ── Progress bar + keyboard nav + side rail ──
(function(){
  const p=document.getElementById('progress');
  const rail=document.getElementById('rail');
  const sections=[...document.querySelectorAll('section[id],footer[id]')].filter(s=>s.id);
  if(rail){
    sections.forEach(s=>{
      const a=document.createElement('a');
      a.href='#'+s.id;
      a.dataset.label=s.getAttribute('data-screen-label')||s.id;
      a.dataset.target=s.id;
      rail.appendChild(a);
    });
    rail.classList.add('show-labels');
    setTimeout(()=>rail.classList.remove('show-labels'),2400);
  }
  function upd(){
    if(p){
      const h=document.documentElement;
      const m=h.scrollHeight-h.clientHeight;
      p.style.width=(scrollY/Math.max(1,m)*100)+'%';
    }
    let active=sections[0]?.id;
    const y=scrollY+innerHeight*0.35;
    sections.forEach(s=>{
      const top=s.getBoundingClientRect().top+scrollY;
      if(top<=y)active=s.id;
    });
    if(rail){rail.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.dataset.target===active));}
  }
  addEventListener('scroll',upd,{passive:true});upd();

  addEventListener('keydown',e=>{
    if(e.target.matches('input,textarea,button'))return;
    if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
    const y=scrollY;let target=null;
    const positions=sections.map(s=>({id:s.id,y:s.getBoundingClientRect().top+scrollY-70}));
    if(e.key==='ArrowDown')target=positions.find(pp=>pp.y>y+12);
    else target=[...positions].reverse().find(pp=>pp.y<y-12);
    if(target){scrollTo({top:target.y,behavior:'smooth'});e.preventDefault();}
  });
})();

})();
