/**
 * ProjectBlock Class - Verzija 3.1
 * Podržava različite formate slika i sinhronizovanu brzinu.
 */
class ProjectBlock {
    /**
     * @param {string} folderName - Naziv foldera u Assets/
     * @param {number} totalImages - Broj slika u nizu
     * @param {string} containerId - ID HTML elementa gde se blok renderuje
     * @param {string} extension - Format fajla ('png', 'jpg', 'jpeg', 'webp')
     */
    constructor(folderName, totalImages, containerId, extension = 'png') {
        this.folderName = folderName;
        this.totalImages = totalImages;
        this.containerId = containerId;
        this.extension = extension; 
        
        // Interno stanje
        this.currentImageIndex = 0;
        this.isPlaying = false;
        this.animationTimeout = null;
        this.speed = 'normal'; 
        
        // Tajming (ms)
        this.baseDisplayMs = 2000; 
        this.basePauseMs = 2000;
        this.displayMs = this.baseDisplayMs;
        this.pauseMs = this.basePauseMs;

        this.images = []; 
        this.init();
    }

    init() {
        this.createDOMStructure();
        this.cacheElements();
        this.attachEventListeners();
    }

    /**
     * Generiše HTML strukturu i ubacuje putanje sa ispravnom ekstenzijom
     */
    createDOMStructure() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Sistemska greška: Kontejnere ${this.containerId} nije pronađen.`);
            return;
        }

        let imagesHtml = '';
        for (let i = 1; i <= this.totalImages; i++) {
            // Dinamičko sklapanje putanje: Assets/Folder/imgX.ext
            imagesHtml += `
                <img src="Assets/${this.folderName}/img${i}.${this.extension}" 
                     class="project-image ${i === 1 ? 'active' : ''}" 
                     data-index="${i-1}"
                     alt="Projekat ${this.folderName} - Frame ${i}">`;
        }

        container.innerHTML = `
            <div class="project-block" id="block-${this.folderName}">
                <div class="image-container">${imagesHtml}</div>
                <div class="project-controls">
                    <button class="control-btn play-btn" title="Pokreni/Pauziraj">▶ Play</button>
                    <button class="control-btn speed-btn normal-btn active">Normal</button>
                    <button class="control-btn speed-btn double-btn">2x Speed</button>
                </div>
            </div>
        `;
    }

    cacheElements() {
        this.block = document.getElementById(`block-${this.folderName}`);
        this.images = Array.from(this.block.querySelectorAll('.project-image'));
        this.playBtn = this.block.querySelector('.play-btn');
        this.normalBtn = this.block.querySelector('.normal-btn');
        this.doubleBtn = this.block.querySelector('.double-btn');
    }

    attachEventListeners() {
        // Hover funkcionalnost
        this.block.addEventListener('mouseenter', () => this.play());
        this.block.addEventListener('mouseleave', () => this.stop());

        // Klik funkcionalnost
        this.playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isPlaying ? this.pause() : this.play();
        });

        this.normalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setSpeed('normal');
        });

        this.doubleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setSpeed('2x');
        });
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.updateUI();
        this.cycle();
    }

    /**
     * Glavna petlja animacije
     */
    cycle() {
        if (!this.isPlaying) return;
        
        this.showImage(this.currentImageIndex);

        // Ukupno vreme ciklusa = prikaz + pauza
        this.animationTimeout = setTimeout(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
            this.cycle();
        }, this.displayMs + this.pauseMs);
    }

    pause() {
        this.isPlaying = false;
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = null;
        }
        this.updateUI();
    }

    stop() {
        this.pause();
        this.currentImageIndex = 0;
        this.showImage(0);
    }

    showImage(index) {
        this.images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    /**
     * Skalira i prikaz i pauzu za pravi osećaj brzine
     */
    setSpeed(type) {
        this.speed = type;
        const multiplier = type === '2x' ? 0.5 : 1;
        
        this.displayMs = this.baseDisplayMs * multiplier;
        this.pauseMs = this.basePauseMs * multiplier;

        this.updateUI();

        // Ako je animacija u toku, restartuj tajmer sa novom brzinom
        if (this.isPlaying) {
            clearTimeout(this.animationTimeout);
            this.cycle();
        }
    }

    updateUI() {
        this.playBtn.innerHTML = this.isPlaying ? '⏸ Pause' : '▶ Play';
        this.playBtn.classList.toggle('playing', this.isPlaying);
        this.normalBtn.classList.toggle('active', this.speed === 'normal');
        this.doubleBtn.classList.toggle('active', this.speed === '2x');
    }
}
