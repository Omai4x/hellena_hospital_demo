// Page Navigation
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const el=document.getElementById('nav-'+id);
  if(el)el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// Accordion Toggle for Patient Info
function ta(hd){
  const bd=hd.nextElementSibling;
  const open=hd.classList.contains('open');
  document.querySelectorAll('.acc-hd').forEach(h=>{h.classList.remove('open');h.nextElementSibling.classList.remove('open');});
  if(!open){hd.classList.add('open');bd.classList.add('open');}
}

// Tab Switching for Patient Info
function switchTab(btn,tabId){
  btn.parentElement.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ptab-content').forEach(t=>t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}
