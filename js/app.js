const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const J=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const inr=n=>'₹ '+n.toLocaleString('en-IN');
const fd=d=>new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const q=new URLSearchParams(location.search);
const P=[
{id:1,t:'Luxury 3 BHK Villa',loc:'Whitefield, Bangalore',type:'Villa',tag:'For Rent',rent:25000,bed:3,bath:3,sqft:2400,c:['#2b4f8a','#f0a96b']},
{id:2,t:'2 BHK Apartment',loc:'Koramangala, Bangalore',type:'Apartment',tag:'Featured',rent:15000,bed:2,bath:2,sqft:1200,c:['#4a6fa5','#e8c07d']},
{id:3,t:'4 BHK Family House',loc:'Indiranagar, Bangalore',type:'House',tag:'New',rent:48000,bed:4,bath:4,sqft:3200,c:['#2d6a5f','#f2c879']},
{id:4,t:'1 BHK Studio',loc:'HSR Layout, Bangalore',type:'Apartment',tag:'For Rent',rent:9000,bed:1,bath:1,sqft:620,c:['#6b5b95','#f4b6a0']},
{id:5,t:'3 BHK Garden Villa',loc:'Sarjapur, Bangalore',type:'Villa',tag:'Featured',rent:32000,bed:3,bath:3,sqft:2600,c:['#355c7d','#f7b267']},
{id:6,t:'Commercial Office Space',loc:'MG Road, Bangalore',type:'Commercial',tag:'For Rent',rent:60000,bed:0,bath:2,sqft:2000,c:['#3a4a63','#9fc5e8']}];
const find=id=>P.find(p=>p.id==id)||P[0];
const art=(p,cls='')=>`<div class="art ${cls}" style="background:linear-gradient(170deg,${p.c[0]},${p.c[1]})"><svg viewBox="0 0 300 180" preserveAspectRatio="xMidYMax slice"><rect y="140" width="300" height="40" fill="#2f6b3f"/><rect x="60" y="70" width="110" height="72" fill="#f3f1ec"/><rect x="150" y="50" width="90" height="92" fill="#e4e0d8"/><rect x="50" y="62" width="130" height="10" fill="#222"/><rect x="140" y="42" width="110" height="10" fill="#222"/><g fill="#9fd3ff"><rect x="72" y="84" width="34" height="40"/><rect x="116" y="84" width="40" height="40"/><rect x="166" y="64" width="62" height="34"/><rect x="170" y="108" width="30" height="34"/></g><circle cx="262" cy="120" r="14" fill="#1e5a32"/><rect x="259" y="130" width="6" height="14" fill="#5a3b1f"/></svg>${p.tag&&cls!='x'?`<span class="tag">${p.tag}</span>`:''}</div>`;
function toast(m){let t=$('.toast')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'toast'}));t.textContent=m;t.classList.add('show');clearTimeout(t.t);t.t=setTimeout(()=>t.classList.remove('show'),2200)}
function header(){const u=J('hn_user'),pg=document.body.dataset.page;
$('#hdr').innerHTML=`<div class="wrap"><a class="logo" href="index.html" aria-label="Home Nest home"><i aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M2 14.2 16 3l14 11.2v15.3H19.3V19H12.7v10.5H2V14.2Z"/></svg></i><span>Home Nest<small>Find Your Perfect Space</small></span></a>
<button class="menu-toggle" id="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button><nav id="primary-nav" aria-label="Primary navigation"><a href="index.html" class="${pg=='home'?'on':''}">Home</a><a href="index.html#props">Properties</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
<div class="hdr-r"><button class="heart" aria-label="Favourites" onclick="toast('Saved homes: '+J('hn_fav',[]).length)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z"/></svg></button>
${u?`<span class="av" style="width:34px;height:34px">${u[0].toUpperCase()}</span><button class="btn sm" id="out">Logout</button>`:`<a class="btn sm" href="dashboard.html">Login</a><a class="btn sm p" href="dashboard.html">Sign Up</a>`}</div></div>`;
$('#out')&&($('#out').onclick=()=>{localStorage.removeItem('hn_user');location.href='index.html'});$('#menu-toggle')&&($('#menu-toggle').onclick=()=>{const open=$('#primary-nav').classList.toggle('open');$('#menu-toggle').classList.toggle('open',open);$('#menu-toggle').setAttribute('aria-expanded',open)})}
const card=(p,i=0)=>`<a class="card home-card" style="animation-delay:${i*70}ms" href="property.html?id=${p.id}"><div class="art property-photo photo-${p.id}"><span class="tag ${['For Rent','Featured'].includes(p.tag)?'rent-tag':''}">${p.tag=='Featured'?'For Rent':p.tag=='New'?'For Sale':p.tag}</span></div><div class="listing-info"><small class="card-location">♧ ${p.loc}</small><h3>${p.t}</h3><small class="card-meta"><span>▣ ${p.bed} Beds</span><span>♧ ${p.bath} Baths</span><span>▣ ${p.sqft} sqft</span></small><div class="pr"><span>${inr(p.rent)}<small style="display:inline"> /month</small></span><span class="go">›</span></div></div></a>`;
const pages={
home(){const h=$('.hero h1');h.innerHTML=h.textContent.split(' ').map((w,i)=>`<span style="animation-delay:${i*45}ms">${w}</span>`).join(' ');
const run=()=>{const l=$('#sl').value.toLowerCase(),pr=+$('#sp').value||1e9,b=+$('#sb').value,type=$('#sd').value;
const r=P.filter(p=>(type=='All'||p.type==type)&&(p.loc+p.t).toLowerCase().includes(l)&&p.rent<=pr&&p.bed>=b);
$('#list').innerHTML=r.map(card).join('')||'<p class="empty">No homes match. Try a wider price range or another area.</p>'};
$('#chips').innerHTML=['All','Villa','Apartment','House','Commercial'].map(c=>`<button class="chip ${c=='All'?'on':''}">${c}</button>`).join('');
$$('.chip').forEach(c=>c.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');$('#sd').value=c.textContent;run()});
$('#sd').onchange=()=>{$$('.chip').forEach(c=>c.classList.toggle('on',c.textContent==$('#sd').value));run()};
$('#sf').onsubmit=e=>{e.preventDefault();run();$('#props').scrollIntoView({behavior:'smooth'})};run();
const categories=[['Apartment','Apartments','photo-apartment'],['Villa','Villas','photo-villa'],['House','Houses','photo-house'],['Plot','Plots','photo-plot'],['Commercial','Commercial','photo-commercial']];
$('#cats').innerHTML=categories.map(([c,label,image])=>`<a href="#props" data-c="${c}" class="category-card"><span class="category-photo ${image}" aria-hidden="true"></span><span class="category-copy"><b>${label}</b><small>1,250+ Properties</small></span><span class="category-arrow" aria-hidden="true">➜</span></a>`).join('');
$$('#cats a').forEach(a=>a.onclick=e=>{if(a.dataset.c=='Plot'){e.preventDefault();toast('Plot listings are coming soon');return}$$('.chip').find(c=>c.textContent==a.dataset.c).click()})},
login(){$('#pw').onclick=()=>{const i=$('#pass');i.type=i.type=='password'?'text':'password'};
$('#lf').onsubmit=e=>{e.preventDefault();let ok=true;
[['#em',v=>/^\S+@\S+\.\S+$|^\d{10}$/.test(v)],['#pass',v=>v.length>=6]].forEach(([s,f])=>{const el=$(s),bad=!f(el.value.trim());el.parentElement.classList.toggle('bad',bad);if(bad)ok=false});
if(!ok)return;const n=$('#em').value.split('@')[0];S('hn_user',n);toast('Welcome back, '+n);setTimeout(()=>location.href=q.get('next')||'dashboard.html',700)};
$$('.soc .btn').forEach(b=>b.onclick=()=>{S('hn_user','Guest');toast('Signed in with '+b.textContent.trim());setTimeout(()=>location.href=q.get('next')||'dashboard.html',700)})},
property(){const p=find(q.get('id')),fav=J('hn_fav',[]);document.title=p.t+' | Home Nest';
$('#main').innerHTML=art(p,'main property-main photo-'+p.id);$('#thumbs').innerHTML=[0,1,2,3].map(i=>art({...p,c:[p.c[i%2],p.c[(i+1)%2]]},'x property-thumb photo-'+p.id)).join('');
$$('#thumbs .art').forEach(t=>t.onclick=()=>{$('#main').firstChild.style.background=t.style.background;$$('#thumbs .art').forEach(x=>x.classList.remove('on'));t.classList.add('on')});
$('#info').innerHTML=`<h1 style="color:var(--navy)">${p.t}</h1><p class="meta">📍 ${p.loc}</p><p class="meta"><span>🛏 ${p.bed} Beds</span><span>🛁 ${p.bath} Baths</span><span>📐 ${p.sqft} sqft</span></p><div class="price">${inr(p.rent)}<small style="font-size:11px;color:var(--mut)"> /month</small></div>
<div class="row"><button class="btn p" id="bn">Book Now</button><button class="btn" id="sv">Schedule a Visit</button></div>
<div class="feat"><span>🛋 Furnished</span><span>🏊 Swimming Pool</span><span>🔋 Power Backup</span><span>🏘 Gated Community</span><span>🛡 24/7 Security</span><span>🚗 Car Parking</span></div>`;
$('#bn').onclick=()=>location.href='booking.html?id='+p.id;$('#sv').onclick=()=>toast('Visit request sent. Riya will call you shortly.');
$('#loc').textContent=p.loc;$('#fav').classList.toggle('on',fav.includes(p.id));
$('#fav').onclick=e=>{const f=J('hn_fav',[]),i=f.indexOf(p.id);i<0?f.push(p.id):f.splice(i,1);S('hn_fav',f);e.target.classList.toggle('on',i<0);toast(i<0?'Saved to favourites':'Removed from favourites')};
$('#ct').onclick=()=>toast('Riya Sharma will contact you within an hour');
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button,.pane').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#'+b.dataset.t).classList.add('on')})},
booking(){const p=find(q.get('id')),dep=p.rent*10,fee=5000,tot=p.rent+dep+fee,day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
$('#mini').innerHTML=art(p,'x')+`<div><b>${p.t}</b><br><small>📍 ${p.loc}</small><br><span style="color:var(--blue)">${inr(p.rent)}/month</span></div>`;
$('#ci').value=day(7);$('#co').value=day(372);$('#ci').min=day(1);
const calc=()=>{const m=Math.max(1,Math.round((new Date($('#co').value)-new Date($('#ci').value))/2.63e9));
$('#sum').innerHTML=[['Property Type',p.type],['Location',p.loc.split(',')[0]],['Available From',fd($('#ci').value)],['Lease Duration',m+' Months'],['Security Deposit',inr(dep)]].map(r=>`<div>${r[0]}<b>${r[1]}</b></div>`).join('');
$('#tot').innerHTML=`<div>Monthly Rent<b>${inr(p.rent)}</b></div><div>Security Deposit<b>${inr(dep)}</b></div><div>Service Fee<b>${inr(fee)}</b></div><div class="tot">Total Payable<span>${inr(tot)}</span></div>`};
$('#ci').onchange=$('#co').onchange=calc;calc();
const go=n=>{$$('.panel').forEach((x,i)=>x.classList.toggle('on',i==n-1));$$('.steps b').forEach((b,i)=>b.classList.toggle('on',i<n));$$('.steps u').forEach((u,i)=>u.classList.toggle('on',i<n-1));scrollTo({top:0,behavior:'smooth'})};
$('#to2').onclick=()=>{if($('#co').value<=$('#ci').value)return toast('Check-out must be after check-in');go(2)};
$('#back').onclick=()=>go(1);$('#cn').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
$$('[name=m]').forEach(r=>r.onchange=()=>{const m=$('[name=m]:checked').value;$('#card').style.display=m=='Card'?'block':'none';$('#upi').style.display=m=='UPI'?'block':'none';$('#bank').style.display=m=='Bank'?'grid':'none';$('#pay').textContent=m=='Bank'?'I have made the transfer':'Proceed to confirmation'});
$('#pay').onclick=()=>{const m=$('[name=m]:checked').value;if(m=='UPI'&&!/@/.test($('#uid').value))return toast('Enter a valid UPI ID, like name@bank');
if(m=='Card'&&$('#cn').value.replace(/\s/g,'').length<16)return toast('Enter the 16-digit card number');
const ref='HN'+Date.now().toString().slice(-7),b=J('hn_book',[]);b.unshift({ref,pid:p.id,in:$('#ci').value,out:$('#co').value,st:'Confirmed',method:m});S('hn_book',b);location.href='success.html?ref='+encodeURIComponent(ref)}},
success(){const booking=J('hn_book',[]).find(x=>x.ref==q.get('ref'));$('#ref').textContent=booking?.ref||q.get('ref')||'HN-BOOKING'},
dash(){if(!J('hn_user')){location.href='login.html?next=dashboard.html';return}
$('#dash-avatar').textContent=J('hn_user','G')[0].toUpperCase();
if(!J('hn_book'))S('hn_book',[{ref:'HN1000001',pid:1,in:'2026-11-15',out:'2027-11-15',st:'Confirmed'},{ref:'HN1000002',pid:2,in:'2026-12-01',out:'2027-12-01',st:'Confirmed'},{ref:'HN0900003',pid:4,in:'2025-01-10',out:'2025-12-10',st:'Completed'},{ref:'HN0900004',pid:6,in:'2025-05-01',out:'2026-05-01',st:'Completed'},{ref:'HN0900005',pid:3,in:'2026-09-01',out:'2027-09-01',st:'Cancelled'}]);
let tab='Confirmed';const names={Confirmed:'Upcoming',Completed:'Past Bookings',Cancelled:'Cancelled'};
const draw=()=>{const b=J('hn_book',[]);$('#tabs').innerHTML=Object.keys(names).map(k=>`<button class="${k==tab?'on':''}" data-k="${k}">${names[k]} (${b.filter(x=>x.st==k).length})</button>`).join('');
$$('#tabs button').forEach(x=>x.onclick=()=>{tab=x.dataset.k;draw()});
const r=b.filter(x=>x.st==tab);$('#bl').innerHTML=r.map((x,i)=>{const p=find(x.pid);return`<div class="bcard" style="animation-delay:${i*80}ms">${art(p,'x dash-photo photo-'+p.id)}<div class="booking-copy"><b>${p.t}</b><br><small>📍 ${p.loc}</small><br><small>${p.bed} Beds · ${p.bath} Baths · ${p.sqft} sqft</small><br><small>Check-in ${fd(x.in)} · Check-out ${fd(x.out)}</small><div style="margin-top:8px"><a class="btn sm" href="property.html?id=${p.id}">View Details</a> <button class="btn sm" data-a="${x.ref}">⬇ Download Agreement</button> ${x.st=='Confirmed'?`<button class="btn sm" data-c="${x.ref}">Cancel</button>`:''}</div></div><div class="booking-price"><span class="pill ${x.st}">${x.st}</span><div style="color:var(--blue);font-weight:600;margin-top:10px">${inr(p.rent)}/month</div></div></div>`}).join('')||'<p class="empty">Nothing here yet. <a href="index.html" style="color:var(--blue)">Browse homes</a></p>';
$$('[data-a]').forEach(x=>x.onclick=()=>{const k=b.find(y=>y.ref==x.dataset.a),p=find(k.pid),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([`RENTAL AGREEMENT\nRef: ${k.ref}\nProperty: ${p.t}, ${p.loc}\nRent: ${inr(p.rent)}/month\nFrom ${fd(k.in)} to ${fd(k.out)}\n`]));a.download='agreement-'+k.ref+'.txt';a.click();toast('Agreement downloaded')});
$$('[data-c]').forEach(x=>x.onclick=()=>{x.closest('.bcard').classList.add('out');setTimeout(()=>{const l=J('hn_book',[]);l.find(y=>y.ref==x.dataset.c).st='Cancelled';S('hn_book',l);draw();toast('Booking cancelled')},300)})};draw()}};
document.addEventListener('DOMContentLoaded',()=>{$('#hdr')&&header();pages[document.body.dataset.page]?.()});
