import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    mobileAndTabletCheck,
    BloomPlugin,
    Vector3, GammaCorrectionPlugin, MeshBasicMaterial2, Color, AssetImporter
} from "webgi";
import "./styles.css";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

lenis.stop()

function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        // isAntialiased: true,
    })

    const isMobile = mobileAndTabletCheck()
    // console.log(isMobile)

    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target
    const exitButton = document.querySelector('.button--exit') as HTMLElement
    const customizerInterface = document.querySelector('.customizer--container') as HTMLElement

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)

    // Loader
    const importer = manager.importer as AssetImporter

    importer.addEventListener("onProgress", (ev) => {
        const progressRatio = (ev.loaded / ev.total)
        // console.log(progressRatio)
        document.querySelector('.progress')?.setAttribute('style', `transform: scaleX(${progressRatio})`)
    })

    importer.addEventListener("onLoad", (ev) => {
        gsap.to('.loader', {x: '100%', duration: 0.8, ease: 'power4.inOut', delay: 1, onComplete: () =>{
            document.body.style.overflowY = 'auto'
            lenis.start()

        }})
    })

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/drill3.glb")

    const drillMaterial = manager.materials!.findMaterialsByName('Drill_01')[0] as MeshBasicMaterial2
    const drillModel = viewer.scene.modelRoot // Get reference to the drill model

    viewer.getPlugin(TonemapPlugin)!.config!.clipBackground = true // in case its set to false in the glb

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

    if (isMobile){
        position.set(-3.5, -1.1, 5.5)
        target.set(-0.8, 1.55, -0.7)
        camera.setCameraOptions({ fov: 40 })
    }

    onUpdate()
    
    window.scrollTo(0,0)

    function setupScrollanimation(){

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                immediateRender: false
            }
        })

        // CONTINUOUS CAMERA MOVEMENT - ONE SMOOTH TIMELINE
        // Total progress: 0 to 1 across all sections

        tl
        // FIRST TO SECOND SECTION (0% to 20%)
        .to(position, {
            x: isMobile ? -6.0 : 1.56, 
            y: isMobile ? 5.5 : -2.26, 
            z: isMobile ? -3.3 : -3.85,
            duration: 0.2
        }, 0)
        .to(target, {
            x: isMobile ? -1.1 : -1.37, 
            y: isMobile ? 1.0 : 1.99, 
            z: isMobile ? -0.1 : -0.37,
            duration: 0.2
        }, 0)

        // SECOND TO THIRD SECTION (20% to 40%)
        .to(position, {
            x: -3.4, 
            y: 9.6, 
            z: 3.5,  // Moved further back from 1.71
            duration: 0.2
        }, 0.2)
        .to(target, {
            x: -1.5, 
            y: 2.13, 
            z: -0.4,
            duration: 0.2
        }, 0.2)

        // THIRD TO FOURTH SECTION (40% to 60%) - SMOOTH ARC MOVEMENT
        .to(position, {
            x: 2.8,   // Intermediate position - smoother arc
            y: 1.2,   // Gradual height change
            z: 4.5,   // Closer to model for better view
            duration: 0.2,
            ease: "power2.inOut"  // Smooth easing
        }, 0.4)
        .to(target, {
            x: 0.5,   // Focus on center-right of model
            y: 1.5,   // Slightly higher target
            z: 0.1,
            duration: 0.2,
            ease: "power2.inOut"
        }, 0.4)

        // FOURTH TO FIFTH SECTION (60% to 80%) - DRAMATIC RIGHT SIDE REVEAL
        .to(position, {
            x: 6.2,   // Further right for dramatic angle
            y: 2.8,   // Higher viewpoint
            z: 2.5,   // Closer for impact
            duration: 0.2,
            ease: "power2.inOut"
        }, 0.6)
        .to(target, {
            x: 1.2,   // Target further right side of model
            y: 1.8,   // Higher focus point
            z: -0.2,
            duration: 0.2,
            ease: "power2.inOut"
        }, 0.6)
        
        // SMOOTH DRILL ROTATION AND SCALE DURING SECTION 4→5 TRANSITION
        .to(drillModel.rotation, {
            y: drillModel.rotation.y + Math.PI, // 180 degree rotation (Math.PI radians)
            duration: 0.2,
            ease: "power2.inOut",
            onUpdate: () => {
                viewer.setDirty(); // Update the scene
            }
        }, 0.6)
        
        // ADD SUBTLE SCALE ANIMATION FOR EMPHASIS
        .to(drillModel.scale, {
            x: 1.1,
            y: 1.1, 
            z: 1.1,
            duration: 0.1,
            ease: "power2.out"
        }, 0.6)
        .to(drillModel.scale, {
            x: 1.0,
            y: 1.0,
            z: 1.0,
            duration: 0.1,
            ease: "power2.in",
            onUpdate: () => {
                viewer.setDirty(); // Update the scene
            }
        }, 0.7)

        // DRILL STAYS AT RIGHT SIDE (80% to 100%) - STOP AT SECTION 5 POSITION
        .to(position, {
            x: 8.5,   // Stay at right side position
            y: 3.2,   
            z: 1.4,   // Keep the same z position
            duration: 0.2
        }, 0.8)
        .to(target, {
            x: 1.7,   // Stay focused on right side
            y: 1.6, 
            z: 1.4,
            duration: 0.2
        }, 0.8)

        // TEXT ANIMATIONS - SEPARATE TRIGGERS
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
        })

        // UPDATE CALLBACK
        tl.eventCallback("onUpdate", onUpdate)

    }

    setupScrollanimation()

    // WEBGI UPDATE
    let needsUpdate = true;

    function onUpdate() {
        needsUpdate = true;
        // viewer.renderer.resetShadows()
        viewer.setDirty()
    }

    viewer.addEventListener('preFrame', () =>{
        if(needsUpdate){
            camera.positionTargetUpdated(true)
            needsUpdate = false
        }
    })

    // KNOW MORE EVENT
	document.querySelector('.button--hero')?.addEventListener('click', () => {
		const element = document.querySelector('.second')
		window.scrollTo({ top: element?.getBoundingClientRect().top, left: 0, behavior: 'smooth' })
	})

	// SCROLL TO TOP
	document.querySelectorAll('.button--footer')?.forEach(item => {
		item.addEventListener('click', () => {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		})
	})

    // CUSTOMIZE
    const sections = document.querySelector('.container') as HTMLElement
    const mainContainer = document.getElementById('webgi-canvas-container') as HTMLElement
	document.querySelector('.button--customize')?.addEventListener('click', () => {
        sections.style.display = "none"
        mainContainer.style.pointerEvents = "all"
        document.body.style.cursor = "grab"
        lenis.stop()

        gsap.to(position, {x: -2.6, y: 0.2, z: -9.6, duration: 2, ease: "power3.inOut", onUpdate})
        gsap.to(target, {x: -0.15, y: 1.18 , z: 0.12, duration: 2, ease: "power3.inOut", onUpdate, onComplete: enableControlers})
	})

    function enableControlers(){
        exitButton.style.display = "block"
        customizerInterface.style.display = "block"
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled: true})
    }


    // EXIT CUSTOMIZER
	exitButton.addEventListener('click', () => {
        gsap.to(position, {x: -3.4, y: 9.6, z: 1.71, duration: 1, ease: "power3.inOut", onUpdate})
        gsap.to(target, {x: -1.5, y: 2.13 , z: -0.4, duration: 1, ease: "power3.inOut", onUpdate})

        viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})
        sections.style.display = "contents"
        mainContainer.style.pointerEvents = "none"
        document.body.style.cursor = "default"
        exitButton.style.display = "none"
        customizerInterface.style.display = "none"
        lenis.start()

	})

    document.querySelector('.button--colors.black')?.addEventListener('click', () => {
		changeColor(new Color(0x383830).convertSRGBToLinear())
    })

    document.querySelector('.button--colors.red')?.addEventListener('click', () => {
		changeColor(new Color(0xfe2d2d).convertSRGBToLinear())
    })

    document.querySelector('.button--colors.yellow')?.addEventListener('click', () => {
		changeColor(new Color(0xffffff).convertSRGBToLinear())
    })

    function changeColor(_colorToBeChanged: Color){
        drillMaterial.color = _colorToBeChanged;
        viewer.scene.setDirty()
    }

}

setupViewer()
