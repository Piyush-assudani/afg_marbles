import * as THREE from 'three';
import gsap from 'gsap';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const BASE = '/';

export const STONES = [
  { key: 'makrana', name: 'Makrana Pure White Marble', origin: 'Makrana, Rajasthan', note: 'Temples & Mandirs · 99.2% Taj Calcite Bedrock', word: 'MAKRANA' },
  { key: 'vietnam', name: 'Vietnam Pure White Marble', origin: 'Luc Yen / Yen Bai, Vietnam', note: 'Temples & Deities · Pure Crystalline Snow', word: 'VIETNAM' },
  { key: 'rajnagar', name: 'Rajnagar White Marble', origin: 'Rajnagar, Rajasthan', note: 'Palatial Fountains · Heavy Hydraulic Dense Calcite', word: 'RAJNAGAR' },
].map((s) => ({ ...s, url: `${BASE}textures/${s.key}.jpg` }));

/* ------------------------------------------------------------------
   Materials
------------------------------------------------------------------- */

function getFallbackWhiteTexture() {
  const data = new Uint8Array([255, 255, 255, 255]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}
const defaultWhiteTex = getFallbackWhiteTexture();

/**
 * Polished marble with seamless triplanar mapping (object space) and an
 * animated, gold-edged "wipe" used to transform the temple between stones.
 */
function makeMarbleMaterial(map, { scale = 0.52, minY = 0.25, maxY = 5.55, roughness = 0.2 } = {}) {
  const activeMap = map || defaultWhiteTex;
  const uniforms = {
    uMapA: { value: activeMap },
    uMapB: { value: activeMap },
    uMix: { value: 0 },
    uScale: { value: scale },
    uMinY: { value: minY },
    uMaxY: { value: maxY },
    uTurntableInverse: { value: new THREE.Matrix4() },
  };

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    specularIntensity: 0.6,
  });
  mat.userData.uniforms = uniforms;

  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        uniform mat4 uTurntableInverse;
        varying vec3 vTurntablePos;
        varying vec3 vTurntableNormal;`
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `#include <begin_vertex>
        vec4 wPos = modelMatrix * vec4(position, 1.0);
        vec4 ttPos = uTurntableInverse * wPos;
        vTurntablePos = ttPos.xyz;
        vTurntableNormal = normalize((uTurntableInverse * modelMatrix * vec4(normal, 0.0)).xyz);`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        uniform sampler2D uMapA;
        uniform sampler2D uMapB;
        uniform float uMix;
        uniform float uScale;
        uniform float uMinY;
        uniform float uMaxY;
        varying vec3 vTurntablePos;
        varying vec3 vTurntableNormal;

        vec3 triplanar(sampler2D t, vec3 p, vec3 n) {
          vec3 b = pow(abs(n), vec3(6.0));
          b /= (b.x + b.y + b.z + 1e-5);
          vec3 cx = texture2D(t, p.zy * uScale + 0.5).rgb;
          vec3 cy = texture2D(t, p.xz * uScale + 0.5).rgb;
          vec3 cz = texture2D(t, p.xy * uScale + 0.5).rgb;
          return cx * b.x + cy * b.y + cz * b.z;
        }`
      )
      .replace(
        '#include <map_fragment>',
        /* glsl */ `#include <map_fragment>
        vec3 tN = normalize(vTurntableNormal);
        vec3 stoneA = triplanar(uMapA, vTurntablePos, tN);
        vec3 stoneB = triplanar(uMapB, vTurntablePos, tN);

        // Continuous vertical height across the entire mandir from plinth (0.27) to finials (5.50)
        float hN = clamp((vTurntablePos.y - uMinY) / (uMaxY - uMinY), 0.0, 1.0);
        float wNoise = (stoneA.r * 0.65 + stoneB.g * 0.35) - 0.5;
        float wEdge = mix(-0.16, 1.16, uMix);
        float wH = hN + wNoise * 0.16;
        float wMask = 1.0 - smoothstep(wEdge - 0.02, wEdge + 0.02, wH);
        vec3 stoneColor = mix(stoneA, stoneB, wMask);
        if (dot(stoneColor, stoneColor) < 0.25) {
          stoneColor = vec3(0.99, 0.985, 0.97);
        }
        stoneColor = max(stoneColor, vec3(0.85, 0.83, 0.81));
        diffuseColor.rgb *= stoneColor;

        float wActive = step(0.0005, uMix) * step(uMix, 0.9995);
        float dist = abs(wH - wEdge);
        float wLine = (1.0 - smoothstep(0.0, 0.032, dist)) * wActive;
        float wGlow = (1.0 - smoothstep(0.0, 0.12, dist)) * wActive;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        totalEmissiveRadiance += (vec3(1.0, 0.86, 0.45) * wLine * 4.6 + vec3(1.0, 0.58, 0.18) * wGlow * 2.0);`
      );
  };

  return mat;
}

function makeGoldMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f5cc76'),
    metalness: 0.96,
    roughness: 0.16,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
    reflectivity: 0.95,
  });
}

/* ------------------------------------------------------------------
   Geometry helpers
------------------------------------------------------------------- */

const v2 = (x, y) => new THREE.Vector2(x, y);

function lathe(points, segments = 48) {
  return new THREE.LatheGeometry(points, segments);
}

function radialTexture(stops, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------
   Gold dust particles
------------------------------------------------------------------- */
function buildDust(count = 320) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const speed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 11;
    pos[i * 3 + 1] = Math.random() * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    scale[i] = 0.4 + Math.random() * 1.2;
    speed[i] = 0.3 + Math.random() * 0.9;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
  geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 70 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color(0.74, 0.56, 0.28) },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uPixelRatio;
      attribute float aScale;
      attribute float aSpeed;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y = mod(p.y + uTime * aSpeed * 0.22, 8.0);
        p.x += sin(uTime * 0.35 + position.z * 2.0 + aScale * 6.0) * 0.18;
        p.z += cos(uTime * 0.3 + position.x * 1.5) * 0.12;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
        float fade = smoothstep(0.0, 1.2, p.y) * (1.0 - smoothstep(6.4, 8.0, p.y));
        float twinkle = 0.55 + 0.45 * sin(uTime * 2.2 + aScale * 40.0);
        vAlpha = fade * twinkle;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        a *= a;
        gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
      }
    `,
  });
  return new THREE.Points(geo, mat);
}

/* ------------------------------------------------------------------
   Experience
------------------------------------------------------------------- */
export function createExperience({ canvas, onProgress, onHover, onFrame }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    stencil: false,
  });
  const isSmallScreen = window.innerWidth < 821;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping ?? THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const camBase = new THREE.Vector3(0, 3.7, 15.5);
  const lookBase = new THREE.Vector3(0, 3.25, 0);
  const camIntro = { z: 0, y: 0, x: 0 };
  const lookAt = new THREE.Vector3();

  /* --- Textures & Model Loading --- */
  let readyResolved = false;
  let readyResolve;
  const ready = new Promise((resolve) => {
    readyResolve = () => {
      if (!readyResolved) {
        readyResolved = true;
        resolve();
      }
    };
  });

  // Safety fallback: never keep user waiting more than 800ms
  setTimeout(() => {
    readyResolve();
  }, 800);

  const manager = new THREE.LoadingManager(
    () => readyResolve?.(),
    (_url, loaded, total) => {
      if (total > 0) onProgress?.(loaded / total);
    },
    () => {} // Silent asset warning handler to avoid terminal noise
  );
  const loader = new THREE.TextureLoader(manager);
  const bgLoader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const textures = {};

  function applyTexSettings(t) {
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = maxAniso;
    return t;
  }

  // Preload primary essential texture (Makrana) with high priority via manager
  const sMakrana = STONES.find((item) => item.key === 'makrana');
  if (sMakrana) {
    textures['makrana'] = applyTexSettings(loader.load(sMakrana.url));
  }

  // Secondary stone textures (Vietnam, Rajnagar) loaded asynchronously in background
  STONES.forEach((s) => {
    if (s.key !== 'makrana' && !textures[s.key]) {
      textures[s.key] = applyTexSettings(bgLoader.load(s.url));
    }
  });

  const templeMat = makeMarbleMaterial(textures.makrana, { scale: 0.18, minY: 0.25, maxY: 5.55 });
  const podiumMat = makeMarbleMaterial(textures.makrana, { scale: 0.18, roughness: 0.16 });
  const gold = makeGoldMaterial();

  const sanctumDiscMat = new THREE.MeshPhysicalMaterial({
    color: 0xfffcf5,
    map: textures.makrana,
    roughness: 0.14,
    metalness: 0.02,
    clearcoat: 0.95,
    clearcoatRoughness: 0.05,
  });

  const omGold = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffe18a'),
    emissive: new THREE.Color('#ffd166'),
    emissiveIntensity: 0.45,
    metalness: 0.96,
    roughness: 0.14,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
  });

  const meenakariBlue = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0d2146'),
    metalness: 0.15,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });

  // Dedicated luxury palace materials for the authentic 256-mesh model:
  const rubyJewel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#9e0b1c'),
    emissive: new THREE.Color('#4a030b'),
    emissiveIntensity: 0.35,
    metalness: 0.1,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const sapphireJewel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0a2e5c'),
    emissive: new THREE.Color('#03142e'),
    emissiveIntensity: 0.3,
    metalness: 0.1,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const emeraldJewel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#08522e'),
    emissive: new THREE.Color('#022413'),
    emissiveIntensity: 0.3,
    metalness: 0.1,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });

  const lampGlowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fff0b3'),
    emissive: new THREE.Color('#ffaa22'),
    emissiveIntensity: 2.4,
    roughness: 0.3,
  });

  const diyaFlameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fff4cc'),
    emissive: new THREE.Color('#ff7700'),
    emissiveIntensity: 3.0,
    roughness: 0.2,
  });

  const carvedPeacockIvory = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#fcfaf5'),
    roughness: 0.14,
    metalness: 0.02,
    clearcoat: 0.95,
    clearcoatRoughness: 0.05,
  });

  const royalVelvetMaroon = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#480d16'),
    roughness: 0.85,
    metalness: 0.05,
  });

  const pickables = [];
  const mandirGroup = new THREE.Group();

  // Divine Sanctum interior illumination (warm spiritual aura inside garbhagriha)
  const sanctumGlow = new THREE.PointLight('#ffc060', 3.4, 7.5, 1.8);
  sanctumGlow.position.set(0, 2.6, 0.45);
  mandirGroup.add(sanctumGlow);

  const gltfLoader = new GLTFLoader(manager);
  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${BASE}draco/`);
    gltfLoader.setDRACOLoader(dracoLoader);
  } catch (_e) {
    // Silent fallback
  }
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);

  const modelFile = 'mandir_premium_v4.glb';

  const gltfPromise = new Promise((resolve, reject) => {
    gltfLoader.load(
      `${BASE}models/${modelFile}`,
      (gltf) => {
        const mandir = gltf.scene;
        mandir.scale.setScalar(2.68);
        mandir.position.set(0, 0.22, 0);

        mandir.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            pickables.push(child);

            const matName = child.material?.name || '';
            const meshName = child.name || '';
            const lowerName = meshName.toLowerCase();

            // Sacred Sanctum centerpiece:
            if (meshName === 'om_symbol') {
              child.material = omGold;
            } else if (meshName === 'om_disc') {
              child.material = sanctumDiscMat;
            } else if (meshName === 'om_ring' || meshName === 'fan_inner_tips') {
              child.material = gold;
            } else if (meshName === 'fan_feathers_inner') {
              child.material = meenakariBlue;
            } else if (lowerName.includes('peacock') && (lowerName.includes('body') || lowerName.includes('neck') || lowerName.includes('head'))) {
              child.material = carvedPeacockIvory;
            } else if (lowerName.includes('eyes_blue') || lowerName.includes('gems_blue') || lowerName.includes('diamonds_blue') || matName.includes('Gem_Sapphire')) {
              child.material = sapphireJewel;
            } else if (lowerName.includes('eyes_red') || lowerName.includes('gems_red') || lowerName.includes('diamonds_red') || matName.includes('Gem_Ruby')) {
              child.material = rubyJewel;
            } else if (matName.includes('Gem_Emerald') || matName.includes('Enamel_Green')) {
              child.material = emeraldJewel;
            } else if (lowerName.includes('flame') || matName.includes('Diya_Flame')) {
              child.material = diyaFlameMat;
            } else if (lowerName.includes('bulb') || matName.includes('Lamp_Glow') || matName.includes('LED_Warm')) {
              child.material = lampGlowMat;
            } else if (matName.includes('Velvet')) {
              child.material = royalVelvetMaroon;
            } else if (
              matName.includes('Marble') ||
              matName.includes('Stone') ||
              matName.includes('Ivory') ||
              matName.includes('Dark') ||
              matName.includes('Black') ||
              matName.includes('Plinth') ||
              matName.includes('Pillar') ||
              matName.includes('Wall') ||
              matName.includes('Base') ||
              matName.includes('White') ||
              matName.includes('Cream')
            ) {
              child.material = templeMat;
            } else if (matName.includes('Gold') || lowerName.includes('wing_gold') || lowerName.includes('crest') || lowerName.includes('beak') || lowerName.includes('feet') || lowerName.includes('tail_fan')) {
              child.material = gold;
            } else if (child.material) {
              child.material.side = THREE.DoubleSide;
              if (child.material.color && child.material.color.r < 0.25 && child.material.color.g < 0.25 && child.material.color.b < 0.25) {
                child.material = templeMat;
              }
            }
          }
        });

        mandirGroup.add(mandir);
        mandirGroup.visible = true;
        resolve(gltf);
        readyResolve();
      },
      undefined,
      (_err) => {
        gltfLoader.load(
          `${BASE}models/mandir_heavy_ivory.glb`,
          (fallbackGltf) => {
            const fallbackMandir = fallbackGltf.scene;
            fallbackMandir.scale.setScalar(2.68);
            fallbackMandir.position.set(0, 0.22, 0);
            fallbackMandir.traverse((child) => {
              if (child.isMesh) {
                child.material = templeMat;
              }
            });
            mandirGroup.add(fallbackMandir);
            mandirGroup.visible = true;
            resolve(fallbackGltf);
            readyResolve();
          },
          undefined,
          (fatalErr) => {
            readyResolve();
            reject(fatalErr);
          }
        );
      }
    );
  });


  /* --- Lights --- */
  const hemi = new THREE.HemisphereLight('#fff7ec', '#d9c8ad', 0.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff1dc', 2.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.bottom = -4;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 3.5;
  scene.add(sun, sun.target);

  const rim = new THREE.DirectionalLight('#ffe2b8', 1.4);
  scene.add(rim, rim.target);

  /* --- Stage --- */
  const stage = new THREE.Group();
  scene.add(stage);
  const turntable = new THREE.Group();
  stage.add(turntable);

  // Podium (turntable)
  const podiumLayer = new THREE.Group();
  const podium = new THREE.Mesh(
    lathe(
      [v2(0.0001, 0), v2(3.0, 0), v2(3.1, 0.05), v2(3.1, 0.24), v2(3.02, 0.3), v2(0.0001, 0.3)],
      128
    ),
    podiumMat
  );
  podium.castShadow = true;
  podium.receiveShadow = true;
  const podiumRing = new THREE.Mesh(new THREE.TorusGeometry(3.105, 0.018, 10, 160), gold);
  podiumRing.rotation.x = Math.PI / 2;
  podiumRing.position.y = 0.145;
  podiumLayer.add(podium, podiumRing);
  turntable.add(podiumLayer);

  // Natural subtle contact shadow and delicate gold floor rim under turntable
  const glowRingGeo = new THREE.RingGeometry(2.98, 3.12, 96);
  const glowRingMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#d4af37'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
  glowRing.rotation.x = -Math.PI / 2;
  glowRing.position.y = 0.008;
  stage.add(glowRing);

  // Soft natural ambient contact shadow
  const glowSoftGeo = new THREE.RingGeometry(2.4, 3.8, 96);
  const glowSoftMat = new THREE.MeshBasicMaterial({
    map: radialTexture([
      [0, 'rgba(40, 32, 24, 0.28)'],
      [0.6, 'rgba(50, 40, 30, 0.08)'],
      [1, 'rgba(0, 0, 0, 0)'],
    ]),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const glowSoft = new THREE.Mesh(glowSoftGeo, glowSoftMat);
  glowSoft.rotation.x = -Math.PI / 2;
  glowSoft.position.y = 0.003;
  stage.add(glowSoft);

  // Add the 3D mandir model to turntable
  turntable.add(mandirGroup);

  // Sanctum Diya Light inside the mandir
  const diyaLight = new THREE.PointLight('#ffaa44', 3.8, 8, 1.8);
  diyaLight.position.set(0, 2.7, 0.35);
  turntable.add(diyaLight);

  // Hotspot Anchors for Pillar and Kalash
  const hotspotAnchors = {
    pillar: new THREE.Object3D(),
    kalash: new THREE.Object3D(),
  };
  hotspotAnchors.pillar.position.set(-1.05, 3.0, 0.35);
  hotspotAnchors.kalash.position.set(0, 5.25, 0.1);
  turntable.add(hotspotAnchors.pillar, hotspotAnchors.kalash);

  // Shadow catcher + soft contact shadow
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ color: '#5a4630', opacity: 0.13 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  stage.add(floor);

  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(8.6, 8.6),
    new THREE.MeshBasicMaterial({
      map: radialTexture([
        [0, 'rgba(70,52,30,0.55)'],
        [0.55, 'rgba(70,52,30,0.22)'],
        [1, 'rgba(70,52,30,0)'],
      ]),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    })
  );
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.002;
  stage.add(contact);

  // Golden prabhavali halo framing the temple
  const halo = new THREE.Group();
  halo.position.set(0, 3.9, -1.8);
  const haloA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.014, 12, 220), gold);
  const haloB = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.006, 8, 220), gold);
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 24), gold);
  halo.add(haloA, haloB, bead);
  stage.add(halo);

  const dust = buildDust();
  stage.add(dust);

  /* --- Layout --- */
  let W = 1;
  let H = 1;
  let isMobile = false;
  function layout() {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    const isSmall = W < 821;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.4 : 1.5));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    isMobile = W < 821 || W / H < 0.9;

    if (isMobile) {
      const isShort = H < 740;
      camBase.set(0, isShort ? 3.4 : 3.6, isShort ? 18.5 : 18.0);
      lookBase.set(0, isShort ? 2.2 : 2.4, 0);
      // Temple clearly elevated to upper 40% on mobile so text has full breathing space
      stage.position.y = isShort ? 0.95 : 1.05;
      stage.scale.setScalar(isShort ? 0.52 : 0.58);
      stage.position.x = 0;
    } else {
      const isLaptop = W < 1520 || H < 860;
      camBase.set(0, isLaptop ? 3.3 : 3.4, isLaptop ? 15.5 : 15.0);
      lookBase.set(0, isLaptop ? 2.5 : 2.6, 0);
      stage.position.y = isLaptop ? -0.22 : -0.18;
      stage.scale.setScalar(isLaptop ? 0.92 : 1.0);
      const vh = 2 * camBase.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const vw = vh * camera.aspect;
      // Positioned strictly in right half of viewport (50% right)
      stage.position.x = Math.min(Math.max(vw * 0.24, isLaptop ? 2.6 : 3.0), 3.8);
    }

    sun.position.set(stage.position.x + 5, 11, 7);
    sun.target.position.set(stage.position.x, 2.5, 0);
    rim.position.set(stage.position.x - 5, 6, -8);
    rim.target.position.set(stage.position.x, 3, 0);

    camera.updateProjectionMatrix();
  }
  layout();
  window.addEventListener('resize', layout);

  /* --- Interaction --- */
  const pointer = { x: 0, y: 0, nx: 0, ny: 0, sx: 0, sy: 0, inside: false, dirty: false };
  const drag = { active: false, lastX: 0, lastT: 0, v: 0, moved: 0 };
  let rotVel = 0;
  let autoSpeed = 0.085;
  let introDone = false;
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  pickables.push(podium);
  let hovered = null;
  let hoverKey = '';

  canvas.addEventListener('pointerdown', (e) => {
    drag.active = true;
    drag.lastX = e.clientX;
    drag.lastT = performance.now();
    drag.moved = 0;
    drag.v = 0;
    canvas.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ny = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.inside = true;
    pointer.dirty = true;
    if (drag.active) {
      const now = performance.now();
      const dx = e.clientX - drag.lastX;
      const dt = Math.max((now - drag.lastT) / 1000, 0.008);
      turntable.rotation.y += dx * 0.0092;
      drag.v = THREE.MathUtils.clamp((dx * 0.0092) / dt, -8, 8);
      drag.moved += Math.abs(dx);
      drag.lastX = e.clientX;
      drag.lastT = now;
    }
  });
  const endDrag = () => {
    if (!drag.active) return;
    drag.active = false;
    rotVel = drag.v;
    canvas.classList.remove('is-dragging');
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => {
    pointer.inside = false;
  });

  let clickHandler = null;
  canvas.addEventListener('click', () => {
    if (drag.moved > 6) return;
    if (hovered && hovered.userData.key) clickHandler?.(hovered.userData.key);
  });

  function pick() {
    if (!pointer.inside || !introDone) {
      if (hoverKey !== '') {
        hoverKey = '';
        hovered = null;
        onHover?.(null);
      }
      return;
    }
    const rect = canvas.getBoundingClientRect();
    ndc.set(((pointer.x - rect.left) / rect.width) * 2 - 1, -((pointer.y - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    let next = null;
    let key = '';
    if (hit) {
      if (hit.object.userData.key) {
        next = hit.object;
        key = `slab:${hit.object.userData.key}`;
      } else {
        key = 'temple';
      }
    }
    hovered = next;
    if (key !== hoverKey) {
      hoverKey = key;
      if (!key) onHover?.(null);
      else if (key === 'temple') onHover?.({ type: 'temple' });
      else onHover?.({ type: 'slab', key: next.userData.key });
    }
  }

  /* --- Stone transformation --- */
  let currentStone = 'makrana';
  let transitioning = false;
  function setStone(key) {
    if (transitioning || key === currentStone || !textures[key]) return false;
    transitioning = true;
    currentStone = key;
    const u = templeMat.userData.uniforms;
    u.uMapB.value = textures[key];
    u.uMix.value = 0;

    // Coordinate the turntable podium marble seamlessly with selected stone
    const uPodium = podiumMat.userData.uniforms;
    if (uPodium) {
      uPodium.uMapB.value = textures[key];
      uPodium.uMix.value = 0;
      gsap.to(uPodium.uMix, {
        value: 1,
        duration: 2.2,
        ease: 'power2.inOut',
        onComplete: () => {
          uPodium.uMapA.value = textures[key];
          uPodium.uMix.value = 0;
        },
      });
    }

    const isVietnam = key === 'vietnam';
    const isRajnagar = key === 'rajnagar';

    gsap.to(u.uScale, {
      value: isVietnam ? 0.20 : isRajnagar ? 0.17 : 0.18,
      duration: 1.5,
      ease: 'power2.out'
    });

    // Subtly tune marble physical response per mineral bedrock
    if (isVietnam) {
      gsap.to(templeMat.color, { r: 1.0, g: 1.0, b: 1.0, duration: 1.2 });
      gsap.to(templeMat, { roughness: 0.12, clearcoatRoughness: 0.03, duration: 1.2 });
    } else if (isRajnagar) {
      gsap.to(templeMat.color, { r: 0.97, g: 0.98, b: 0.99, duration: 1.2 });
      gsap.to(templeMat, { roughness: 0.22, clearcoatRoughness: 0.08, duration: 1.2 });
    } else {
      // Makrana Pure White
      gsap.to(templeMat.color, { r: 1.0, g: 0.995, b: 0.985, duration: 1.2 });
      gsap.to(templeMat, { roughness: 0.16, clearcoatRoughness: 0.05, duration: 1.2 });
    }

    // Gently orient the mandir to face its front presentation angle so sanctum & ॐ stay in full view
    const frontAngle = 0.38;
    const turns = Math.round((turntable.rotation.y - frontAngle) / (Math.PI * 2));
    const targetY = turns * (Math.PI * 2) + frontAngle;
    rotVel = 0;
    gsap.to(turntable.rotation, {
      y: targetY,
      duration: 1.4,
      ease: 'power2.out',
    });

    // Swirl golden dust particles during transformation
    if (dust?.material?.uniforms?.uOpacity) {
      gsap.to(dust.material.uniforms.uOpacity, {
        value: 1.6,
        duration: 0.9,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }

    // Majestic vertical energy wave across the full height of the mandir
    gsap.to(u.uMix, {
      value: 1,
      duration: 2.2,
      ease: 'power2.inOut',
      onComplete: () => {
        u.uMapA.value = textures[key];
        u.uMix.value = 0;
        transitioning = false;
      },
    });

    if (diyaLight) {
      gsap.fromTo(
        diyaLight,
        { intensity: 7.5 },
        { intensity: isNero ? 5.4 : 3.8, duration: 2.2, ease: 'power2.out' }
      );
    }
    if (sun) {
      gsap.to(sun, { intensity: isNero ? 3.0 : 2.6, duration: 2.2, ease: 'power2.out' });
    }
    if (rim) {
      gsap.to(rim, { intensity: isNero ? 2.0 : 1.4, duration: 2.2, ease: 'power2.out' });
    }
    return true;
  }

  /* --- Intro --- */
  function prepareIntro() {
    mandirGroup.visible = true;
    podiumLayer.visible = true;
    halo.scale.setScalar(0.001);
    contact.material.opacity = 0;
  }

  function intro() {
    introDone = true;
    mandirGroup.visible = true;
    podiumLayer.visible = true;
    mandirGroup.position.set(0, 0, 0);
    podiumLayer.scale.set(1, 1, 1);
    contact.material.opacity = 1;
    halo.scale.set(1, 1, 1);
    turntable.rotation.y = 0.05;
    dust.material.uniforms.uOpacity.value = 1;

    const tl = gsap.timeline({
      onComplete: () => {
        introDone = true;
      },
    });
    return tl;
  }

  /* --- Loop --- */
  let lastTime = performance.now();
  let elapsedTime = 0;
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  const nichePts = {
    l: new THREE.Vector3(-3.7, 0, -2.6),
    r: new THREE.Vector3(3.7, 0, -2.6),
    t: new THREE.Vector3(0, 8.1, -2.6),
    cap: new THREE.Vector3(0, 0.40, 2.85),
  };

  function project(v) {
    tmp.copy(v).project(camera);
    return { x: (tmp.x * 0.5 + 0.5) * W, y: (-tmp.y * 0.5 + 0.5) * H, z: tmp.z };
  }

  function frameState() {
    const s = {};
    // Niche (stage-space, unaffected by turntable rotation)
    const l = project(stage.localToWorld(tmp2.copy(nichePts.l)));
    const r = project(stage.localToWorld(tmp2.copy(nichePts.r)));
    const t = project(stage.localToWorld(tmp2.copy(nichePts.t)));
    const cap = project(stage.localToWorld(tmp2.copy(nichePts.cap)));
    s.niche = { left: l.x, top: t.y, width: r.x - l.x, height: l.y - t.y };
    s.caption = cap;

    // Hotspots
    const center = tmp2.setFromMatrixPosition(turntable.matrixWorld);
    camDir.copy(camera.position).sub(center).setY(0).normalize();
    s.hotspots = Object.entries(hotspotAnchors).map(([id, a]) => {
      const wp = new THREE.Vector3().setFromMatrixPosition(a.matrixWorld);
      const radial = wp.clone().sub(center).setY(0);
      const facing = radial.lengthSq() < 0.05 ? 1 : radial.normalize().dot(camDir);
      const p = project(wp);
      return { id, x: p.x, y: p.y, visible: facing > 0.15 };
    });
    return s;
  }

  let isVisible = true;
  let animating = true;
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animating) {
          animating = true;
          lastTime = performance.now();
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);
  }

  let isPaused = false;
  let isDestroyed = false;
  let rafId = null;

  function tick() {
    if (isDestroyed) {
      animating = false;
      return;
    }
    if (isPaused) {
      rafId = requestAnimationFrame(tick);
      return;
    }
    if (!isVisible) {
      animating = false;
      return;
    }

    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;
    elapsedTime += dt;
    const t = elapsedTime;

    // Turntable
    if (introDone && !drag.active) {
      rotVel += (autoSpeed - rotVel) * (1 - Math.exp(-dt * 2.2));
      turntable.rotation.y += rotVel * dt;
    }

    // Update turntable inverse matrix for stone mapping
    if (templeMat.userData.uniforms?.uTurntableInverse) {
      turntable.updateWorldMatrix(true, false);
      templeMat.userData.uniforms.uTurntableInverse.value.copy(turntable.matrixWorld).invert();
    }
    if (podiumMat.userData.uniforms?.uTurntableInverse) {
      podiumMat.userData.uniforms.uTurntableInverse.value.copy(turntable.matrixWorld).invert();
    }

    // Camera parallax (silky, responsive follow without lag)
    pointer.sx += (pointer.nx - pointer.sx) * (1 - Math.exp(-dt * 5.2));
    pointer.sy += (pointer.ny - pointer.sy) * (1 - Math.exp(-dt * 5.2));
    camera.position.set(
      camBase.x + camIntro.x + pointer.sx * 0.7,
      camBase.y + camIntro.y - pointer.sy * 0.45,
      camBase.z + camIntro.z
    );
    lookAt.set(lookBase.x + stage.position.x * 0.92, lookBase.y, lookBase.z);
    camera.lookAt(lookAt);

    // Halo
    haloB.rotation.y = Math.sin(t * 0.4) * 0.5;
    haloB.rotation.x = Math.cos(t * 0.3) * 0.3;
    bead.position.set(Math.cos(t * 0.5) * 3.25, Math.sin(t * 0.5) * 3.25, 0);

    // Diya flicker
    const flick = Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.06 + Math.sin(t * 23.7) * 0.04;
    if (diyaLight && !gsap.isTweening(diyaLight)) diyaLight.intensity = 3.5 + flick * 5;

    dust.material.uniforms.uTime.value = t;

    // Raycast only when pointer moves and not dragging
    if (pointer.dirty && !drag.active) {
      pick();
      pointer.dirty = false;
    }

    renderer.render(scene, camera);
    onFrame?.(frameState());
    rafId = requestAnimationFrame(tick);
  }

  async function warmup() {
    await gltfPromise;
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
    prepareIntro();
  }

  // Auto-run intro when 3D asset is ready as safety net so mandir is never hidden
  gltfPromise.then(() => {
    if (!introDone) {
      intro();
    }
  }).catch(() => {});

  requestAnimationFrame(tick);

  function setLightingMode(mode) {
    if (mode === 'daylight') {
      gsap.to(hemi.color, { r: 1.0, g: 0.97, b: 0.92, duration: 0.6 });
      gsap.to(hemi, { intensity: 0.9, duration: 0.6 });
      gsap.to(sun.color, { r: 1.0, g: 0.95, b: 0.86, duration: 0.6 });
      gsap.to(sun, { intensity: 2.6, duration: 0.6 });
      gsap.to(sanctumGlow, { intensity: 3.4, duration: 0.6 });
      if (glowRingMat) gsap.to(glowRingMat, { opacity: 0.88, duration: 0.6 });
    } else if (mode === 'aarti') {
      gsap.to(hemi.color, { r: 0.85, g: 0.55, b: 0.28, duration: 0.6 });
      gsap.to(hemi, { intensity: 0.55, duration: 0.6 });
      gsap.to(sun.color, { r: 1.0, g: 0.62, b: 0.22, duration: 0.6 });
      gsap.to(sun, { intensity: 1.4, duration: 0.6 });
      gsap.to(sanctumGlow, { intensity: 8.5, duration: 0.6 });
      gsap.to(sanctumGlow.color, { r: 1.0, g: 0.55, b: 0.1, duration: 0.6 });
      if (glowRingMat) gsap.to(glowRingMat, { opacity: 1.0, duration: 0.6 });
    } else if (mode === 'consecration') {
      gsap.to(hemi.color, { r: 0.95, g: 0.85, b: 0.5, duration: 0.6 });
      gsap.to(hemi, { intensity: 1.2, duration: 0.6 });
      gsap.to(sun.color, { r: 1.0, g: 0.9, b: 0.6, duration: 0.6 });
      gsap.to(sun, { intensity: 3.2, duration: 0.6 });
      gsap.to(sanctumGlow, { intensity: 6.0, duration: 0.6 });
      gsap.to(sanctumGlow.color, { r: 1.0, g: 0.88, b: 0.35, duration: 0.6 });
      if (glowRingMat) gsap.to(glowRingMat, { opacity: 0.95, duration: 0.6 });
    }
  }

  function setWireframe(enable) {
    mandirGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = enable));
        } else {
          child.material.wireframe = enable;
        }
      }
    });
  }

  function setAutoRotate(enable) {
    autoSpeed = enable ? 0.15 : 0.0;
  }

  return {
    ready,
    warmup,
    intro,
    setStone,
    setLightingMode,
    setWireframe,
    setAutoRotate,
    pause: () => {
      isPaused = true;
    },
    resume: () => {
      isPaused = false;
      lastTime = performance.now();
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    },
    destroy: () => {
      isDestroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    },
    isTransitioning: () => transitioning,
    onSlabClick: (fn) => (clickHandler = fn),
    get isMobile() {
      return isMobile;
    },
    __sceneState: typeof window !== 'undefined' ? (window.__sceneState = { mandirGroup, turntable, camera, stage, pickables }) : null
  };
}

export { createExperience as initScene };
export default createExperience;

