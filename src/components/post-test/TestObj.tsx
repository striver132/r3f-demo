import { Html } from '@react-three/drei'

export default function TestObj(){  
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#ff6b6b" 
        emissive="#ff6b6b"
        emissiveIntensity={0.5}
      />
      <Html occlude distanceFactor={2} position={[0, 0, 1.01]} transform>
        <div style={{ color: 'white' }}>Hello, World!</div>
      </Html>
    </mesh>
  )
}