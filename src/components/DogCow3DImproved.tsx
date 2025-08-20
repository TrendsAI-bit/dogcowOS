import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import DogCowLogo from './DogCowLogo'

interface DogCow3DImprovedProps {
  mood: 'happy' | 'excited' | 'thinking' | 'sleeping'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  autoRotate?: boolean
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="text-2xl mb-2">🐕🐄</div>
        <div className="text-sm">Loading 3D Clarus... {Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

const DogCowModel: React.FC<{ mood: string; onClick?: () => void; autoRotate?: boolean }> = ({ mood, onClick, autoRotate = true }) => {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)

  let gltf
  try {
    gltf = useLoader(GLTFLoader, '/3dmodel.glb')
    useEffect(() => {
      setModelLoaded(true)
    }, [])
  } catch (error) {
    console.error('Failed to load 3D model:', error)
    return (
      <Html center>
        <div className="w-24 h-24">
          <DogCowLogo mood={mood} size="medium" onClick={onClick} />
        </div>
      </Html>
    )
  }
  
  useFrame((state) => {
    if (meshRef.current && modelLoaded) {
      // Auto rotation
      if (autoRotate) {
        meshRef.current.rotation.y += 0.008
      }
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
      
      // Mood-based animations
      switch (mood) {
        case 'excited':
          meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 6) * 0.1
          meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.05)
          break
        case 'thinking':
          meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.08
          break
        case 'sleeping':
          meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
          break
        default:
          break
      }
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.15)
      } else if (mood !== 'excited') {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  if (!gltf || !modelLoaded) {
    return (
      <Html center>
        <div className="w-24 h-24">
          <DogCowLogo mood={mood} size="medium" onClick={onClick} />
        </div>
      </Html>
    )
  }

  return (
    <group
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <primitive object={gltf.scene} scale={0.6} />
      {mood === 'thinking' && (
        <Html position={[0, 2.5, 0]}>
          <div className="text-2xl animate-pulse">💭</div>
        </Html>
      )}
      {mood === 'excited' && (
        <Html position={[0, 2.5, 0]}>
          <div className="text-2xl animate-bounce">✨</div>
        </Html>
      )}
      {mood === 'sleeping' && (
        <Html position={[0, 2.5, 0]}>
          <div className="text-xl opacity-70 animate-pulse">💤</div>
        </Html>
      )}
    </group>
  )
}

const DogCow3DImproved: React.FC<DogCow3DImprovedProps> = ({ mood, size = 'medium', onClick, autoRotate = true }) => {
  const [use3D, setUse3D] = useState(true)
  const [error, setError] = useState(false)

  const sizeMap = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 }
  }

  const currentSize = sizeMap[size]

  if (error || !use3D) {
    return <DogCowLogo mood={mood} size={size} onClick={onClick} />
  }

  return (
    <div 
      className="relative"
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        onError={() => setError(true)}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#ff6b35" />
          <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={0.5} />
          
          <DogCowModel mood={mood} onClick={onClick} autoRotate={autoRotate} />
          
          {onClick && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Fallback button */}
      <button
        onClick={() => setUse3D(false)}
        className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity"
        title="Switch to 2D mode"
      >
        2D
      </button>
    </div>
  )
}

export default DogCow3DImproved
