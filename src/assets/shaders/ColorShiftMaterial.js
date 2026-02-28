import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

// 创建材质类
export const ColorShiftMaterial = shaderMaterial(
  // uniforms 默认值
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },

  // vertex shader
  /* glsl */ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // fragment shader
  /* glsl */ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      vec3 wave = 0.5 + 0.3 * sin(vUv.yxx + time);
      gl_FragColor = vec4(wave + color, 1.0);
    }
  `
)