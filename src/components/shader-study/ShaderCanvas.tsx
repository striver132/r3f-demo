import { Canvas } from '@react-three/fiber'
export default function ShaderCanvas({ children }: { children: React.ReactNode }){
  return (
    <Canvas
     camera={{ position: [0, 0, 5] }}
    >
      {children}
    </Canvas>
  )
}
