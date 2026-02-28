import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

export const HolographicFilmMaterial = shaderMaterial(
  {
    time: 0,
  },

  // ---------- Vertex Shader ----------
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {

      // 法线转到视空间
      vNormal = normalize(normalMatrix * normal);

      // 计算视角方向
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,

  // ---------- Fragment Shader ----------
  /* glsl */ `
    uniform float time;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

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

      float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);

      float hue = dot(normal, viewDir) + time * 0.3;

      vec3 laser = spectrum(hue);

      float noise = sin(normal.x * 10.0 + time) * 0.05;
      laser += noise;

      vec3 finalColor = laser * fresnel * 2.0;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)