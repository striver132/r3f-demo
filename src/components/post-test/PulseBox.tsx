import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MeshStandardMaterial } from 'three'
export default function PulseBox() {
    const mat = useRef<MeshStandardMaterial>(null!)

    useFrame(({ clock }) => {
        const t = (1 + Math.sin(clock.elapsedTime * 2))/4
        mat.current.color.setRGB(
            2 + t * 20, 2, 20 + t * 50
        )
    })

    return (
        <mesh >
            <boxGeometry args={[2, 1, 1]} />
            <meshBasicMaterial
                ref={mat}
                toneMapped={false}
            />
        </mesh>
    )
}