import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

export const IridescentFluidMaterial = shaderMaterial(
  {
    time: 0,
    thickness: 450.0,
    ior: 1.35,
  },

  // vertex
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vUv = uv;

      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vec4 viewPos = viewMatrix * worldPos;

      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(-viewPos.xyz);

      gl_Position = projectionMatrix * viewPos;
    }
  `,

  // fragment
  `
    uniform float time;
    uniform float thickness;
    uniform float ior;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    const float PI = 3.14159265359;

    vec3 wavelength = vec3(650.0, 510.0, 475.0);

    // 简单噪声
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
               (c - a)* u.y * (1.0 - u.x) +
               (d - b) * u.x * u.y;
    }

    // domain warp
    vec2 warp(vec2 uv) {
        float n1 = noise(uv * 3.0 + time * 0.1);
        float n2 = noise(uv * 4.0 - time * 0.1);
        return uv + vec2(n1, n2) * 0.15;
    }

    vec3 thinFilm(float cosTheta, float localThickness) {

        float n1 = 1.0;
        float n2 = ior;

        float sinThetaT = n1 / n2 * sqrt(1.0 - cosTheta*cosTheta);
        float cosThetaT = sqrt(1.0 - sinThetaT*sinThetaT);

        vec3 phase = (4.0 * PI * n2 * localThickness * cosThetaT) / wavelength;

        return 0.5 + 0.5 * cos(phase);
    }

    void main() {

        vec2 uv = warp(vUv);

        float thicknessNoise = noise(uv * 5.0 + time * 0.2);
        float localThickness = thickness + thicknessNoise * 200.0;

        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewDir);

        float cosTheta = clamp(dot(normal, viewDir), 0.0, 1.0);

        vec3 color = thinFilm(cosTheta, localThickness);

        float fresnel = pow(1.0 - cosTheta, 3.0);

        color *= 0.7 + fresnel * 1.2;

        // 柔和处理
        color = pow(color, vec3(0.8));

        gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ IridescentFluidMaterial })