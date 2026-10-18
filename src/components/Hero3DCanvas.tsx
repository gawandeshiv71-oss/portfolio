import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 350 : 1000;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for objects reacting to mouse
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
    cyanLight.position.set(5, 5, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 4, 15);
    purpleLight.position.set(-4, -2, 2);
    scene.add(purpleLight);

    const emeraldScreenLight = new THREE.PointLight(0x10b981, 2.5, 8);
    emeraldScreenLight.position.set(0, 0.5, 1);
    scene.add(emeraldScreenLight);

    // ==========================================
    // 1. Futuristic Floating Laptop Workspace
    // ==========================================
    const laptopGroup = new THREE.Group();
    sceneGroup.add(laptopGroup);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopBase.position.y = -0.5;
    laptopGroup.add(laptopBase);

    // Laptop Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.7, 0.005, 0.45);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, -0.455, 0.45);
    laptopGroup.add(trackpad);

    // Animated Code Canvas for Screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const ctx = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);

    const codeLines = [
      '// SHIVAM GAWANDE // NEURAL CORE v2.5',
      'const agent = new AutonomousAgent({',
      '  developer: "Shivam Gawande",',
      '  domain: ["AI/ML", "Agentic AI", "Software"],',
      '  status: "BUILDING_FUTURE"',
      '});',
      'await agent.executeWorkflow("TransitOS");',
      '-> Route optimized: 99.4% accuracy',
      '-> Loading CA autonomous ledger parser...',
      '-> All systems optimal. Ready to deploy.'
    ];

    const renderScreenTexture = (time: number) => {
      if (!ctx) return;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, 512, 320);

      // Terminal Header
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 35);
      
      // Window controls
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(20, 18, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(38, 18, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(56, 18, 5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#00f0ff';
      ctx.font = '14px monospace';
      ctx.fillText('shivam@digital-space:~/workspace', 80, 23);

      // Code content
      ctx.font = '13px monospace';
      
      codeLines.forEach((line, idx) => {
        const y = 65 + idx * 24;
        if (y < 305) {
          if (line.startsWith('//')) ctx.fillStyle = '#64748b';
          else if (line.startsWith('->')) ctx.fillStyle = '#10b981';
          else if (line.includes('AutonomousAgent')) ctx.fillStyle = '#a855f7';
          else ctx.fillStyle = '#38bdf8';
          ctx.fillText(line, 20, y);
        }
      });

      // Cursor
      if (Math.sin(time * 6) > 0) {
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(360, 280, 8, 15);
      }

      screenTexture.needsUpdate = true;
    };

    // Laptop Screen Lid (Rotated up)
    const screenLidGeo = new THREE.BoxGeometry(2.4, 1.5, 0.05);
    const screenLid = new THREE.Mesh(screenLidGeo, metalMat);
    screenLid.position.set(0, 0.25, -0.75);
    screenLid.rotation.x = 0.2;
    laptopGroup.add(screenLid);

    // Glowing Inner Screen Display
    const screenDisplayGeo = new THREE.PlaneGeometry(2.28, 1.38);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenMat);
    screenDisplay.position.set(0, 0.25, -0.72);
    screenDisplay.rotation.x = 0.2;
    laptopGroup.add(screenDisplay);

    // Neon Border Glow around Screen
    const screenBorderGeo = new THREE.EdgesGeometry(screenDisplayGeo);
    const screenBorderMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const screenBorder = new THREE.LineSegments(screenBorderGeo, screenBorderMat);
    screenBorder.position.copy(screenDisplay.position);
    screenBorder.rotation.copy(screenDisplay.rotation);
    laptopGroup.add(screenBorder);

    // ==========================================
    // 2. Floating 3D Holographic Panels
    // ==========================================
    const createHoloPanel = (text1: string, text2: string, color: number) => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 256;
      pCanvas.height = 128;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        pCtx.fillStyle = 'rgba(10, 20, 35, 0.85)';
        pCtx.fillRect(0, 0, 256, 128);
        pCtx.strokeStyle = '#' + color.toString(16).padStart(6, '0');
        pCtx.lineWidth = 4;
        pCtx.strokeRect(4, 4, 248, 120);

        pCtx.fillStyle = '#' + color.toString(16).padStart(6, '0');
        pCtx.font = 'bold 20px monospace';
        pCtx.fillText(text1, 20, 48);

        pCtx.fillStyle = '#94a3b8';
        pCtx.font = '14px monospace';
        pCtx.fillText(text2, 20, 84);
      }
      const texture = new THREE.CanvasTexture(pCanvas);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide
      });
      const geo = new THREE.PlaneGeometry(1.4, 0.7);
      return new THREE.Mesh(geo, mat);
    };

    const card1 = createHoloPanel('AGENTIC AI', 'Autonomous Workflows', 0x00f0ff);
    card1.position.set(2.4, 0.9, -0.5);
    card1.rotation.y = -0.35;
    sceneGroup.add(card1);

    const card2 = createHoloPanel('C++ / OOP', 'High-Performance Core', 0x10b981);
    card2.position.set(-2.5, 0.6, -0.2);
    card2.rotation.y = 0.4;
    sceneGroup.add(card2);

    const card3 = createHoloPanel('AI / ML', 'Neural Pipeline v2', 0x8b5cf6);
    card3.position.set(1.8, -1.2, 0.4);
    card3.rotation.y = -0.2;
    sceneGroup.add(card3);

    // ==========================================
    // 3. Futuristic Geometric Objects (Rings & Crystals)
    // ==========================================
    // Outer Orbital Cyber Ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    sceneGroup.add(ring);

    // Inner Emerald Ring
    const innerRingGeo = new THREE.TorusGeometry(2.6, 0.015, 16, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.y = Math.PI / 4;
    sceneGroup.add(innerRing);

    // Floating Crystal (Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(0.35, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.set(-2.2, 1.8, -1);
    sceneGroup.add(crystal);

    // Small Gold/Violet Dodecahedron
    const dDecaGeo = new THREE.DodecahedronGeometry(0.28, 0);
    const dDecaMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true
    });
    const dodeca = new THREE.Mesh(dDecaGeo, dDecaMat);
    dodeca.position.set(2.6, 2.0, -0.8);
    sceneGroup.add(dodeca);

    // ==========================================
    // 4. Floating Ambient Particles Cloud
    // ==========================================
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorEmerald = new THREE.Color(0x10b981);
    const colorPurple = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color mix
      const rand = Math.random();
      const chosenColor = rand > 0.6 ? colorCyan : rand > 0.3 ? colorEmerald : colorPurple;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // Mouse Parallax & Interaction Listeners
    // ==========================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch movement for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouseX = x * 0.4;
        targetMouseY = y * 0.3;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // Animation Loop
    // ==========================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Camera parallax
      camera.position.x = currentMouseX * 1.8;
      camera.position.y = currentMouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Laptop floating animation
      laptopGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12 - 0.1;
      laptopGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.08 + currentMouseX * 0.2;
      laptopGroup.rotation.x = Math.cos(elapsedTime * 0.8) * 0.04 - currentMouseY * 0.15;

      // Update screen live terminal code
      renderScreenTexture(elapsedTime);

      // Floating holographic cards
      card1.position.y = 0.9 + Math.sin(elapsedTime * 1.5 + 1) * 0.08;
      card2.position.y = 0.6 + Math.cos(elapsedTime * 1.3 + 2) * 0.09;
      card3.position.y = -1.2 + Math.sin(elapsedTime * 1.7 + 3) * 0.07;

      // Rotate geometric elements
      ring.rotation.z = elapsedTime * 0.12;
      ring.rotation.y = elapsedTime * 0.08;
      innerRing.rotation.x = -elapsedTime * 0.15;

      crystal.rotation.x = elapsedTime * 0.8;
      crystal.rotation.y = elapsedTime * 0.6;
      crystal.position.y = 1.8 + Math.sin(elapsedTime * 1.4) * 0.12;

      dodeca.rotation.y = -elapsedTime * 0.7;
      dodeca.rotation.z = elapsedTime * 0.5;
      dodeca.position.y = 2.0 + Math.cos(elapsedTime * 1.6) * 0.1;

      // Rotate particle cloud gently
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      scene.clear();
      renderer.dispose();
      screenTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'pan-y' }}
    />
  );
};
