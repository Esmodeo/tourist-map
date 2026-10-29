const CATEGORIES = {
  museum: { label: 'Музеї та експозиції', short: 'Музеї', color: '#c58a3a', icon: '◈' },
  fortification: { label: 'Фортифікації', short: 'Фортифікації', color: '#a34f3b', icon: '♜' },
  architecture: { label: 'Архітектурні пам’ятки', short: 'Архітектура', color: '#a66f4a', icon: '⌂' },
  sacral: { label: 'Сакральні', short: 'Сакральні', color: '#6f668b', icon: '✦' },
  nature: { label: 'Природа', short: 'Природа', color: '#3f7560', icon: '⌁' },
  viewpoint: { label: 'Оглядові місця', short: 'Оглядові', color: '#477a91', icon: '◉' },
  'urban-space': { label: 'Міські простори', short: 'Міські простори', color: '#b06d74', icon: '▦' },
  'tourist-info': { label: 'Інформація', short: 'Інформація', color: '#397b8c', icon: 'i' },
  craft: { label: 'Майстерні та ремесла', short: 'Ремесла', color: '#8a6a3f', icon: '✣' }
};
const MULTI_CATEGORY = { label: 'Кілька категорій', color: '#263c36', icon: '◆' };

const places=window.PLACE_DATA;

let activeCategory='all', query='', selected=null, statusTimer=null, userMarker=null, accuracyCircle=null;
const $=s=>document.querySelector(s);
const els={filters:$('#filters'),list:$('#placeList'),count:$('#resultCount'),empty:$('#emptyState'),search:$('#searchInput'),sheet:$('#detailSheet'),backdrop:$('#backdrop')};
const CITY_BOUNDS=L.latLngBounds([[48.6200,26.5000],[48.7300,26.6600]]);
const map=L.map('map',{zoomControl:false,attributionControl:true,minZoom:13,maxBounds:CITY_BOUNDS,maxBoundsViscosity:1}).setView([48.6768,26.5780],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
map.on('drag',()=>map.panInsideBounds(CITY_BOUNDS,{animate:false}));
const markerLayer=L.layerGroup().addTo(map);

function placeVisual(p){return p.categories.length>1?MULTI_CATEGORY:CATEGORIES[p.categories[0]]}
function categoryLabel(p){return p.categories.map(key=>CATEGORIES[key].label).join(' · ')}
function filtered(){return places.filter(p=>(activeCategory==='all'||p.categories.includes(activeCategory))&&p.name.toLowerCase().includes(query.toLowerCase().trim()))}
function renderFilters(){const items=[['all','Усі','◉'],...Object.entries(CATEGORIES).map(([k,v])=>[k,v.short,v.icon])];els.filters.innerHTML=items.map(([k,label,icon])=>`<button class="filter ${activeCategory===k?'active':''}" data-category="${k}" aria-label="${label}" title="${label}"><span class="filter-icon" aria-hidden="true">${icon}</span><span class="filter-label">${label}</span></button>`).join('');const caption=$('#mobileFilterCaption');if(caption)caption.textContent=activeCategory==='all'?'Усі категорії':CATEGORIES[activeCategory].label}
function markerIcon(p){const c=placeVisual(p);return L.divIcon({className:'tourist-marker',html:`<span class="leaflet-pin ${selected===p.id?'active':''}" style="--pin:${c.color}"><i>${c.icon}</i></span>`,iconSize:[42,48],iconAnchor:[21,46],tooltipAnchor:[0,-40]})}
function renderMarkers(data){markerLayer.clearLayers();data.forEach(p=>L.marker([p.lat,p.lng],{icon:markerIcon(p),title:p.name}).bindTooltip(p.name,{direction:'top',offset:[0,-35]}).on('click',()=>openPlace(p.id)).addTo(markerLayer))}
function renderList(){const data=filtered();els.count.textContent=`${data.length} ${data.length===1?'місце':data.length<5?'місця':'місць'}`;els.empty.hidden=data.length>0;els.list.style.display=data.length?'flex':'none';els.list.innerHTML=data.map(p=>{const c=placeVisual(p);return `<button class="place-card ${selected===p.id?'active':''}" data-id="${p.id}"><span class="place-icon" style="background:${c.color}">${c.icon}</span><span><strong>${p.name}</strong><small>${categoryLabel(p)}</small></span><span class="arrow">›</span></button>`}).join('');renderMarkers(data)}
function renderLegend(){$('#legend').innerHTML=[MULTI_CATEGORY,...Object.values(CATEGORIES).slice(0,3)].map(c=>`<span class="legend-item"><i class="legend-dot" style="background:${c.color}"></i>${c.short||c.label}</span>`).join('')}
function openPlace(id){const p=places.find(x=>x.id===id);if(!p)return;selected=id;const c=placeVisual(p);$('#detailCategory').textContent=categoryLabel(p);$('#detailTitle').textContent=p.name;$('#detailDescription').textContent=p.description;$('#detailAddress').textContent=p.address;$('#detailSchedule').textContent=p.schedule;$('#detailVisit').textContent=p.visit;const contactRow=$('#contactFact');contactRow.hidden=!p.contact;$('#detailContact').textContent=p.contact||'';$('#detailAccess').textContent=p.access;$('#detailUpdated').textContent=p.updated;const sourceLink=$('#detailSource');sourceLink.hidden=!p.source;if(p.source)sourceLink.href=p.source;$('#googleLink').href=p.googleMap||`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;$('#detailIcon').textContent=c.icon;$('#detailImage').style.backgroundImage=`linear-gradient(180deg,transparent,rgba(20,28,24,.35)),url('${p.image}')`;els.sheet.hidden=false;els.backdrop.classList.add('open');map.flyTo([p.lat,p.lng],Math.max(map.getZoom(),16),{duration:.5});renderList()}
function closePlace(){selected=null;els.sheet.hidden=true;els.backdrop.classList.remove('open');renderList()}
function reset(){activeCategory='all';query='';els.search.value='';$('#clearSearch').style.opacity=0;renderFilters();renderList();map.flyTo([48.6768,26.5780],15)}
function showLocationStatus(message,isError=false,persist=false){const el=$('#locationStatus');clearTimeout(statusTimer);el.textContent=message;el.classList.toggle('error',isError);el.hidden=false;if(!persist)statusTimer=setTimeout(()=>el.hidden=true,4500)}
function locateUser(){const button=$('#locateBtn');if(!navigator.geolocation){showLocationStatus('Цей браузер не підтримує геолокацію.',true);return}button.classList.add('locating');button.classList.remove('located');showLocationStatus('Визначаємо ваше місцеперебування…',false,true);navigator.geolocation.getCurrentPosition(({coords})=>{button.classList.remove('locating');const latlng=L.latLng(coords.latitude,coords.longitude);if(!CITY_BOUNDS.contains(latlng)){showLocationStatus('Ви перебуваєте поза межами карти Кам’янця-Подільського.',true);return}button.classList.add('located');if(userMarker)map.removeLayer(userMarker);if(accuracyCircle)map.removeLayer(accuracyCircle);const icon=L.divIcon({className:'current-location-icon',html:'<span class="current-location-pulse"></span><span class="current-location-dot"></span><b>Ви тут</b>',iconSize:[70,52],iconAnchor:[35,26]});accuracyCircle=L.circle(latlng,{radius:coords.accuracy,color:'#2f70c7',weight:1,fillColor:'#2f70c7',fillOpacity:.12}).addTo(map);userMarker=L.marker(latlng,{icon,zIndexOffset:1000,title:'Ваше місцеперебування'}).addTo(map);map.flyTo(latlng,17,{duration:.7});showLocationStatus(`Місцеперебування знайдено · точність близько ${Math.round(coords.accuracy)} м`)},error=>{button.classList.remove('locating');const messages={1:'Дозвольте доступ до геолокації в налаштуваннях браузера.',2:'Не вдалося визначити місцеперебування.',3:'Час очікування геолокації вичерпано.'};showLocationStatus(messages[error.code]||messages[2],true)},{enableHighAccuracy:true,timeout:12000,maximumAge:30000})}

els.filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;renderFilters();renderList()});
els.search.addEventListener('input',e=>{query=e.target.value;$('#clearSearch').style.opacity=query?1:0;renderList()});
$('#clearSearch').onclick=()=>{query='';els.search.value='';$('#clearSearch').style.opacity=0;renderList()};
els.list.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openPlace(b.dataset.id)});
$('#closeSheet').onclick=closePlace;els.backdrop.onclick=closePlace;$('#resetBtn').onclick=reset;$('#emptyReset').onclick=reset;
$('#zoomIn').onclick=()=>map.zoomIn();$('#zoomOut').onclick=()=>map.zoomOut();$('#locateBtn').onclick=locateUser;
$('#aboutBtn').onclick=()=>$('#aboutDialog').showModal();$('#closeAbout').onclick=()=>$('#aboutDialog').close();
document.querySelector('.mobile-nav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(!b)return;document.querySelectorAll('.mobile-nav button').forEach(x=>x.classList.toggle('active',x===b));$('#sidebar').classList.toggle('mobile-active',b.dataset.view==='list');$('.map-section').classList.toggle('mobile-hidden',b.dataset.view==='list');if(b.dataset.view==='map')setTimeout(()=>map.invalidateSize(),50)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!els.sheet.hidden)closePlace()});
renderFilters();renderLegend();renderList();
window.addEventListener('load',()=>setTimeout(locateUser,500),{once:true});
