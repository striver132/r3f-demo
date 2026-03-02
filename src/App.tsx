import HeroCanvas from './components/hero/HeroCanvas'
import HeroScene from './components/hero/HeroScene'
import HeroOverlay from './ui/HeroOverlay'
import ColorControls from './ui/ColorControls'
import CenterContent from './components/center/CenterContent'

// post-test
import TestCanvas from './components/post-test/TestCanvas'
import TestScene from './components/post-test/TestScene'
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, SSAO, Bloom,ASCII } from "@react-three/postprocessing";
import { useState, Suspense } from 'react'


//Shader Study
import ShaderCanvas from './components/shader-study/ShaderCanvas'
import ShaderScene from './components/shader-study/ShaderScene'

// BS
import BS from './BS'
import IK from './IK'
export default function App() {
  // const [materialPreset, setMaterialPreset] = useState<"white" | "blue" | "dark">('white')
  return (
    <>
      {/* <div className="hero">
        <HeroCanvas>
          <HeroScene materialPreset={materialPreset} />
        </HeroCanvas>
        <HeroOverlay />

        <ColorControls
          value={materialPreset}
          onChange={setMaterialPreset}
        />

      </div>
      <div className='center'>
        <CenterContent />
      </div> */}

      {/* <TestCanvas>
        <Suspense fallback={null}>
          <TestScene />
        </Suspense>
        <OrbitControls />
        <Suspense>
          <EffectComposer>
            
            <ASCII />
            <SSAO 
              intensity={30}
              radius={5}
              bias={0.1}
            />
          </EffectComposer>
        </Suspense>
      </TestCanvas> */}

      {/* Shader Study */}
      {/* <ShaderCanvas>
        <Suspense fallback={null}>
          <ShaderScene />
        </Suspense>
      </ShaderCanvas> */}

      {/* <BS></BS> */}
      <IK></IK>
    </>

  )
}