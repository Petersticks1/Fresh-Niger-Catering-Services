/**
 * Three.js Scene Setup (Non-Module Version)
 * Handles 3D model loading and basic rendering
 */

window.HeroScene = class HeroScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    this.model = null;
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    this.loadModel();
    this.addEventListeners();
    this.animate();
    
    this.container.classList.add('loaded');
  }

  loadModel() {
    // Check if GLTFLoader is under THREE or global
    let loader;
    if (typeof THREE.GLTFLoader !== 'undefined') {
      loader = new THREE.GLTFLoader();
    } else if (typeof GLTFLoader !== 'undefined') {
      loader = new GLTFLoader();
    } else {
      console.error('GLTFLoader not found. Please check script include.');
      this.createPlaceholder();
      return;
    }
    
    const modelPath = 'assets/models/food_dish.glb'; 

    loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);
        this.model.scale.set(1.5, 1.5, 1.5);
        
        this.scene.add(this.model);
      },
      null,
      (error) => {
        console.warn('Could not load GLB model, using placeholder primitive.');
        this.createPlaceholder();
      }
    );
  }

  createPlaceholder() {
    // Removed orange placeholder shape per user request
    return;
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) - 0.5;
      this.mouse.y = (e.clientY / window.innerHeight) - 0.5;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    if (this.model) {
      this.model.rotation.y += 0.005;
      this.model.position.y = Math.sin(elapsedTime) * 0.2;

      this.model.rotation.x += (this.mouse.y * 0.5 - this.model.rotation.x) * 0.05;
      this.model.rotation.y += (this.mouse.x * 0.5 - this.model.rotation.y) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  updateOnScroll(progress) {
    if (this.model) {
      this.model.rotation.y = progress * Math.PI * 2;
      this.camera.position.z = 5 + (progress * 2);
    }
  }
}
