import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

export const HolographicIridescentMaterial = shaderMaterial(
  {
    time: 0,
  },

  // ---------------- VERTEX ----------------
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {

      vNormal = normalize(normalMatrix * normal);

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  // ---------------- FRAGMENT ----------------
  /* glsl */ `
    uniform float time;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // 彩虹光谱
    vec3 spectrum(float t) {
      return vec3(
        0.5 + 0.5 * sin(6.2831 * (t + 0.0)),
        0.5 + 0.5 * sin(6.2831 * (t + 0.33)),
        0.5 + 0.5 * sin(6.2831 * (t + 0.66))
      );
    }

    void main() {

      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      float ndv = dot(normal, viewDir);

      // 主 Fresnel
      float fresnel = pow(1.0 - ndv, 3.0);

      // ---------- 第一层：基础镭射 ----------
      float baseHue = ndv + time * 0.25;
      vec3 baseLayer = spectrum(baseHue);

      // ---------- 第二层：干涉膜厚扰动 ----------
      float thickness = 0.5 + 0.5 * sin(normal.x * 8.0 + time);
      float interference = thickness * 2.0 + ndv * 1.5;

      vec3 iridescentLayer = spectrum(interference + time * 0.2);

      // 混合两层
      vec3 color = mix(baseLayer, iridescentLayer, 0.6);

      // 边缘增强
      color *= fresnel * 2.2;

      // 锐利高光
      float spec = pow(max(reflect(-viewDir, normal).z, 0.0), 32.0);
      color += spec * 0.8;

      gl_FragColor = vec4(color, 1.0);
    }
  `
)