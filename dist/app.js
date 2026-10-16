const CATEGORIES = {
  fort: { label: 'Історія й фортифікації', short: 'Фортифікації', color: '#a34f3b', icon: '♜' },
  museum: { label: 'Музеї', short: 'Музеї', color: '#c58a3a', icon: '◈' },
  sacred: { label: 'Сакральна спадщина', short: 'Сакральні', color: '#6f668b', icon: '✦' },
  nature: { label: 'Природа й оглядові місця', short: 'Природа', color: '#3f7560', icon: '⌁' },
  info: { label: 'Туристична інформація', short: 'Інфоцентри', color: '#397b8c', icon: 'i' }
};

const places = [
  ['castle','Стара фортеця','fort',48.6733,26.5626,'вул. Замкова, 1','Головна пам’ятка міста — фортифікаційний комплекс із баштами різних епох. З мурів відкривається краєвид на каньйон Смотрича. Це вдале місце, щоб почати знайомство зі Старим містом.'],
  ['bridge','Замковий міст','fort',48.6741,26.5674,'між Старим містом і фортецею','Унікальна інженерна споруда над каньйоном Смотрича, що з’єднує фортецю зі Старим містом. Міст є частиною історичного оборонного комплексу.'],
  ['gate','Руська брама','fort',48.6704,26.5712,'вул. Руська','Комплекс міських укріплень XV–XVI століть у долині Смотрича. Місце добре показує, як природний ландшафт працював разом з оборонною архітектурою.'],
  ['tower','Вежа Стефана Баторія','fort',48.6792,26.5771,'вул. Зарванська','Одна з найбільших оборонних веж Старого міста, названа на честь польського короля Стефана Баторія.'],
  ['hall','Ратуша','museum',48.6759,26.5731,'пл. Польський ринок, 1','Найстаріша ратуша України, що збереглася. У будівлі працюють музейні експозиції, а її подвір’я є частиною активного міського простору.'],
  ['antiquities','Музей старожитностей','museum',48.6766,26.5761,'вул. Іоанно-Предтеченська, 2','Археологічна експозиція про давню історію Поділля. Тут можна побачити знахідки різних історичних періодів.'],
  ['gallery','Виставкова зала','museum',48.6812,26.5835,'вул. Соборна, 29а','Міський простір для тимчасових мистецьких та історико-культурних виставок. Програму подій варто перевірити перед відвідуванням.'],
  ['minaret','Кафедральний костел святих Петра і Павла','sacred',48.6765,26.5709,'вул. Татарська, 20','Архітектурний ансамбль із рідкісним поєднанням католицького храму та колишнього османського мінарету. На мінареті встановлено скульптуру Діви Марії.'],
  ['trinity','Троїцька церква','sacred',48.6784,26.5768,'Троїцька площа, 1','Храм у Старому місті, відбудований у традиційних формах української сакральної архітектури. Територія належить монастирю.'],
  ['dominican','Домініканський костел','sacred',48.6752,26.5745,'вул. Домініканська, 1','Один із найвиразніших храмів Старого міста, у якому поєдналися риси кількох архітектурних епох.'],
  ['alexander','Собор Олександра Невського','sacred',48.6853,26.5857,'майдан Відродження','Православний собор у Новому плані міста, відтворений наприкінці XX — на початку XXI століття.'],
  ['canyon','Каньйон річки Смотрич','nature',48.6747,26.5775,'уздовж Старого міста','Глибокий скелястий каньйон формує впізнаваний ландшафт Кам’янця-Подільського. Оглядати його найкраще з облаштованих міських майданчиків.'],
  ['waterfall','Водоспад у каньйоні','nature',48.6714,26.5746,'долина річки Смотрич','Невеликий міський водоспад і популярна фотолокація в каньйоні. Після дощу стежки можуть бути слизькими.'],
  ['deer','Оглядовий майданчик «Білий олень»','nature',48.6737,26.5650,'поблизу Старої фортеці','Панорамна точка з видом на Стару фортецю, Замковий міст і скелясті схили каньйону.'],
  ['swan','Лебедине озеро','nature',48.6813,26.5748,'парк Героїв Євромайдану','Зелена зона для спокійної прогулянки неподалік Старого міста. Простір має алеї та місця для відпочинку.'],
  ['novoplan','Новопланівський міст','nature',48.6816,26.5830,'вул. Князів Коріатовичів','Міст XIX століття між Старим і Новим містом. Звідси відкривається один із найкращих видів на каньйон.'],
  ['info-old','Туристично-інформаційний центр','info',48.6758,26.5733,'пл. Польський ринок','Місце, де можна уточнити актуальну інформацію про події, графіки роботи пам’яток і міські екскурсії.'],
  ['reserve','Адміністрація заповідника','info',48.6755,26.5722,'пл. Польський ринок, 4','Інформаційна точка Національного історико-архітектурного заповідника «Кам’янець».']
].map((p,i)=>({id:p[0],name:p[1],category:p[2],lat:p[3],lng:p[4],address:p[5],description:p[6],visit:i%4===0?'Щодня; актуальний графік і вартість квитків уточнюйте на офіційній сторінці.':'Дані не підтверджено — уточнюйте в установі.',access:i%3===0?'Є нерівне покриття та сходи; доступність окремих зон обмежена.':'Дані про безбар’єрний доступ не підтверджено.',updated:'16 жовтня 2026',source:'https://kamianets.travel/',image:['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80'][i%3]}));

let activeCategory='all', query='', selected=null, statusTimer=null, userMarker=null, accuracyCircle=null;
const $=s=>document.querySelector(s);
const els={filters:$('#filters'),list:$('#placeList'),count:$('#resultCount'),empty:$('#emptyState'),search:$('#searchInput'),sheet:$('#detailSheet'),backdrop:$('#backdrop')};
const CITY_BOUNDS=L.latLngBounds([[48.6200,26.5000],[48.7300,26.6600]]);
const map=L.map('map',{zoomControl:false,attributionControl:true,minZoom:13,maxBounds:CITY_BOUNDS,maxBoundsViscosity:1}).setView([48.6768,26.5780],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
map.on('drag',()=>map.panInsideBounds(CITY_BOUNDS,{animate:false}));
const markerLayer=L.layerGroup().addTo(map);

function filtered(){return places.filter(p=>(activeCategory==='all'||p.category===activeCategory)&&p.name.toLowerCase().includes(query.toLowerCase().trim()))}
function renderFilters(){els.filters.innerHTML=[['all','Усі'],...Object.entries(CATEGORIES).map(([k,v])=>[k,v.short])].map(([k,label])=>`<button class="filter ${activeCategory===k?'active':''}" data-category="${k}">${label}</button>`).join('')}
function markerIcon(p){const c=CATEGORIES[p.category];return L.divIcon({className:'tourist-marker',html:`<span class="leaflet-pin ${selected===p.id?'active':''}" style="--pin:${c.color}"><i>${c.icon}</i></span>`,iconSize:[42,48],iconAnchor:[21,46],tooltipAnchor:[0,-40]})}
function renderMarkers(data){markerLayer.clearLayers();data.forEach(p=>L.marker([p.lat,p.lng],{icon:markerIcon(p),title:p.name}).bindTooltip(p.name,{direction:'top',offset:[0,-35]}).on('click',()=>openPlace(p.id)).addTo(markerLayer))}
function renderList(){const data=filtered();els.count.textContent=`${data.length} ${data.length===1?'місце':data.length<5?'місця':'місць'}`;els.empty.hidden=data.length>0;els.list.style.display=data.length?'flex':'none';els.list.innerHTML=data.map(p=>{const c=CATEGORIES[p.category];return `<button class="place-card ${selected===p.id?'active':''}" data-id="${p.id}"><span class="place-icon" style="background:${c.color}">${c.icon}</span><span><strong>${p.name}</strong><small>${c.label}</small></span><span class="arrow">›</span></button>`}).join('');renderMarkers(data)}
function renderLegend(){$('#legend').innerHTML=Object.values(CATEGORIES).slice(0,4).map(c=>`<span class="legend-item"><i class="legend-dot" style="background:${c.color}"></i>${c.short}</span>`).join('')}
function openPlace(id){const p=places.find(x=>x.id===id);if(!p)return;selected=id;const c=CATEGORIES[p.category];$('#detailCategory').textContent=c.label;$('#detailTitle').textContent=p.name;$('#detailDescription').textContent=p.description;$('#detailAddress').textContent=p.address;$('#detailVisit').textContent=p.visit;$('#detailAccess').textContent=p.access;$('#detailUpdated').textContent=p.updated;$('#detailSource').href=p.source;$('#googleLink').href=`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;$('#detailIcon').textContent=c.icon;$('#detailImage').style.backgroundImage=`linear-gradient(180deg,transparent,rgba(20,28,24,.35)),url('${p.image}')`;els.sheet.hidden=false;els.backdrop.classList.add('open');map.flyTo([p.lat,p.lng],Math.max(map.getZoom(),16),{duration:.5});renderList()}
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
