import { useRef, useMemo, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls, useGLTF, Html, useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/* Sets scene background color */
function SceneBg({ color }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color(color)
  }, [color, scene])
  return null
}

/* ============== INTERNAL CARDS ============== */
function Card({ id, img, pos, rot, globalHovered, setHoveredCard, activeSection, onJunctionClick }) {
  const meshRef = useRef()
  const glassRef = useRef()
  const tex = useTexture(img)

  const isHovered = globalHovered === id
  const isOtherHovered = globalHovered && globalHovered !== id

  const isActive = activeSection === id
  const isHidden = activeSection && activeSection !== id

  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    // Target calculations
    // Scale jumps uniquely if active, forming the viewer anchor
    const targetScale = isActive ? 2.8 : (isHovered ? 1.15 : 1)
    
    // Animate scale smoothly
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 5 * delta)

    // Target spatial positioning
    // Pushes card gracefully towards the user on the right side if active
    const targetPos = isActive ? new THREE.Vector3(1.5, 0, 3) 
      : new THREE.Vector3(...pos)
    meshRef.current.position.lerp(targetPos, 5 * delta)

    // Smooth spherical detachment rotation
    const targetRot = isActive ? new THREE.Euler(0, -0.05, 0)
      : new THREE.Euler(...rot)
    meshRef.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(targetRot), 5 * delta)

    // Fade ambient non-interactive cards safely back
    if (meshRef.current.material) {
      const targetOpacity = isHidden ? 0 : (isOtherHovered ? 0.2 : 1)
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, 6 * delta)
    }

    // Glass intensity - cinematic condensation upon hovering
    if (glassRef.current) {
      const targetTransmission = (isHovered && !activeSection) ? 1.0 : 0.0
      glassRef.current.transmission = THREE.MathUtils.lerp(glassRef.current.transmission, targetTransmission, 6 * delta)
      const glassOpacity = (isHovered && !activeSection) ? 1 : 0
      glassRef.current.opacity = THREE.MathUtils.lerp(glassRef.current.opacity, glassOpacity, 6 * delta)
    }
  })

  return (
    <group
      onPointerOver={(e) => {
        if(activeSection) return
        e.stopPropagation()
        setHoveredCard(id)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        if(activeSection) return
        e.stopPropagation()
        setHoveredCard(null)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        if(activeSection) return
        e.stopPropagation()
        setHoveredCard(null)
        document.body.style.cursor = 'auto'
        if (onJunctionClick) onJunctionClick(id, null)
      }}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 0.75, 0.02]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
        
        {/* Soft glass envelope sitting right above the plane */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.25, 0.8, 0.05]} />
          <meshPhysicalMaterial
            ref={glassRef}
            transparent
            opacity={0}
            transmission={0}
            roughness={0.05}
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0}
            depthWrite={false}
          />
        </mesh>
      </mesh>
    </group>
  )
}

function InternalCards({ activeSection, onJunctionClick }) {
  const cards = [
    { id: 'Projects', img: '/projects_preview.png', pos: [-0.65, 0.4, 0.4], rot: [0, 0.5, 0] },
    { id: 'Experience', img: '/experience_preview.png', pos: [0.65, 0.4, -0.4], rot: [0, -0.5, 0] },
    { id: 'Tech', img: '/tech_preview.png', pos: [-0.5, -0.45, -0.3], rot: [-0.2, 0.4, 0] },
    { id: 'Contact', img: '/contact_preview.png', pos: [0.55, -0.45, 0.4], rot: [0.2, -0.4, 0] }
  ]
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <group>
      {cards.map(c => (
        <Card 
          key={c.id} 
          {...c} 
          globalHovered={hoveredCard} 
          setHoveredCard={setHoveredCard}
          activeSection={activeSection}
          onJunctionClick={onJunctionClick}
        />
      ))}
    </group>
  )
}

/* ============== NEURAL MESH ORB ============== */
function NeuralOrb() {
  const coreRef = useRef()
  const wireRef = useRef()
  const outerRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25 // Sped up to feel the rotation
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.15
      wireRef.current.rotation.z = Math.cos(t * 0.08) * 0.15
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1
      outerRef.current.rotation.x = Math.sin(t * 0.06) * 0.1
      outerRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.02)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        {/* Core sphere */}
        <mesh ref={coreRef} scale={1.8}>
          <icosahedronGeometry args={[1, 3]} />
          <meshStandardMaterial
            color="#0d0d1a"
            metalness={0.8}
            roughness={0.2}
            emissive="#1a0a3e"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Inner wireframe */}
        <mesh ref={wireRef} scale={1.85}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial 
            color="#8b5cf6" 
            wireframe 
            transparent 
            opacity={0.15}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh ref={outerRef} scale={2.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            wireframe 
            transparent 
            opacity={0.06}
          />
        </mesh>

        {/* Energy core glow */}
        <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={1.5} distance={8} />
        <pointLight position={[2, 1, 2]} color="#00d4ff" intensity={0.4} distance={6} />
      </group>
    </Float>
  )
}

/* ============== PARTICLES ============== */
function Particles({ count = 500 }) {
  const points = useRef()
  
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = 0.008 + Math.random() * 0.02
    }
    return { positions: pos, sizes: sz }
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.012
    points.current.rotation.x = state.clock.elapsedTime * 0.006
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8b5cf6"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ============== HERO CANVAS (Neural Orb + Stars) ============== */
export function HeroCanvas({ activeSection, onJunctionClick }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <SceneBg color="#0a0a0f" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      {/* Required for the ultra-premium clearcoat/refraction transmission glass calculation */}
      <Environment preset="city" />
      
      <NeuralOrb />
      <Particles count={200} />
      
      {/* 3D Internal Spatial Elements that animate on interaction */}
      <Suspense fallback={null}>
        <InternalCards activeSection={activeSection} onJunctionClick={onJunctionClick} />
      </Suspense>
      
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.035} // Extremely smooth fluid drag
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.6}
        autoRotate={!activeSection}
        autoRotateSpeed={1.2} // Boosted to make the rotation easily felt
      />
    </Canvas>
  )
}

/* ============== FLOATING COMPUTER SCENE (fallback) ============== */
function ComputerModel() {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <mesh ref={mesh}>
      <hemisphereLight intensity={3} groundColor="black" />
      <pointLight intensity={3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={0.65}
        position={[0, -1.8, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

/* ============== EARTH MODEL (Contact section) ============== */
function Earth() {
  const earth = useGLTF('./planet/scene.gltf')
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <mesh ref={mesh}>
      <primitive
        object={earth.scene}
        scale={2.5}
        position-y={0}
        rotation-y={0}
      />
    </mesh>
  )
}

/* ============== STARS BACKGROUND ============== */
function Stars({ count = 1500 }) {
  const points = useRef()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.01
    points.current.rotation.x = state.clock.elapsedTime * 0.005
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#f3f3f3"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function EarthCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <SceneBg color="#0a0a0f" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Stars count={1200} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}
