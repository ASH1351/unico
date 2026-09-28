import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AtelierCanvasProps {
  onLoaded?: () => void;
  scrollY?: number;
}

export const AtelierCanvas: React.FC<AtelierCanvasProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to layered 2.5D atelier', e);
      setWebGlSupported(false);
      onLoaded?.();
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Scene and Camera
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend seamlessly with #FAF5EF

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.6);

    // Lighting: Soft directional daylight + warm atelier fill
    const ambientLight = new THREE.AmbientLight(0xfffcf8, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff2e0, 2.0);
    sunLight.position.set(3, 4, 3);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 15;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Subtle blush bounce light
    const blushBounce = new THREE.PointLight(0xe7c7c0, 0.9, 10);
    blushBounce.position.set(-2, -0.5, 1.5);
    scene.add(blushBounce);

    // Champagne gold rim light
    const goldRim = new THREE.DirectionalLight(0xb39664, 0.7);
    goldRim.position.set(-3, 2, -1);
    scene.add(goldRim);

    // 1. Back Plaster Wall & Architectural Curve
    const wallGeo = new THREE.PlaneGeometry(12, 8, 32, 32);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xfaf5ef,
      roughness: 0.9,
      metalness: 0.05
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 0, -2.5);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // 2. Sculptural Arch Frame (warm plaster arch with champagne trim)
    const archGroup = new THREE.Group();
    const archRadius = 1.6;
    const archTube = 0.08;
    const archTorus = new THREE.TorusGeometry(archRadius, archTube, 24, 64, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0xf5ede3,
      roughness: 0.8,
      metalness: 0.1
    });
    const archPillarGeo = new THREE.CylinderGeometry(archTube, archTube, 3.5, 24);

    const archTop = new THREE.Mesh(archTorus, archMat);
    archTop.position.set(0.6, 0.7, -1.8);
    archTop.receiveShadow = true;
    archTop.castShadow = true;
    archGroup.add(archTop);

    const leftPillar = new THREE.Mesh(archPillarGeo, archMat);
    leftPillar.position.set(0.6 - archRadius, -1.05, -1.8);
    leftPillar.receiveShadow = true;
    leftPillar.castShadow = true;
    archGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(archPillarGeo, archMat);
    rightPillar.position.set(0.6 + archRadius, -1.05, -1.8);
    rightPillar.receiveShadow = true;
    rightPillar.castShadow = true;
    archGroup.add(rightPillar);

    scene.add(archGroup);

    // 3. Champagne Clothing Rail (Sculptural minimalist brass rail)
    const railGroup = new THREE.Group();
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xb39664,
      metalness: 0.88,
      roughness: 0.28
    });

    // Horizontal bar
    const barGeo = new THREE.CylinderGeometry(0.022, 0.022, 2.0, 32);
    const horizontalBar = new THREE.Mesh(barGeo, railMat);
    horizontalBar.rotation.z = Math.PI / 2;
    horizontalBar.position.set(0.6, 1.45, -0.6);
    horizontalBar.castShadow = true;
    railGroup.add(horizontalBar);

    // Suspension cords
    const cordGeo = new THREE.CylinderGeometry(0.008, 0.008, 1.4, 16);
    const leftCord = new THREE.Mesh(cordGeo, railMat);
    leftCord.position.set(-0.25, 2.15, -0.6);
    railGroup.add(leftCord);

    const rightCord = new THREE.Mesh(cordGeo, railMat);
    rightCord.position.set(1.45, 2.15, -0.6);
    railGroup.add(rightCord);

    scene.add(railGroup);

    // 4. Draped Blush Textile (Soft flowing silk drape with sine wave displacement)
    const fabricGeo = new THREE.PlaneGeometry(1.4, 3.2, 40, 40);
    const fabricMat = new THREE.MeshStandardMaterial({
      color: 0xe7c7c0,
      roughness: 0.65,
      metalness: 0.12,
      side: THREE.DoubleSide
    });
    // Create initial natural cloth ripples
    const posAttr = fabricGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const zOffset = Math.sin(x * 6 + y * 2) * 0.08 + Math.cos(y * 4) * 0.04;
      posAttr.setZ(i, zOffset);
    }
    fabricGeo.computeVertexNormals();
    const blushFabric = new THREE.Mesh(fabricGeo, fabricMat);
    blushFabric.position.set(-0.9, -0.4, -1.2);
    blushFabric.rotation.set(0.05, 0.45, -0.05);
    blushFabric.castShadow = true;
    blushFabric.receiveShadow = true;
    scene.add(blushFabric);

    // 5. Featured Garment Artwork on Hanger (Authentic UNICO Brand Ensemble)
    const textureLoader = new THREE.TextureLoader();
    const garmentGroup = new THREE.Group();

    textureLoader.load(
      '/images/hero-atelier-garment.png',
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Elegant suspended garment plane with aspect ratio matching the brand artwork (295x640)
        const gGeo = new THREE.PlaneGeometry(1.35, 2.92, 32, 32);
        const gMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.75,
          metalness: 0.05,
          transparent: true,
          side: THREE.DoubleSide
        });

        const garmentMesh = new THREE.Mesh(gGeo, gMat);
        garmentMesh.position.set(0, 0, 0);
        garmentMesh.castShadow = true;
        garmentMesh.receiveShadow = true;
        garmentGroup.add(garmentMesh);

        // Position garment directly hanging under the champagne gold rail
        garmentGroup.position.set(0.6, 0.0, -0.5);
        scene.add(garmentGroup);

        setIsLoaded(true);
        onLoaded?.();
      },
      undefined,
      (err) => {
        console.warn('Failed to load hero garment texture', err);
        setIsLoaded(true);
        onLoaded?.();
      }
    );

    // 6. Floating Ambient Light Motes (subtle golden dust particles in daylight)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb39664,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interaction & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isVisible = true;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x)) * 0.15;
      targetMouseY = Math.max(-1, Math.min(1, y)) * 0.1;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.7;
      camera.position.y = 0.5 + mouseY * 0.5;
      camera.lookAt(0.3, 0.2, -0.6);

      // Subtle breath of garment
      if (garmentGroup) {
        garmentGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.02 + mouseX * 0.08;
        garmentGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.1) * 0.015;
      }

      // Subtle breeze on draped blush fabric
      if (blushFabric) {
        blushFabric.rotation.z = -0.05 + Math.sin(elapsedTime * 0.8) * 0.015;
      }

      // Gentle drift of dust motes
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= 0.0015;
        if (positions[i] < -2) positions[i] = 2;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onLoaded]);

  if (!webGlSupported) {
    // Graceful 2.5D Layered Atelier Fallback
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#FAF5EF]">
        {/* Layer 1: Sculptural plaster arch backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <div className="w-[380px] h-[580px] rounded-t-full border-[1.5px] border-[#B39664]/40 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EF] shadow-inner" />
        </div>
        
        {/* Layer 2: Draped blush textile */}
        <div className="absolute -left-12 bottom-12 w-64 h-96 bg-[#E7C7C0]/35 rounded-3xl transform -rotate-6 blur-[1px] pointer-events-none" />

        {/* Layer 3: Main garment centerpiece */}
        <div className="relative z-10 max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-[#B39664]/20 bg-[#FFFCF8] p-3 transition-transform duration-700 hover:scale-[1.02]">
          <img
            src="/images/hero-atelier-garment.jpg"
            alt="UNICO Signature Embroidered Atelier Ensemble"
            className="w-full h-[460px] object-cover rounded-xl"
          />
          <div className="p-3 text-center">
            <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium">Atelier Specimen 01</span>
            <p className="font-serif text-[#794653] text-lg italic">Handcrafted Botanical Embroidery</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[480px] md:min-h-[640px] cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive UNICO Atelier Scene"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF5EF]/60 backdrop-blur-xs transition-opacity duration-700">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto border-2 border-[#B39664] border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-xs tracking-widest uppercase text-[#794653]/70 font-sans">
              Preparing Atelier...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
