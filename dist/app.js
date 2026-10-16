const CATEGORIES = {
  fort: { label: 'Історія й фортифікації', short: 'Фортифікації', color: '#a34f3b', icon: '♜' },
  museum: { label: 'Музеї', short: 'Музеї', color: '#c58a3a', icon: '◈' },
  sacred: { label: 'Сакральна спадщина', short: 'Сакральні', color: '#6f668b', icon: '✦' },
  nature: { label: 'Природа й оглядові місця', short: 'Природа', color: '#3f7560', icon: '⌁' },
  info: { label: 'Туристична інформація', short: 'Інфоцентри', color: '#397b8c', icon: 'i' }
};

const places = [
  ['castle','Стара фортеця','fort',18,66,'вул. Замкова, 1','Головна пам’ятка міста — фортифікаційний комплекс із баштами різних епох. З мурів відкривається краєвид на каньйон Смотрича. Це вдале місце, щоб почати знайомство зі Старим містом.'],
  ['bridge','Замковий міст','fort',27,62,'між Старим містом і фортецею','Унікальна інженерна споруда над каньйоном Смотрича, що з’єднує фортецю зі Старим містом. Міст є частиною історичного оборонного комплексу.'],
  ['gate','Руська брама','fort',32,76,'вул. Руська','Комплекс міських укріплень XV–XVI століть у долині Смотрича. Місце добре показує, як природний ландшафт працював разом з оборонною архітектурою.'],
  ['tower','Вежа Стефана Баторія','fort',52,35,'вул. Зарванська','Одна з найбільших оборонних веж Старого міста, названа на честь польського короля Стефана Баторія.'],
  ['hall','Ратуша','museum',47,52,'пл. Польський ринок, 1','Найстаріша ратуша України, що збереглася. У будівлі працюють музейні експозиції, а її подвір’я є частиною активного міського простору.'],
  ['antiquities','Музей старожитностей','museum',58,54,'вул. Іоанно-Предтеченська, 2','Археологічна експозиція про давню історію Поділля. Тут можна побачити знахідки різних історичних періодів.'],
  ['gallery','Виставкова зала','museum',62,45,'вул. Соборна, 29а','Міський простір для тимчасових мистецьких та історико-культурних виставок. Програму подій варто перевірити перед відвідуванням.'],
  ['minaret','Кафедральний костел святих Петра і Павла','sacred',43,46,'вул. Татарська, 20','Архітектурний ансамбль із рідкісним поєднанням католицького храму та колишнього османського мінарету. На мінареті встановлено скульптуру Діви Марії.'],
  ['trinity','Троїцька церква','sacred',56,43,'Троїцька площа, 1','Храм у Старому місті, відбудований у традиційних формах української сакральної архітектури. Територія належить монастирю.'],
  ['dominican','Домініканський костел','sacred',44,58,'вул. Домініканська, 1','Один із найвиразніших храмів Старого міста, у якому поєдналися риси кількох архітектурних епох.'],
  ['alexander','Собор Олександра Невського','sacred',76,31,'майдан Відродження','Православний собор у Новому плані міста, відтворений наприкінці XX — на початку XXI століття.'],
  ['canyon','Каньйон річки Смотрич','nature',36,36,'уздовж Старого міста','Глибокий скелястий каньйон формує впізнаваний ландшафт Кам’янця-Подільського. Оглядати його найкраще з облаштованих міських майданчиків.'],
  ['waterfall','Водоспад у каньйоні','nature',37,70,'долина річки Смотрич','Невеликий міський водоспад і популярна фотолокація в каньйоні. Після дощу стежки можуть бути слизькими.'],
  ['deer','Оглядовий майданчик «Білий олень»','nature',24,48,'поблизу Старої фортеці','Панорамна точка з видом на Стару фортецю, Замковий міст і скелясті схили каньйону.'],
  ['swan','Лебедине озеро','nature',67,68,'парк Героїв Євромайдану','Зелена зона для спокійної прогулянки неподалік Старого міста. Простір має алеї та місця для відпочинку.'],
  ['novoplan','Новопланівський міст','nature',72,52,'вул. Князів Коріатовичів','Міст XIX століття між Старим і Новим містом. Звідси відкривається один із найкращих видів на каньйон.'],
  ['info-old','Туристично-інформаційний центр','info',51,49,'пл. Польський ринок','Місце, де можна уточнити актуальну інформацію про події, графіки роботи пам’яток і міські екскурсії.'],
  ['reserve','Адміністрація заповідника','info',49,56,'пл. Польський ринок, 4','Інформаційна точка Національного історико-архітектурного заповідника «Кам’янець».']
].map((p,i)=>({id:p[0],name:p[1],category:p[2],x:p[3],y:p[4],address:p[5],description:p[6],visit:i%4===0?'Щодня; актуальний графік і вартість квитків уточнюйте на офіційній сторінці.':'Дані не підтверджено — уточнюйте в установі.',access:i%3===0?'Є нерівне покриття та сходи; доступність окремих зон обмежена.':'Дані про безбар’єрний доступ не підтверджено.',updated:'16 жовтня 2026',source:'https://kamianets.travel/',image:['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80'][i%3]}));

let activeCategory='all', query='', selected=null, scale=1, pan={x:0,y:0}, dragging=false, dragStart=null;
const $=s=>document.querySelector(s);
const els={filters:$('#filters'),list:$('#placeList'),count:$('#resultCount'),empty:$('#emptyState'),search:$('#searchInput'),map:$('#map'),sheet:$('#detailSheet'),backdrop:$('#backdrop')};

function filtered(){return places.filter(p=>(activeCategory==='all'||p.category===activeCategory)&&p.name.toLowerCase().includes(query.toLowerCase().trim()))}
function renderFilters(){els.filters.innerHTML=[['all','Усі'],...Object.entries(CATEGORIES).map(([k,v])=>[k,v.short])].map(([k,label])=>`<button class="filter ${activeCategory===k?'active':''}" data-category="${k}">${label}</button>`).join('')}
function renderList(){const data=filtered();els.count.textContent=`${data.length} ${data.length===1?'місце':data.length<5?'місця':'місць'}`;els.empty.hidden=data.length>0;els.list.style.display=data.length?'flex':'none';els.list.innerHTML=data.map(p=>{const c=CATEGORIES[p.category];return `<button class="place-card ${selected===p.id?'active':''}" data-id="${p.id}"><span class="place-icon" style="background:${c.color}">${c.icon}</span><span><strong>${p.name}</strong><small>${c.label}</small></span><span class="arrow">›</span></button>`}).join('');renderMarkers(data)}
function renderMarkers(data){let world=$('.map-world');if(!world){world=document.createElement('div');world.className='map-world';els.map.append(world)}world.innerHTML=`<div class="district old">Старе місто</div><div class="district new">Новий план</div><div class="road"></div><div class="road two"></div>`+data.map(p=>{const c=CATEGORIES[p.category];return `<button class="marker ${selected===p.id?'active':''}" data-id="${p.id}" style="left:${p.x}%;top:${p.y}%" aria-label="${p.name}"><span class="marker-pin" style="background:${c.color}"><span>${c.icon}</span></span></button>`}).join('');applyTransform()}
function renderLegend(){ $('#legend').innerHTML=Object.values(CATEGORIES).slice(0,4).map(c=>`<span class="legend-item"><i class="legend-dot" style="background:${c.color}"></i>${c.short}</span>`).join('') }
function openPlace(id){const p=places.find(x=>x.id===id);if(!p)return;selected=id;const c=CATEGORIES[p.category];$('#detailCategory').textContent=c.label;$('#detailTitle').textContent=p.name;$('#detailDescription').textContent=p.description;$('#detailAddress').textContent=p.address;$('#detailVisit').textContent=p.visit;$('#detailAccess').textContent=p.access;$('#detailUpdated').textContent=p.updated;$('#detailSource').href=p.source;$('#googleLink').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name+' Кам’янець-Подільський')}`;$('#detailIcon').textContent=c.icon;$('#detailImage').style.backgroundImage=`linear-gradient(180deg,transparent,rgba(20,28,24,.35)),url('${p.image}')`;els.sheet.hidden=false;els.backdrop.classList.add('open');renderList()}
function closePlace(){selected=null;els.sheet.hidden=true;els.backdrop.classList.remove('open');renderList()}
function reset(){activeCategory='all';query='';els.search.value='';$('#clearSearch').style.opacity=0;renderFilters();renderList()}
function applyTransform(){const w=$('.map-world');if(w)w.style.transform=`translate(${pan.x}px,${pan.y}px) scale(${scale})`}
function zoom(delta){scale=Math.min(2.2,Math.max(.75,scale+delta));applyTransform()}

els.filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;renderFilters();renderList()});
els.search.addEventListener('input',e=>{query=e.target.value;$('#clearSearch').style.opacity=query?1:0;renderList()});
$('#clearSearch').onclick=()=>{query='';els.search.value='';$('#clearSearch').style.opacity=0;renderList()};
els.list.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openPlace(b.dataset.id)});
els.map.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openPlace(b.dataset.id)});
$('#closeSheet').onclick=closePlace;els.backdrop.onclick=closePlace;$('#resetBtn').onclick=reset;$('#emptyReset').onclick=reset;
$('#zoomIn').onclick=()=>zoom(.18);$('#zoomOut').onclick=()=>zoom(-.18);els.map.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.1:-.1)},{passive:false});
els.map.addEventListener('pointerdown',e=>{if(e.target.closest('.marker'))return;dragging=true;dragStart={x:e.clientX-pan.x,y:e.clientY-pan.y};els.map.setPointerCapture(e.pointerId);els.map.style.cursor='grabbing'});els.map.addEventListener('pointermove',e=>{if(!dragging)return;pan={x:e.clientX-dragStart.x,y:e.clientY-dragStart.y};applyTransform()});els.map.addEventListener('pointerup',()=>{dragging=false;els.map.style.cursor='grab'});
$('#locateBtn').onclick=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(()=>{pan={x:0,y:0};scale=1.25;applyTransform();alert('Місцеперебування отримано. У деморежимі карта центрується на Кам’янці-Подільському.')},()=>alert('Не вдалося отримати місцеперебування. Перевірте дозвіл у браузері.')):alert('Геолокація не підтримується цим браузером.');
$('#aboutBtn').onclick=()=>$('#aboutDialog').showModal();$('#closeAbout').onclick=()=>$('#aboutDialog').close();
document.querySelector('.mobile-nav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(!b)return;document.querySelectorAll('.mobile-nav button').forEach(x=>x.classList.toggle('active',x===b));$('#sidebar').classList.toggle('mobile-active',b.dataset.view==='list');$('.map-section').classList.toggle('mobile-hidden',b.dataset.view==='list')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!els.sheet.hidden)closePlace()});
renderFilters();renderLegend();renderList();
