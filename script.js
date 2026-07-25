(function(){
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const navItems=[
    {label:'Home',href:'index.html',pages:['index.html','']},
    {label:'Bible Studies',href:'studies.html',pages:['studies.html','current-events-series.html','james-series.html','technology-ai.html','sunday-school.html','study-identity.html','study-free-indeed.html','study-grace-accountability.html','study-peacemakers.html','study-storm.html','study-escapism.html']},
    {label:'Articles',href:'articles.html',pages:['articles.html','article.html']},
    {label:'Teaching Library',href:'teaching-library.html',pages:['teaching-library.html','resources.html']},
    {label:'My Library',href:'study-library.html',pages:['study-library.html','dashboard.html','topics.html','scripture-index.html']},
    {label:'Ministry Tools',href:'ministry-tools.html',pages:['ministry-tools.html','ministry-assistant.html']},
    {label:'Games',href:'play.html',pages:['play.html','games.html'],className:'play-link'}
  ];
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const isActive=item=>item.pages.includes(page);
  function renderShell(){
    if(document.body.dataset.shell==='off')return;
    const header=document.querySelector('header');
    if(header){
      header.className='site-header';
      header.innerHTML=`<a class="brand" href="index.html" aria-label="No Labels, Designed by God home"><span class="brand-icon brand-logo"><img src="no-labels-approved-logo.png" alt=""></span><span><strong>No Labels, Designed by God</strong><small>Created in His image. Growing in His truth.</small></span></a><button class="menu" type="button" aria-expanded="false" aria-controls="site-navigation">Menu</button><nav id="site-navigation" aria-label="Primary navigation">${navItems.map(item=>`<a href="${item.href}" class="${[item.className,isActive(item)?'active':''].filter(Boolean).join(' ')}"${isActive(item)?' aria-current="page"':''}>${esc(item.label)}</a>`).join('')}</nav>`;
    }
    const footer=document.querySelector('footer');
    if(footer){
      footer.className='ministry-footer';
      footer.innerHTML=`<div class="footer-invitation"><img src="no-labels-approved-logo.png" alt=""><div><strong>No Labels, Designed by God</strong><p>Created in His image. Growing in His truth.</p></div></div><div class="footer-links"><a href="studies.html">Bible Studies</a><a href="articles.html">Articles</a><a href="teaching-library.html">Teaching Library</a><a href="study-library.html">My Library</a><a href="ministry-tools.html">Ministry Tools</a><a href="play.html">Games</a><a href="about.html">Our Ministry</a></div><small>© <span data-year></span> No Labels, Designed by God.</small>`;
    }
  }
  renderShell();
  const menu=document.querySelector('.menu');
  const closeNav=()=>{document.body.classList.remove('nav-open');menu?.setAttribute('aria-expanded','false');};
  menu?.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(open));});
  document.querySelectorAll('.site-header nav a').forEach(link=>link.addEventListener('click',closeNav));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeNav();});
  document.addEventListener('click',event=>{if(document.body.classList.contains('nav-open')&&!event.target.closest('.site-header'))closeNav();});
  window.addEventListener('resize',()=>{if(innerWidth>1120)closeNav();});
  document.querySelectorAll('[data-year]').forEach(element=>element.textContent=new Date().getFullYear());
})();

const f=document.getElementById('signup-form'),msg=document.getElementById('form-message');if(f){f.addEventListener('submit',e=>{e.preventDefault();msg.textContent='Thank you. Email signup will be connected in the next phase.';f.reset()})}
const studySearch=document.getElementById('study-search');
const studyFilter=document.getElementById('study-filter');
const studyCards=[...document.querySelectorAll('.study-card')];
const studyEmpty=document.getElementById('study-empty');
function filterStudies(){
  if(!studyCards.length)return;
  const q=(studySearch?.value||'').trim().toLowerCase();
  const category=studyFilter?.value||'all';
  let visible=0;
  studyCards.forEach(card=>{
    const hay=[card.dataset.title,card.dataset.tags,card.dataset.category,card.textContent].join(' ').toLowerCase();
    const matchesText=!q||hay.includes(q);
    const matchesCategory=category==='all'||card.dataset.category===category;
    const show=matchesText&&matchesCategory;
    card.hidden=!show;
    if(show)visible++;
  });
  if(studyEmpty)studyEmpty.hidden=visible!==0;
}
studySearch?.addEventListener('input',filterStudies);
studyFilter?.addEventListener('change',filterStudies);

const ministrySearchData = [
  {type:'Study',title:'Learning to See Yourself Through God’s Eyes',description:'Identity, grace, purpose, and God’s workmanship in Ephesians 2.',url:'study-identity.html',keywords:'identity chosen loved purpose ephesians'},
  {type:'Study',title:'Faith That Works: A Study Through James',description:'A 10-week journey through James focused on authentic faith in daily life.',url:'james-series.html',keywords:'james faith works wisdom prayer speech trials'},
  {type:'Study',title:'Faith & Truth in Today’s World',description:'A complete 42-week discipleship series for engaging today’s world biblically.',url:'current-events-series.html',keywords:'current events truth culture discipleship'},
  {type:'Study',title:'Free Indeed',description:'Freedom in Christ and what it means to live beyond spiritual bondage.',url:'study-free-indeed.html',keywords:'freedom john 8 discipleship'},
  {type:'Study',title:'Grace and Accountability',description:'How biblical grace, truth, dignity, and responsibility work together.',url:'study-grace-accountability.html',keywords:'grace accountability truth dignity'},
  {type:'Study',title:'Becoming Peacemakers',description:'Learning to pursue peace in a divided and reactive world.',url:'study-peacemakers.html',keywords:'peace peacemaker conflict reconciliation'},
  {type:'Study',title:'Peace in the Storm',description:'Trusting Jesus when the wind and waves are still present.',url:'study-storm.html',keywords:'storm faith fear peace jesus'},
  {type:'Study',title:'Escapism vs. Eternal Hope',description:'Setting the mind on Christ without avoiding present responsibilities.',url:'study-escapism.html',keywords:'hope escapism eternity colossians'},
  {type:'Devotional',title:'Daily Devotionals',description:'Short biblical encouragement for identity, faith, peace, and discipleship.',url:'devotionals.html',keywords:'daily devotional encouragement'},
  {type:'Article',title:'Article & Writing Center',description:'Biblical reflection on identity, discipleship, culture, and everyday life.',url:'articles.html',keywords:'articles culture faith identity writing'},
  {type:'Resource',title:'Sermon & Teaching Library',description:'Sermons, Sunday School lessons, leader guides, printables, and slides.',url:'teaching-library.html',keywords:'sermon teaching lesson leader guide printable slides'},
  {type:'Resource',title:'Ministry Resources',description:'Practical tools for families, small groups, teachers, and church leaders.',url:'resources.html',keywords:'leader guide family small group church'},
  {type:'Game',title:'No Labels Games',description:'Interactive Bible learning for families, groups, and church gatherings.',url:'play.html',keywords:'verse trivia scripture bible games family church'},
  {type:'Podcast',title:'The No Labels Podcast',description:'Future biblical conversations about identity, family, discipleship, culture, and following Jesus.',url:'podcast.html',keywords:'listen audio family identity conversation'},
  {type:'News',title:'Ministry Platform Updates',description:'Follow the growth of the No Labels, Designed by God platform.',url:'news.html',keywords:'update ministry platform'}
];
const siteSearch=document.getElementById('site-search');
const searchResults=document.getElementById('search-results');
const searchSummary=document.getElementById('search-summary');
const searchEmpty=document.getElementById('search-empty');
let activeSearchType='all';
function renderSiteSearch(){
  if(!searchResults)return;
  const q=(siteSearch?.value||'').trim().toLowerCase();
  const matches=ministrySearchData.filter(item=>{
    const typeOk=activeSearchType==='all'||item.type===activeSearchType;
    const text=(item.title+' '+item.description+' '+item.keywords+' '+item.type).toLowerCase();
    return typeOk&&(!q||text.includes(q));
  });
  searchResults.innerHTML=matches.map(item=>`<article class="search-result-card"><span class="result-type">${item.type}</span><h3>${item.title}</h3><p>${item.description}</p><a href="${item.url}">Open ${item.type} →</a></article>`).join('');
  if(searchSummary)searchSummary.textContent=q?`${matches.length} result${matches.length===1?'':'s'} for “${siteSearch.value}”.`:`Showing ${matches.length} ministry resources.`;
  if(searchEmpty)searchEmpty.hidden=matches.length!==0;
}
siteSearch?.addEventListener('input',renderSiteSearch);
document.getElementById('clear-search')?.addEventListener('click',()=>{siteSearch.value='';siteSearch.focus();renderSiteSearch()});
document.querySelectorAll('[data-type]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-type]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeSearchType=btn.dataset.type;renderSiteSearch()}));
renderSiteSearch();

const gameCards=[...document.querySelectorAll('[data-game-category]')];
const studyPageId=document.body.dataset.studyPage;
if(studyPageId){
  try{
    localStorage.setItem('nldg-last-study',JSON.stringify({id:studyPageId,title:document.body.dataset.studyTitle||document.title,url:location.pathname.split('/').pop()||location.href,updated:Date.now()}));
  }catch(error){console.warn('Study progress could not be saved.',error)}
}
document.querySelectorAll('.study-open').forEach(link=>link.addEventListener('click',()=>{
  try{localStorage.setItem('nldg-last-study',JSON.stringify({id:link.dataset.studyId||'study',title:link.closest('article')?.querySelector('h3')?.textContent||link.textContent,url:link.getAttribute('href'),updated:Date.now()}));}catch(error){}
}));
const continueSection=document.getElementById('continue-study');
const continueCard=document.getElementById('continue-study-card');
if(continueSection&&continueCard){
  try{const saved=JSON.parse(localStorage.getItem('nldg-last-study')||'null');if(saved?.url){continueSection.hidden=false;continueCard.innerHTML=`<article class="continue-card"><span>Continue Study</span><h3>${saved.title}</h3><p>Your place is saved on this device.</p><a class="button primary" href="${saved.url}">Continue Reading</a></article>`;}}catch(error){}
}
document.querySelectorAll('[data-collection]').forEach(button=>button.addEventListener('click',()=>{
  const value=button.dataset.collection||'all';
  if(studyFilter){studyFilter.value=value;filterStudies();document.querySelector('.study-tools')?.scrollIntoView({behavior:'smooth',block:'start'});}
}));
const gameEmpty=document.getElementById('game-empty');
document.querySelectorAll('[data-game-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-game-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.gameFilter;let shown=0;gameCards.forEach(card=>{const show=filter==='all'||card.dataset.gameCategory===filter;card.hidden=!show;if(show)shown++;});if(gameEmpty)gameEmpty.hidden=shown!==0;document.getElementById('game-library')?.scrollIntoView({behavior:'smooth',block:'start'});
}));
document.querySelectorAll('[data-game-filter],[data-collection]').forEach(control=>{
  control.setAttribute('type','button');
  control.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();control.click();}});
});