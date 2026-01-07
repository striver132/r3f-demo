import { Float } from '@react-three/drei'
import Lights from './Lights'
import HeroObject from './HeroObject'

export default function HeroScene({
    materialPreset,
}: {
    materialPreset: "white" | "blue" | "dark"
}) {
    return (
        <>
            <Lights />

            <Float
                speed={1}
                rotationIntensity={0.4}
                floatIntensity={0.6}
            >
                <HeroObject materialPreset={materialPreset}/>
            </Float>
        </>
    )
}