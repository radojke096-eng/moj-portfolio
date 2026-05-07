/**
 * ProjectBlock Class - Optimizovana verzija 2026
 * Upravlja sekvencom slika sa dvojezičnim opisima i kontrolama.
 */
class ProjectBlock {
  constructor(folderName, totalImages, containerId, descSr, descEn) {
    this.folderName = folderName;
    this.totalImages = totalImages;
    this.containerId = containerId;
    this.descSr = descSr; // Ispravljeno: prima srpski opis
    this.descEn = descEn; // Ispravljeno: prima engleski opis
    
    this.currentImageIndex = 0;
    this.isPlaying = false;
    this.animationTimeout = null;
    this.speed = 'normal'; 
    
    this.baseDisplayMs = 2000; 
    this.basePauseMs = 2000;
    
    this.displayMs = this.baseDisplayMs;
    this.pauseMs = this.basePauseMs;

    this.images = []; 
    this.init();
  }

  init() {
    this.createDOMStructure();
    this.cacheImageElements();
    this.attachEventListeners();
  }

  createDOMStructure() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const blockHtml = `
      <div class="project-block" id="project-block-${this.folderName}">
        <div class="image-container">
          ${Array.from({ length: this.totalImages }, (_, i) => `
            <img src="Assets/${this.folderName}/img${i + 1}.png" 
                 class="project-image ${i === 0 ? 'active' : ''}" 
                 alt="Frame ${i + 1}" 
                 data-index="${i}">
          `).join('')}
        </div>
        <div class="project-controls">
          <button class="control-btn play-pause-btn" id="play-pause-${this.folderName}">▶ Play</button>
          <button class="control-btn speed-btn active" id="normal-${this.folderName}">Normal</button>
          <button class="control-btn speed-btn" id="double-${this.folderName}">2x Speed</button>
        </div>
        <div class="project-description-box" style="padding: 15px; border-top: 1px solid #1a1a1a; background: #0e0e0e;">
            <p style="color: #00f2ff; font-family: monospace; font-size: 0.85rem; margin: 0 0 8px 0;">[SR] ${this.descSr}</p>
            <p style="color: #888; font-family: monospace; font-size: 0.8rem; font-style: italic; margin: 0;">[EN] ${this.descEn}</p>
        </div>
      </div>
    `;
    container.innerHTML = blockHtml;
  }

  cacheImageElements() {
    const block = document.getElementById(`project-block-${this.folderName}`);
    this.images = Array.from(block.querySelectorAll('.project-image'));
    this.playPauseBtn = block.querySelector('.play-pause-btn');
    this.normalBtn = block.querySelector(`#normal-${this.folderName}`);
    this.doubleBtn = block.querySelector(`#double-${this.folderName}`);
  }

  attachEventListeners() {
    const block = document.getElementById(`project-block-${this.folderName}`);
    
    block.addEventListener('mouseenter', () => this.play());
    block.addEventListener('mouseleave', () => this.stop());

    this.playPauseBtn.addEventListener('click', (e) => {
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

  cycle() {
    if (!this.isPlaying) return;
    this.showImage(this.currentImageIndex);
    this.animationTimeout = setTimeout(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
      this.cycle();
    }, this.displayMs + this.pauseMs);
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.animationTimeout);
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

  setSpeed(type) {
    this.speed = type;
    const multiplier = type === '2x' ? 0.5 : 1;
    this.displayMs = this.baseDisplayMs * multiplier;
    this.pauseMs = this.basePauseMs * multiplier;
    this.updateUI();
    if (this.isPlaying) {
      clearTimeout(this.animationTimeout);
      this.cycle();
    }
  }

  updateUI() {
    this.playPauseBtn.innerHTML = this.isPlaying ? '⏸ Pause' : '▶ Play';
    this.playPauseBtn.classList.toggle('playing', this.isPlaying);
    this.normalBtn.classList.toggle('active', this.speed === 'normal');
    this.doubleBtn.classList.toggle('active', this.speed === '2x');
  }
}
