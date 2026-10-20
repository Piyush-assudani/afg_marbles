import * as THREE from 'three';
import gsap from 'gsap';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const BASE = import.meta.env.BASE_URL;

export const STONES = [
  { key: 'makrana', name: 'Makrana White', origin: 'Makrana, Rajasthan', note: 'The stone of the Taj Mahal', word: 'MAKRANA' },
  { key: 'calacatta', name: 'Calacatta Oro', origin: 'Tuscany, Italy', note: 'Veined in liquid gold', word: 'CALACATTA' },
  { key: 'botticino', name: 'Botticino Classico', origin: 'Brescia, Italy', note: 'Warm, timeless, serene', word: 'BOTTICINO' },
  { key: 'rosa', name: 'Rosa Portogallo', origin: 'Alentejo, Portugal', note: 'The blush of first light', word: 'ROSA' },
  { key: 'nero', name: 'Nero Marquina', origin: 'Basque Country, Spain', note: 'Bold, regal, unforgettable', word: 'NERO' },
].map((s) => ({ ...s, url: `${BASE}textures/${s.key}.jpg` }));

/* ------------------------------------------------------------------
   Materials
------------------------------------------------------------------- */

/**
 * Polished marble with seamless triplanar mapping (object space) and an
 * animated, gold-edged "wipe" used to transform the temple between stones.
 */
function makeMarbleMaterial(map, { scale = 0.52, minY = 0.25, maxY = 5.55, roughness = 0.2 } = {}) {
  const uniforms = {
    uMapA: { value: map },
    uMapB: { value: map },
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
        diffuseColor.rgb *= mix(stoneA, stoneB, wMask);

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
    color: new THREE.Color('#e7c27c'),
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
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
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

  // Safety fallback: never keep user waiting more than 2.0s
  setTimeout(() => {
    readyResolve();
  }, 2000);

  const manager = new THREE.LoadingManager(
    () => readyResolve?.(),
    (_url, loaded, total) => {
      if (total > 0) onProgress?.(loaded / total);
    },
    (url) => console.warn('Loading warning on asset:', url)
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

  // Preload initial essential textures so page displays fast without blocking:
  ['makrana', 'calacatta'].forEach((key) => {
    const s = STONES.find((item) => item.key === key);
    if (s) {
      textures[key] = applyTexSettings(loader.load(s.url));
    }
  });

  // Load secondary stone textures in background
  STONES.forEach((s) => {
    if (!textures[s.key]) {
      textures[s.key] = applyTexSettings(bgLoader.load(s.url));
    }
  });

  const templeMat = makeMarbleMaterial(textures.makrana, { scale: 0.18, minY: 0.25, maxY: 5.55 });
  const podiumMat = makeMarbleMaterial(textures.calacatta, { scale: 0.17, roughness: 0.16 });
  const gold = makeGoldMaterial();

  const sanctumDiscMat = new THREE.MeshPhysicalMaterial({
    color: 0xfffcf5,
    map: textures.makrana,
    roughness: 0.14,
    metalness: 0.02,
    clearcoat: 0.9,
    clearcoatRoughness: 0.06,
  });

  const omGold = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffdf88'),
    emissive: new THREE.Color('#ffd166'),
    emissiveIntensity: 0.35,
    metalness: 0.95,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });

  const meenakariBlue = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0d2146'),
    metalness: 0.15,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });

  const pickables = [];
  const mandirGroup = new THREE.Group();

  const gltfLoader = new GLTFLoader(manager);
  // Attach DRACOLoader lazily without manager preloading to prevent worker hangs
  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${BASE}draco/`);
    gltfLoader.setDRACOLoader(dracoLoader);
  } catch (e) {
    console.warn('Draco setup:', e);
  }
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isDarkModel = urlParams?.get('model') === 'dark' || urlParams?.get('theme') === 'dark';
  const modelFile = isDarkModel ? 'mandir_heavy_dark.glb' : 'mandir_heavy_ivory.glb';

  const gltfPromise = new Promise((resolve, reject) => {
    gltfLoader.load(
      `${BASE}models/${modelFile}`,
      (gltf) => {
        const mandir = gltf.scene;
        mandir.scale.setScalar(2.25);
        mandir.position.set(0, 0.3, 0);

        mandir.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            pickables.push(child);

            const matName = child.material?.name || '';
            const meshName = child.name || '';

            // Sacred Sanctum centerpiece:
            if (meshName === 'om_symbol') {
              child.material = omGold;
            } else if (meshName === 'om_disc') {
              child.material = sanctumDiscMat;
            } else if (meshName === 'fan_feathers_inner') {
              child.material = meenakariBlue;
            } else if (
              matName.includes('Marble_White') ||
              matName.includes('Marble_Cream') ||
              matName.includes('Ivory_Gloss') ||
              (isDarkModel && matName.includes('Marble_Dark'))
            ) {
              child.material = templeMat;
            } else if (matName.includes('Gold')) {
              child.material = gold;
            }
          }
        });

        mandirGroup.add(mandir);
        mandirGroup.visible = true;
        resolve(gltf);
        readyResolve();
      },
      undefined,
      (err) => {
        console.error(`Failed to load ${modelFile}:`, err);
        readyResolve();
        reject(err);
      }
    );
  });


  /* --- Lights --- */
  const hemi = new THREE.HemisphereLight('#fff7ec', '#d9c8ad', 0.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff1dc', 2.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isSmallScreen ? 1024 : 2048, isSmallScreen ? 1024 : 2048);
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

  // Golden halo behind the temple
  const halo = new THREE.Group();
  halo.position.set(0, 4.1, -2.6);
  const haloA = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.016, 12, 220), gold);
  const haloB = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.006, 8, 220), gold);
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 24), gold);
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
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, isSmall ? 1.75 : 2), 2));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    isMobile = W < 821 || W / H < 0.9;

    if (isMobile) {
      const isShort = H < 740;
      camBase.set(0, isShort ? 3.3 : 3.6, isShort ? 24 : 22.5);
      lookBase.set(0, isShort ? 1.0 : 1.2, 0);
      stage.position.y = isShort ? -2.7 : -3.0;
      stage.scale.setScalar(isShort ? 0.65 : 0.70);
      stage.position.x = 0;
    } else {
      const isLaptop = W < 1520 || H < 860;
      camBase.set(0, isLaptop ? 3.6 : 3.65, isLaptop ? 15.6 : 15.2);
      lookBase.set(0, 3.2, 0);
      stage.position.y = isLaptop ? -0.04 : 0.0;
      stage.scale.setScalar(isLaptop ? 0.85 : 0.95);
      const vh = 2 * camBase.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const vw = vh * camera.aspect;
      // Fixed right-column placement with clean margin so temple never collides with hero headline text
      stage.position.x = Math.min(Math.max(vw * 0.26, isLaptop ? 4.1 : 4.3), 5.5);
    }

    sun.position.set(stage.position.x + 6, 11, 7);
    sun.target.position.set(stage.position.x, 2.5, 0);
    rim.position.set(stage.position.x - 6, 6, -8);
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

    const isNero = key === 'nero';
    gsap.to(u.uScale, { value: isNero ? 0.14 : 0.18, duration: 1.5, ease: 'power2.out' });

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

    const tl = gsap.timeline({
      onComplete: () => {
        introDone = true;
        mandirGroup.visible = true;
        podiumLayer.visible = true;
      },
    });
    turntable.rotation.y = -Math.PI * 0.95;
    camIntro.z = 7;
    camIntro.y = 2.4;
    camIntro.x = -2;

    tl.to(camIntro, { z: 0, y: 0, x: 0, duration: 3.4, ease: 'expo.out' }, 0);
    tl.to(turntable.rotation, { y: 0.45, duration: 3.6, ease: 'expo.out' }, 0);
    tl.to(contact.material, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0.1);

    tl.fromTo(
      podiumLayer.scale,
      { x: 0.4, y: 0.4, z: 0.4 },
      { x: 1, y: 1, z: 1, duration: 1.6, ease: 'expo.out' },
      0.1
    );

    tl.fromTo(
      mandirGroup.position,
      { y: 3.2 },
      { y: 0, duration: 1.8, ease: 'expo.out' },
      0.3
    );

    tl.to(halo.scale, { x: 1, y: 1, z: 1, duration: 2.2, ease: 'expo.out' }, 0.9);
    tl.fromTo(halo.rotation, { z: -1.2 }, { z: 0, duration: 2.6, ease: 'expo.out' }, 0.9);
    tl.to(dust.material.uniforms.uOpacity, { value: 1, duration: 2.5 }, 1);

    // Ceremonial stone reveal on load: sweep a golden line up the temple
    tl.call(() => {
      const u = templeMat.userData.uniforms;
      u.uMapB.value = textures.makrana;
      gsap.fromTo(u.uMix, { value: 0 }, { value: 1, duration: 2.6, ease: 'sine.inOut', onComplete: () => (u.uMix.value = 0) });
    }, null, 1.5);
    return tl;
  }

  /* --- Loop --- */
  const clock = new THREE.Clock();
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
          clock.getDelta(); // flush delta so no time jump
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);
  }

  function tick() {
    if (!isVisible) {
      animating = false;
      return;
    }

    const dt = Math.min(clock.getDelta(), 0.04);
    const t = clock.elapsedTime;

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
    requestAnimationFrame(tick);
  }

  async function warmup() {
    await gltfPromise;
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
    prepareIntro();
  }

  requestAnimationFrame(tick);

  return {
    ready,
    warmup,
    intro,
    setStone,
    isTransitioning: () => transitioning,
    onSlabClick: (fn) => (clickHandler = fn),
    get isMobile() {
      return isMobile;
    },
  };
}
