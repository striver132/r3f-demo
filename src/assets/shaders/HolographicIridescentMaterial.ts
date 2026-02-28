import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

export const IridescentMaterial = shaderMaterial(
  {
    time: 0,
    thickness: 400.0, // 薄膜厚度（纳米）
    ior: 1.3,         // 折射率
  },

  // vertex shader
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vec4 viewPos = viewMatrix * worldPos;

      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(-viewPos.xyz);

      gl_Position = projectionMatrix * viewPos;
    }
  `,

  // fragment shader
  /* glsl */ `
    uniform float time;
    uniform float thickness;
    uniform float ior;

    varying vec3 vNormal;
    varying vec3 vViewDir;

    const float PI = 3.14159265359;

    // 波长（nm）
    vec3 wavelength = vec3(650.0, 510.0, 475.0);

    vec3 thinFilmInterference(float cosTheta) {
        float n1 = 1.0;
        float n2 = ior;

        float sinThetaT = n1 / n2 * sqrt(1.0 - cosTheta * cosTheta);
        float cosThetaT = sqrt(1.0 - sinThetaT * sinThetaT);

        vec3 phase = (4.0 * PI * n2 * thickness * cosThetaT) / wavelength;

        vec3 interference = 0.5 + 0.5 * cos(phase);

        return interference;
    }

    void main() {

        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewDir);

        float cosTheta = clamp(dot(normal, viewDir), 0.0, 1.0);

        vec3 iridescence = thinFilmInterference(cosTheta);

        // Fresnel
        float fresnel = pow(1.0 - cosTheta, 5.0);

        vec3 finalColor = iridescence * fresnel * 2.5;

        gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ IridescentMaterial })