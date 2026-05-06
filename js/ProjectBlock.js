/**
 * ProjectBlock Class
 * Handles an image sequence from a folder with hover effects
 */
class ProjectBlock {
  constructor(folderName, totalImages, containerId) {
    this.folderName = folderName;
    this.totalImages = totalImages;
    this.containerId = containerId;
    this.currentImageIndex = 0;
    this.isHovering = false;
    this.animationInterval = null;

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

    projectBlock.addEventListener('mouseenter', () => this.startAnimation());
    projectBlock.addEventListener('mouseleave', () => this.stopAnimation());
  }

  /**
   * Start the image sequence animation
   */
  startAnimation() {
    if (this.isHovering) return;

    this.isHovering = true;
    this.currentImageIndex = 0;

    this.animationInterval = setInterval(() => {
      this.showImage(this.currentImageIndex);
      this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
    }, 100); // Adjust speed (100ms per frame)
  }

  /**
   * Stop the animation and reset to the first image
   */
  stopAnimation() {
    this.isHovering = false;

    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }

    // Reset to the first image
    this.showImage(0);
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
