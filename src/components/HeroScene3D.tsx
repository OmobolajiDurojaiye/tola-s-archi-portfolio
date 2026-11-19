import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerformanceMonitor, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface HeroScene3DProps {
  sunTime: number; // 0 (dawn) -> 0.5 (noon) -> 1 (night)
  scrollProgress: number; // 0 -> 1 as user scrolls hero -> projects
  isTouch: boolean;
  reducedMotion: boolean;
  onReady?: () => void;
}

const FLUID_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLUID_FRAGMENT = `
  uniform float uTime;
  uniform float uBrightness;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    float wave1 = sin(p.x * 2.4 + uTime * 0.45) * cos(p.y * 2.1 - uTime * 0.35);
    float wave2 = sin((p.x + p.y) * 1.8 - uTime * 0.3);
    float blob = smoothstep(0.95, 0.12, d + wave1 * 0.16 + wave2 * 0.1);

    vec3 cobaltDeep = vec3(0.031, 0.239, 0.690);
    vec3 cobaltMid  = vec3(0.043, 0.310, 0.859);
    vec3 cobaltSoft = vec3(0.576, 0.722, 0.980);

    vec3 col = mix(cobaltDeep, cobaltMid, clamp(wave1 * 0.5 + 0.5, 0.0, 1.0));
    col = mix(col, cobaltSoft, clamp(wave2 * 0.35 + 0.35, 0.0, 1.0) * uBrightness);
    float alpha = blob * (0.22 + 0.14 * uBrightness);
    gl_FragColor = vec4(col, alpha);
  }
`;

function FluidCobaltBackdrop({ sunTime }: { sunTime: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBrightness: { value: 0.7 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
    const dayFactor = Math.sin(Math.max(0.05, Math.min(0.95, 1 - sunTime * 0.7)) * Math.PI);
    matRef.current.uniforms.uBrightness.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uBrightness.value,
      0.35 + dayFactor * 0.65,
      0.06
    );
  });

  return (
    <mesh position={[0, 0.75, -1.65]}>
      <planeGeometry args={[10.5, 5.8]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FLUID_VERTEX}
        fragmentShader={FLUID_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function ArchitecturalElevation({
  sunTime,
  reducedMotion,
  onReady,
}: {
  sunTime: number;
  reducedMotion: boolean;
  onReady?: () => void;
}) {
  const textures = useTexture([
    '/art/layer-rear.webp',
    '/art/layer-stone.webp',
    '/art/layer-roof.webp',
    '/art/layer-upper.webp',
    '/art/layer-tree.webp',
  ]);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
    onReady?.();
  }, [textures, onReady]);

  const plinthRef = useRef<THREE.Group>(null);
  const rearRef = useRef<THREE.Mesh>(null);
  const stoneRef = useRef<THREE.Mesh>(null);
  const roofRef = useRef<THREE.Mesh>(null);
  const upperRef = useRef<THREE.Mesh>(null);
  const treeRef = useRef<THREE.Mesh>(null);
  const roofSlabRef = useRef<THREE.Mesh>(null);
  const glowLeftRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRightRef = useRef<THREE.MeshStandardMaterial>(null);

  const cycleTimeRef = useRef(0);

  // Continuous build loop: 0..2.4s assemble, 2.4..5.6s hold, 5.6..6.5s soft reset
  const CYCLE_TOTAL = 6.5;

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!reducedMotion) {
      cycleTimeRef.current = (cycleTimeRef.current + dt) % CYCLE_TOTAL;
    } else {
      cycleTimeRef.current = 3.5; // Hold cleanly assembled
    }

    const t = cycleTimeRef.current;

    const easeLayer = (start: number, dur: number) => {
      if (t >= 5.6) {
        // Soft reset
        const p = Math.min(1, (t - 5.6) / 0.85);
        return 1 - p * p * (3 - 2 * p);
      }
      const p = Math.max(0, Math.min(1, (t - start) / dur));
      // Smooth spring-like overshoot curve
      return 1 - Math.pow(1 - p, 3);
    };

    const pPlinth = easeLayer(0.0, 0.65);
    const pRear = easeLayer(0.28, 0.72);
    const pStone = easeLayer(0.55, 0.72);
    const pRoof = easeLayer(0.85, 0.75);
    const pUpper = easeLayer(1.1, 0.8);
    const pTree = easeLayer(1.45, 0.75);

    if (plinthRef.current) {
      plinthRef.current.position.y = THREE.MathUtils.lerp(-0.42, 0, pPlinth);
      plinthRef.current.scale.setScalar(0.92 + 0.08 * pPlinth);
    }
    if (rearRef.current) {
      rearRef.current.position.y = THREE.MathUtils.lerp(-0.35, 0.1, pRear);
      (rearRef.current.material as THREE.MeshStandardMaterial).opacity = pRear;
    }
    if (stoneRef.current) {
      stoneRef.current.position.x = THREE.MathUtils.lerp(-0.75, 0, pStone);
      (stoneRef.current.material as THREE.MeshStandardMaterial).opacity = pStone;
    }
    if (roofRef.current) {
      roofRef.current.position.y = THREE.MathUtils.lerp(0.62, 0.1, pRoof);
      (roofRef.current.material as THREE.MeshStandardMaterial).opacity = pRoof;
    }
    if (upperRef.current) {
      upperRef.current.position.y = THREE.MathUtils.lerp(0.85, 0.1, pUpper);
      (upperRef.current.material as THREE.MeshStandardMaterial).opacity = pUpper;
    }
    if (roofSlabRef.current) {
      roofSlabRef.current.position.y = THREE.MathUtils.lerp(1.75, 1.07, pUpper);
      roofSlabRef.current.scale.x = 0.7 + 0.3 * pUpper;
    }
    if (treeRef.current) {
      treeRef.current.position.x = THREE.MathUtils.lerp(0.7, 0, pTree);
      (treeRef.current.material as THREE.MeshStandardMaterial).opacity = pTree;
    }

    // Window emissive cobalt glow ramps up at dusk/night (sunTime > 0.55)
    const nightGlow = THREE.MathUtils.clamp((sunTime - 0.35) * 2.1, 0.18, 1.45) * pRear;
    if (glowLeftRef.current) glowLeftRef.current.emissiveIntensity = nightGlow;
    if (glowRightRef.current) glowRightRef.current.emissiveIntensity = nightGlow * 1.15;
  });

  const planeW = 6.2;
  const planeH = 3.48;

  return (
    <group position={[0, -0.58, 0]}>
      {/* REAL 3D GEOMETRY: Circular spotlight ground plane (Ref A & Ref C) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
        <circleGeometry args={[4.45, 72]} />
        <meshStandardMaterial
          color={sunTime > 0.72 ? '#12192E' : '#F6F4EF'}
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* REAL 3D GEOMETRY: Stepped architectural plinth slab */}
      <group ref={plinthRef}>
        <mesh position={[0, -0.76, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[5.05, 0.1, 1.35]} />
          <meshStandardMaterial color="#E6E9F2" roughness={0.65} metalness={0.06} />
        </mesh>
        <mesh position={[-0.1, -0.69, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[4.6, 0.05, 1.08]} />
          <meshStandardMaterial color="#F2EFE9" roughness={0.55} metalness={0.08} />
        </mesh>
      </group>

      {/* REAL 3D GEOMETRY: Extruded cantilevered upper roof slab & overhang */}
      <mesh ref={roofSlabRef} position={[-0.86, 1.07, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[2.38, 0.09, 0.72]} />
        <meshStandardMaterial color="#EDF1FA" roughness={0.45} metalness={0.1} />
      </mesh>

      {/* REAL 3D GEOMETRY: Emissive glazing planes inside window bays (monotone cobalt glow) */}
      <mesh position={[-0.36, 0.42, -0.26]}>
        <planeGeometry args={[0.52, 0.85]} />
        <meshStandardMaterial
          ref={glowLeftRef}
          color="#C8DBFC"
          emissive="#558DF6"
          emissiveIntensity={0.45}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.92, -0.18, -0.26]}>
        <planeGeometry args={[1.15, 0.86]} />
        <meshStandardMaterial
          ref={glowRightRef}
          color="#C8DBFC"
          emissive="#1D64EC"
          emissiveIntensity={0.55}
          roughness={0.2}
        />
      </mesh>

      {/* LAYER 1 (Rearmost Z): Rear facade & glazing */}
      <mesh ref={rearRef} position={[0, 0.1, -0.2]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={textures[0]}
          transparent
          alphaTest={0.08}
          roughness={0.72}
          metalness={0.04}
        />
      </mesh>

      {/* LAYER 2: Ground stone cladding & low foliage */}
      <mesh ref={stoneRef} position={[0, 0.1, 0.02]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={textures[1]}
          transparent
          alphaTest={0.08}
          roughness={0.8}
        />
      </mesh>

      {/* LAYER 3: Right terrace & timber soffit */}
      <mesh ref={roofRef} position={[0, 0.1, 0.08]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={textures[2]}
          transparent
          alphaTest={0.08}
          roughness={0.68}
        />
      </mesh>

      {/* DEPTH INTERLOCK (Ref B): Oversized "Architecture" headline BETWEEN rear & foreground planes */}
      <Text
        position={[0, 0.42, 0.14]}
        fontSize={1.22}
        letterSpacing={-0.04}
        fontWeight={700}
        color={sunTime > 0.72 ? '#E8F0FE' : '#0B4FDB'}
        anchorX="center"
        anchorY="middle"
      >
        Architecture
      </Text>

      {/* LAYER 4 (IN FRONT OF HEADLINE): Cantilevered upper-left architectural volume */}
      <mesh ref={upperRef} position={[0, 0.1, 0.25]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={textures[3]}
          transparent
          alphaTest={0.08}
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>

      {/* LAYER 5 (FOREMOST): Right canopy tree overlapping the headline */}
      <mesh ref={treeRef} position={[0, 0.1, 0.36]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={textures[4]}
          transparent
          alphaTest={0.08}
          roughness={0.85}
        />
      </mesh>

      <ContactShadows
        position={[0, -0.81, 0]}
        opacity={sunTime > 0.75 ? 0.55 : 0.38}
        scale={9.5}
        blur={2.4}
        far={3.5}
        color="#041B52"
      />
    </group>
  );
}

function CameraRig({
  scrollProgress,
  isTouch,
  reducedMotion,
}: {
  scrollProgress: number;
  isTouch: boolean;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const gyro = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    if (!isTouch) {
      const onMove = (e: MouseEvent) => {
        pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    } else {
      const onOrient = (e: DeviceOrientationEvent) => {
        if (e.gamma !== null && e.beta !== null) {
          gyro.current.x = THREE.MathUtils.clamp(e.gamma / 35, -1, 1);
          gyro.current.y = THREE.MathUtils.clamp((e.beta - 45) / 35, -1, 1);
        }
      };
      window.addEventListener('deviceorientation', onOrient, true);
      return () => window.removeEventListener('deviceorientation', onOrient, true);
    }
  }, [isTouch, reducedMotion]);

  useFrame(() => {
    const inputX = isTouch ? gyro.current.x : pointer.current.x;
    const inputY = isTouch ? gyro.current.y : pointer.current.y;

    // Scroll-driven camera dolly (Interaction #3) + subtle mouse/gyroscope tilt (Interaction #1)
    const targetX = reducedMotion ? 0 : inputX * 0.55;
    const targetY = (reducedMotion ? 0.35 : 0.35 - inputY * 0.28) + scrollProgress * 0.85;
    const targetZ = 6.2 - scrollProgress * 1.45;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
    camera.lookAt(0, 0.05 + scrollProgress * 0.18, 0);
  });

  return null;
}

function SunLighting({ sunTime }: { sunTime: number }) {
  // Arc sun from left-low (dawn 0) -> overhead (noon 0.5) -> right-low (dusk/night 1.0)
  const angle = THREE.MathUtils.lerp(Math.PI * 0.85, Math.PI * 0.12, sunTime);
  const sunX = Math.cos(angle) * 7.5;
  const sunY = Math.max(1.2, Math.sin(angle) * 7.2);
  const sunZ = 4.6;

  const isNight = sunTime > 0.72;
  const dirIntensity = isNight ? 0.65 : THREE.MathUtils.lerp(1.4, 2.35, Math.sin(sunTime * Math.PI));
  const ambIntensity = isNight ? 0.42 : 0.95;

  return (
    <>
      <ambientLight intensity={ambIntensity} color={isNight ? '#558DF6' : '#F2EFE9'} />
      <directionalLight
        position={[sunX, sunY, sunZ]}
        intensity={dirIntensity}
        color={isNight ? '#93B8FA' : '#FFFFFF'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      {/* Subtle cobalt rim fill */}
      <directionalLight position={[-4.5, 2.2, -3.5]} intensity={0.65} color="#0B4FDB" />
    </>
  );
}

export default function HeroScene3D({
  sunTime,
  scrollProgress,
  isTouch,
  reducedMotion,
  onReady,
}: HeroScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState(isTouch ? 1.25 : 1.5);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const activeLoop = inView && tabVisible && !reducedMotion ? 'always' : 'demand';

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas
        shadows
        dpr={Math.min(dpr, isTouch ? 1.5 : 2)}
        frameloop={activeLoop}
        camera={{ position: [0, 0.35, 6.2], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(isTouch ? 1.35 : 1.75)}
        />
        <SunLighting sunTime={sunTime} />
        {!isTouch && !reducedMotion && <FluidCobaltBackdrop sunTime={sunTime} />}
        <ArchitecturalElevation
          sunTime={sunTime}
          reducedMotion={reducedMotion}
          onReady={onReady}
        />
        <CameraRig
          scrollProgress={scrollProgress}
          isTouch={isTouch}
          reducedMotion={reducedMotion}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minAzimuthAngle={-0.34}
          maxAzimuthAngle={0.34}
          minPolarAngle={Math.PI * 0.42}
          maxPolarAngle={Math.PI * 0.56}
        />
      </Canvas>

      {/* Subtle <1KB tiled film grain over the 3D scene ONLY (never on UI text) */}
      <div aria-hidden="true" className="scene-grain absolute inset-0 rounded-none" />
    </div>
  );
}
