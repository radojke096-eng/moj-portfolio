/**
 * ProjectBlock Class
 * Handles an image sequence from a folder with play/pause and speed controls
 */
class ProjectBlock {
  constructor(folderName, totalImages, containerId) {
    this.folderName = folderName;
    this.totalImages = totalImages;
    this.containerId = containerId;
    this.currentImageIndex = 0;
    this.isPlaying = false;
    this.animationInterval = null;
    this.speed = 100; // Default speed in milliseconds

    this.init();
  }

  /**
   * Initialize the ProjectBlock
   */
  init() {
    this.createDOMStructure();
    this.attachEventListeners();
  }

  /**
   * Create the HTML structure for the project block
   */
  createDOMStructure() {
    const container = document.getElementById(this.containerId);

    if (!container) {
      console.error(`Container with id "${this.containerId}" not found.`);
      return;
    }

    // Create the project block wrapper
    const projectBlock = document.createElement('div');
    projectBlock.className = 'project-block';
    projectBlock.id = `project-block-${this.folderName}`;

    // Create the image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    // Create image elements for each image in the sequence
    for (let i = 1; i <= this.totalImages; i++) {
      const img = document.createElement('img');
      img.className = 'project-image';
      img.src = `Assets/${this.folderName}/img${i}.png`;
      img.alt = `${this.folderName} - Frame ${i}`;
      img.dataset.index = i - 1;

      // Hide all images except the first one
      if (i !== 1) {
        img.style.display = 'none';
      }

      imageContainer.appendChild(img);
    }

    projectBlock.appendChild(imageContainer);

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'project-controls';

    // Play/Pause button
    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'control-btn play-pause-btn';
    playPauseBtn.id = `play-pause-${this.folderName}`;
    playPauseBtn.innerHTML = '▶ Play';
    playPauseBtn.addEventListener('click', () => this.togglePlayPause());

    // Normal Speed button
    const normalSpeedBtn = document.createElement('button');
    normalSpeedBtn.className = 'control-btn speed-btn normal-speed-btn';
    normalSpeedBtn.id = `normal-speed-${this.folderName}`;
    normalSpeedBtn.innerHTML = '1x Speed';
    normalSpeedBtn.addEventListener('click', () => this.setSpeed(100));

    // 2x Speed button
    const doubleSpeedBtn = document.createElement('button');
    doubleSpeedBtn.className = 'control-btn speed-btn double-speed-btn';
    doubleSpeedBtn.id = `double-speed-${this.folderName}`;
    doubleSpeedBtn.innerHTML = '2x Speed';
    doubleSpeedBtn.addEventListener('click', () => this.setSpeed(50));

    controlsContainer.appendChild(playPauseBtn);
    controlsContainer.appendChild(normalSpeedBtn);
    controlsContainer.appendChild(doubleSpeedBtn);

    projectBlock.appendChild(controlsContainer);
    container.appendChild(projectBlock);
  }

  /**
   * Attach event listeners for hover effects
   */
  attachEventListeners() {
    const projectBlock = document.getElementById(`project-block-${this.folderName}`);

    if (!projectBlock) {
      console.error(`Project block for "${this.folderName}" not found.`);
      return;
    }

    projectBlock.addEventListener('mouseenter', () => this.autoPlay());
    projectBlock.addEventListener('mouseleave', () => this.stopAnimation());
  }

  /**
   * Auto play on hover
   */
  autoPlay() {
    if (this.isPlaying) return;
    this.play();
  }

  /**
   * Start the image sequence animation
   */
  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentImageIndex = 0;
    this.updatePlayPauseButton();

    this.animationInterval = setInterval(() => {
      this.showImage(this.currentImageIndex);
      this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
    }, this.speed);
  }

  /**
   * Pause the animation
   */
  pause() {
    this.isPlaying = false;

    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }

    this.updatePlayPauseButton();
  }

  /**
   * Toggle between play and pause
   */
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Stop the animation and reset to the first image
   */
  stopAnimation() {
    this.pause();
    this.showImage(0);
  }

  /**
   * Set animation speed
   * @param {number} speedMs - Speed in milliseconds
   */
  setSpeed(speedMs) {
    this.speed = speedMs;
    
    // If playing, restart with new speed
    if (this.isPlaying) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(() => {
        this.showImage(this.currentImageIndex);
        this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
      }, this.speed);
    }

    // Update button states
    this.updateSpeedButtons();
  }

  /**
   * Update speed button states
   */
  updateSpeedButtons() {
    const normalBtn = document.getElementById(`normal-speed-${this.folderName}`);
    const doubleBtn = document.getElementById(`double-speed-${this.folderName}`);

    if (normalBtn && doubleBtn) {
      normalBtn.classList.toggle('active', this.speed === 100);
      doubleBtn.classList.toggle('active', this.speed === 50);
    }
  }

  /**
   * Update play/pause button text
   */
  updatePlayPauseButton() {
    const btn = document.getElementById(`play-pause-${this.folderName}`);
    if (btn) {
      btn.innerHTML = this.isPlaying ? '⏸ Pause' : '▶ Play';
      btn.classList.toggle('playing', this.isPlaying);
    }
  }

  /**
   * Display a specific image in the sequence
   * @param {number} index - The index of the image to display
   */
  showImage(index) {
    const projectBlock = document.getElementById(`project-block-${this.folderName}`);
    const images = projectBlock.querySelectorAll('.project-image');

    images.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
  }
}
