class ProjectBlock {
  constructor(folderName, totalImages, containerId, descSr, descEn) {
    this.folderName = folderName;
    this.totalImages = totalImages;
    this.containerId = containerId;
    this.descSr = descSr;
    this.descEn = descEn;
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
    let imagesHtml = '';
    for (let i = 1; i <= this.totalImages; i++) {
        imagesHtml += `<img src="Assets/${this.folderName}/img${i}.png" class="project-image ${i === 1 ? 'active' : ''}" data-index="${i-1}">`;
    }
    container.innerHTML = `
      <div class="project-block" id="block-${this.folderName}">
        <div class="image-container">${imagesHtml}</div>
        <div class="project-controls">
          <button class="control-btn play-btn">▶ Play</button>
          <button class="control-btn speed-btn normal-btn active">Normal</button>
          <button class="control-btn speed-btn double-btn">2x Speed</button>
        </div>
        <div class="project-info" style="padding:15px; border-top:1px solid #1a1a1a; background:#0e0e0e; text-align:left;">
            <p style="color:#00f2ff; font-family:monospace; font-size:0.85rem; margin:0 0 5px 0;">[SR] ${this.descSr}</p>
            <p style="color:#888; font-family:monospace; font-size:0.8rem; font-style:italic; margin:0;">[EN] ${this.descEn}</p>
        </div>
      </div>`;
  }

  cacheImageElements() {
    this.block = document.getElementById(`block-${this.folderName}`);
    if (!this.block) return;
    this.images = Array.from(this.block.querySelectorAll('.project-image'));
    this.playBtn = this.block.querySelector('.play-btn');
    this.normalBtn = this.block.querySelector('.normal-btn');
    this.doubleBtn = this.block.querySelector('.double-btn');
  }

  attachEventListeners() {
    if (!this.block) return;
    this.block.addEventListener('mouseenter', () => this.play());
    this.block.addEventListener('mouseleave', () => this.stop());
    this.playBtn.addEventListener('click', () => this.isPlaying ? this.pause() : this.play());
    this.normalBtn.addEventListener('click', () => this.setSpeed('normal'));
    this.doubleBtn.addEventListener('click', () => this.setSpeed('2x'));
  }

  play() { if (this.isPlaying) return; this.isPlaying = true; this.updateUI(); this.cycle(); }
  cycle() {
    if (!this.isPlaying) return;
    this.showImage(this.currentImageIndex);
    this.animationTimeout = setTimeout(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
      this.cycle();
    }, this.displayMs + this.pauseMs);
  }
  pause() { this.isPlaying = false; clearTimeout(this.animationTimeout); this.updateUI(); }
  stop() { this.pause(); this.currentImageIndex = 0; this.showImage(0); }
  showImage(index) { this.images.forEach((img, i) => img.classList.toggle('active', i === index)); }
  setSpeed(type) {
    this.speed = type;
    const m = type === '2x' ? 0.5 : 1;
    this.displayMs = this.baseDisplayMs * m;
    this.pauseMs = this.basePauseMs * m;
    this.updateUI();
    if (this.isPlaying) { clearTimeout(this.animationTimeout); this.cycle(); }
  }
  updateUI() {
    this.playBtn.innerHTML = this.isPlaying ? '⏸ Pause' : '▶ Play';
    this.normalBtn.classList.toggle('active', this.speed === 'normal');
    this.doubleBtn.classList.toggle('active', this.speed === '2x');
  }
}
