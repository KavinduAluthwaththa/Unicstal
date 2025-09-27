'use client';

import React, { useEffect, useRef } from 'react';
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
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  // Removed unused isLoaded and debugInfo state

  // Mobile detection function
  const mobileAndTabletCheck = () => {
    if (typeof window === 'undefined') return false;
    // User agent check
    const agent = navigator.userAgent || navigator.vendor || (window as { opera?: unknown }).opera;
    const agentStr = typeof agent === 'string' ? agent : '';
    const uaCheck = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agentStr.substr(0,4));
    // Fallback: screen width check
    const widthCheck = window.innerWidth <= 600;
    return uaCheck || widthCheck;
  };

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    const isMobile = mobileAndTabletCheck();
    console.log('🔍 Global3DModel: isMobile =', isMobile);
    console.log('🔍 Global3DModel: canvasRef.current =', canvasRef.current);
    console.log('🔍 Global3DModel: window dimensions =', window.innerWidth, 'x', window.innerHeight);
    
  // setDebugInfo removed (unused)
    
    // Mobile scroll behavior
    if (isMobile && canvasRef.current) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (canvasRef.current) {
          if (scrollY > 100) {
            canvasRef.current.classList.add('scrolling');
            document.body.classList.add('scrolled');
          } else {
            canvasRef.current.classList.remove('scrolling');
            document.body.classList.remove('scrolled');
          }
        }
      };
      
      scrollHandlerRef.current = handleScroll;
      window.addEventListener('scroll', handleScroll);
      
      // Cleanup scroll listener will be handled in main cleanup
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    const canvasWidth = isMobile ? 200 : window.innerWidth;
    const canvasHeight = isMobile ? 200 : window.innerHeight;
    
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 55 : 70,
      canvasWidth / canvasHeight, // Use canvas dimensions, not window
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(canvasWidth, canvasHeight); // Use canvas dimensions
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
      // Mobile: Position camera to see the model in small canvas
      camera.position.set(2, 0, 4); // Move back and slightly right to see model
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
        const gltf = await new Promise<import('three/examples/jsm/loaders/GLTFLoader').GLTF>((resolve, reject) => {
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
        
        console.log('🎯 3D Model loaded successfully:', starModel);
        console.log('🎯 Model position before adjustment:', starModel.position);
        
        // Position adjustments - different for mobile vs desktop
        if (isMobile) {
          // Mobile: Scale down and position for small canvas
          starModel.position.set(2, 0, 0.3); // Move slightly to the right
          starModel.scale.set(0.8, 0.8, 0.8); // Smaller for mobile
          starModel.rotation.set(0, 0, 0); // 60 degrees rotation towards screen from left
          console.log('🎯 Mobile model positioned:', starModel.position, 'scale:', starModel.scale);
        } else {
          // Desktop: Original positioning
          starModel.position.set(3, -0.8, 0);
          starModel.rotation.set(0, -1, 0);
        }
        
        scene.add(starModel);
        console.log('🎯 Model added to scene. Scene children:', scene.children.length);
        
        // Setup animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(starModel);
          mixerRef.current = mixer;
          const action = mixer.clipAction(gltf.animations[0] as THREE.AnimationClip);
          action.play();
          console.log('Animation loaded and playing');
        }

  // setIsLoaded removed (unused)
        
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
        const currentIsMobile = mobileAndTabletCheck();
        const newWidth = currentIsMobile ? 200 : window.innerWidth;
        const newHeight = currentIsMobile ? 200 : window.innerHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // Remove scroll listener if it was added
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.dispose();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="global-3d-canvas"
        style={{
          top: mobileAndTabletCheck() ? '80px' : 0,
          left: mobileAndTabletCheck() ? 'auto' : 0,
          right: mobileAndTabletCheck() ? '10px' : 'auto',
          width: mobileAndTabletCheck() ? '200px' : '100%',
          height: mobileAndTabletCheck() ? '200px' : '100%',
          pointerEvents: 'none',
          zIndex: mobileAndTabletCheck() ? 999 : 10,
        }}
      />
    </>
  );
};

export default Global3DModel;