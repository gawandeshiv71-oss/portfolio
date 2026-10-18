import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Trophy3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group
    const trophyGroup = new THREE.Group();
    scene.add(trophyGroup);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const goldKeyLight = new THREE.DirectionalLight(0xf59e0b, 4);
    goldKeyLight.position.set(4, 5, 4);
    scene.add(goldKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 3);
    cyanRimLight.position.set(-4, -3, 3);
    scene.add(cyanRimLight);

    const centralGlow = new THREE.PointLight(0x10b981, 2, 6);
    centralGlow.position.set(0, 0.5, 1);
    scene.add(centralGlow);

    // ==========================================
    // Trophy Geometry
    // ==========================================
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15
    });

    // 1. Trophy Base (Hexagonal Pedestal)
    const baseGeo = new THREE.CylinderGeometry(0.8, 1.0, 0.35, 6);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
    baseMesh.position.y = -1.5;
    trophyGroup.add(baseMesh);

    // Glowing Base Ring
    const baseRingGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 64);
    const baseRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.45;
    trophyGroup.add(baseRing);

    // 2. Trophy Stem (Slender Golden Column)
    const stemGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.0, 16);
    const stemMesh = new THREE.Mesh(stemGeo, goldMat);
    stemMesh.position.y = -0.85;
    trophyGroup.add(stemMesh);

    // 3. Central Trophy Cup / Body
    const cupGeo = new THREE.ConeGeometry(0.9, 1.3, 16, 1, true);
    const cupMesh = new THREE.Mesh(cupGeo, goldMat);
    cupMesh.position.y = 0.2;
    cupMesh.rotation.x = Math.PI;
    trophyGroup.add(cupMesh);

    // Cup Rim
    const rimGeo = new THREE.TorusGeometry(0.9, 0.04, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.85;
    trophyGroup.add(rimMesh);

    // 4. Futuristic Floating Core Gem (Octahedron suspended in center of cup)
    const gemGeo = new THREE.OctahedronGeometry(0.35, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.7,
      wireframe: true
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.y = 0.85;
    trophyGroup.add(gemMesh);

    // 5. Orbital Trophy Rings
    const ringGeo = new THREE.TorusGeometry(1.3, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.5;
    ringMesh.rotation.x = Math.PI / 3;
    trophyGroup.add(ringMesh);

    // 6. Aura Particles
    const pCount = isMobile ? 120 : 300;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 1.4;
      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const aura = new THREE.Points(pGeo, pMat);
    trophyGroup.add(aura);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow rotating trophy
      trophyGroup.rotation.y = t * 0.4 + mouseX * 0.3;
      trophyGroup.rotation.x = mouseY * 0.15;
      trophyGroup.position.y = Math.sin(t * 1.5) * 0.08;

      // Gem rotation
      gemMesh.rotation.y = -t * 1.2;
      gemMesh.rotation.x = t * 0.8;
      gemMesh.position.y = 0.85 + Math.sin(t * 2.5) * 0.06;

      // Orbit ring spin
      ringMesh.rotation.z = t * 0.5;

      // Aura particles spin
      aura.rotation.y = t * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[340px]" />;
};
