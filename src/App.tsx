import HeroCanvas from './components/hero/HeroCanvas'
import HeroScene from './components/hero/HeroScene'
import HeroOverlay from './ui/HeroOverlay'
import ColorControls from './ui/ColorControls'
import { useState } from 'react'
export default function App() {
  const [materialPreset, setMaterialPreset] = useState('white')
  return (
    <div className="hero">
      <HeroCanvas>
        <HeroScene materialPreset={materialPreset} />
      </HeroCanvas>
      <HeroOverlay />

      <ColorControls
        value={materialPreset}
        onChange={setMaterialPreset}
      />
    </div>
  )
}