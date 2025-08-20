import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

interface DogCow3DProps {
  mood: 'happy' | 'excited' | 'thinking' | 'sleeping'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  autoRotate?: boolean
}

const DogCowModel: React.FC<{ mood: string; onClick?: () => void; autoRotate?: boolean }> = ({ mood, onClick, autoRotate = true }) => {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  try {
    const gltf = useLoader(GLTFLoader, '/3dmodel.glb')
    
    useFrame((state) => {
      if (meshRef.current) {
        // Auto rotation
        if (autoRotate) {
          meshRef.current.rotation.y += 0.005
        }
        
        // Floating animation
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
        
        // Mood-based animations
        switch (mood) {
          case 'excited':
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.1
            break
          case 'thinking':
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.05
            break
          case 'sleeping':
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
            break
          default:
            break
        }
        
        // Hover effect
        if (hovered) {
          meshRef.current.scale.setScalar(1.1)
        } else {
          meshRef.current.scale.setScalar(1)
        }
      }
    })

    return (
      <group
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <primitive object={gltf.scene} scale={0.5} />
        {mood === 'thinking' && (
          <Html position={[0, 2, 0]}>
            <div className="text-2xl">💭</div>
          </Html>
        )}
        {mood === 'excited' && (
          <Html position={[0, 2, 0]}>
            <div className="text-2xl animate-bounce">✨</div>
          </Html>
        )}
        {mood === 'sleeping' && (
          <Html position={[0, 2, 0]}>
            <div className="text-xl opacity-70">💤</div>
          </Html>
        )}
      </group>
    )
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return null
  }
}

const DogCow3D: React.FC<DogCow3DProps> = ({ mood, size = 'medium', onClick, autoRotate = true }) => {
  const sizeMap = {
    small: { width: 80, height: 80 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 }
  }

  const currentSize = sizeMap[size]

  return (
    <div 
      className="relative"
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white text-sm">Loading Clarus...</div>
          </Html>
        }>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <DogCowModel mood={mood} onClick={onClick} autoRotate={autoRotate} />
          {onClick && <OrbitControls enableZoom={false} enablePan={false} />}
        </Suspense>
      </Canvas>
      
      {/* Fallback image if 3D model fails */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <img 
          src="/Logo.png" 
          alt="DogCow Logo" 
          className="w-full h-full object-contain"
          style={{ maxWidth: '80%', maxHeight: '80%' }}
        />
      </div>
    </div>
  )
}

export default DogCow3D
