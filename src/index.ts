import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Note: @studio-freight/lenis is deprecated, using it for compatibility
import Lenis from '@studio-freight/lenis';

console.log('Three.js script loaded successfully');

// Mobile detection function
function mobileAndTabletCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(window as any).opera);
    return check;
}

// Smooth scrolling setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.stop();

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// Three.js scene setup
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let starModel: THREE.Group;
let mixer: THREE.AnimationMixer | null = null;
let controls: OrbitControls;

// UI elements
const exitButton = document.querySelector('.button--exit') as HTMLElement;
const customizerInterface = document.querySelector('.customizer--container') as HTMLElement;

async function setupViewer() {
    console.log('Setting up Three.js viewer...');
    
    try {
        const canvas = document.getElementById('webgi-canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }
        
        const isMobile = mobileAndTabletCheck();
        console.log('Is mobile:', isMobile);

        // Scene setup
        scene = new THREE.Scene();
        scene.background = null; // Transparent background to see HTML content behind
        console.log('Scene created');

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        if (isMobile) {
            // Mobile camera positioning 
            camera.position.set(-0.5, 0.5, 3.0);
            camera.fov = 55;
            camera.updateProjectionMatrix();
        } else {
            // Desktop camera positioning
            camera.position.set(0.8, -0.4, 3);
            camera.fov = 70;
            camera.updateProjectionMatrix();
        }

        console.log('Camera set up at position:', camera.position);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated from outputEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Controls setup (initially disabled)
    controls = new OrbitControls(camera, canvas);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting setup for dramatic effect - TEMPORARILY COMMENTED OUT
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Reduced ambient for more drama
    scene.add(ambientLight);

    // // Main directional light from upper right
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(8, 12, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // // Soft hemisphere light for general illumination
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(hemisphereLight);

    // // Key light from the left for dramatic lighting like in the image
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(-8, 6, 4);
    scene.add(keyLight);
    
    // // Add rim lighting for mystical effect
    const rimLight = new THREE.DirectionalLight(0x9966ff, 0.6); // Purple tint
    rimLight.position.set(2, -3, -5);
    scene.add(rimLight);

    // Load model
    await loadModel();

    // Setup animations AFTER model is loaded
    setupScrollAnimation();

    // Setup UI interactions
    setupUIInteractions();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start render loop
    animate();

    // Hide loader
    gsap.to('.loader', {
        y: '100%', 
        duration: 0.8, 
        ease: 'power4.inOut', 
        delay: 1, 
        onComplete: () => {
            document.body.style.overflowY = 'auto';
            lenis.start();
        }
    });

    window.scrollTo(0, 0);
    
    } catch (error) {
        console.error('Error setting up viewer:', error);
    }
}

async function loadModel() {
    const loader = new GLTFLoader();
    
    return new Promise<void>((resolve, reject) => {
        // Update progress
        const progressElement = document.querySelector('.progress') as HTMLElement;
        
        loader.load(
            './assets/painter_of_stars.glb',
            (gltf) => {
                starModel = gltf.scene;
                
                console.log('Model loaded:', starModel);
                console.log('Model bounding box:', new THREE.Box3().setFromObject(starModel));
                
                // POSITION ADJUSTMENTS - x,y,z
                starModel.position.set(2, 0, -0.2);
                
                // ROTATION ADJUSTMENTS - x,y,z
                starModel.rotation.set(0, -0.6, 0);  // Positive X for top-to-back tilt, negative Y rotation
                                
                // Setup animations if available
                if (gltf.animations && gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(starModel);
                    const action = mixer.clipAction(gltf.animations[0]);
                    action.play();
                    console.log('Animation loaded and playing');
                }
                
                // Enable shadows and configure materials - TEMPORARILY COMMENTED OUT
                starModel.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Ensure proper material configuration
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(mat => {
                                    if (mat instanceof THREE.MeshStandardMaterial) {
                                        mat.needsUpdate = true;
                                    }
                                });
                            } else if (child.material instanceof THREE.MeshStandardMaterial) {
                                child.material.needsUpdate = true;
                            }
                        }
                    }
                });
                
                scene.add(starModel);
                console.log('Model loaded in original state');
                resolve();
            },
            (progress) => {
                const progressRatio = progress.loaded / progress.total;
                if (progressElement) {
                    progressElement.style.transform = `scaleX(${progressRatio})`;
                }
            },
            (error) => {
                console.error('Error loading model:', error);
                reject(error);
            }
        );
    });
}

function setupScrollAnimation() {
    // Setup both text and model animations
    setupTextAnimations();
    setupModelScrollAnimation();
}

function setupTextAnimations() {
    // Section animations
    gsap.to(".section--one--container", { 
        xPercent: '-150', 
        opacity: 0,
        scrollTrigger: {
            trigger: ".second",
            start: "top bottom",
            end: "top 80%", 
            scrub: 1,
            immediateRender: false
        }
    });

    gsap.to(".section--two--container", { 
        xPercent: '150', 
        opacity: 0,
        scrollTrigger: {
            trigger: ".third",
            start: "top bottom",
            end: "top 80%", 
            scrub: 1,
            immediateRender: false
        }
    });

    gsap.to(".section--third--container", { 
        xPercent: '-150', 
        opacity: 0,
        scrollTrigger: {
            trigger: ".fourth",
            start: "top bottom",
            end: "top 80%", 
            scrub: 1,
            immediateRender: false
        }
    });

    // Section 4 fade in
    gsap.set(".section--fourth--container", { opacity: 0 });
    gsap.to(".section--fourth--container", {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".fourth",
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
        }
    });

    // Section 5 slide in
    gsap.set(".section--five--container", { y: 100, opacity: 0 });
    gsap.to(".section--five--container", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".fifth",
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to(".section--fourth--container", { 
        xPercent: '150', 
        opacity: 0,
        scrollTrigger: {
            trigger: ".fifth",
            start: "top bottom",
            end: "top 80%", 
            scrub: 1,
            immediateRender: false
        }
    });
}

function setupModelScrollAnimation() {
    if (!starModel) return;

    // Store initial transform
    const initialX = starModel.position.x;
    const initialRotY = starModel.rotation.y;
    const initialScale = starModel.scale.clone();

    // Use a single timeline for smooth transition from section 1 -> 2 -> 3
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".second",
            start: "top bottom",
            endTrigger: ".third",
            end: "bottom top",
            scrub: 1,
        }
    });

    // Section 1 (start) to Section 2 (end of .second) - 0 to 0.5 progress
    // CONTINUOUS MODEL ANIMATION - ALIGNED WITH SCROLL
    tl
        // PHASE 1: Section 1 to 2 (start as early as possible, -0.5 to 0.0 scroll progress)
        .to(starModel.position, {
            x: -1.35,
            y: -0.2,
            z: 1.5,
            duration: 0.3,
            ease: "power2.inOut"
        }, -0.8)
        .to(starModel.rotation, {
            y: Math.PI / 3,
            duration: 0.3,
            ease: "power2.inOut"
        }, -0.8)

        // PHASE 2: Section 2 to 3 (start immediately after phase 1, 0.0 to 0.15 scroll progress)
        .to(starModel.position, {
            x: 1.8,
            y: -0.2,
            z: 0,
            duration: 0.13,
            ease: "power2.inOut"           
        }, -0.5)
        .to(starModel.rotation, {
            y: -Math.PI / 4,
            duration: 0.13,
            ease: "power2.inOut"
        }, -0.5)

        // PHASE 3: Section 3 to 4 (start immediately after phase 2, 0.15 to 0.3 scroll progress)
        .to(starModel.position, {
            x: 13,
            y: -0.2,
            z: 0,
            duration: 0.13,
            ease: "power2.inOut"
        }, -0.3)
    
    }



function setupUIInteractions() {
    const sections = document.querySelector('.container') as HTMLElement;
    const mainContainer = document.getElementById('webgi-canvas-container') as HTMLElement;

    // Hero button
    document.querySelector('.button--hero')?.addEventListener('click', () => {
        const element = document.querySelector('.second');
        if (element) {
            window.scrollTo({ 
                top: element.getBoundingClientRect().top, 
                left: 0, 
                behavior: 'smooth' 
            });
        }
    });

    // Footer buttons
    document.querySelectorAll('.button--footer')?.forEach(item => {
        item.addEventListener('click', () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    });

    // Customize button
    document.querySelector('.button--customize')?.addEventListener('click', () => {
        sections.style.display = "none";
        mainContainer.style.pointerEvents = "all";
        document.body.style.cursor = "grab";
        lenis.stop();

        gsap.to(camera.position, {
            x: -1.5, y: 1.0, z: -7.0, 
            duration: 2, 
            ease: "power3.inOut"
        });

        // Also animate camera target for smooth transition
        gsap.to(controls.target, {
            x: 2.2, y: 0.2, z: 0,
            duration: 2,
            ease: "power3.inOut"
        });

        // Enable controls after animation
        setTimeout(() => {
            controls.enabled = true;
            exitButton.style.display = "block";
            customizerInterface.style.display = "block";
        }, 2000);
    });

    // Exit customizer
    exitButton.addEventListener('click', () => {
        gsap.to(camera.position, {
            x: -0.8, y: 0.8, z: 4.0, 
            duration: 1, 
            ease: "power3.inOut"
        });
        
        // Return camera target to original position
        gsap.to(controls.target, {
            x: 2.2, y: 0.2, z: 0,
            duration: 1,
            ease: "power3.inOut"
        });

        controls.enabled = false;
        sections.style.display = "contents";
        mainContainer.style.pointerEvents = "none";
        document.body.style.cursor = "default";
        exitButton.style.display = "none";
        customizerInterface.style.display = "none";
        lenis.start();
    });

    // Color change buttons
    document.querySelector('.button--colors.black')?.addEventListener('click', () => {
        changeColor(new THREE.Color(0x383830));
    });

    document.querySelector('.button--colors.red')?.addEventListener('click', () => {
        changeColor(new THREE.Color(0xfe2d2d));
    });

    document.querySelector('.button--colors.yellow')?.addEventListener('click', () => {
        changeColor(new THREE.Color(0xffffff));
    });
}

function changeColor(color: THREE.Color) {
    if (starModel) {
        starModel.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                // Handle both single materials and material arrays
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                materials.forEach(material => {
                    if (material instanceof THREE.MeshStandardMaterial || 
                        material instanceof THREE.MeshBasicMaterial ||
                        material instanceof THREE.MeshLambertMaterial ||
                        material instanceof THREE.MeshPhongMaterial) {
                        material.color.copy(color);
                        material.needsUpdate = true;
                    }
                });
            }
        });
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
        mixer.update(0.016); // 60fps
    }

    if (controls.enabled) {
        controls.update();
    }

    renderer.render(scene, camera);
}

setupViewer();
function to(position: THREE.Vector3, arg1: { x: number; y: number; z: number; duration: number; ease: string; }, arg2: number) {
    throw new Error('Function not implemented.');
}

