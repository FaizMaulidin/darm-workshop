import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useModelContext } from "../../hooks/ModelProvider";
import gsap from "gsap";

export default function ModelViewer({ modelPath, backgroundColor = "rgba(27, 30, 35)", enableShadows = true, mode = "simulation" }) {
  const containerRef = useRef();
  const modelContext = useModelContext()

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NoToneMapping;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(-16, 32, -26);
    gsap.to(camera.position, {duration: 2, x: -1.3, y: 1.6, z: -0.8})

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemi.position.set(0, 5, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(-5, 10, 7);
    dir.castShadow = enableShadows;
    dir.shadow.mapSize.set(2048, 2048);
    dir.shadow.camera.left = -5;
    dir.shadow.camera.right = 5;
    dir.shadow.camera.top = 5;
    dir.shadow.camera.bottom = -5;
    dir.shadow.bias = -0.0005; // small negative bias helps
    dir.shadow.normalBias = 0.02; // also helps with acne
    dir.shadow.mapSize.set(4096, 4096);
    scene.add(dir);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false
    controls.minPolarAngle = 0;           // minimum angle (down)
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 0.5;
    controls.maxDistance = 2;
    controls.target.set(0, 0.9, 0);

    // Loader
    const loader = new GLTFLoader();
    let model = null;
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene || gltf.scenes[0];

        model.getObjectByName("WP_Body").visible = false
        model.getObjectByName("WP_Piston").visible = false
        model.getObjectByName("WP_Spring").visible = false
        model.getObjectByName("WP_Cap").visible = false
        
        model.position.set(-0.1, 0.8, -0.08); // move center to origin

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = enableShadows;
            child.receiveShadow = enableShadows;
            if (child.material) child.material.needsUpdate = true;
          }
        });

        const createClone = () => {
          const capClone = model.getObjectByName("WP_Cap_Feeder").clone()
          const springClone = model.getObjectByName("WP_Spring_Feeder").clone()
          const pistonClone = model.getObjectByName("WP_Piston_Feeder").clone()
          const bodyClone = model.getObjectByName("WP_Body1").clone()

          model.add(capClone)
          model.add(springClone)
          model.add(pistonClone)
          model.add(bodyClone)

          modelContext.current.partsRef.springClone = springClone
          modelContext.current.partsRef.capClone = capClone
          modelContext.current.partsRef.pistonClone = pistonClone
          modelContext.current.partsRef.bodyClone = bodyClone

          return {
            springClone,
            capClone,
            pistonClone,
            bodyClone
          }
        }

        const {springClone, capClone, pistonClone, bodyClone} = createClone()

        modelContext.current.partsRef = {
          model: model,
          basePivot: model.getObjectByName("Base_Pivot"),
          shoulderPivot: model.getObjectByName("Shoulder_Pivot"),
          elbowPivot: model.getObjectByName("Elbow_Pivot"),
          wristPivot: model.getObjectByName("Wrist_Pivot"),
          gripperPivot: model.getObjectByName("Gripper_Pivot"),
          gpRight: model.getObjectByName("GP_Right"),
          gpLeft: model.getObjectByName("GP_Left"),
          fcPusher: model.getObjectByName("FC_Pusher"),
          fsPusher: model.getObjectByName("FS_Pusher"),
          springFeeder: model.getObjectByName("WP_Spring_Feeder"),
          springClone: springClone,
          capFeeder: model.getObjectByName("WP_Cap_Feeder"),
          capClone: capClone,
          pistonFeeder: model.getObjectByName("WP_Piston_Feeder"),
          pistonClone: pistonClone,
          bodyFeeder: model.getObjectByName("WP_Body1"),
          bodyClone: bodyClone,
          createClone: createClone
        };
        
        if(mode === "simulation") {
          modelContext.current.runSimulation = true
          modelContext.current.handlePartsMovement.fullSimulation()
        } else {
          modelContext.current.runSimulation = false
          modelContext.current.status.busy = false
          modelContext.current.status.gpOpened = false
          model.attach(modelContext.current.partsRef.capClone)
          model.attach(modelContext.current.partsRef.pistonClone)
          model.attach(modelContext.current.partsRef.springClone)
          modelContext.current.partsRef.capFeeder.visible = false
          modelContext.current.partsRef.pistonFeeder.visible = false
          modelContext.current.partsRef.springFeeder.visible = false

          if(mode === "editor") {
            controls.minDistance = 1
          }
        }

        scene.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (err) => {
        console.error("Error loading model:", err);
      },
    );

    // Resize handling
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let rafId;
    const clock = new THREE.Clock();
    function animate() {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      controls.update(delta);
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      modelContext.current.runSimulation = false
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      // dispose geometries / materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose && m.dispose());
          } else {
            obj.material.dispose && obj.material.dispose();
          }
        }
      });
      container.removeChild(renderer.domElement);
    };
  }, [modelPath, backgroundColor, enableShadows, mode]);

  return<div ref={containerRef} className="h-screen w-full min-h-[400px]" /> 
    
}
