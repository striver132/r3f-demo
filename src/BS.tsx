import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef, useMemo, useState } from "react"

function Brain({ connected }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = connected ? 2 : 0
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <meshStandardMaterial
        color="black"
        emissive="white"
        emissiveIntensity={0}
      />
    </mesh>
  )
}

function Plug({ plugRef }) {
  return (
    <mesh ref={plugRef}>
      <boxGeometry args={[0.2, 0.1, 0.1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

function Cable({ startRef, endRef, connected }) {
  const meshRef = useRef()

  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]), [])

  useFrame(() => {
    if (!startRef.current || !endRef.current) return

    const start = startRef.current.position.clone()
    const end = endRef.current.position.clone()

    const mid = start.clone().lerp(end, 0.5)
    mid.y += 10.3 // 电缆自然弯曲

    curve.points[0] = start
    curve.points[1] = mid
    curve.points[2] = end

    const newGeometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false)

    meshRef.current.geometry.dispose()
    meshRef.current.geometry = newGeometry

    meshRef.current.material.emissiveIntensity = connected ? 1.5 : 0
  })

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 20, 0.03, 8, false]} />
      <meshStandardMaterial
        color="white"
        emissive="white"
        emissiveIntensity={0}
      />
    </mesh>
  )
}

function InteractionScene() {
  const plugRef = useRef()
  const startRef = useRef()

  const { mouse, camera, raycaster } = useThree()
  const planeRef = useRef()

  const brainSocket = new THREE.Vector3(0, 0, 0)
  const [connected, setConnected] = useState(false)

  useFrame(() => {
    if (!plugRef.current) return

    // 鼠标映射到平面
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(planeRef.current)

    if (intersects.length > 0) {
      plugRef.current.position.copy(intersects[0].point)
    }

    // 距离检测
    const distance = plugRef.current.position.distanceTo(brainSocket)

    if (distance < 0.3) {
      // 磁吸
      plugRef.current.position.lerp(brainSocket, 0.1)
      setConnected(true)
    } else {
      setConnected(false)
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 2]} intensity={1} />

      {/* 隐形平面用于鼠标交互 */}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial />
      </mesh>

      {/* 固定插座起点 */}
      <mesh ref={startRef} position={[-2, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Brain connected={connected} />
      <Plug plugRef={plugRef} />
      <Cable startRef={startRef} endRef={plugRef} connected={connected} />

      <OrbitControls />
    </>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <InteractionScene />
    </Canvas>
  )
}