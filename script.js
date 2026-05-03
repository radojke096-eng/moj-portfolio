/**
 * DYNAMIC DRIVE ENGINE - MODULARNI SISTEM
 * Svi projekti i njihove slike su definisani ovde.
 */

const projects = [
    {
        id: "projekat1",
        title: "Proces rada sistema - Faza 1",
        description: "Inicijalna sekvenca obrade podataka. Svaki kadar predstavlja jedan korak u izvršavanju algoritma sa precizno definisanim pauzama.",
        images: [
            "Assets/Gif1/IMG_202605123_223152732.png",
            "Assets/Gif1/IMG_202605123_223209086.png",
            "Assets/Gif1/IMG_202605123_223213038.png",
            "Assets/Gif1/IMG_202605123_223217253.png",
            "Assets/Gif1/IMG_202605123_223235142.png",
            "Assets/Gif1/IMG_202605123_223240944.png",
            "Assets/Gif1/IMG_202605123_223253284.png",
            "Assets/Gif1/IMG_202605123_223255700.png",
            "Assets/Gif1/IMG_202605123_223310080.png",
            "Assets/Gif1/IMG_202605123_223318077.png",
            "Assets/Gif1/IMG_202605123_223325369.png"
        ],
        type: "DYNAMIC_SEQUENCE"
    },
    {
        id: "projekat2",
        title: "Sistem Pametnih Semafora",
        description: "Analiza problematike urbane sinhronizacije. Glavni izazov je eliminacija 'uskih grla' i optimizacija protoka vozila.",
        images: [
            "Assets/Gif2/IMG_202605123_232926283.png",
            "Assets/Gif2/IMG_202605123_232935720.jpeg",
            "Assets/Gif2/IMG_202605123_232946692.jpeg",
            "Assets/Gif2/IMG_202605123_232955543.jpeg",
            "Assets/Gif2/IMG_202605123_233006945.png",
            "Assets/Gif2/1777844979682.png"
        ],
        type: "TRAFFIC_LOGIC_V1"
    } 
];

// --- LOGIKA MOTORA (Samo jedan primerak ove logike sme da postoji) ---

const container = document.getElementById('portfolio-grid');
let intervals = {}; 
let speeds = {};    

function renderProjects() {
    if (!container) return;
    container.innerHTML = ""; 
    
    projects.forEach(proj => {
        speeds[proj.id] = 2000; // Podrazumevana brzina
        
        container.innerHTML += `
            <div class="card" id="card-${proj.id}">
                <div class="image-wrapper">
                    <img id="img-${proj.id}" src="${proj.images[0]}">
                </div>
                <div style="padding:20px;">
                    <span style="color:#00f2ff; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">[ ${proj.type} ]</span>
                    <h3 style="margin: 10px 0; color: #fff;">${proj.title}</h3>
                    <p style="font-size:0.85rem; color:#888;">${proj.description}</p>
                    <p id="status-${proj.id}" style="font-size:0.7rem; color:#444; font-family:monospace;">FRAME: 1 / ${proj.images.length}</p>
                    
                    <div class="controls">
                        <button onclick="updateSpeed('${proj.id}', 2000)" class="speed-btn">1x</button>
                        <button onclick="updateSpeed('${proj.id}', 1000)" class="speed-btn">2x</button>
                        <button onclick="updateSpeed('${proj.id}', 300)" class="speed-btn">Turbo</button>
                    </div>
                </div>
            </div>
        `;
        startSlideshow(proj.id);
    });
}

function startSlideshow(id) {
    const proj = projects.find(p => p.id === id);
    let index = 0;
    
    if(intervals[id]) clearInterval(intervals[id]);
    
    intervals[id] = setInterval(() => {
        index = (index + 1) % proj.images.length;
        const img = document.getElementById(`img-${id}`);
        const stat = document.getElementById(`status-${id}`);
        if(img) {
            img.src = proj.images[index];
            if(stat) stat.innerText = `FRAME: ${index + 1} / ${proj.images.length}`;
        }
    }, speeds[id]);
}

function updateSpeed(id, newSpeed) {
    speeds[id] = newSpeed;
    startSlideshow(id);
}

// Inicijalizacija
document.addEventListener('DOMContentLoaded', renderProjects);
