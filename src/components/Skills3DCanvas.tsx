import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Skills3DCanvas: React.FC = () => {
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
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 10);
    cyanLight.position.set(3, 2, 3);
    scene.add(cyanLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 3, 10);
    emeraldLight.position.set(-3, -2, 2);
    scene.add(emeraldLight);

    // 1. Central Pulsating Glowing Sphere (Neural Core)
    const coreInnerGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    universeGroup.add(coreInner);

    // Core Wireframe Aura
    const coreWireGeo = new THREE.IcosahedronGeometry(1.15, 2);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    universeGroup.add(coreWire);

    // 2. Category Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    universeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    universeGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    universeGroup.add(ring3);

    // 3. Orbiting Planetary Category Nodes
    const createSatellite = (color: number, size: number) => {
      const geo = new THREE.SphereGeometry(size, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.6
      });
      return new THREE.Mesh(geo, mat);
    };

    const satProgramming = createSatellite(0x00f0ff, 0.16); // Cyan
    const satWeb = createSatellite(0x38bdf8, 0.14);         // Sky Blue
    const satAI = createSatellite(0x8b5cf6, 0.18);          // Purple
    const satCS = createSatellite(0x10b981, 0.15);          // Emerald

    universeGroup.add(satProgramming);
    universeGroup.add(satWeb);
    universeGroup.add(satAI);
    universeGroup.add(satCS);

    // 4. Orbiting Particles
    const pCount = isMobile ? 250 : 600;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const radius = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      pPositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pPositions[i * 3 + 1] = radius * Math.sin(phi);
      pPositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    universeGroup.add(pSystem);

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

      // Core rotation & pulse
      coreInner.rotation.y = t * 0.5;
      coreInner.rotation.x = t * 0.3;
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreInner.scale.set(scale, scale, scale);

      coreWire.rotation.y = -t * 0.35;
      coreWire.rotation.z = t * 0.2;

      // Rotate Satellites along orbits
      satProgramming.position.set(
        Math.cos(t * 1.1) * 2.0,
        Math.sin(t * 1.1) * 0.6,
        Math.sin(t * 1.1) * 2.0
      );
      satWeb.position.set(
        Math.cos(t * 0.8 + 1.5) * 2.5,
        Math.sin(t * 0.8 + 1.5) * 1.2,
        Math.sin(t * 0.8 + 1.5) * 1.5
      );
      satAI.position.set(
        Math.cos(t * 0.9 + 3.0) * 2.8,
        Math.sin(t * 0.9 + 3.0) * -1.0,
        Math.sin(t * 0.9 + 3.0) * 2.2
      );
      satCS.position.set(
        Math.cos(t * 0.7 + 4.5) * 3.1,
        Math.sin(t * 0.7 + 4.5) * 0.8,
        Math.sin(t * 0.7 + 4.5) * -2.4
      );

      // Rings and particles spin
      pSystem.rotation.y = t * 0.08;
      universeGroup.rotation.y = t * 0.05 + mouseX * 0.25;
      universeGroup.rotation.x = mouseY * 0.2;

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

  return <div ref={mountRef} className="w-full h-full min-h-[360px]" />;
};
