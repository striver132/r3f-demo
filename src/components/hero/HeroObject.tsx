import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useMouseParallax } from '../../hook/useMouseParallax'


const MATERIALS = {
    white: {
        color: '#ffffff',
        metalness: 0.35,
        roughness: 0.25,
    },
    blue: {
        color: '#5b8cff',
        metalness: 0.6,
        roughness: 0.2,
    },
    dark: {
        color: '#1a1a1a',
        metalness: 0.2,
        roughness: 0.6,
    },
}

export default function HeroObject({
    materialPreset,
}: {
    materialPreset: keyof typeof MATERIALS
}) {
    const m = MATERIALS[materialPreset]

    const ref = useRef<Mesh>(null!)
    const getOffset = useMouseParallax(0.4)
    useFrame((state, delta) => {
        const offset = getOffset(0.08)
        ref.current.position.x = offset.x
        ref.current.position.y = offset.y
    })

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshStandardMaterial
                color={m.color}
                metalness={m.metalness}
                roughness={m.roughness}
            />
        </mesh>
    )
}