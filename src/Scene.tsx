import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useRef } from 'react'

export default function Scene() {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
    </mesh>
  )
}