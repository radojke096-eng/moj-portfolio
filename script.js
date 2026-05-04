const projects = [
    {
        id: "projekat1",
        title: "SISTEMSKI_PROCES_V1",
        description: "Analiza podataka i sekvencijalna obrada algoritama. Vizuelni prikaz faza rada sistema.",
        images: [
            "Assets/Gif1/IMG_202605123_223152732.png",
            "Assets/Gif1/IMG_202605123_223209086.png",
            "Assets/Gif1/IMG_202605123_223213038.png",
            "Assets/Gif1/IMG_202605123_223217253.png",
            "Assets/Gif1/IMG_202605123_223224543.png",
            "Assets/Gif1/IMG_202605123_223235142.png",
            "Assets/Gif1/IMG_202605123_223238239.png",
            "Assets/Gif1/IMG_202605123_223240944.png",
            "Assets/Gif1/IMG_202605123_223244664.png",
            "Assets/Gif1/IMG_202605123_223248096.png",
            "Assets/Gif1/IMG_202605123_223253284.png",
            "Assets/Gif1/IMG_202605123_223255700.png",
            "Assets/Gif1/IMG_202605123_23310080.png",
            "Assets/Gif1/IMG_202605123_223318077.png",
            "Assets/Gif1/IMG_202605123_223321334.png",
            "Assets/Gif1/IMG_202605123_223325369.png"
        ],
        type: "DYNAMIC_SEQUENCE",
        link: "https://github.com/ke096-eng/moj-portfolio/tree/main/Assets/Gif1",
        linkText: "POGLEDAJ_SOURCE"
    },
    {
        id: "projekat2",
        title: "TRAFFIC_CONTROL_LOGIC",
        description: "Simulacija pametnih semafora i optimizacija saobraćaja u realnom vremenu.",
        images: [
            "Assets/Gif2/IMG_202605123_232926283.png",
            "Assets/Gif2/IMG_202605123_232935720.jpeg",
            "Assets/Gif2/IMG_202605123_232946692.jpeg",
            "Assets/Gif2/IMG_202605123_232955543.jpeg",
            "Assets/Gif2/IMG_202605123_233006945.png",
            "Assets/Gif2/1777844979682.png"
        ],
        type: "TRAFFIC_LOGIC",
        link: "https://github.com/ke096-eng/moj-portfolio/tree/main/Assets/Gif2",
        linkText: "POGLEDAJ_LOGIKU"
    },
    {
        id: "projekat3",
        title: "portfolio html javascript gitHub base css",
        description: "portfolio github based, unlimited media show localy.",
        images: [
             "Assets/portfolio.jpg",
             "Assets/portfolio2.jpg"
        ],
        type: "PORTFOLIO_ENGINE",
        link: "https://github.com/ke096-eng/moj-portfolio",
        linkText: "GLAVNI_REPOSITORY"
    }
];

const container = document.getElementById('portfolio-grid');
let intervals = {}; 
let speeds = {};    
let isPaused = {};

function renderProjects() {
    if (!container) return;
    container.innerHTML = ""; 
    
    projects.forEach(proj => {
        speeds[proj.id] = 2000;
        isPaused[proj.id] = false;
        
        container.innerHTML += `
            <div class="card">
                <div class="image-wrapper">
                    <img id="img-${proj.id}" src="${proj.images[0]}" alt="Project Image">
                </div>
                <div style="padding:20px;">
                    <span style="color:#00f2ff; font-size:0.65rem;">[ ${proj.type} ]</span>
                    <h3 style="margin: 10px 0; color:#fff; font-size:1rem; font-family: monospace;">${proj.title}</h3>
                    <p style="font-size:0.8rem; color:#888; margin-bottom:15px; min-height:40px;">${proj.description}</p>
                    
                    <a href="${proj.link}" target="_blank" style="display: inline-block; color: #fff; text-decoration: none; border: 1px solid #444; padding: 10px 15px; font-size: 0.75rem; font-family: monospace; margin-bottom: 15px; background: #222;">
                        [ ${proj.linkText} ]
                    </a>

                    <div class="controls" style="display: flex; gap: 5px; flex-wrap: wrap;">
                        <button onclick="updateSpeed('${proj.id}', 2000)" class="speed-btn">1x</button>
                        <button onclick="updateSpeed('${proj.id}', 1000)" class="speed-btn">2x</button>
                        <button onclick="updateSpeed('${proj.id}', 300)" class="speed-btn">Turbo</button>
                        <button id="btn-pause-${proj.id}" onclick="togglePause('${proj.id}')" class="speed-btn" style="border-color:#ff4d4d; color:#ff4d4d;">Pauza</button>
                    </div>
                </div>
            </div>
        `;
        startSlideshow(proj.id);
    });
}

function startSlideshow(id) {
    if (isPaused[id]) return;
    const proj = projects.find(p => p.id === id);
    let index = 0;
    if(intervals[id]) clearInterval(intervals[id]);
    intervals[id] = setInterval(() => {
        index = (index + 1) % proj.images.length;
        const img = document.getElementById(`img-${id}`);
        if(img) img.src = proj.images[index];
    }, speeds[id]);
}

function updateSpeed(id, newSpeed) {
    isPaused[id] = false;
    const btn = document.getElementById(`btn-pause-${id}`);
    if(btn) { btn.innerText = "Pauza"; btn.style.borderColor = "#ff4d4d"; btn.style.color = "#ff4d4d"; }
    speeds[id] = newSpeed;
    startSlideshow(id);
}

function togglePause(id) {
    const btn = document.getElementById(`btn-pause-${id}`);
    if (!isPaused[id]) {
        clearInterval(intervals[id]);
        isPaused[id] = true;
        btn.innerText = "Nastavi";
        btn.style.borderColor = "#00ff00";
        btn.style.color = "#00ff00";
    } else {
        isPaused[id] = false;
        btn.innerText = "Pauza";
        btn.style.borderColor = "#ff4d4d";
        btn.style.color = "#ff4d4d";
        startSlideshow(id);
    }
}

document.addEventListener('DOMContentLoaded', renderProjects);
