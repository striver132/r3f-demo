import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useMouseParallax } from '../../hook/useMouseParallax'
import { useGLTF } from '@react-three/drei'


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
    const { scene } = useGLTF('/src/assets/model/abstract_design.glb')

    const ref = useRef<any>(null!)
    const getOffset = useMouseParallax(0.4)
    
    useFrame((state, delta) => {
        const offset = getOffset(0.08)
        if (ref.current) {
            ref.current.position.x = offset.x
            ref.current.position.y = offset.y
        }
    })

    // 克隆场景并应用材质
    const clonedScene = scene.clone()
    clonedScene.traverse((child: any) => {
        if (child.isMesh) {
            child.material = child.material.clone()
            child.material.color.set(m.color)
            child.material.metalness = m.metalness
            child.material.roughness = m.roughness
        }
    })

    return <primitive ref={ref} object={clonedScene} scale={0.01} />
}

// 预加载模型
useGLTF.preload('/src/assets/model/abstract_design.glb')