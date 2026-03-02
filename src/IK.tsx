import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import { CCDIKSolver } from "three/examples/jsm/animation/CCDIKSolver"

function IKArm() {
  const { scene } = useThree()
  const meshRef = useRef()
  const solverRef = useRef()
  const targetRef = useRef()

  useEffect(() => {
    const root = new THREE.Bone()
    const bone1 = new THREE.Bone()
    const bone2 = new THREE.Bone()
    const target = new THREE.Bone()

    root.position.y = -2.5
    bone1.position.y = 1.5
    bone2.position.y = 0.5
    target.position.y = 1.5

    root.add(bone1)
    bone1.add(bone2)
    // target 需要独立于 IK 链，否则会造成循环依赖导致模型乱动
    // 注意：不要将 target 添加到 root，因为 root 也在 IK 链中（links 包含 index 0）
    // 如果 root 旋转，target 也会跟着动，导致震荡。
    // target 将在稍后添加到 skinnedMesh 中。

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 12)
    geometry.translate(0, 2.5, 0)
    
    // 创建简单的 skin indices 和 weights
    const position = geometry.attributes.position
    const vertex = new THREE.Vector3()
    const skinIndices = []
    const skinWeights = []

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i)
      const y = (vertex.y) // 0 to 5
      
      // 简单根据高度分配骨骼权重
      if (y < 1.5) {
        skinIndices.push(0, 0, 0, 0)
        skinWeights.push(1, 0, 0, 0)
      } else if (y < 3.0) {
        skinIndices.push(1, 0, 0, 0)
        skinWeights.push(1, 0, 0, 0)
      } else {
        skinIndices.push(2, 0, 0, 0)
        skinWeights.push(1, 0, 0, 0)
      }
    }
    
    geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4))
    geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4))

    const material = new THREE.MeshStandardMaterial({ 
      color: "lightblue", 
      wireframe: false,
      transparent: true,
      opacity: 0.8
    })
    const skinnedMesh = new THREE.SkinnedMesh(geometry, material)

    const skeleton = new THREE.Skeleton([root, bone1, bone2, target])
    skinnedMesh.add(root)
    skinnedMesh.add(target) // 将 target 添加到 mesh，确保它在场景中，且不受 root 旋转影响
    skinnedMesh.bind(skeleton)

    meshRef.current.add(skinnedMesh)
    
    // 添加骨骼辅助显示
    const helper = new THREE.SkeletonHelper(skinnedMesh)
    scene.add(helper)

    const iks = [{
      target: 3,
      effector: 2,
      links: [
        { index: 1 },
        { index: 0 }
      ]
    }]

    solverRef.current = new CCDIKSolver(skinnedMesh, iks)
    targetRef.current = target

    return () => {
      scene.remove(helper)
      geometry.dispose()
      material.dispose()
    }
  }, [scene])

  useFrame(({ mouse, viewport }) => {
    if (!solverRef.current || !targetRef.current) return

    // 将鼠标坐标映射到视口坐标
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2

    targetRef.current.position.set(x, y, 0)
    solverRef.current.update()
  })

  return <group ref={meshRef} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight />
      <IKArm />
    </Canvas>
  )
}
