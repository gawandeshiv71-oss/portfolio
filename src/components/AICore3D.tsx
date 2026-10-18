import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../utils/audio';

interface AICore3DProps {
  onCoreClick?: () => void;
  className?: string;
  intensity?: number;
}

export const AICore3D: React.FC<AICore3DProps> = ({ onCoreClick, className = 'w-full h-full min-h-[360px]', intensity = 1 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

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

    // Group for entire AI Core
    const coreRoot = new THREE.Group();
    scene.add(coreRoot);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4 * intensity, 12);
    cyanPoint.position.set(3, 3, 3);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x10b981, 3 * intensity, 10);
    emeraldPoint.position.set(-3, -2, 2);
    scene.add(emeraldPoint);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 2.5 * intensity, 10);
    purpleLight.position.set(0, -3, 2);
    scene.add(purpleLight);

    // 1. Central Nucleus (Inner Quantum Brain)
    const nucleusInnerGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const nucleusInnerMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      roughness: 0.15,
      metalness: 0.9,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6
    });
    const nucleusInner = new THREE.Mesh(nucleusInnerGeo, nucleusInnerMat);
    coreRoot.add(nucleusInner);

    // Outer Faceted Crystal (Octahedron Cage)
    const crystalGeo = new THREE.OctahedronGeometry(0.9, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
      emissive: 0x10b981,
      emissiveIntensity: 0.4
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreRoot.add(crystal);

    // 2. Concentric Quantum Orbital Gyroscope Rings
    const createRing = (radius: number, tube: number, color: number, rotX: number, rotY: number) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.9,
        wireframe: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      return mesh;
    };

    const ring1 = createRing(1.4, 0.02, 0x00f0ff, Math.PI / 3, 0);
    const ring2 = createRing(1.75, 0.018, 0x10b981, -Math.PI / 4, Math.PI / 6);
    const ring3 = createRing(2.1, 0.015, 0x8b5cf6, Math.PI / 5, -Math.PI / 4);

    coreRoot.add(ring1);
    coreRoot.add(ring2);
    coreRoot.add(ring3);

    // 3. Orbiting Data Satellite Nodes
    const satellites: THREE.Mesh[] = [];
    const satCount = 6;
    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0x10b981,
        emissive: i % 2 === 0 ? 0x00f0ff : 0x10b981,
        emissiveIntensity: 0.8
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      coreRoot.add(sat);
      satellites.push(sat);
    }

    // 4. Ambient Data Particles Cloud
    const pCount = isMobile ? 250 : 600;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const c1 = new THREE.Color(0x00f0ff);
    const c2 = new THREE.Color(0x10b981);
    const c3 = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < pCount; i++) {
      const r = 1.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);

      const color = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      pColors[i * 3] = color.r;
      pColors[i * 3 + 1] = color.g;
      pColors[i * 3 + 2] = color.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    coreRoot.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let energyPulse = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleMouseEnter = () => { isHovering = true; };
    const handleMouseLeave = () => { isHovering = false; };

    const handleClick = () => {
      energyPulse = 1.0;
      audioManager.playClick();
      setPulseCount((c) => c + 1);
      if (onCoreClick) onCoreClick();
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Energy pulse decay
      energyPulse = Math.max(0, energyPulse - 0.03);

      // Core rotation with hover speed boost
      const speed = isHovering ? 1.6 : 1.0;

      // Nucleus breathing and pulse
      const breathe = 1 + Math.sin(t * 2.2) * 0.06 + energyPulse * 0.4;
      nucleusInner.scale.set(breathe, breathe, breathe);
      nucleusInner.rotation.y = t * 0.6 * speed;
      nucleusInner.rotation.x = t * 0.4 * speed;

      // Faceted outer crystal counter-rotates
      crystal.rotation.y = -t * 0.8 * speed;
      crystal.rotation.z = t * 0.5 * speed;
      const crystalScale = 1 + energyPulse * 0.3;
      crystal.scale.set(crystalScale, crystalScale, crystalScale);

      // Orbital rings rotate at independent rates
      ring1.rotation.z = t * 0.7 * speed;
      ring2.rotation.x = -t * 0.5 * speed;
      ring3.rotation.y = t * 0.9 * speed;

      // Update satellites on Lissajous paths
      satellites.forEach((sat, i) => {
        const offset = (i / satCount) * Math.PI * 2;
        const rad = 1.6 + Math.sin(t * 1.5 + offset) * 0.2;
        sat.position.set(
          Math.cos(t * 1.2 + offset) * rad,
          Math.sin(t * 1.8 + offset) * (rad * 0.6),
          Math.sin(t * 1.2 + offset) * rad
        );
      });

      // Particle cloud swirl
      particles.rotation.y = t * 0.1 * speed;

      // Interactive mouse follow
      coreRoot.rotation.y = mouseX * 0.4;
      coreRoot.rotation.x = -mouseY * 0.3;
      coreRoot.position.y = Math.sin(t * 1.4) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [intensity, onCoreClick]);

  return (
    <div
      ref={mountRef}
      data-cursor="orbit"
      className={`relative cursor-pointer select-none group ${className}`}
      title="Click AI Core to trigger neural pulse"
    >
      <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
        AI CORE // {pulseCount > 0 ? `PULSE ACTIVE x${pulseCount}` : 'INTERACTIVE 3D'}
      </div>
    </div>
  );
};
