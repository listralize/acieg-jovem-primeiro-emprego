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
  map:'<svg viewBox="0 0 24 24"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>'
};

/* ---------- estado local (só neste aparelho) ---------- */
var S=load();
function load(){try{return Object.assign({done:{},ans:{},checks:[],ex:[],plan:[]},JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return {done:{},ans:{},checks:[],ex:[],plan:[]}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function doneCount(){return MODS.filter(function(m){return S.done[m.id]}).length}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function img(k,cls,eager,small){var sz=small?'(min-width:980px) 340px, (min-width:620px) 50vw, 100vw':'(min-width:1080px) 1040px, 100vw';return '<img class="'+(cls||'')+'" src="img/'+k+'-640.webp" srcset="img/'+k+'-640.webp 640w, img/'+k+'.webp 1280w" sizes="'+sz+'" width="1280" height="720" alt="'+esc(ALT[k])+'"'+(eager?' fetchpriority="high"':' loading="lazy"')+' decoding="async">'}
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

/* ---------- views ---------- */
function viewHome(){
  var h=C.home, first=MODS.filter(function(m){return !S.done[m.id]})[0]||MODS[0];
  var started=doneCount()>0;
  var w=h.welcome, lead=w[0], rest=w.slice(1,-1), ready=w[w.length-1];
  return '<section class="hero"><div class="hero__in"><div class="reveal">'+
    '<div class="hero__top"><!-- ESPAÇO DA LOGO OFICIAL ACIEG JOVEM --><span class="logo-slot logo-slot--hero" role="img" aria-label="Espaço reservado para a logomarca oficial da ACIEG Jovem">Logo ACIEG Jovem</span></div>'+
    '<h1>Meu Primeiro Emprego.<em>E Agora?</em></h1><p class="hero__sub">'+esc(h.subtitle)+'</p>'+
    '<div class="hero__cta"><a class="btn btn--sun" href="#/'+first.id+'">'+(started?'Continuar jornada':esc(h.cta))+ICON.arrow+'</a>'+(started?'<a class="btn btn--ghost" href="#modulos" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.4)">'+ICON.map+'Ver módulos</a>':'')+'</div>'+
    '</div><div class="hero__art reveal">'+img('home','',true)+'</div></div></section>'+
    '<div class="wrap"><section class="welcome reveal" aria-labelledby="bv"><span class="kicker" style="color:var(--coral-d)">'+ICON.star+' '+esc(h.welcomeTitle)+'</span>'+
    '<h2 id="bv" class="welcome__lead" style="margin:10px 0 12px;font-size:26px">'+lead.html+'</h2>'+blocks(rest)+
    '<div class="ready"><p>'+ready.html+'</p><a class="btn btn--blue" href="#/'+first.id+'">'+esc(h.cta)+ICON.arrow+'</a></div></section></div>'+
    '<section class="section" id="modulos" aria-labelledby="aprender"><div class="wide"><h2 id="aprender">'+esc(h.learnTitle)+'</h2><div class="grid7">'+
    MODS.map(function(m,i){var d=S.done[m.id];return '<a class="mcard'+(d?' is-done':'')+'" href="#/'+m.id+'">'+img(m.id,'',false,true)+'<div class="mcard__b"><span class="mcard__n">Módulo '+m.n+'</span><span class="mcard__t">'+esc(h.learn[i].name)+'</span><p class="mcard__d">'+esc(h.learn[i].desc)+'</p><span class="mcard__s">'+(d?ICON.check+'Concluído':ICON.arrow+'Começar')+'</span></div></a>'}).join('')+
    '<a class="bonus-call" href="#/bonus"><span class="tag">Bônus</span><b>'+esc(h.bonusCall.replace(/^Bônus:\s*/,''))+'</b><span class="go">'+ICON.shield+'Abrir módulo bônus'+ICON.arrow+'</span></a></div></div></section>';
}

function activityHTML(m){
  var a=m.activity;
  return '<section class="sim" aria-labelledby="sim-'+m.id+'"><span class="kicker">'+ICON.bulb+' Atividade interativa</span>'+
   '<div class="sim__situ"><p style="font-weight:800;color:#fff;margin:10px 0 4px">Situação:</p>'+blocks(a.situation)+'</div>'+
   '<p class="sim__q" id="sim-'+m.id+'">'+a.question+'</p>'+
   '<div class="opts" role="group" aria-labelledby="sim-'+m.id+'" data-quiz="'+m.id+'">'+a.options.map(function(o){
     return '<button type="button" class="opt" data-k="'+o.key+'" aria-pressed="false"><span class="opt__k">'+o.key+'</span><span class="opt__t">'+o.html+'</span><span class="opt__flag">'+ICON.check+'<span class="sr">Alternativa correta</span></span></button>'}).join('')+'</div>'+
   '<div class="fb" aria-live="polite" tabindex="-1"></div></section>';
}

function viewModule(m){
  var i=MODS.indexOf(m), next=MODS[i+1], prev=MODS[i-1];
  var h='<section class="mhero"><div class="mhero__in"><span class="kicker">Módulo '+m.n+' de 7 · '+esc(m.short.name)+'</span>'+
    '<div class="steps-dots" aria-hidden="true">'+MODS.map(function(x){return '<a href="#/'+x.id+'" tabindex="-1" class="'+(S.done[x.id]?'is-done':'')+'"'+(x===m?' aria-current="step"':'')+'></a>'}).join('')+'</div>'+
    '<h1 tabindex="-1">'+esc(m.title)+'</h1>'+img(m.id,'',true)+'</div></section><div class="wrap">'+
    '<section class="opening" aria-label="Abertura">'+blocks(m.intro)+'</section>'+
    '<h2 class="label-h">Conteúdo do módulo</h2><p class="hint">Toque em cada card para abrir.</p>'+acc(m.cards,m.id+'-card','Card')+
    '<h2 class="label-h">Na prática</h2>'+activityHTML(m);
  if(m.checklist){var c=m.checklist;
    h+='<section class="panel" style="margin-top:18px" aria-labelledby="ck"><span class="kicker">'+esc(c.kicker)+'</span><h3 id="ck">'+esc(c.title)+'</h3><ul class="checks">'+
     c.items.map(function(t,j){return '<li><label class="check"><input type="checkbox" data-check="'+j+'"'+(S.checks[j]?' checked':'')+'><span class="check__box" aria-hidden="true">'+ICON.check+'</span><span>'+esc(t)+'</span></label></li>'}).join('')+
     '</ul><p class="check-count" aria-live="polite"></p><div class="done-msg" role="status">'+ICON.star+'<span>'+esc(c.done)+'</span></div></section>';}
  if(m.exercise){var e=m.exercise;
    h+='<section class="panel" style="margin-top:18px" aria-labelledby="ex"><span class="kicker">'+esc(e.kicker)+'</span><h3 id="ex">'+esc(e.title)+'</h3>'+
     e.fields.map(function(f,j){return '<label class="field"><span class="field__l">'+esc(f)+'</span><textarea data-ex="'+j+'" rows="2">'+esc(S.ex[j]||'')+'</textarea></label>'}).join('')+
     '<div class="row-btns"><button type="button" class="btn btn--blue" data-copy="ex">'+ICON.copy+'Copiar respostas</button></div><p class="saved">'+ICON.check+'Salvo automaticamente neste aparelho.</p></section>';}
  if(m.plan){var p=m.plan;
    h+='<section class="panel" id="plano" style="margin-top:18px" aria-labelledby="pl"><span class="kicker">'+esc(p.kicker)+'</span><h3 id="pl">'+esc(p.title)+'</h3><p class="plan-lead">'+esc(p.lead)+'</p>'+
     p.fields.map(function(f,j){return '<label class="field"><span class="field__l">'+esc(f)+'</span><textarea data-plan="'+j+'" rows="2">'+esc(S.plan[j]||'')+'</textarea></label>'}).join('')+
     '<div class="row-btns"><button type="button" class="btn btn--sun" data-download="plan">'+ICON.down+esc(p.button)+'</button><button type="button" class="btn btn--ghost" data-copy="plan">'+ICON.copy+'Copiar plano</button></div><p class="saved">'+ICON.check+'Salvo só neste aparelho. Nada é enviado para servidores.</p></section>';}
  h+='<section class="concl" aria-label="Conclusão"><span class="kicker">'+ICON.star+' Conclusão</span><blockquote>'+esc(m.conclusion)+'</blockquote>'+
    '<button type="button" class="btn btn--sun" data-complete="'+m.id+'">'+esc(m.button)+ICON.arrow+'</button></section>'+
    '<nav class="pager" aria-label="Navegação entre módulos">'+(prev?'<a href="#/'+prev.id+'">'+ICON.back+'Módulo '+prev.n+'</a>':'<a href="#/">'+ICON.back+'Início</a>')+(next?'<a href="#/'+next.id+'">Módulo '+next.n+ICON.arrow+'</a>':'<a href="#/bonus">Bônus'+ICON.arrow+'</a>')+'</nav></div>';
  return h;
}

function viewBonus(){
  var b=C.bonus;
  return '<section class="mhero mhero--bonus"><div class="mhero__in"><span class="kicker">'+ICON.shield+' '+esc(b.label)+'</span><h1 tabindex="-1">'+esc(b.title)+'</h1>'+img('bonus','',true)+'</div></section><div class="wrap">'+
   (CFG.bonusReviewPending?'<!-- REVISÃO HUMANA PENDENTE: para tirar o selo, mude bonusReviewPending para false em config.js --><p class="review">'+ICON.alert+'<span><strong>Conteúdo em revisão.</strong> Este módulo está passando por revisão antes da publicação definitiva.</span></p>':'')+
   '<section class="opening" aria-label="Abertura">'+blocks(b.intro)+'</section><h2 class="label-h">Perguntas</h2><p class="hint">Toque em cada pergunta para ver a resposta.</p><div class="faq">'+acc(b.faq,'faq','Pergunta')+'</div>'+
   '<a class="btn btn--blue btn--block mte" href="'+esc(b.linkUrl)+'" target="_blank" rel="noopener">'+esc(b.linkLabel)+ICON.ext+'<span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"> (abre em nova aba)</span></a>'+
   '<section class="concl concl--bonus" aria-label="Mensagem final do módulo"><span class="kicker" style="color:var(--mint)">'+ICON.star+' Mensagem final</span><blockquote>'+esc(b.conclusion)+'</blockquote><a class="btn btn--sun" href="#/">'+ICON.back+'Voltar ao início</a></section>'+
   '<nav class="pager"><a href="#/m7">'+ICON.back+'Módulo 7</a><a href="#/final">Página final'+ICON.arrow+'</a></nav></div>';
}

function viewFinal(){
  var f=C.final, bt=f.buttons;
  var colors=['#FFC83D','#FF6A3D','#2BC48A','#FFFFFF','#8FB0FF'], conf='';
  for(var i=0;i<46;i++){conf+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+colors[i%5]+';animation-delay:'+(Math.random()*1.4).toFixed(2)+'s;transform:rotate('+(i*37)+'deg)"></i>'}
  var n=doneCount();
  return '<section class="fin"><div class="confetti" aria-hidden="true">'+conf+'</div><div class="badge-done"><span>'+ICON.check+n+' de 7 módulos concluídos</span></div>'+
   '<h1 tabindex="-1">'+esc(f.title)+'</h1><div class="fin__art">'+img('final','',true)+'</div>'+
   '<div style="padding:0 20px"><div class="fin__card">'+blocks(f.blocks)+'<div class="fin__btns">'+
   '<a class="btn btn--ghost" href="#modulos" data-revisit>'+ICON.map+esc(bt[0])+'</a>'+
   '<button type="button" class="btn btn--sun" data-download="plan" data-from-final>'+ICON.down+esc(bt[1])+'</button>'+
   '<a class="btn btn--blue" href="'+esc(CFG.aciegUrl)+'" target="_blank" rel="noopener">'+esc(bt[2])+ICON.ext+'</a></div></div></div></section>';
}

/* ---------- drawer & progress ---------- */
function updateProgress(){
  var n=doneCount();
  document.querySelector('.progress__fill').style.width=(n/7*100)+'%';
  document.querySelector('.progress__n').textContent=n;
  document.querySelector('.progress__bar').setAttribute('aria-valuenow',n);
  document.querySelector('.progress__bar').setAttribute('aria-valuetext',n+' de 7 módulos concluídos');
  var route=location.hash.replace('#/','')||'home';
  document.querySelector('.drawer__list').innerHTML='<li><a href="#/"'+(route==='home'||route===''?' aria-current="page"':'')+'><span class="dnum">'+ICON.map+'</span><span><span class="dname">Início</span></span></a></li>'+
   MODS.map(function(m){return '<li class="'+(S.done[m.id]?'is-done':'')+'"><a href="#/'+m.id+'"'+(route===m.id?' aria-current="page"':'')+'><span class="dnum">'+(S.done[m.id]?ICON.check:m.n)+'</span><span><span class="dlabel">Módulo '+m.n+(S.done[m.id]?' · concluído':'')+'</span><span class="dname">'+esc(m.short.name)+'</span></span></a></li>'}).join('')+
   '<li class="drawer__sep" aria-hidden="true"></li><li><a href="#/bonus"'+(route==='bonus'?' aria-current="page"':'')+'><span class="dnum" style="background:var(--mint-l);color:var(--mint-d)">'+ICON.shield+'</span><span><span class="dlabel">Bônus</span><span class="dname">'+esc(C.bonus.title)+'</span></span></a></li>'+
   '<li><a href="#/final"'+(route==='final'?' aria-current="page"':'')+'><span class="dnum" style="background:var(--sun-l);color:#9A6B00">'+ICON.star+'</span><span><span class="dname">Página final</span></span></a></li>';
}
var drawer=document.getElementById('drawer'), menuBtn=document.querySelector('.menu-btn');
function openDrawer(o){drawer.hidden=!o;menuBtn.setAttribute('aria-expanded',o);if(o){drawer.querySelector('.drawer__close').focus()}else{menuBtn.focus()}}
menuBtn.addEventListener('click',function(){openDrawer(true)});
drawer.addEventListener('click',function(e){if(e.target===drawer||e.target.closest('.drawer__close'))openDrawer(false);else if(e.target.closest('a')){drawer.hidden=true;menuBtn.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!drawer.hidden)openDrawer(false)});

/* ---------- quiz ---------- */
function showAnswer(box,mid,key,animate){
  var m=MODS.filter(function(x){return x.id===mid})[0], a=m.activity, ok=key===a.correct;
  box.classList.add('is-answered');
  box.querySelectorAll('.opt').forEach(function(b){var k=b.dataset.k;b.classList.toggle('is-correct',k===a.correct);b.classList.toggle('is-wrong',k===key&&!ok);b.setAttribute('aria-pressed',k===key);b.setAttribute('aria-disabled','true')});
  var fb=box.parentNode.querySelector('.fb');
  fb.className='fb is-on '+(ok?'fb--ok':'fb--ko');
  fb.innerHTML='<div class="fb__h"><span class="fb__ic" aria-hidden="true">'+(ok?ICON.check:ICON.bulb)+'</span>'+(ok?'Você acertou!':'Vamos pensar juntos')+'</div><p>'+(ok?a.ok:a.ko)+'</p>'+
    '<p style="font-size:14px;color:var(--muted)">Alternativa correta: <strong>'+a.correct+'</strong>.</p><div class="row-btns"><button type="button" class="btn btn--ghost" data-retry="'+mid+'">'+ICON.retry+'Tentar novamente</button></div>';
  if(animate)fb.focus({preventScroll:true});
}
function resetQuiz(mid){
  var box=document.querySelector('[data-quiz="'+mid+'"]');
  box.classList.remove('is-answered');
  box.querySelectorAll('.opt').forEach(function(b){b.classList.remove('is-correct','is-wrong');b.setAttribute('aria-pressed','false');b.removeAttribute('aria-disabled')});
  var fb=box.parentNode.querySelector('.fb');fb.className='fb';fb.innerHTML='';
  delete S.ans[mid];save();box.querySelector('.opt').focus();
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
  var cnt=document.querySelector('.check-count');cnt.textContent=n+' de '+box.length+' marcados';
  document.querySelector('.done-msg').classList.toggle('is-on',n===box.length);
}

/* ---------- eventos ---------- */
main.addEventListener('click',function(e){
  var t;
  if((t=e.target.closest('.acard__btn'))){var o=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',o);document.getElementById(t.getAttribute('aria-controls')).hidden=!o;t.closest('.acard').classList.toggle('is-open',o);return}
  if((t=e.target.closest('.opt'))){var box=t.closest('[data-quiz]');if(box.classList.contains('is-answered'))return;S.ans[box.dataset.quiz]=t.dataset.k;save();showAnswer(box,box.dataset.quiz,t.dataset.k,true);return}
  if((t=e.target.closest('[data-retry]'))){resetQuiz(t.dataset.retry);return}
  if((t=e.target.closest('[data-copy]'))){copy(textOf(t.dataset.copy));return}
  if((t=e.target.closest('[data-download]'))){
    if(t.hasAttribute('data-from-final')&&!hasPlan()){toast('Seu plano ainda está vazio. Preencha no Módulo 7.');location.hash='#/m7?plano';return}
    download();return}
  if((t=e.target.closest('[data-complete]'))){var id=t.dataset.complete;S.done[id]=true;save();var i=MODS.findIndex(function(m){return m.id===id});location.hash=i<6?'#/'+MODS[i+1].id:'#/final';return}
  if((t=e.target.closest('[data-revisit]'))){e.preventDefault();location.hash='#/?modulos';return}
});
main.addEventListener('change',function(e){var c=e.target.closest('[data-check]');if(c){S.checks[+c.dataset.check]=c.checked;save();checklistState()}});
main.addEventListener('input',function(e){var t=e.target;if(t.dataset.ex!==undefined){S.ex[+t.dataset.ex]=t.value;save()}else if(t.dataset.plan!==undefined){S.plan[+t.dataset.plan]=t.value;save()}});

/* ---------- rotas ---------- */
function route(){
  var raw=location.hash.replace(/^#\/?/,''), parts=raw.split('?'), r=parts[0]||'home', anchor=parts[1];
  if(raw==='modulos'){r='home';anchor='modulos'}
  var m=MODS.filter(function(x){return x.id===r})[0];
  var html=m?viewModule(m):r==='bonus'?viewBonus():r==='final'?viewFinal():viewHome();
  main.innerHTML=html;
  document.title=(m?'Módulo '+m.n+': '+m.short.name+' | ':r==='bonus'?'Bônus | ':r==='final'?'Jornada concluída | ':'')+'Meu Primeiro Emprego. E Agora? | ACIEG Jovem';
  if(m){var k=S.ans[m.id];if(k)showAnswer(document.querySelector('[data-quiz]'),m.id,k,false);checklistState()}
  updateProgress();
  if(anchor&&document.getElementById(anchor)){requestAnimationFrame(function(){document.getElementById(anchor).scrollIntoView()})}
  else{window.scrollTo(0,0);var h=main.querySelector('h1[tabindex]');if(h&&route.ready)h.focus({preventScroll:true})}
  route.ready=true;
}
window.addEventListener('hashchange',route);
route();
})();
