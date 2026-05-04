const projects = [
    {
        id: "projekat1",
        title: "Proces rada sistema - Faza 1",
        description: "Inicijalna sekvenca obrade podataka. Svaki kadar predstavlja jedan korak u izvršavanju algoritma.",
        images: [
            "Assets/Gif1/IMG_202605123_223152732.png",
            "Assets/Gif1/IMG_202605123_223209086.png",
            "Assets/Gif1/IMG_202605123_223213038.png",
            "Assets/Gif1/IMG_202605123_223217253.png"
        ],
        type: "DYNAMIC_SEQUENCE",
        link: "https://github.com/radojkeC/moj-portfolio/tree/main/Assets/Gif1",
        linkText: "POGLEDAJ_SOURCE"
    },
    {
        id: "projekat2",
        title: "Sistem Pametnih Semafora",
        description: "Analiza urbane sinhronizacije i optimizacija protoka vozila pomoću senzora.",
        images: [
            "Assets/Gif2/IMG_202605123_232926283.png",
            "Assets/Gif2/IMG_202605123_232935720.jpeg",
            "Assets/Gif2/IMG_202605123_232946692.jpeg"
        ],
        type: "TRAFFIC_LOGIC_V1",
        link: "https://github.com/radojkeC/moj-portfolio/tree/main/Assets/Gif2",
        linkText: "POGLEDAJ_LOGIKU"
    },
    {
        id: "projekat3",
        title: "Arduino Mikrokontrolerski Sistem",
        description: "Hardverska implementacija i šeme povezivanja Arduina sa senzorima i semaforima.",
        images: [
             "Assets/Screenshot_2026-05-04-01-55-12-149_com.android.chrome.jpg",
             "Assets/Screenshot_2026-05-04-02-05-24-531_com.android.chrome.jpg"
        ],
        type: "HARDWARE_ENGINE",
        link: "https://github.com/radojkeC/moj-portfolio/tree/main/Documents/Arduino",
        linkText: "OTVORI_ARDUINO_KOD"
    }
];

const container = document.getElementById('portfolio-grid');
let intervals = {}; 
let speeds = {};    
let isPaused = {}; // Status pauze za svaki projekat

function renderProjects() {
    if (!container) return;
    container.innerHTML = ""; 
    
    projects.forEach(proj => {
        speeds[proj.id] = 2000;
        isPaused[proj.id] = false;
        
        container.innerHTML += `
            <div class="card" id="card-${proj.id}">
                <div class="image-wrapper" style="background: #000; display: flex; align-items: center; justify-content: center; min-height: 250px; overflow: hidden;">
                    <img id="img-${proj.id}" src="${proj.images[0]}" style="width:100%; height:auto;">
                </div>
                <div style="padding:20px;">
                    <span style="color:#00f2ff; font-size:0.7rem; font-weight:bold;">[ ${proj.type} ]</span>
                    <h3 style="margin: 10px 0; color: #fff;">${proj.title}</h3>
                    <p style="font-size:0.85rem; color:#888;">${proj.description}</p>
                    
                    <div style="margin-top: 15px;">
                        <a href="${proj.link}" target="_blank" style="display: inline-block; color: #00f2ff; text-decoration: none; border: 1px solid #00f2ff; padding: 8px 15px; font-size: 0.7rem; font-family: monospace;">
                            [ ${proj.linkText} ]
                        </a>
                    </div>

                    <div class="controls" style="margin-top:15px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <button onclick="updateSpeed('${proj.id}', 2000)" class="speed-btn">1x</button>
                        <button onclick="updateSpeed('${proj.id}', 1000)" class="speed-btn">2x</button>
                        <button onclick="updateSpeed('${proj.id}', 300)" class="speed-btn">TURBO</button>
                        <button id="btn-pause-${proj.id}" onclick="togglePause('${proj.id}')" class="speed-btn" style="border-color: #ff4d4d; color: #ff4d4d;">PAUZA</button>
                    </div>
                </div>
            </div>
        `;
        startSlideshow(proj.id);
    });
}

function startSlideshow(id) {
    if (isPaused[id]) return; // Ne pokreći ako je na pauzi

    const proj = projects.find(p => p.id === id);
    if (!proj || proj.images.length === 0) return;
    
    let index = Array.from(proj.images).indexOf(document.getElementById(`img-${id}`).getAttribute('src'));
    if (index === -1) index = 0;

    if(intervals[id]) clearInterval(intervals[id]);
    
    intervals[id] = setInterval(() => {
        index = (index + 1) % proj.images.length;
        const img = document.getElementById(`img-${id}`);
        if(img) img.src = proj.images[index];
    }, speeds[id]);
}

function updateSpeed(id, newSpeed) {
    isPaused[id] = false; // Automatski nastavi rad ako se promeni brzina
    document.getElementById(`btn-pause-${id}`).innerText = "PAUZA";
    speeds[id] = newSpeed;
    startSlideshow(id);
}

function togglePause(id) {
    const btn = document.getElementById(`btn-pause-${id}`);
    if (!isPaused[id]) {
        clearInterval(intervals[id]);
        isPaused[id] = true;
        btn.innerText = "NASTAVI";
        btn.style.borderColor = "#00ff00";
        btn.style.color = "#00ff00";
    } else {
        isPaused[id] = false;
        btn.innerText = "PAUZA";
        btn.style.borderColor = "#ff4d4d";
        btn.style.color = "#ff4d4d";
        startSlideshow(id);
    }
}

document.addEventListener('DOMContentLoaded', renderProjects);
