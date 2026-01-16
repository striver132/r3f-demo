import TestObj from "./TestObj"
import PulseBox from "./PulseBox"
export default function TestScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <PulseBox />*/}
      <TestObj />
      {/* 添加更多物体让 SSAO 效果更明显 */}
      <mesh position={[-3, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <meshStandardMaterial color="#ffe66d" emissive="#ffe66d" emissiveIntensity={0.3} />
      </mesh>
      {/* 地面 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </>
  )
}