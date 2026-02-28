import { ColorShiftMaterial } from '../../assets/shaders/ColorShiftMaterial.js'
import { HolographicFilmMaterial } from '../../assets/shaders/HolographicFilmMaterial.js'
import { HolographicIridescentMaterial } from '../../assets/shaders/HolographicIridescentMaterial.js'
import '../../assets/shaders/IridescentFluidMaterial'
import * as THREE from 'three'
import { extend, useFrame, type ReactThreeFiber } from '@react-three/fiber'
import { useRef } from 'react'
extend({ ColorShiftMaterial, HolographicFilmMaterial,HolographicIridescentMaterial })

function Plane() {
  const materialRef = useRef<any>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      {/* <colorShiftMaterial
        ref={materialRef}
        color={new THREE.Color('red')}
      /> */}
      <holographicFilmMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Cube1(){
    const materialRef = useRef<any>(null)
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((_, delta) => {
      if (materialRef.current) {
        materialRef.current.time += delta
      }
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.4
        meshRef.current.rotation.x += delta * 0.15
      }
    })

    return (
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <holographicFilmMaterial
            ref={materialRef}
            side={THREE.DoubleSide}
          />
        </mesh>
    )
}

function Cube2(){
  const materialRef = useRef<any>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <iridescentFluidMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function ShaderScene(){
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <Plane /> */}
      {/* <Cube1 /> */}
      <Cube2 />
    </>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      colorShiftMaterial: ReactThreeFiber.Node<any, any>
      holographicFilmMaterial: ReactThreeFiber.Node<any, any>
      iridescentFluidMaterial: ReactThreeFiber.Node<any, any>
    }
  }
}

declare module '../../assets/shaders/ColorShiftMaterial.js' {
  export const ColorShiftMaterial: any
}
declare module '../../assets/shaders/HolographicFilmMaterial.js' {
  export const HolographicFilmMaterial: any
}
declare module '../../assets/shaders/HolographicIridescentMaterial.js' {
  export const HolographicIridescentMaterial: any
}

