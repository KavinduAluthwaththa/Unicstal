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

        // AFTER SECTION 3 - MOVE DRILL MODEL OFF SCREEN TO THE RIGHT
        .to(drillModel.position, {
            x: 15.0,  // Move drill model far to the right
            y: 0.0,   // Keep at ground level
            z: 0.0,   // Keep centered depth
            duration: 0.5,
            ease: "power2.out"
        }, 0.4)
        .to(position, {
            x: -3.4,  // Keep camera at section 3 position
            y: 9.6,   // Keep camera at section 3 position
            z: 3.5,   // Keep camera at section 3 position
            duration: 0.1,
            ease: "none"
        }, 0.4)
        .to(target, {
            x: -1.5,  // Keep target at section 3 position
            y: 2.13,  // Keep target at section 3 position
            z: -0.4,  // Keep target at section 3 position
            duration: 0.1,
            ease: "none"
        }, 0.4)

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

        // SECTION 2 SLIDE OUT TO RIGHT (SAME STYLE AS SECTION 1)
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
        })

        // SECTION 3 SLIDE OUT TO LEFT (SAME STYLE AS SECTION 1)
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
        })



        // SECTION 4 FADE IN ANIMATION
        gsap.set(".section--fourth--container", { opacity: 0 })
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
        })

        // SECTION 5 SLIDE IN FROM BOTTOM WITH DELAY
        gsap.set(".section--five--container", { y: 100, opacity: 0 })
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
        })

        // SECTION 4 SLIDE OUT TO RIGHT
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
        })

        // SECTION 5 SLIDE OUT TO LEFT (ONLY WHEN SCROLLING UP)
        // Note: Section 5 slide out is handled by the reversible slide-in animation above
        

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
