'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Global3DModel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starModelRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const clockRef = useRef(new THREE.Clock());
  const [isLoaded, setIsLoaded] = useState(false);

  // Mobile detection function
  const mobileAndTabletCheck = () => {
    let check = false;
    if (typeof window !== 'undefined') {
      const agent = navigator.userAgent || navigator.vendor || (window as any).opera;
      check = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4));
    }
    return check;
  };

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    const isMobile = mobileAndTabletCheck();
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 55 : 70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera positioning based on original setup
    if (isMobile) {
      camera.position.set(-0.5, 0.5, 3.0);
    } else {
      camera.position.set(1, -0.4, 3);
    }

    // Lighting setup for dramatic effect
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(8, 12, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(hemisphereLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(-8, 6, 4);
    scene.add(keyLight);
    
    const rimLight = new THREE.DirectionalLight(0x9966ff, 0.6);
    rimLight.position.set(2, -3, -5);
    scene.add(rimLight);

    // Load the painter of stars model
    const loadModel = async () => {
      const loader = new GLTFLoader();
      
      try {
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(
            '/assets/painter_of_stars.glb',
            resolve,
            (progress) => {
              console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            reject
          );
        });

        const starModel = gltf.scene;
        starModelRef.current = starModel;
        
        // Position adjustments based on original setup
        starModel.position.set(3, -0.8, 0);
        starModel.rotation.set(0, -1, 0); // Added Z-axis rotation for right tilt
        
        scene.add(starModel);
        
        // Setup animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(starModel);
          mixerRef.current = mixer;
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          console.log('Animation loaded and playing');
        }

        setIsLoaded(true);
        
        // Setup scroll animations after model is loaded
        setupScrollAnimations();
        
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    // Setup scroll animations using original project movements
    const setupScrollAnimations = () => {
      if (!starModelRef.current || !cameraRef.current) return;

      const starModel = starModelRef.current;
      const camera = cameraRef.current;

      // Store initial transform values from original project
      const initialX = starModel.position.x; // 2
      const initialRotY = starModel.rotation.y; // -0.6
      const initialScale = starModel.scale.clone();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-two", // .second in original
          start: "top bottom",
          endTrigger: "#section-three", // .third in original  
          end: "bottom top",
          scrub: 1,
        }
      });

      tl
        .to(starModel.position, {
          x: -1,
          y: -0.5,
          z: 0,
          duration: 0.3,
          ease: "power2.inOut"
        }, -0.8)
        .to(starModel.rotation, {
          y: Math.PI / 4,
          duration: 0.3,
          ease: "power2.inOut"
        }, -0.8)

        .to(starModel.position, {
          x: -50.8,
          y: -0.2,
          z: -2,
          duration: 0.13,
          ease: "power2.inOut"           
        }, -0.5);

      // Setup text animations exactly as in original project
      setupOriginalTextAnimations();

      // Setup section 4 animation as in original
      gsap.set("#section-four .section--container", { y: 100, opacity: 0 });
      gsap.to("#section-four .section--container", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#section-four",
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });
    };

    // Original text animations from the project
    const setupOriginalTextAnimations = () => {
      // Section animations exactly as in original
      gsap.to("#section-one .section--container", { 
        xPercent: -150, 
        opacity: 0,
        scrollTrigger: {
          trigger: "#section-two", // .second in original
          start: "top bottom",
          end: "top 80%", 
          scrub: 1,
          immediateRender: false
        }
      });

      gsap.to("#section-two .section--two--container", { 
        xPercent: 150, 
        opacity: 0,
        scrollTrigger: {
          trigger: "#section-three", // .third in original
          start: "top bottom",
          end: "top 80%", 
          scrub: 1,
          immediateRender: false
        }
      });

      gsap.to("#section-three .section--container", { 
        xPercent: -150, 
        opacity: 0,
        scrollTrigger: {
          trigger: "#section-four", // .fourth in original
          start: "top bottom",
          end: "top -200%", 
          scrub: 1,
          immediateRender: false
        }
      });
    };

    loadModel();

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const delta = clockRef.current.getDelta();
      
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.dispose();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="global-3d-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10, // Above most content but below navbar
      }}
    />
  );
};

export default Global3DModel;