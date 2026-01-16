import { Canvas } from '@react-three/fiber'
export default function TestCanvas({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
            }}
        >
            <color attach="background" args={['#0b0e14']} />
            {children}
        </Canvas>
    )
}