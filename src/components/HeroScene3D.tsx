import { useRef, useMemo, useEffect, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerformanceMonitor, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface HeroScene3DProps {
  sunTime: number; // 0 (dawn) -> 0.4 (noon) -> 0.62 (golden hour) -> 0.8 (dusk) -> 1 (night)
  scrollRef: MutableRefObject<number>;
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

// Warm umber/clay morphing shader (zero blue)
const FLUID_FRAGMENT = `
  uniform float uTime;
  uniform float uWarmth;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    float w1 = sin(p.x * 2.3 + uTime * 0.42) * cos(p.y * 2.0 - uTime * 0.34);
    float w2 = sin((p.x + p.y) * 1.7 - uTime * 0.28);
    float blob = smoothstep(0.95, 0.14, d + w1 * 0.15 + w2 * 0.1);

    vec3 umberDeep = vec3(0.345, 0.220, 0.141); // #583824
    vec3 umberMid  = vec3(0.455, 0.306, 0.200); // #744E33
    vec3 claySoft  = vec3(0.788, 0.725, 0.635); // #C9B9A2

    vec3 col = mix(umberDeep, umberMid, clamp(w1 * 0.5 + 0.5, 0.0, 1.0));
    col = mix(col, claySoft, clamp(w2 * 0.35 + 0.35, 0.0, 1.0) * uWarmth);
    float alpha = blob * (0.18 + 0.12 * uWarmth);
    gl_FragColor = vec4(col, alpha);
  }
`;

function FluidWarmBackdrop({ sunTime }: { sunTime: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarmth: { value: 0.75 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    if (document.documentElement.classList.contains('lowfps')) return;
    matRef.current.uniforms.uTime.value += delta;
    const dayFactor = Math.sin(Math.max(0.08, Math.min(0.95, 1 - sunTime * 0.65)) * Math.PI);
    matRef.current.uniforms.uWarmth.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uWarmth.value,
      0.3 + dayFactor * 0.7,
      0.06
    );
  });

  return (
    <mesh position={[0, 0.72, -1.65]}>
      <planeGeometry args={[10.2, 5.6]} />
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

/** Gentle drifting architectural dust particles (max 34, desktop only, disabled on lowfps). */
function WarmDustParticles({ sunTime }: { sunTime: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 34;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7.2;
      arr[i * 3 + 1] = (Math.random() - 0.3) * 3.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    if (document.documentElement.classList.contains('lowfps')) {
      pointsRef.current.visible = false;
      return;
    }
    pointsRef.current.visible = true;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + delta * (0.05 + (i % 4) * 0.015);
      if (y > 2.0) y = -1.1;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={sunTime > 0.72 ? '#C9B9A2' : '#744E33'}
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </points>
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

  const groupRef = useRef<THREE.Group>(null);
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
  const breathTimeRef = useRef(0);
  const CYCLE_TOTAL = 6.6;

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    breathTimeRef.current += dt;

    if (!reducedMotion) {
      cycleTimeRef.current = (cycleTimeRef.current + dt) % CYCLE_TOTAL;
    } else {
      cycleTimeRef.current = 3.5;
    }

    // Idle gentle breathing parallax on the whole building
    if (groupRef.current && !reducedMotion) {
      groupRef.current.position.y = -0.58 + Math.sin(breathTimeRef.current * 0.9) * 0.025;
      groupRef.current.rotation.y = Math.sin(breathTimeRef.current * 0.45) * 0.022;
    }

    const t = cycleTimeRef.current;

    const easeLayer = (start: number, dur: number) => {
      if (t >= 5.7) {
        const p = Math.min(1, (t - 5.7) / 0.85);
        return 1 - p * p * (3 - 2 * p);
      }
      const p = Math.max(0, Math.min(1, (t - start) / dur));
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

    // Warm interior window glow ramps up at golden hour -> dusk -> night
    const nightGlow = THREE.MathUtils.clamp((sunTime - 0.32) * 2.2, 0.16, 1.65) * pRear;
    if (glowLeftRef.current) glowLeftRef.current.emissiveIntensity = nightGlow;
    if (glowRightRef.current) glowRightRef.current.emissiveIntensity = nightGlow * 1.2;
  });

  const planeW = 6.2;
  const planeH = 3.48;
  const dark = sunTime > 0.74;

  return (
    <group ref={groupRef} position={[0, -0.58, 0]}>
      {/* Circular spotlight ground plane (Ref A & Ref C) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
        <circleGeometry args={[4.45, 72]} />
        <meshStandardMaterial
          color={dark ? '#281B14' : '#ECE5DA'}
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* Stepped architectural plinth slab */}
      <group ref={plinthRef}>
        <mesh position={[0, -0.76, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[5.05, 0.1, 1.35]} />
          <meshStandardMaterial color="#DDD2C1" roughness={0.65} metalness={0.05} />
        </mesh>
        <mesh position={[-0.1, -0.69, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[4.6, 0.05, 1.08]} />
          <meshStandardMaterial color="#F5F1EA" roughness={0.55} metalness={0.06} />
        </mesh>
      </group>

      {/* Extruded cantilevered upper roof slab */}
      <mesh ref={roofSlabRef} position={[-0.86, 1.07, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[2.38, 0.09, 0.72]} />
        <meshStandardMaterial color="#ECE5DA" roughness={0.48} metalness={0.08} />
      </mesh>

      {/* Warm emissive glazing planes inside window bays */}
      <mesh position={[-0.36, 0.42, -0.26]}>
        <planeGeometry args={[0.52, 0.85]} />
        <meshStandardMaterial
          ref={glowLeftRef}
          color="#ECE5DA"
          emissive="#B09479"
          emissiveIntensity={0.45}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.92, -0.18, -0.26]}>
        <planeGeometry args={[1.15, 0.86]} />
        <meshStandardMaterial
          ref={glowRightRef}
          color="#ECE5DA"
          emissive="#8F6F52"
          emissiveIntensity={0.55}
          roughness={0.2}
        />
      </mesh>

      {/* LAYER 1: Rear facade & glazing */}
      <mesh ref={rearRef} position={[0, 0.1, -0.2]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={textures[0]} transparent alphaTest={0.08} roughness={0.72} />
      </mesh>

      {/* LAYER 2: Ground stone cladding & foliage */}
      <mesh ref={stoneRef} position={[0, 0.1, 0.02]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={textures[1]} transparent alphaTest={0.08} roughness={0.8} />
      </mesh>

      {/* LAYER 3: Right terrace & timber soffit */}
      <mesh ref={roofRef} position={[0, 0.1, 0.08]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={textures[2]} transparent alphaTest={0.08} roughness={0.68} />
      </mesh>

      {/* Ref B Depth Interlock: Giant "Architecture" in self-hosted Bricolage 700 */}
      <Text
        font="/fonts/bricolage-700.woff"
        position={[0, 0.42, 0.14]}
        fontSize={1.2}
        letterSpacing={-0.04}
        color={dark ? '#DDD2C1' : '#744E33'}
        anchorX="center"
        anchorY="middle"
      >
        Architecture
      </Text>

      {/* LAYER 4 (IN FRONT OF HEADLINE): Cantilevered upper-left volume */}
      <mesh ref={upperRef} position={[0, 0.1, 0.25]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={textures[3]} transparent alphaTest={0.08} roughness={0.55} />
      </mesh>

      {/* LAYER 5 (FOREMOST): Right canopy tree overlapping the headline */}
      <mesh ref={treeRef} position={[0, 0.1, 0.36]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={textures[4]} transparent alphaTest={0.08} roughness={0.85} />
      </mesh>

      <ContactShadows
        position={[0, -0.81, 0]}
        opacity={dark ? 0.62 : 0.42}
        scale={9.5}
        blur={2.3}
        far={3.5}
        color="#1C130E"
      />
    </group>
  );
}

function CameraRig({
  scrollRef,
  isTouch,
  reducedMotion,
}: {
  scrollRef: MutableRefObject<number>;
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
    const sp = scrollRef.current;
    const inputX = isTouch ? gyro.current.x : pointer.current.x;
    const inputY = isTouch ? gyro.current.y : pointer.current.y;

    // Scroll-driven camera dolly in + slight orbit, combined with pointer/gyro tilt
    const orbitX = sp * 0.48;
    const targetX = (reducedMotion ? 0 : inputX * 0.52) + orbitX;
    const targetY = (reducedMotion ? 0.35 : 0.35 - inputY * 0.26) + sp * 0.72;
    const targetZ = 6.2 - sp * 1.55;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
    camera.lookAt(0, 0.05 + sp * 0.16, 0);
  });

  return null;
}

function SunLighting({ sunTime }: { sunTime: number }) {
  const angle = THREE.MathUtils.lerp(Math.PI * 0.88, Math.PI * 0.1, sunTime);
  const sunX = Math.cos(angle) * 7.8;
  const sunY = Math.max(0.95, Math.sin(angle) * 7.4);
  const sunZ = 4.6;

  const dark = sunTime > 0.74;
  const golden = sunTime > 0.5 && sunTime <= 0.78;
  const dirIntensity = dark ? 0.6 : THREE.MathUtils.lerp(1.35, 2.45, Math.sin(sunTime * Math.PI));
  const ambIntensity = dark ? 0.38 : 0.92;
  const sunColor = dark ? '#B09479' : golden ? '#E8C59E' : '#FAF6F0';

  return (
    <>
      <ambientLight intensity={ambIntensity} color={dark ? '#8F6F52' : '#F5F1EA'} />
      <directionalLight
        position={[sunX, sunY, sunZ]}
        intensity={dirIntensity}
        color={sunColor}
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
      <directionalLight position={[-4.5, 2.2, -3.5]} intensity={0.55} color="#744E33" />
    </>
  );
}

export default function HeroScene3D({
  sunTime,
  scrollRef,
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
          onDecline={() => {
            setDpr(1);
            document.documentElement.classList.add('lowfps');
          }}
          onIncline={() => setDpr(isTouch ? 1.35 : 1.75)}
        />
        <SunLighting sunTime={sunTime} />
        {!isTouch && !reducedMotion && <FluidWarmBackdrop sunTime={sunTime} />}
        {!isTouch && !reducedMotion && <WarmDustParticles sunTime={sunTime} />}
        <ArchitecturalElevation
          sunTime={sunTime}
          reducedMotion={reducedMotion}
          onReady={onReady}
        />
        <CameraRig
          scrollRef={scrollRef}
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

      <div aria-hidden="true" className="scene-grain absolute inset-0" />
    </div>
  );
}
