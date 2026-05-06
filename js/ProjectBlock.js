/**
 * ProjectBlock Class
 * Handles an image sequence from a folder with play/pause and speed controls
 * Default: 2 seconds image + 2 seconds pause = 4 seconds total per image
 * 2x Speed: 1 second image + 1 second pause = 2 seconds total per image
 */
class ProjectBlock {
  constructor(folderName, totalImages, containerId) {
    this.folderName = folderName;
    this.totalImages = totalImages;
    this.containerId = containerId;
    this.currentImageIndex = 0;
    this.isPlaying = false;
    this.animationInterval = null;
    this.speed = 'normal'; // 'normal' or '2x'
    this.normalSpeedMs = 2000; // 2 seconds for image display
    this.pauseMs = 2000; // 2 seconds pause
    this.speedMs = this.normalSpeedMs;

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
    normalSpeedBtn.className = 'control-btn speed-btn normal-speed-btn active';
    normalSpeedBtn.id = `normal-speed-${this.folderName}`;
    normalSpeedBtn.innerHTML = 'Normal (2s)';
    normalSpeedBtn.addEventListener('click', () => this.setSpeed('normal'));

    // 2x Speed button
    const doubleSpeedBtn = document.createElement('button');
    doubleSpeedBtn.className = 'control-btn speed-btn double-speed-btn';
    doubleSpeedBtn.id = `double-speed-${this.folderName}`;
    doubleSpeedBtn.innerHTML = '2x Speed (1s)';
    doubleSpeedBtn.addEventListener('click', () => this.setSpeed('2x'));

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
   * Start the image sequence animation with display and pause cycle
   */
  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentImageIndex = 0;
    this.updatePlayPauseButton();

    this.cycleImages();
  }

  /**
   * Cycle through images with display and pause timing
   */
  cycleImages() {
    if (!this.isPlaying) return;

    // Show current image
    this.showImage(this.currentImageIndex);

    // Clear any existing interval
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    // Set up timing for display and pause
    this.animationInterval = setTimeout(() => {
      if (this.isPlaying) {
        // Move to next image after display + pause time
        this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
        this.cycleImages();
      }
    }, this.speedMs + this.pauseMs);
  }

  /**
   * Pause the animation
   */
  pause() {
    this.isPlaying = false;

    if (this.animationInterval) {
      clearTimeout(this.animationInterval);
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
   * @param {string} speedType - 'normal' or '2x'
   */
  setSpeed(speedType) {
    this.speed = speedType;
    
    if (speedType === 'normal') {
      this.speedMs = this.normalSpeedMs; // 2 seconds
    } else if (speedType === '2x') {
      this.speedMs = this.normalSpeedMs / 2; // 1 second
    }

    // If playing, restart with new speed
    if (this.isPlaying) {
      if (this.animationInterval) {
        clearTimeout(this.animationInterval);
      }
      this.cycleImages();
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
      normalBtn.classList.toggle('active', this.speed === 'normal');
      doubleBtn.classList.toggle('active', this.speed === '2x');
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
