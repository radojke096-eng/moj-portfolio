const galleryImages = [
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
    "Assets/Gif1/IMG_202605123_223325369.png",
    // Dodaj ovde putanje do svih 10+ slika
];

let currentIndex = 0;
const container = document.getElementById('portfolio-grid');

// Kreiramo bazu za slideshow
container.innerHTML = `
    <div class="card">
        <img id="slideshow-target" src="${galleryImages[0]}" style="width:100%; height:auto;">
        <div style="padding:15px;">
            <span style="color:#00f2ff; font-size:0.7rem;">[ DYNAMIC_SEQUENCE ]</span>
            <h3>Proces rada sistema</h3>
            <p id="status-text">Prikaz slike 1 od ${galleryImages.length}</p>
        </div>
    </div>
`;

// Funkcija koja menja slike sa pauzom od 2 sekunde
function startSlideshow() {
    const imgElement = document.getElementById('slideshow-target');
    const statusElement = document.getElementById('status-text');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        imgElement.src = galleryImages[currentIndex];
        statusElement.innerText = `Prikaz slike ${currentIndex + 1} od ${galleryImages.length}`;
    }, 2000); // 2000ms = 2 sekunde pauze
}

startSlideshow();
