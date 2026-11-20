(function(){
'use strict';
var C=window.CONTENT, CFG=window.SITE_CONFIG||{};
var KEY=CFG.storageKey||'mpe:v1';
var main=document.getElementById('main');
var MODS=C.modules;
var ALT={
  home:'Ilustração: quatro jovens chegando sorridentes a um escritório no primeiro dia de trabalho; um deles usa cadeira de rodas.',
  m1:'Ilustração: jovem aprendiz cumprimenta o supervisor na recepção da empresa enquanto uma colega acena ao fundo.',
  m2:'Ilustração: jovem anota tarefas em uma agenda, com o celular virado para baixo na mesa e um relógio na parede.',
  m3:'Ilustração: jovem conversa com a gestora em uma mesa de reunião, com balões de fala acima das duas.',
  m4:'Ilustração: equipe de jovens embala um pedido no estoque; cada um cuida de uma etapa e um deles trabalha em cadeira de rodas.',
  m5:'Ilustração: jovem percebe um erro no computador e uma colega mais experiente se aproxima para ajudar com calma.',
  m6:'Ilustração: jovem apresenta uma ideia à equipe diante de um quadro com setas e formas.',
  m7:'Ilustração: jovem com mochila e livros sobe uma escada em direção à cidade, com ícones de estudo e tecnologia pelo caminho.',
  bonus:'Ilustração: jovem aprendiz revisa um contrato com uma orientadora; ao lado, um escudo com sinal de confirmação e uma balança.',
  final:'Ilustração: quatro jovens comemoram juntos ao ar livre, com confetes.'
};
var ICON={
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  chev:'<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back:'<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  quote:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  alert:'<svg viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
  copy:'<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  down:'<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  ext:'<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  retry:'<svg viewBox="0 0 24 24"><path d="M4 4v6h6M20 20v-6h-6"/><path d="M5.5 15A8 8 0 0 0 20 14M18.5 9A8 8 0 0 0 4 10"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>',
  map:'<svg viewBox="0 0 24 24"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
};
var BADGES={
  m1:{emoji:'👋',name:'Primeiro passo',line:'Você chegou, se apresentou e já saiu na frente.',xp:100},
  m2:{emoji:'⏰',name:'Responsa',line:'Pequenas atitudes, grandes resultados. Missão cumprida.',xp:100},
  m3:{emoji:'💬',name:'Boa prosa',line:'Falar, ouvir e se posicionar com respeito é um superpoder.',xp:100},
  m4:{emoji:'🤝',name:'No time',line:'Ninguém cresce sozinho. Você já entendeu o jogo em equipe.',xp:100},
  m5:{emoji:'🌱',name:'Levanta e segue',line:'Errar faz parte. O que conta é o que você faz depois.',xp:100},
  m6:{emoji:'⚡',name:'Mão na massa',line:'Iniciativa com responsabilidade: esse é o seu diferencial.',xp:100},
  m7:{emoji:'🚀',name:'Olho no futuro',line:'O primeiro emprego é só o começo. E você já traçou o rumo.',xp:100},
  bonus:{emoji:'🛡️',name:'Meus direitos',line:'Conhecer seus direitos também é parte da jornada.',xp:50}
};
var SAY={
  idle:['Bora nessa?','Tô com você nessa jornada.','Um passo de cada vez.'],
  start:['Primeira missão: vamos com calma e confiança.','Respira. Você consegue.'],
  yay:['Isso! Mandou bem.','Acertou em cheio. 🔥','Boa, pode ter orgulho.'],
  think:['Hmm, vamos pensar juntos.','Quase. Tenta de outro jeito.','Errou faz parte — olha a dica.'],
  win:['Missão cumprida!','Selou mais uma conquista.','Você tá on fire.']
};

/* ---------- estado local (só neste aparelho) ---------- */
var S=load();
function emptyState(){return {done:{},ans:{},checks:[],ex:[],plan:[],badges:{},sound:false,name:'',leadId:'',leadToken:'',leadSkipped:false}}
function load(){
  var base=emptyState();
  try{Object.assign(base,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
  if(!base.badges) base.badges={};
  if(base.sound!==true) base.sound=false;
  if(typeof base.name!=='string') base.name='';
  if(typeof base.leadId!=='string') base.leadId='';
  if(typeof base.leadToken!=='string') base.leadToken='';
  if(base.leadSkipped!==true) base.leadSkipped=false;
  MODS.forEach(function(m){if(base.done[m.id]&&!base.badges[m.id]) base.badges[m.id]=true});
  return base;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function doneCount(){return MODS.filter(function(m){return S.done[m.id]}).length}
function xpTotal(){var n=doneCount()*100;if(S.badges&&S.badges.bonus)n+=50;return n}
function reduceMotion(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function img(k,cls,eager,small){var sz=small?'(min-width:980px) 340px, (min-width:620px) 50vw, 640px':'(min-width:1080px) 1040px, (min-width:700px) 90vw, 640px';return '<img class="'+(cls||'')+'" src="img/'+k+'-640.webp" srcset="img/'+k+'-640.webp 640w, img/'+k+'.webp 1280w" sizes="'+sz+'" width="1280" height="720" alt="'+esc(ALT[k])+'"'+(eager?' fetchpriority="high"':' loading="lazy"')+' decoding="async">'}
function strip(h){var d=document.createElement('div');d.innerHTML=h;return d.textContent}

function blocks(arr){return arr.map(function(b){
  switch(b.t){
    case 'p': return '<p>'+b.html+'</p>';
    case 'em': return '<p class="em-line">'+b.html+'</p>';
    case 'quote': return '<p class="quote">'+ICON.quote+b.text+'</p>';
    case 'ul': return '<ul class="ticks">'+b.items.map(function(i){return '<li>'+ICON.check+'<span>'+i+'</span></li>'}).join('')+'</ul>';
    case 'ol': return '<ol class="nums">'+b.items.map(function(i){return '<li><span>'+i+'</span></li>'}).join('')+'</ol>';
    case 'tip': var warn=/Importante|Atenção/.test(b.label);
      return '<aside class="tip'+(warn?' tip--warn':'')+'">'+(warn?ICON.alert:ICON.bulb)+'<div><strong>'+esc(b.label)+':</strong> '+b.html+'</div></aside>';
    case 'pair': var k=/pouco clara/i.test(b.label)?'bad':(/adequada/i.test(b.label)?'good':'step');
      return '<div class="pair pair--'+k+(b.quoted?' pair--q':'')+'"><div class="pair__l">'+(k==='bad'?ICON.alert:(k==='good'?ICON.check:ICON.arrow))+esc(b.label)+'</div><p class="pair__t">'+b.text+'</p></div>';
  }
  return '';
}).join('')}

function acc(items,prefix,kicker){
  return '<div class="acc">'+items.map(function(it,i){
    var id=prefix+'-'+(i+1), open=i===0;
    return '<section class="acard'+(open?' is-open':'')+'"><h3 class="acard__h"><button class="acard__btn" type="button" aria-expanded="'+open+'" aria-controls="'+id+'" id="'+id+'-b">'+
      '<span class="acard__num" aria-hidden="true">'+(i+1)+'</span><span class="acard__t"><span class="acard__k">'+kicker+' '+(i+1)+'</span>'+esc(it.title||it.q)+'</span><span class="acard__chev" aria-hidden="true">'+ICON.chev+'</span></button></h3>'+
      '<div class="acard__p" id="'+id+'" role="region" aria-labelledby="'+id+'-b"'+(open?'':' hidden')+'>'+blocks(it.blocks)+'</div></section>';
  }).join('')+'</div>';
}

function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function buddyHTML(mood,msg,cls){
  var face={idle:'😊',start:'🙌',yay:'🔥',think:'🤔',win:'😎'}[mood]||'😊';
  return '<div class="buddy'+(cls?' '+cls:'')+'" data-mood="'+mood+'"><span class="buddy__face" aria-hidden="true">'+face+'</span><p class="buddy__say">'+esc(msg||pick(SAY[mood]||SAY.idle))+'</p></div>';
}

/* ---------- views ---------- */
function startHref(){
  if(!S.leadToken && !S.leadSkipped && doneCount()===0) return '#/ola';
  return '#/trilha';
}
function digits(s){return String(s||'').replace(/\D/g,'')}
function maskWa(v){
  var d=digits(v);
  if(d.startsWith('55')) d=d.slice(2);
  d=d.slice(0,11);
  if(d.length===0) return '';
  if(d.length<=2) return '('+d;
  if(d.length<=6) return '('+d.slice(0,2)+') '+d.slice(2);
  if(d.length<=10) return '('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);
  return '('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);
}
function validWa(v){
  var d=digits(v);
  if(d.startsWith('00')) d=d.slice(2);
  if(d.startsWith('55') && (d.length===12||d.length===13)) {}
  else if(d.length===10||d.length===11) d='55'+d;
  else return false;
  if(d.length!==12 && d.length!==13) return false;
  if(d.charAt(2)==='0') return false;
  if(d.length===13 && d.charAt(4)!=='9') return false;
  return true;
}
function progressPayload(){
  return {token:S.leadToken,modules_done:MODS.filter(function(m){return S.done[m.id]}).map(function(m){return m.id}).concat(S.badges&&S.badges.bonus?['bonus']:[]),xp:xpTotal(),completed:doneCount()===7,name:S.name||''};
}
var syncTimer=null;
function syncProgress(){
  if(!S.leadId||!S.leadToken) return;
  clearTimeout(syncTimer);
  var body=JSON.stringify(progressPayload());
  var go=function(){fetch('/api/primeiro-emprego/leads/'+S.leadId,{method:'PATCH',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){})};
  syncTimer=setTimeout(go,400);
}
function sitText(m){
  return (m.activity.situation||[]).map(function(b){
    var d=document.createElement('div');d.innerHTML=b.html||b.text||'';return d.textContent.trim();
  }).filter(Boolean).join(' ');
}
function lessonSteps(m){
  var L=window.LESSONS&&window.LESSONS[m.id]||{ideas:[],teaches:[]};
  var s=[{id:'hook',kind:'hook'}];
  (L.ideas||[]).forEach(function(it,i){s.push({id:'idea'+(i+1),kind:'idea',item:it})});
  (L.teaches||[]).forEach(function(it,i){s.push({id:'t'+(i+1),kind:'teach',item:it,n:i+1})});
  if(m.checklist)s.push({id:'pack',kind:'pack'});
  if(m.exercise)s.push({id:'write',kind:'write'});
  if(m.plan)s.push({id:'plan',kind:'plan'});
  s.push({id:'quiz',kind:'quiz'});
  s.push({id:'win',kind:'win'});
  return s;
}
function lessonPath(m,id){return '#/'+m.id+(id&&id!=='hook'?'/'+id:'')}
var ART_CROP=['top','left','center','right','bot'];
function lessonArt(m,i,eager){return '<div class="lesson__visual">'+img(m.id,'lesson__art lesson__art--'+ART_CROP[(i||0)%5],!!eager)+'<span class="lesson__num" aria-hidden="true">'+String(m.n).padStart(2,'0')+'</span></div>'}
function syncDock(){
  var btn=document.querySelector('.dock [data-next]');
  if(!btn)return;
  var lesson=document.querySelector('.lesson');
  var kind=lesson?lesson.getAttribute('data-kind'):'';
  var off=false;
  if(kind==='quiz'){
    var q=document.querySelector('[data-quiz]');
    off=!(q&&S.ans[q.dataset.quiz]);
  }
  if(kind==='pack'){
    var box=document.querySelectorAll('[data-check]');
    var n=0;box.forEach(function(c){if(c.checked)n++});
    off=n!==box.length;
  }
  if(off)btn.setAttribute('aria-disabled','true'); else btn.removeAttribute('aria-disabled');
}

function viewOla(){
  return '<section class="lead"><div class="lead__hero"><div class="wrap lead__in">'+
    '<p class="kicker">Ficha do kit</p><h1 tabindex="-1">Um oi pra <em>começar</em> a jornada</h1>'+
    '<p class="lead__sub">Leva menos de 1 minuto. A ACIEG Jovem acompanha você e pode entrar em contato.</p></div></div>'+
    '<div class="wrap"><form class="lead__form" id="leadForm" novalidate>'+
    '<label for="ln">Como você se chama?</label><input class="lin" id="ln" name="nome" type="text" autocomplete="name" maxlength="80" required placeholder="Seu nome">'+
    '<label for="lw">WhatsApp</label><input class="lin" id="lw" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" required placeholder="(62) 99999-9999">'+
    '<label for="li">Idade</label><input class="lin" id="li" name="idade" type="number" inputmode="numeric" min="14" max="40" required placeholder="16">'+
    '<details class="lead__more"><summary>E-mail e cidade <span>(opcional)</span></summary>'+
    '<label for="lem">E-mail</label><input class="lin" id="lem" name="email" type="email" autocomplete="email" maxlength="120" placeholder="seu@email.com">'+
    '<label for="lcid">Cidade</label><input class="lin" id="lcid" name="cidade" type="text" maxlength="80" placeholder="Goiânia"></details>'+
    '<label class="lead__lgpd"><input type="checkbox" id="lcons" name="consent" required><span>Autorizo a ACIEG Jovem a usar esses dados para acompanhar minha jornada e entrar em contato.</span></label>'+
    '<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '<div class="lead__err" id="leadErr" role="alert"></div>'+
    '<button type="submit" class="btn btn--sun btn--block" id="leadGo">Começar a jornada'+ICON.arrow+'</button>'+
    '<button type="button" class="btn btn--ghost btn--block" data-lead-skip>Quero só explorar por agora</button>'+
    '</form></div></section>';
}
function viewHome(){
  var h=C.home, started=doneCount()>0, all=doneCount()===7;
  var href=all?'#/final':startHref();
  var label=all?'Ver meu certificado':(started?'Continuar jornada':esc(h.cta));
  var names=MODS.map(function(m,i){return 'Missão '+String(m.n).padStart(2,'0')+' · '+(h.learn[i]&&h.learn[i].name||m.short.name)}).concat(['Bônus · Direitos']);
  var tick=esc(names.join('  ·  '));
  return '<section class="hero hero--poster">'+
    '<div class="hero__stage">'+
    '<div class="hero__visual">'+
    '<span class="hero__sticker hero__sticker--kit">Kit da jornada</span>'+
    '<div class="hero__card">'+img('home','',true)+'<div class="hero__card-meta"><span>Crachá do primeiro emprego</span><b>7 missões pra jogar</b></div></div>'+
    '<span class="hero__sticker hero__sticker--xp">Até +750 XP</span>'+
    '</div>'+
    '<div class="hero__copy">'+
    '<p class="hero__kicker">Guia da ACIEG Jovem · 7 missões</p>'+
    '<h1><span class="hero__line"><span>Meu</span></span><span class="hero__line"><span>Primeiro</span></span><span class="hero__line"><span>Emprego.</span></span><em class="hero__now">E Agora?</em></h1>'+
    '<p class="hero__sub">'+esc(h.subtitle)+'</p>'+
    '</div></div>'+
    '<div class="hero__tick" aria-hidden="true"><div class="hero__tick-track"><span>'+tick+'  ·  '+tick+'  ·  </span></div></div>'+
    '<div class="hero__cta"><a class="btn btn--sun" href="'+href+'">'+label+ICON.arrow+'</a></div>'+
    '</section>';
}
function viewTrail(){
  var h=C.home;
  var next=MODS.filter(function(m){return !S.done[m.id]})[0];
  var all=doneCount()===7;
  var first=S.name?S.name.trim().split(' ')[0]:'';
  var title=first?('Boa, '+first+'. Aqui está o mapa.'):'Conseguiu o emprego. Aqui está o mapa.';
  var nodes=MODS.map(function(m,i){
    var d=!!S.done[m.id], isNext=!!(next&&next.id===m.id), locked=!d&&!isNext&&!!next&&m.n>next.n;
    var b=BADGES[m.id]||{};
    return '<a class="trail__node'+(d?' is-done':'')+(isNext?' is-next':'')+(locked?' is-locked':'')+'" href="#/'+m.id+'">'+
      '<span class="trail__num">'+(d?ICON.check:(locked?ICON.lock:String(m.n).padStart(2,'0')))+'</span>'+
      '<span class="trail__meta"><span class="trail__k">Missão '+String(m.n).padStart(2,'0')+(d?' · feita':(isNext?' · agora':(locked?' · bloqueada':'')))+'</span>'+
      '<span class="trail__t">'+esc(h.learn[i].name)+'</span>'+
      '<span class="trail__d">'+esc(h.learn[i].desc)+'</span></span>'+
      (d?'<span class="trail__badge" aria-hidden="true">'+b.emoji+'</span>':'')+'</a>';
  }).join('');
  var cta=all
    ?'<a class="btn btn--sun btn--block" href="#/final">Ver certificado'+ICON.arrow+'</a>'
    :'<a class="btn btn--sun btn--block" href="#/'+(next||MODS[0]).id+'">'+(doneCount()?'Continuar missão '+String(next.n).padStart(2,'0'):'Começar missão 01')+ICON.arrow+'</a>';
  return '<section class="trail" id="modulos"><div class="trail__intro"><p class="kicker">Sua trilha</p><h2 id="aprender">'+esc(title)+'</h2><p class="trail__lead">7 missões curtas. Uma ideia por tela. Sem apostila.</p></div>'+
    '<div class="trail__board"><svg class="trail__snake" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M14 7C14 13 86 15 86 21C86 27 14 29 14 35C14 41 86 43 86 49C86 55 14 57 14 63C14 69 86 71 86 77C86 83 14 85 14 91"/></svg><div class="trail__path">'+nodes+'</div></div>'+
    '<a class="bonus-call" href="#/bonus"><span class="tag">Bônus</span><b>'+esc(h.bonusCall.replace(/^Bônus:\s*/,''))+'</b><span class="go">'+ICON.shield+'Abrir quando quiser'+ICON.arrow+'</span></a>'+
    '<div class="trail__cta">'+cta+'</div>'+
    (S.leadToken?'':'<p class="lead__chip"><a href="#/ola">Quer que a ACIEG Jovem acompanhe você? É um oi rápido.</a></p>')+
    '</section>';
}

function activityHTML(m){
  var a=m.activity;
  return '<section class="lesson lesson--quiz" data-kind="quiz"><div class="lesson__stage">'+
   lessonArt(m,3)+
   '<div class="lesson__copy">'+
   '<p class="kicker">Missão '+String(m.n).padStart(2,'0')+' · sua vez</p>'+
   '<p class="sim__situ">'+esc(sitText(m))+'</p>'+
   '<h1 class="sim__q" id="sim-'+m.id+'" tabindex="-1">'+a.question+'</h1>'+
   '<div class="opts" role="group" aria-labelledby="sim-'+m.id+'" data-quiz="'+m.id+'">'+a.options.map(function(o){
     return '<button type="button" class="opt" data-k="'+o.key+'" aria-pressed="false"><span class="opt__k">'+o.key+'</span><span class="opt__t">'+o.html+'</span><span class="opt__flag">'+ICON.check+'<span class="sr">Alternativa correta</span></span></button>'}).join('')+'</div>'+
   '<div class="fb" aria-live="polite" tabindex="-1"></div></div></div></section>';
}
function viewLesson(m, stepId){
  var steps=lessonSteps(m);
  var i=steps.findIndex(function(s){return s.id===stepId});
  if(i<0)i=0;
  var st=steps[i];
  var L=window.LESSONS&&window.LESSONS[m.id]||{};
  var kicker='Missão '+String(m.n).padStart(2,'0')+' de 07';
  var pct=Math.round(i/Math.max(1,steps.length-1)*100);
  var top='<div class="lesson__top"><a class="lesson__exit" href="#/trilha">Trilha</a><div class="lesson__bar" role="progressbar" aria-valuemin="1" aria-valuemax="'+steps.length+'" aria-valuenow="'+(i+1)+'" aria-label="Progresso da missão"><span style="width:'+pct+'%"></span></div><span class="lesson__count">'+(i+1)+'/'+steps.length+'</span></div>';
  var body='';
  if(st.kind==='hook'){
    body='<section class="lesson lesson--navy" data-kind="hook"><div class="lesson__stage">'+
      lessonArt(m,0,true)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+'</p>'+
      '<h1 tabindex="-1">'+esc(m.short.name)+'</h1>'+
      '<p class="lesson__hook">'+esc(L.hook||m.short.desc)+'</p>'+
      '<p class="lesson__sub">Uma ideia por tela. Leva poucos minutos.</p></div>'+
      '</div></section>';
  }else if(st.kind==='idea'){
    body='<section class="lesson" data-kind="idea"><div class="lesson__stage">'+
      lessonArt(m,(st.id==='idea2'?2:1))+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · ideia</p>'+
      '<h1 tabindex="-1">'+esc(st.item.t)+'</h1>'+
      '<p class="lesson__d">'+esc(st.item.d)+'</p></div></div></section>';
  }else if(st.kind==='teach'){
    var items=(st.item.items||[]).map(function(t){return '<li>'+esc(t)+'</li>'}).join('');
    body='<section class="lesson" data-kind="teach"><div class="lesson__stage">'+
      lessonArt(m,st.n||0)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · '+st.n+' / 5</p>'+
      '<h1 tabindex="-1">'+esc(st.item.t)+'</h1>'+
      '<p class="lesson__d">'+esc(st.item.d)+'</p>'+
      (items?'<ul class="lesson__items">'+items+'</ul>':'')+
      (st.item.tip?'<p class="lesson__tip">'+esc(st.item.tip)+'</p>':'')+
      '</div></div></section>';
  }else if(st.kind==='pack'){
    var c=m.checklist;
    body='<section class="lesson" data-kind="pack"><div class="lesson__stage">'+
      lessonArt(m,2)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · kit</p>'+
      '<h1 tabindex="-1">Arrume a mochila</h1>'+
      '<p class="lesson__d">Toque em cada compromisso para guardar no kit.</p>'+
      '<ul class="pack checks">'+c.items.map(function(t,j){return '<li><label class="check"><input type="checkbox" data-check="'+j+'"'+(S.checks[j]?' checked':'')+'><span class="check__box" aria-hidden="true">'+ICON.check+'</span><span>'+esc(t)+'</span></label></li>'}).join('')+'</ul>'+
      '<p class="check-count" aria-live="polite"></p><div class="done-msg" role="status">'+ICON.star+'<span>'+esc(c.done)+'</span></div></div></div></section>';
  }else if(st.kind==='write'){
    var e=m.exercise;
    body='<section class="lesson" data-kind="write"><div class="lesson__stage">'+
      lessonArt(m,4)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · sua vez</p>'+
      '<h1 tabindex="-1">'+esc(e.title)+'</h1>'+
      e.fields.map(function(f,j){return '<label class="field"><span class="field__l">'+esc(f)+'</span><textarea data-ex="'+j+'" rows="2">'+esc(S.ex[j]||'')+'</textarea></label>'}).join('')+
      '<div class="row-btns"><button type="button" class="btn btn--blue" data-copy="ex">'+ICON.copy+'Copiar respostas</button></div><p class="saved">'+ICON.check+'Salvo neste aparelho.</p></div></div></section>';
  }else if(st.kind==='plan'){
    var p=m.plan;
    body='<section class="lesson" data-kind="plan" id="plano"><div class="lesson__stage">'+
      lessonArt(m,1)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · plano</p>'+
      '<h1 tabindex="-1">'+esc(p.title)+'</h1>'+
      '<p class="lesson__d">'+esc(p.lead)+'</p>'+
      p.fields.map(function(f,j){return '<label class="field"><span class="field__l">'+esc(f)+'</span><textarea data-plan="'+j+'" rows="2">'+esc(S.plan[j]||'')+'</textarea></label>'}).join('')+
      '<div class="row-btns"><button type="button" class="btn btn--sun" data-download="plan">'+ICON.down+esc(p.button)+'</button><button type="button" class="btn btn--ghost" data-copy="plan">'+ICON.copy+'Copiar plano</button></div><p class="saved">'+ICON.check+'Salvo só neste aparelho.</p></div></div></section>';
  }else if(st.kind==='quiz'){
    body=activityHTML(m);
  }else if(st.kind==='win'){
    var b=BADGES[m.id]||{};
    body='<section class="lesson lesson--win" data-kind="win"><div class="confetti" aria-hidden="true"></div><div class="lesson__stage">'+
      lessonArt(m,0)+
      '<div class="lesson__copy"><p class="kicker">'+kicker+' · concluída</p>'+
      '<div class="badge-sticker" aria-hidden="true">'+(b.emoji||'')+'</div>'+
      '<p class="lesson__xp">+'+(b.xp||100)+' XP</p>'+
      '<h1 tabindex="-1">Missão cumprida</h1>'+
      '<p class="lesson__hook">'+esc(b.name||'')+'</p>'+
      '<p class="lesson__done">'+esc(m.conclusion)+'</p></div></div></section>';
  }
  var next=steps[i+1], prev=steps[i-1];
  var label=st.kind==='hook'?'Começar':(st.kind==='win'?((m.n===7)?'Ir para o certificado':'Ir para a missão '+String(m.n+1).padStart(2,'0')):'Próximo');
  var dock;
  if(st.kind==='win'){
    dock='<div class="dock"><a class="dock__back" href="#/trilha">Trilha</a><button type="button" class="btn btn--sun" data-complete="'+m.id+'">'+label+ICON.arrow+'</button></div>';
  }else{
    dock='<div class="dock"><a class="dock__back" href="'+(prev?lessonPath(m,prev.id):'#/trilha')+'">'+(prev?'Voltar':'Trilha')+'</a><a class="btn btn--sun" data-next href="'+(next?lessonPath(m,next.id):lessonPath(m,'win'))+'">'+label+ICON.arrow+'</a></div>';
  }
  return top+body+dock;
}

function viewBonus(){
  var b=C.bonus;
  return '<section class="trail" id="bonus"><div class="trail__intro"><p class="kicker">'+ICON.shield+' '+esc(b.label)+'</p><h2 tabindex="-1">'+esc(b.title)+'</h2></div>'+
   (CFG.bonusReviewPending?'<p class="review">'+ICON.alert+'<span><strong>Conteúdo em revisão.</strong> Este módulo está passando por revisão antes da publicação definitiva.</span></p>':'')+
   '<section class="opening" aria-label="Abertura">'+blocks(b.intro)+'</section>'+
   '<div class="faq">'+acc(b.faq,'faq','Pergunta')+'</div>'+
   '<a class="btn btn--blue btn--block mte" href="'+esc(b.linkUrl)+'" target="_blank" rel="noopener">'+esc(b.linkLabel)+ICON.ext+'<span class="sr-only"> (abre em nova aba)</span></a>'+
   '<nav class="pager"><a href="#/trilha">'+ICON.back+'Trilha</a><a href="#/final">Página final'+ICON.arrow+'</a></nav></section>';
}

function viewFinal(){
  var f=C.final, bt=f.buttons;
  var colors=['#FFC83D','#F59527','#2BC48A','#FFFFFF','#8FB0FF'], conf='';
  for(var i=0;i<46;i++){conf+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+colors[i%5]+';animation-delay:'+(Math.random()*1.4).toFixed(2)+'s;transform:rotate('+(i*37)+'deg)"></i>'}
  var n=doneCount();
  var badges='<ul class="fin__badges" aria-label="Conquistas desbloqueadas">'+MODS.map(function(m){var b=BADGES[m.id], on=S.badges[m.id];return '<li'+(on?'':' style="opacity:.35"')+'><span class="badge-sticker badge-sticker--sm" aria-hidden="true">'+(on?b.emoji:'🔒')+'</span><span>'+esc(b.name)+'</span></li>'}).join('')+'</ul>';
  return '<section class="fin"><div class="confetti" aria-hidden="true">'+conf+'</div><p class="kicker fin__k">Kit completo</p><div class="badge-done"><span>'+ICON.check+n+' de 7 módulos concluídos · '+xpTotal()+' XP</span></div>'+
   '<h1 tabindex="-1">'+esc(f.title)+'</h1>'+badges+'<div class="fin__art">'+img('final','',true)+'</div>'+
   '<div class="fin__cert"><div class="fin__cert-box"><label for="certName">Seu nome no certificado (opcional)</label><input id="certName" type="text" maxlength="40" autocomplete="nickname" placeholder="Ex.: Ana Souza" value="'+esc(S.name||'')+'" data-cert-name><button type="button" class="btn btn--sun" data-cert>'+ICON.down+'Baixar meu certificado</button><p>Imagem pra guardar ou compartilhar. O certificado é gerado neste aparelho.</p></div></div>'+
   '<div style="padding:0 20px"><div class="fin__card">'+blocks(f.blocks)+'<div class="fin__btns">'+
   '<a class="btn btn--ghost" href="#modulos" data-revisit>'+ICON.map+esc(bt[0])+'</a>'+
   '<button type="button" class="btn btn--sun" data-download="plan" data-from-final>'+ICON.down+esc(bt[1])+'</button>'+
   '<a class="btn btn--blue" href="'+esc(CFG.aciegUrl)+'" target="_blank" rel="noopener">'+esc(bt[2])+ICON.ext+'</a></div></div></div></section>';
}

/* ---------- drawer & progress ---------- */
function updateProgress(){
  var n=doneCount(), xp=xpTotal();
  document.querySelector('.progress__fill').style.width=(n/7*100)+'%';
  document.querySelector('.progress__n').textContent=n;
  document.querySelector('.progress__bar').setAttribute('aria-valuenow',n);
  document.querySelector('.progress__bar').setAttribute('aria-valuetext',n+' de 7 módulos concluídos, '+xp+' XP');
  var xpEl=document.querySelector('.xp__n');
  if(xpEl){
    var prev=parseInt(xpEl.textContent,10)||0;
    xpEl.textContent=xp;
    if(xp>prev){var chip=xpEl.parentNode;chip.classList.remove('is-bump');void chip.offsetWidth;chip.classList.add('is-bump')}
  }
  var route=(location.hash.replace(/^#\/?/,'').split('?')[0]||'home');
  var top=route.split('/')[0]||'home';
  document.querySelector('.drawer__list').innerHTML='<li><a href="#/"'+(top==='home'||top===''?' aria-current="page"':'')+'><span class="dnum">'+ICON.map+'</span><span><span class="dname">Início</span></span></a></li>'+
   '<li><a href="#/trilha"'+(top==='trilha'?' aria-current="page"':'')+'><span class="dnum">'+ICON.map+'</span><span><span class="dname">Trilha</span></span></a></li>'+
   MODS.map(function(m){return '<li class="'+(S.done[m.id]?'is-done':'')+'"><a href="#/'+m.id+'"'+(top===m.id?' aria-current="page"':'')+'><span class="dnum">'+(S.done[m.id]?ICON.check:m.n)+'</span><span><span class="dlabel">Missão '+m.n+(S.done[m.id]?' · concluída':'')+'</span><span class="dname">'+esc(m.short.name)+'</span></span></a></li>'}).join('')+
   '<li class="drawer__sep" aria-hidden="true"></li><li><a href="#/bonus"'+(route==='bonus'?' aria-current="page"':'')+'><span class="dnum" style="background:var(--mint-l);color:var(--mint-d)">'+ICON.shield+'</span><span><span class="dlabel">Bônus</span><span class="dname">'+esc(C.bonus.title)+'</span></span></a></li>'+
   '<li><a href="#/final"'+(route==='final'?' aria-current="page"':'')+'><span class="dnum" style="background:var(--sun-l);color:#9A6B00">'+ICON.star+'</span><span><span class="dname">Página final</span></span></a></li>';
}
var drawer=document.getElementById('drawer'), menuBtn=document.querySelector('.menu-btn');
function openDrawer(o){drawer.hidden=!o;menuBtn.setAttribute('aria-expanded',o);if(o){drawer.querySelector('.drawer__close').focus()}else{menuBtn.focus()}}
menuBtn.addEventListener('click',function(){openDrawer(true)});
drawer.addEventListener('click',function(e){if(e.target===drawer||e.target.closest('.drawer__close'))openDrawer(false);else if(e.target.closest('a')){drawer.hidden=true;menuBtn.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!drawer.hidden)openDrawer(false);if(e.key==='Escape'&&!badgePop.hidden)closeBadgePop()});

/* ---------- som (off por padrão) ---------- */
var soundBtn=document.querySelector('.sound-btn');
function syncSoundBtn(){
  soundBtn.classList.toggle('is-on',!!S.sound);
  soundBtn.setAttribute('aria-pressed',S.sound?'true':'false');
  soundBtn.setAttribute('aria-label',S.sound?'Desativar sons':'Ativar sons');
  soundBtn.title=S.sound?'Sons ligados':'Sons desligados';
}
function beep(kind){
  if(!S.sound||reduceMotion())return;
  try{
    var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    var ctx=beep.ctx||(beep.ctx=new AC());
    if(ctx.state==='suspended')ctx.resume();
    var o=ctx.createOscillator(), g=ctx.createGain(), now=ctx.currentTime;
    o.type='sine';
    if(kind==='ok'){o.frequency.setValueAtTime(523,now);o.frequency.setValueAtTime(784,now+.07)}
    else if(kind==='ko'){o.frequency.setValueAtTime(220,now);o.frequency.setValueAtTime(174,now+.1)}
    else if(kind==='badge'){o.frequency.setValueAtTime(392,now);o.frequency.setValueAtTime(523,now+.1);o.frequency.setValueAtTime(784,now+.2)}
    else o.frequency.setValueAtTime(440,now);
    g.gain.setValueAtTime(0.06,now);g.gain.exponentialRampToValueAtTime(0.001,now+.28);
    o.connect(g);g.connect(ctx.destination);o.start(now);o.stop(now+.3);
  }catch(e){}
}
soundBtn.addEventListener('click',function(){S.sound=!S.sound;save();syncSoundBtn();if(S.sound)beep('ok')});
syncSoundBtn();

/* ---------- quiz ---------- */
function reactBuddy(mood,msg){
  main.querySelectorAll('.buddy').forEach(function(el){
    el.setAttribute('data-mood',mood);
    var face=el.querySelector('.buddy__face');
    if(face)face.textContent={idle:'😊',start:'🙌',yay:'🔥',think:'🤔',win:'😎'}[mood]||'😊';
    var say=el.querySelector('.buddy__say');
    if(say)say.textContent=msg||pick(SAY[mood]||SAY.idle);
  });
}
function showAnswer(box,mid,key,animate){
  var m=MODS.filter(function(x){return x.id===mid})[0], a=m.activity, ok=key===a.correct;
  box.classList.add('is-answered');
  box.querySelectorAll('.opt').forEach(function(b){var k=b.dataset.k;b.classList.toggle('is-correct',k===a.correct);b.classList.toggle('is-wrong',k===key&&!ok);b.setAttribute('aria-pressed',k===key);b.setAttribute('aria-disabled','true')});
  var fb=box.parentNode.querySelector('.fb');
  fb.className='fb is-on '+(ok?'fb--ok':'fb--ko');
  fb.innerHTML='<div class="fb__h"><span class="fb__ic" aria-hidden="true">'+(ok?ICON.check:ICON.bulb)+'</span>'+(ok?'Você acertou!':'Vamos pensar juntos')+'</div><p>'+(ok?a.ok:a.ko)+'</p>'+
    '<div class="row-btns"><button type="button" class="btn btn--ghost" data-retry="'+mid+'">'+ICON.retry+'Tentar de novo</button></div>';
  var lesson=document.querySelector('.lesson--quiz');
  if(lesson) lesson.classList.add('is-answered');
  if(animate){
    fb.focus({preventScroll:true});
    beep(ok?'ok':'ko');
    setTimeout(function(){try{fb.scrollIntoView({block:'center',behavior:reduceMotion()?'auto':'smooth'})}catch(e){}},80);
  }else{
    setTimeout(function(){try{fb.scrollIntoView({block:'nearest',behavior:'auto'})}catch(e){}},40);
  }
  syncDock();
}
function resetQuiz(mid){
  var box=document.querySelector('[data-quiz="'+mid+'"]');
  box.classList.remove('is-answered');
  box.querySelectorAll('.opt').forEach(function(b){b.classList.remove('is-correct','is-wrong');b.setAttribute('aria-pressed','false');b.removeAttribute('aria-disabled')});
  var fb=box.parentNode.querySelector('.fb');fb.className='fb';fb.innerHTML='';
  var lesson=document.querySelector('.lesson--quiz');if(lesson)lesson.classList.remove('is-answered');
  delete S.ans[mid];save();box.querySelector('.opt').focus();
  syncDock();
}

/* ---------- plano / copiar / baixar ---------- */
function textOf(kind){
  var m=kind==='plan'?MODS[6].plan:MODS[4].exercise, vals=kind==='plan'?S.plan:S.ex;
  var out=[m.title,'Meu Primeiro Emprego. E Agora? | ACIEG Jovem',''];
  m.fields.forEach(function(f,i){out.push(f);out.push((vals[i]||'').trim()||'—');out.push('')});
  return out.join('\n');
}
function toast(t){var el=document.querySelector('.toast');el.textContent=t;el.classList.add('is-on');clearTimeout(toast.t);toast.t=setTimeout(function(){el.classList.remove('is-on')},2600)}
function copy(t){
  function fallback(){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(ta);toast(ok?'Copiado!':'Não foi possível copiar. Selecione o texto e copie manualmente.')}
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){toast('Copiado!')},fallback)}else fallback();
}
function download(){
  var blob=new Blob(['\ufeff'+textOf('plan')],{type:'text/plain;charset=utf-8'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='meu-plano-de-desenvolvimento.txt';document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);toast('Plano baixado!');
}
function hasPlan(){return S.plan.some(function(v){return v&&v.trim()})}

function checklistState(){
  var box=document.querySelectorAll('[data-check]');if(!box.length)return;
  var n=0;box.forEach(function(c){if(c.checked)n++});
  var cnt=document.querySelector('.check-count');if(cnt)cnt.textContent=n+' de '+box.length+' no kit';
  var dm=document.querySelector('.done-msg');if(dm)dm.classList.toggle('is-on',n===box.length);
  syncDock();
}

/* ---------- conquistas + certificado ---------- */
var badgePop=document.getElementById('badgePop');
var pendingGo=null, badgeTimer=0;
function flyXp(amount, done){
  var dest=document.querySelector('.xp');
  var src=document.querySelector('.lesson__xp');
  function finish(){updateProgress();if(done)done()}
  if(!dest||reduceMotion()||!src){finish();return}
  var a=src.getBoundingClientRect(), b=dest.getBoundingClientRect();
  var el=document.createElement('div');
  el.className='xp-fly';
  el.textContent='+'+amount+' XP';
  el.style.left=Math.round(a.left)+'px';
  el.style.top=Math.round(a.top)+'px';
  document.body.appendChild(el);
  void el.offsetWidth;
  el.style.transform='translate('+Math.round(b.left-a.left)+'px,'+Math.round(b.top-a.top)+'px) scale(.55)';
  el.style.opacity='0.15';
  setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);finish()},620);
}
function fillConfetti(el){
  if(!el)return;
  var colors=['#FFC83D','#F59527','#2BC48A','#FFFFFF','#8FB0FF'], html='';
  for(var i=0;i<40;i++) html+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+colors[i%5]+';animation-delay:'+(Math.random()*1.1).toFixed(2)+'s;transform:rotate('+(i*41)+'deg)"></i>';
  el.innerHTML=html;
}
function showBadgePop(id,go){
  pendingGo=go;
  var b=BADGES[id]||{emoji:'⭐',name:'Conquista',line:'Mais um passo dado.',xp:0};
  document.getElementById('badgePopIcon').textContent=b.emoji;
  document.getElementById('badgePopTitle').textContent=b.name;
  document.getElementById('badgePopXp').textContent='+'+b.xp+' XP · total '+xpTotal();
  document.getElementById('badgePopLine').textContent=b.line;
  if(!reduceMotion())fillConfetti(badgePop.querySelector('.confetti'));
  else badgePop.querySelector('.confetti').innerHTML='';
  badgePop.hidden=false;
  var btn=badgePop.querySelector('[data-badge-go]');
  if(btn)btn.focus();
  beep('badge');
  clearTimeout(badgeTimer);
  badgeTimer=setTimeout(closeBadgePop, reduceMotion()?400:2200);
}
function closeBadgePop(){
  if(badgePop.hidden)return;
  clearTimeout(badgeTimer);
  badgePop.hidden=true;
  var go=pendingGo;pendingGo=null;
  if(go)go();
}
badgePop.addEventListener('click',function(e){
  if(e.target.closest('[data-badge-go]')||e.target===badgePop)closeBadgePop();
});

function unlockBadge(id,go){
  var first=!S.badges[id];
  S.badges[id]=true;
  save();
  updateProgress();
  if(first) showBadgePop(id,go);
  else if(go) go();
}

function makeCertificate(done){
  var c=document.createElement('canvas');
  c.width=1080;c.height=1350;
  var ctx=c.getContext('2d');
  var logo=new Image();
  logo.onload=function(){drawCert(ctx,c,logo);done(c)};
  logo.onerror=function(){drawCert(ctx,c,null);done(c)};
  logo.src='img/logo-aciegjovem.png';
}
function drawCert(ctx,c,logo){
  var w=c.width,h=c.height;
  ctx.fillStyle='#031951';ctx.fillRect(0,0,w,h);
  ctx.save();
  ctx.fillStyle='#F59527';ctx.beginPath();ctx.arc(-40,160,180,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#FFC83D';roundRect(ctx,w-200,-40,260,260,40);ctx.fill();
  ctx.fillStyle='#1747D1';ctx.beginPath();ctx.arc(w-80,h-80,200,0,Math.PI*2);ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.globalAlpha=.07;ctx.strokeStyle='#fff';ctx.lineWidth=10;
  for(var s=-h;s<w+h;s+=28){ctx.beginPath();ctx.moveTo(s,0);ctx.lineTo(s+h,h);ctx.stroke()}
  ctx.restore();
  ctx.strokeStyle='rgba(255,200,61,.55)';ctx.lineWidth=8;ctx.strokeRect(48,48,w-96,h-96);
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.strokeRect(64,64,w-128,h-128);
  if(logo){var lw=420,lh=lw*(205/684);ctx.drawImage(logo,(w-lw)/2,110,lw,lh)}
  ctx.save();ctx.translate(w-150,210);ctx.rotate(-18*Math.PI/180);
  ctx.fillStyle='#031951';ctx.beginPath();ctx.arc(0,0,66,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#F59527';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,66,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='#FFC83D';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,54,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#FFC83D';ctx.font='800 13px "Plus Jakarta Sans",system-ui,sans-serif';
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('KIT',0,-8);ctx.fillText('COMPLETO',0,10);
  ctx.restore();
  ctx.fillStyle='#FFC83D';ctx.font='800 26px "Plus Jakarta Sans",system-ui,sans-serif';ctx.textAlign='center';
  ctx.fillText('CERTIFICADO',w/2,logo?340:180);
  ctx.fillStyle='#fff';ctx.font='800 86px "Bricolage Grotesque",system-ui,sans-serif';
  ctx.fillText('Você zerou',w/2,460);
  ctx.fillText('o guia!',w/2,545);
  var nome=(S.name||'').trim();
  ctx.fillStyle='#F59527';ctx.font='700 36px "Plus Jakarta Sans",system-ui,sans-serif';
  if(nome) ctx.fillText(nome,w/2,620);
  ctx.fillStyle='#E4ECFF';ctx.font='600 30px "Plus Jakarta Sans",system-ui,sans-serif';
  wrapCenter(ctx,'Meu Primeiro Emprego. E Agora?',w/2,nome?680:640,820,40);
  ctx.fillStyle='#FFC83D';ctx.font='700 24px "Plus Jakarta Sans",system-ui,sans-serif';
  ctx.fillText('7 missões concluídas  ·  '+xpTotal()+' XP',w/2,760);
  // badges (número da missão + nome: confiável sem fonte de emoji)
  var ids=MODS.map(function(m){return m.id});
  var gap=118, start=(w-(ids.length-1)*gap)/2;
  ids.forEach(function(id,i){
    var b=BADGES[id], x=start+i*gap, y=850, on=!!S.badges[id];
    ctx.save();ctx.translate(x,y);ctx.rotate(-7*Math.PI/180);
    ctx.fillStyle=on?'#fff':'#16306A';
    roundRect(ctx,-42,-42,84,84,22);ctx.fill();
    ctx.fillStyle=on?'#F59527':'#2A4A8A';
    ctx.fillRect(-42,38,84,8);
    ctx.fillStyle=on?'#031951':'#8AA0C8';
    ctx.font='800 32px "Plus Jakarta Sans",system-ui,sans-serif';
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(on?String(i+1):'–',0,-4);
    ctx.restore();
    ctx.save();
    ctx.fillStyle=on?'#FFC83D':'rgba(255,255,255,.4)';
    ctx.font='700 13px "Plus Jakarta Sans",system-ui,sans-serif';
    ctx.textAlign='center';ctx.textBaseline='top';
    var nm=b.name.toUpperCase();
    ctx.fillText(nm, x, y+56);
    ctx.restore();
  });
  var now=new Date();
  var data=now.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric',timeZone:'America/Sao_Paulo'});
  ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='600 22px "Plus Jakarta Sans",system-ui,sans-serif';
  ctx.textAlign='center';ctx.textBaseline='alphabetic';
  ctx.fillText('ACIEG Jovem  ·  '+data,w/2,h-120);
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.font='500 18px "Plus Jakarta Sans",system-ui,sans-serif';
  ctx.fillText('Guia digital gratuito  ·  aciegjovem.com.br/primeiro-emprego',w/2,h-86);
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
function wrapCenter(ctx,text,x,y,max,lh){
  var words=text.split(' '), line='', lines=[], i;
  for(i=0;i<words.length;i++){
    var t=line?line+' '+words[i]:words[i];
    if(ctx.measureText(t).width>max&&line){lines.push(line);line=words[i]}else line=t;
  }
  if(line)lines.push(line);
  lines.forEach(function(l,i){ctx.fillText(l,x,y+i*lh)});
}
function downloadCanvas(c,name){
  c.toBlob(function(blob){
    if(!blob){toast('Não deu pra gerar o certificado.');return}
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},600);
    toast('Certificado baixado!');
  },'image/png');
}

/* ---------- eventos ---------- */
main.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('[data-next]'))){if(t.getAttribute('aria-disabled')==='true'){e.preventDefault();return}return}
  if((t=e.target.closest('.acard__btn'))){var o=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',o);document.getElementById(t.getAttribute('aria-controls')).hidden=!o;t.closest('.acard').classList.toggle('is-open',o);return}
  if((t=e.target.closest('.opt'))){var box=t.closest('[data-quiz]');if(box.classList.contains('is-answered'))return;S.ans[box.dataset.quiz]=t.dataset.k;save();showAnswer(box,box.dataset.quiz,t.dataset.k,true);return}
  if((t=e.target.closest('[data-retry]'))){resetQuiz(t.dataset.retry);return}
  if((t=e.target.closest('[data-copy]'))){copy(textOf(t.dataset.copy));return}
  if((t=e.target.closest('[data-download]'))){
    if(t.hasAttribute('data-from-final')&&!hasPlan()){toast('Seu plano ainda está vazio. Preencha no Módulo 7.');location.hash='#/m7?plano';return}
    download();return}
  if((t=e.target.closest('[data-lead-skip]'))){S.leadSkipped=true;save();location.hash='#/trilha';return}
  if((t=e.target.closest('[data-complete]'))){
    var id=t.dataset.complete;
    var first=!S.done[id]||!S.badges[id];
    S.done[id]=true;save();syncProgress();
    var go=function(){var i=MODS.findIndex(function(m){return m.id===id});location.hash=i<6?'#/'+MODS[i+1].id:'#/final'};
    if(first) unlockBadge(id,go);
    else go();
    return;
  }
  if((t=e.target.closest('[data-revisit]'))){e.preventDefault();location.hash='#/trilha';return}
  if((t=e.target.closest('[data-cert]'))){makeCertificate(function(c){downloadCanvas(c,'certificado-primeiro-emprego.png')});return}
});
main.addEventListener('change',function(e){var c=e.target.closest('[data-check]');if(c){S.checks[+c.dataset.check]=c.checked;save();checklistState()}});
main.addEventListener('input',function(e){
  var t=e.target;
  if(t.dataset.ex!==undefined){S.ex[+t.dataset.ex]=t.value;save()}
  else if(t.dataset.plan!==undefined){S.plan[+t.dataset.plan]=t.value;save()}
  else if(t.hasAttribute('data-cert-name')){S.name=t.value;save();syncProgress()}
});
main.addEventListener('input',function(e){if(e.target&&e.target.id==='lw'){var c=e.target.selectionStart,o=e.target.value,n=maskWa(o);e.target.value=n;}});
main.addEventListener('submit',function(e){
  var form=e.target.closest('#leadForm'); if(!form) return;
  e.preventDefault();
  var err=document.getElementById('leadErr'); err.textContent='';
  var nome=document.getElementById('ln').value.trim();
  var wa=document.getElementById('lw').value;
  var idade=parseInt(document.getElementById('li').value,10);
  var email=document.getElementById('lem').value.trim();
  var cidade=document.getElementById('lcid').value.trim();
  var consent=document.getElementById('lcons').checked;
  var website=(form.querySelector('[name=website]')||{}).value||'';
  var msg='';
  if(nome.length<2) msg='Conta seu nome (pelo menos 2 letras).';
  else if(!validWa(wa)) msg='WhatsApp brasileiro inválido. Use DDD + número.';
  else if(!idade||idade<14||idade>40) msg='Idade entre 14 e 40 anos.';
  else if(email && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) msg='E-mail inválido.';
  else if(!consent) msg='Marca a autorização pra gente te acompanhar.';
  if(msg){err.textContent=msg;return}
  var btn=document.getElementById('leadGo'); btn.disabled=true; btn.textContent='Salvando…';
  fetch('/api/primeiro-emprego/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome:nome,whatsapp:wa,idade:idade,email:email||undefined,cidade:cidade||undefined,consent:true,website:website})})
    .then(function(r){return r.json().then(function(j){return {ok:r.ok,status:r.status,j:j}})})
    .then(function(res){
      if(!res.j||!res.j.ok){throw new Error((res.j&&res.j.error)||'Não rolou agora. Tenta de novo.');}
      if(res.j.token&&res.j.id){S.leadId=String(res.j.id);S.leadToken=res.j.token;S.name=nome;save();syncProgress();}
      toast('Oba, '+nome.split(' ')[0]+'! Bora começar.');
      location.hash='#/trilha';
    })
    .catch(function(err2){err.textContent=err2.message||'Não rolou agora. Tenta de novo.';btn.disabled=false;btn.innerHTML='Começar a jornada'+ICON.arrow;});
});

/* ---------- revelar ao rolar + parallax leve ---------- */
var io=null;
function bindReveal(){
  var els=main.querySelectorAll('.reveal');
  if(reduceMotion()){els.forEach(function(el){el.classList.add('is-in')});return}
  if(io)io.disconnect();
  io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target)}})
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(el){io.observe(el)});
  // first paint: hero already in view
  requestAnimationFrame(function(){
    els.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top<window.innerHeight*0.92){el.classList.add('is-in');if(io)io.unobserve(el)}
    });
  });
}
var parallaxOn=false;
function onScrollParallax(){
  var layer=main.querySelector('.floaties');
  if(!layer||reduceMotion())return;
  var y=window.scrollY||0;
  layer.style.transform='translate3d(0,'+(y*0.18)+'px,0)';
}
function bindParallax(){
  var has=!!main.querySelector('.floaties');
  if(has&&!parallaxOn&&!reduceMotion()){window.addEventListener('scroll',onScrollParallax,{passive:true});parallaxOn=true}
  if(!has&&parallaxOn){window.removeEventListener('scroll',onScrollParallax);parallaxOn=false}
  if(has)onScrollParallax();
}

/* ---------- rotas ---------- */
function route(){
  if(badgePop&&!badgePop.hidden){clearTimeout(badgeTimer);badgePop.hidden=true;pendingGo=null}
  var raw=location.hash.replace(/^#\/?/,''), parts=raw.split('?'), path=parts[0]||'', anchor=parts[1];
  if(raw==='modulos'){path='trilha';anchor='modulos'}
  var segs=path.split('/').filter(Boolean);
  var r=segs[0]||'home';
  var step=segs[1];
  var m=MODS.filter(function(x){return x.id===r})[0];
  var html=m?viewLesson(m,step):r==='trilha'||r==='modulos'?viewTrail():r==='bonus'?viewBonus():r==='final'?viewFinal():r==='ola'?viewOla():viewHome();
  main.innerHTML=html;
  var lesson=main.querySelector('.lesson');
  var kind=lesson?lesson.getAttribute('data-kind'):'';
  document.body.classList.toggle('is-focus', r==='ola'||r==='home'||!!m);
  document.body.classList.toggle('is-navy-lesson', !!m && (kind==='hook'||kind==='quiz'||kind==='win'));
  main.classList.remove('view-in');void main.offsetWidth;main.classList.add('view-in');
  document.title=(m?'Missão '+m.n+': '+m.short.name+' | ':r==='trilha'?'Trilha | ':r==='bonus'?'Bônus | ':r==='final'?'Jornada concluída | ':r==='ola'?'Um oi pra começar | ':'')+'Meu Primeiro Emprego. E Agora? | ACIEG Jovem';
  var holdXp=false;
  if(m && kind==='win'){
    var firstWin=!S.done[m.id]||!S.badges[m.id];
    if(firstWin){
      S.done[m.id]=true;S.badges[m.id]=true;save();syncProgress();
      holdXp=true;
    }
    var fx=main.querySelector('.lesson--win .confetti');
    if(fx&&!reduceMotion())fillConfetti(fx);
  }
  if(m){
    if(kind==='quiz'){var k=S.ans[m.id];var box=document.querySelector('[data-quiz]');if(k&&box)showAnswer(box,m.id,k,false);}
    if(kind==='pack')checklistState();
    syncDock();
  }
  if(holdXp){
    showBadgePop(m.id);
    requestAnimationFrame(function(){flyXp((BADGES[m.id]&&BADGES[m.id].xp)||100)});
  }else updateProgress();
  bindReveal();
  bindParallax();
  if(r==='bonus'&&!S.badges.bonus){
    S.badges.bonus=true;save();updateProgress();syncProgress();
    toast('Conquista desbloqueada: Meus direitos · +50 XP');
  }
  if(r==='final'&&doneCount()===7) syncProgress();
  if(anchor&&document.getElementById(anchor)){requestAnimationFrame(function(){document.getElementById(anchor).scrollIntoView()})}
  else{window.scrollTo(0,0);var h=main.querySelector('h1[tabindex]');if(h&&route.ready)h.focus({preventScroll:true})}
  route.ready=true;
}

window.addEventListener('hashchange',route);
route();
})();
