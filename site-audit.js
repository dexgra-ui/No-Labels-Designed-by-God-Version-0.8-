(function(){
  const pages=['index.html','studies.html','current-events-series.html','james-series.html','technology-ai.html','sunday-school.html','study-identity.html','study-free-indeed.html','study-grace-accountability.html','study-peacemakers.html','study-storm.html','study-escapism.html','devotionals.html','articles.html','article.html','teaching-library.html','resources.html','study-library.html','dashboard.html','topics.html','scripture-index.html','ministry-tools.html','ministry-assistant.html','play.html','games.html','podcast.html','news.html','search.html','about.html'];
  const results=document.getElementById('audit-results');
  const runButton=document.getElementById('run-audit');
  const summary={tested:document.getElementById('audit-tested'),passed:document.getElementById('audit-passed'),warnings:document.getElementById('audit-warnings'),failed:document.getElementById('audit-failed')};
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  async function inspectPage(page){
    try{
      const response=await fetch(page,{cache:'no-store'});
      if(!response.ok)return {page,state:'bad',label:`HTTP ${response.status}`,detail:'Page could not be loaded.'};
      const text=await response.text();
      const doc=new DOMParser().parseFromString(text,'text/html');
      const issues=[];
      if(!doc.querySelector('title')?.textContent.trim())issues.push('missing title');
      if(!doc.querySelector('meta[name="viewport"]'))issues.push('missing viewport');
      if(!doc.querySelector('header'))issues.push('missing header');
      if(!doc.querySelector('footer'))issues.push('missing footer');
      if(![...doc.scripts].some(script=>(script.getAttribute('src')||'').split('?')[0]==='script.js'))issues.push('not using shared script.js');
      const localAssets=[...doc.querySelectorAll('link[rel="stylesheet"][href],script[src],img[src]')].map(node=>node.getAttribute('href')||node.getAttribute('src')).filter(url=>url&&!/^(https?:|data:|#|mailto:|tel:)/i.test(url));
      const broken=[];
      for(const asset of [...new Set(localAssets)]){
        const clean=asset.split('?')[0];
        try{const assetResponse=await fetch(clean,{cache:'no-store'});if(!assetResponse.ok)broken.push(clean);}catch{broken.push(clean);}
      }
      if(broken.length)issues.push(`missing assets: ${broken.join(', ')}`);
      return issues.length?{page,state:'warn',label:'Review',detail:issues.join(' · ')}:{page,state:'good',label:'Passed',detail:'Page shell, metadata, and local assets loaded.'};
    }catch(error){return {page,state:'bad',label:'Failed',detail:error.message||'Unexpected test failure.'};}
  }
  function render(rows){
    results.innerHTML=rows.map(row=>`<article class="audit-row"><div><strong>${esc(row.page)}</strong><small>${esc(row.detail)}</small></div><span class="audit-status ${row.state}">${esc(row.label)}</span></article>`).join('');
    summary.tested.textContent=rows.length;
    summary.passed.textContent=rows.filter(row=>row.state==='good').length;
    summary.warnings.textContent=rows.filter(row=>row.state==='warn').length;
    summary.failed.textContent=rows.filter(row=>row.state==='bad').length;
  }
  async function run(){
    runButton.disabled=true;runButton.textContent='Testing…';results.innerHTML='<p>Checking pages and local assets…</p>';
    const rows=[];
    for(const page of pages){rows.push(await inspectPage(page));render(rows);}
    runButton.disabled=false;runButton.textContent='Run Full-Site Test';
    localStorage.setItem('nldg-last-site-audit',JSON.stringify({ranAt:new Date().toISOString(),rows}));
  }
  runButton?.addEventListener('click',run);
  try{const saved=JSON.parse(localStorage.getItem('nldg-last-site-audit')||'null');if(saved?.rows?.length)render(saved.rows);}catch{}
})();