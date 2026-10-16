import * as THREE from 'three';
import gsap from 'gsap';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

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
function makeMarbleMaterial(map, { scale = 0.2, minY = 0, maxY = 7, roughness = 0.2 } = {}) {
  const uniforms = {
    uMapA: { value: map },
    uMapB: { value: map },
    uMix: { value: 0 },
    uScale: { value: scale },
    uMinY: { value: minY },
    uMaxY: { value: maxY },
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
        varying vec3 vTriPos;
        varying vec3 vTriNormal;`
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `#include <begin_vertex>
        vTriPos = position;
        vTriNormal = normal;`
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
        varying vec3 vTriPos;
        varying vec3 vTriNormal;

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
        vec3 tN = normalize(vTriNormal);
        vec3 stoneA = triplanar(uMapA, vTriPos, tN);
        vec3 stoneB = triplanar(uMapB, vTriPos, tN);
        float hN = (vTriPos.y - uMinY) / (uMaxY - uMinY);
        float wNoise = (stoneA.r + stoneB.g) * 0.5 - 0.5;
        float wEdge = mix(-0.14, 1.14, uMix);
        float wH = hN + wNoise * 0.22;
        float wMask = 1.0 - smoothstep(wEdge - 0.01, wEdge + 0.01, wH);
        diffuseColor.rgb *= mix(stoneA, stoneB, wMask);
        float wActive = step(0.0005, uMix) * step(uMix, 0.9995);
        float wLine = (1.0 - smoothstep(0.0, 0.02, abs(wH - wEdge))) * wActive;`
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        totalEmissiveRadiance += vec3(1.0, 0.7, 0.32) * wLine * 2.4;`
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

function rbox(w, h, d, r, x = 0, y = 0, z = 0) {
  const g = new RoundedBoxGeometry(w, h, d, 3, r);
  g.translate(x, y, z);
  return g;
}

function lathe(points, segments = 48) {
  return new THREE.LatheGeometry(points, segments);
}

function smoothProfile(ctrl, divisions = 64) {
  return new THREE.SplineCurve(ctrl.map(([x, y]) => v2(x, y))).getPoints(divisions);
}

/** Carved temple pillar profile (radius, height) */
function pillarGeometry(H) {
  const p = [
    [0.0001, 0], [0.27, 0], [0.27, 0.1], [0.24, 0.12], [0.24, 0.17], [0.27, 0.2],
    [0.27, 0.24], [0.22, 0.28], [0.18, 0.33], [0.16, 0.4], [0.15, 0.48],
    [0.143, H * 0.5], [0.138, H * 0.74], [0.15, H * 0.8], [0.19, H * 0.85],
    [0.225, H * 0.885], [0.205, H * 0.905], [0.245, H * 0.93], [0.275, H * 0.955],
    [0.275, H], [0.0001, H],
  ].map(([x, y]) => v2(x, y));
  return lathe(p, 48);
}

/** Fluted onion dome (shikhara) */
function domeGeometry(scale = 1, ribs = 16, ribDepth = 0.04) {
  const curve = smoothProfile(
    [
      [0.9, 0], [1.0, 0.12], [1.06, 0.36], [1.0, 0.66], [0.82, 0.95],
      [0.52, 1.24], [0.26, 1.46], [0.11, 1.6], [0.06, 1.68],
    ],
    80
  );
  const pts = [v2(0.0001, 0), ...curve, v2(0.0001, 1.72)].map((p) => p.multiplyScalar(scale));
  const geo = lathe(pts, 96);

  const pos = geo.attributes.position;
  const k = ribs / 2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i) / scale;
    const z = pos.getZ(i);
    const a = Math.atan2(z, x);
    const fade = THREE.MathUtils.smoothstep(y, 0.05, 0.3) * (1 - THREE.MathUtils.smoothstep(y, 1.35, 1.6));
    const f = 1 - ribDepth * fade * (1 - Math.abs(Math.cos(k * a)));
    pos.setX(i, x * f);
    pos.setZ(i, z * f);
  }
  geo.computeVertexNormals();
  return geo;
}

/** Gilded kalash finial */
function kalashGeometry(scale = 1) {
  const curve = smoothProfile(
    [
      [0.12, 0], [0.15, 0.04], [0.09, 0.09], [0.17, 0.17], [0.2, 0.26], [0.16, 0.35],
      [0.07, 0.41], [0.11, 0.46], [0.06, 0.5], [0.085, 0.56], [0.04, 0.68], [0.012, 0.78],
    ],
    80
  );
  const pts = [v2(0.0001, 0), ...curve, v2(0.0001, 0.8)].map((p) => p.multiplyScalar(scale));
  return lathe(pts, 40);
}

/** Small drum ring under domes */
function drumGeometry(r = 1, h = 0.32) {
  const p = [
    [0.0001, 0], [r * 1.06, 0], [r * 1.06, h * 0.2], [r, h * 0.26], [r, h * 0.78],
    [r * 1.04, h * 0.86], [r * 1.04, h], [0.0001, h],
  ].map(([x, y]) => v2(x, y));
  return lathe(p, 96);
}

/** Multifoil (Mughal/Rajput cusped) arch outline points */
function archPoints({ r, amp, lobes, spring, off = 0, N = 160 }) {
  const rr = (t) => r - amp * (1 - Math.abs(Math.sin(lobes * t)));
  const jx = r - amp;
  const pts = [v2(-(jx + off), 0), v2(-(jx + off), spring)];
  for (let i = 0; i <= N; i++) {
    const t = Math.PI - (i / N) * Math.PI;
    const R = rr(t) + off;
    pts.push(v2(Math.cos(t) * R, spring + Math.sin(t) * R));
  }
  pts.push(v2(jx + off, spring), v2(jx + off, 0));
  return pts;
}

/** Arch panel (marble) + gold inlay outline, both in local panel space */
function archPanel({ w, h, jamb, spring, lobes = 7, amp = 0.06, depth = 0.1 }) {
  const r = w / 2 - jamb;
  const inner = archPoints({ r, amp, lobes, spring });

  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(inner[0].x, 0);
  inner.forEach((p) => shape.lineTo(p.x, p.y));
  shape.lineTo(w / 2, 0);
  shape.lineTo(w / 2, h);
  shape.lineTo(-w / 2, h);
  shape.lineTo(-w / 2, 0);

  const bevel = 0.02;
  const marble = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 4,
  });
  marble.translate(0, 0, -depth / 2);

  const trimPts = archPoints({ r, amp, lobes, spring, off: 0.06, N: 220 }).map(
    (p) => new THREE.Vector3(p.x, p.y, depth / 2 + bevel + 0.004)
  );
  const curve = new THREE.CatmullRomCurve3(trimPts, false, 'catmullrom', 0.0);
  const trim = new THREE.TubeGeometry(curve, 400, 0.014, 6, false);

  return { marble, trim };
}

/** Procedural gold lotus mandala (canvas) */
function mandalaTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  g.translate(512, 512);
  const grad = g.createLinearGradient(-420, -420, 420, 420);
  grad.addColorStop(0, '#fbe6b0');
  grad.addColorStop(0.45, '#c8963e');
  grad.addColorStop(0.7, '#f3d590');
  grad.addColorStop(1, '#b07f33');
  g.strokeStyle = grad;
  g.fillStyle = grad;
  g.lineCap = 'round';

  g.lineWidth = 7;
  [480, 452].forEach((r) => {
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
  });
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    g.beginPath();
    g.arc(Math.cos(a) * 466, Math.sin(a) * 466, 5, 0, Math.PI * 2);
    g.fill();
  }
  for (let i = 0; i < 16; i++) {
    g.save();
    g.rotate((i * Math.PI) / 8);
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(0, -150);
    g.bezierCurveTo(78, -230, 64, -370, 0, -428);
    g.bezierCurveTo(-64, -370, -78, -230, 0, -150);
    g.stroke();
    g.beginPath();
    g.moveTo(0, -196);
    g.bezierCurveTo(30, -250, 26, -330, 0, -372);
    g.bezierCurveTo(-26, -330, -30, -250, 0, -196);
    g.fill();
    g.restore();
  }
  for (let i = 0; i < 8; i++) {
    g.save();
    g.rotate((i * Math.PI) / 4 + Math.PI / 8);
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(0, -70);
    g.bezierCurveTo(56, -110, 50, -180, 0, -220);
    g.bezierCurveTo(-50, -180, -56, -110, 0, -70);
    g.stroke();
    g.restore();
  }
  g.lineWidth = 6;
  [130, 66].forEach((r) => {
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
  });
  g.beginPath();
  g.arc(0, 0, 30, 0, Math.PI * 2);
  g.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
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
   Temple builder
------------------------------------------------------------------- */

function buildTemple(marble, gold) {
  const temple = new THREE.Group();
  const layers = [];
  const anchors = {};

  const newLayer = (name) => {
    const g = new THREE.Group();
    g.name = name;
    temple.add(g);
    layers.push(g);
    return g;
  };
  const add = (layer, geo, mat = marble) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    layer.add(m);
    return m;
  };

  const Y0 = 0.3; // top of podium
  const H = 2.3; // pillar height
  const PX = 1.55;
  const PZ = 1.05;

  /* --- Adhisthana (stepped base) --- */
  const L1 = newLayer('base');
  add(L1, rbox(4.4, 0.34, 3.4, 0.04, 0, Y0 + 0.17, 0));
  add(L1, rbox(4.06, 0.3, 3.06, 0.04, 0, Y0 + 0.49, 0));
  add(L1, rbox(4.09, 0.035, 3.09, 0.012, 0, Y0 + 0.66, 0), gold);
  add(L1, rbox(3.76, 0.26, 2.76, 0.04, 0, Y0 + 0.8, 0));
  const baseTop = Y0 + 0.93;

  /* --- Pillars --- */
  const L2 = newLayer('pillars');
  [[-PX, PZ], [PX, PZ], [-PX, -PZ], [PX, -PZ]].forEach(([x, z]) => {
    const p = pillarGeometry(H);
    p.translate(x, baseTop, z);
    add(L2, p);
    [[0.46, 0.158], [H * 0.79, 0.146]].forEach(([y, r]) => {
      const ring = new THREE.TorusGeometry(r, 0.02, 10, 48);
      ring.rotateX(Math.PI / 2);
      ring.translate(x, baseTop + y, z);
      add(L2, ring, gold);
    });
  });
  anchors.pillar = new THREE.Vector3(-PX - 0.18, baseTop + H * 0.62, PZ + 0.1);

  /* --- Arches, back wall & sanctum --- */
  const L3 = newLayer('arches');
  const front = archPanel({ w: PX * 2, h: H, jamb: 0.32, spring: 0.8, lobes: 7, amp: 0.06 });
  front.marble.translate(0, baseTop, PZ);
  front.trim.translate(0, baseTop, PZ);
  add(L3, front.marble);
  add(L3, front.trim, gold);

  [1, -1].forEach((side) => {
    const sp = archPanel({ w: PZ * 2, h: H, jamb: 0.3, spring: 1.25, lobes: 5, amp: 0.05 });
    const m = new THREE.Matrix4().makeRotationY((side * Math.PI) / 2);
    m.setPosition(side * PX, baseTop, 0);
    sp.marble.applyMatrix4(m);
    sp.trim.applyMatrix4(m);
    add(L3, sp.marble);
    add(L3, sp.trim, gold);
  });

  add(L3, rbox(PX * 2, H, 0.12, 0.02, 0, baseTop + H / 2, -PZ));

  // Gold mandala inlay on the sanctum wall
  const medallion = new THREE.Mesh(
    new THREE.PlaneGeometry(1.25, 1.25),
    new THREE.MeshStandardMaterial({
      map: mandalaTexture(),
      transparent: true,
      alphaTest: 0.05,
      metalness: 0.9,
      roughness: 0.28,
    })
  );
  medallion.position.set(0, baseTop + 1.28, -PZ + 0.07);
  L3.add(medallion);

  // Diya + flame
  const diyaGeo = lathe(
    [v2(0.0001, 0), v2(0.06, 0), v2(0.12, 0.03), v2(0.15, 0.07), v2(0.14, 0.08), v2(0.06, 0.05), v2(0.0001, 0.05)],
    32
  );
  diyaGeo.translate(0, baseTop, 0.15);
  add(L3, diyaGeo, gold);
  const stand = rbox(0.9, 0.28, 0.5, 0.03, 0, baseTop + 0.14, -PZ + 0.32);
  add(L3, stand);
  add(L3, rbox(0.92, 0.025, 0.52, 0.01, 0, baseTop + 0.285, -PZ + 0.32), gold);

  const flameMat = new THREE.SpriteMaterial({
    map: radialTexture([
      [0, 'rgba(255,250,225,1)'],
      [0.25, 'rgba(255,205,110,0.95)'],
      [0.6, 'rgba(255,140,40,0.35)'],
      [1, 'rgba(255,120,20,0)'],
    ]),
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const flame = new THREE.Sprite(flameMat);
  flame.scale.set(0.09, 0.18, 1);
  flame.position.set(0, baseTop + 0.16, 0.15);
  L3.add(flame);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture([
        [0, 'rgba(255,190,100,0.55)'],
        [0.4, 'rgba(255,170,80,0.18)'],
        [1, 'rgba(255,170,80,0)'],
      ]),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    })
  );
  glow.scale.set(1.1, 1.1, 1);
  glow.position.copy(flame.position);
  L3.add(glow);

  const diyaLight = new THREE.PointLight('#ffb15e', 3, 3.2, 1.6);
  diyaLight.position.set(0, baseTop + 0.35, 0.2);
  L3.add(diyaLight);

  /* --- Entablature & chajja --- */
  const L4 = newLayer('entablature');
  const eTop = baseTop + H;
  add(L4, rbox(3.78, 0.14, 2.78, 0.03, 0, eTop + 0.07, 0));
  add(L4, rbox(3.8, 0.035, 2.8, 0.012, 0, eTop + 0.157, 0), gold);
  add(L4, rbox(4.24, 0.1, 3.24, 0.035, 0, eTop + 0.225, 0));
  add(L4, rbox(3.5, 0.22, 2.5, 0.03, 0, eTop + 0.385, 0));
  const pTop = eTop + 0.495;

  // Gilded lotus buds along the parapet
  const budGeo = kalashGeometry(0.32);
  const budPositions = [];
  for (let x = -1.5; x <= 1.501; x += 0.5) {
    budPositions.push([x, 1.08], [x, -1.08]);
  }
  for (let z = -0.54; z <= 0.541; z += 0.54) {
    budPositions.push([1.58, z], [-1.58, z]);
  }
  const buds = new THREE.InstancedMesh(budGeo, gold, budPositions.length);
  const dummy = new THREE.Object3D();
  budPositions.forEach(([x, z], i) => {
    dummy.position.set(x, pTop, z);
    dummy.updateMatrix();
    buds.setMatrixAt(i, dummy.matrix);
  });
  buds.castShadow = true;
  L4.add(buds);

  /* --- Dome & chhatris --- */
  const L5 = newLayer('dome');
  const drum = drumGeometry(0.94, 0.32);
  drum.translate(0, pTop, 0);
  add(L5, drum);
  const dRing = new THREE.TorusGeometry(0.985, 0.024, 12, 96);
  dRing.rotateX(Math.PI / 2);
  dRing.translate(0, pTop + 0.3, 0);
  add(L5, dRing, gold);

  const dTop = pTop + 0.32;
  const dome = domeGeometry(1, 16, 0.045);
  dome.translate(0, dTop, 0);
  add(L5, dome);

  [[-1.38, 0.88], [1.38, 0.88], [-1.38, -0.88], [1.38, -0.88]].forEach(([x, z]) => {
    const d = drumGeometry(0.28, 0.12);
    d.translate(x, pTop, z);
    add(L5, d);
    const cd = domeGeometry(0.3, 12, 0.05);
    cd.translate(x, pTop + 0.12, z);
    add(L5, cd);
    const ck = kalashGeometry(0.42);
    ck.translate(x, pTop + 0.12 + 0.3 * 1.7, z);
    add(L5, ck, gold);
  });

  /* --- Kalash --- */
  const L6 = newLayer('kalash');
  const kY = dTop + 1.72 - 0.05;
  const kalash = kalashGeometry(1);
  kalash.translate(0, kY, 0);
  add(L6, kalash, gold);
  anchors.kalash = new THREE.Vector3(0.08, kY + 0.3, 0);

  return {
    temple,
    layers,
    anchors,
    flame,
    glow,
    diyaLight,
    height: kY + 0.8,
  };
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
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
  const camBase = new THREE.Vector3(0, 3.6, 15);
  const lookBase = new THREE.Vector3(0, 3.3, 0);
  const camIntro = { z: 0, y: 0, x: 0 };
  const lookAt = new THREE.Vector3();

  /* --- Textures --- */
  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const textures = {};
  STONES.forEach((s) => {
    const t = loader.load(s.url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
    t.anisotropy = maxAniso;
    textures[s.key] = t;
  });
  const ready = new Promise((resolve) => {
    manager.onProgress = (_url, loaded, total) => onProgress?.(loaded / total);
    manager.onLoad = resolve;
  });

  /* --- Lights --- */
  const hemi = new THREE.HemisphereLight('#fff7ec', '#d9c8ad', 0.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff1dc', 2.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.bottom = -4;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 6;
  scene.add(sun, sun.target);

  const rim = new THREE.DirectionalLight('#ffe2b8', 1.4);
  scene.add(rim, rim.target);

  /* --- Stage --- */
  const stage = new THREE.Group();
  scene.add(stage);
  const turntable = new THREE.Group();
  stage.add(turntable);

  const templeMat = makeMarbleMaterial(textures.makrana, { scale: 0.19, minY: 0.3, maxY: 7 });
  const podiumMat = makeMarbleMaterial(textures.calacatta, { scale: 0.17, roughness: 0.16 });
  const gold = makeGoldMaterial();

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

  const T = buildTemple(templeMat, gold);
  turntable.add(T.temple);

  const hotspotAnchors = {
    pillar: new THREE.Object3D(),
    kalash: new THREE.Object3D(),
  };
  hotspotAnchors.pillar.position.copy(T.anchors.pillar);
  hotspotAnchors.kalash.position.copy(T.anchors.kalash);
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

  // Floating marble samples
  const slabDefs = [
    { key: 'rosa', pos: [-3.5, 5.7, -0.8], rot: [0.35, 0.7, -0.25] },
    { key: 'calacatta', pos: [3.25, 5.6, 0.2], rot: [-0.25, -0.6, 0.3] },
    { key: 'nero', pos: [-3.8, 1.9, 1.3], rot: [0.55, 0.45, 0.18] },
    { key: 'botticino', pos: [3.35, 1.8, 1.4], rot: [-0.45, -0.65, -0.12] },
  ];
  const slabGeo = new RoundedBoxGeometry(1.05, 1.05, 0.08, 4, 0.03);
  const slabs = slabDefs.map((d, i) => {
    const mat = new THREE.MeshPhysicalMaterial({
      map: textures[d.key],
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    });
    const mesh = new THREE.Mesh(slabGeo, mat);
    mesh.castShadow = true;
    mesh.position.set(...d.pos);
    mesh.rotation.set(...d.rot);
    mesh.userData = { key: d.key, base: new THREE.Vector3(...d.pos), rot: new THREE.Euler(...d.rot), i, hover: 0, spin: 0 };
    stage.add(mesh);
    return mesh;
  });

  const dust = buildDust();
  stage.add(dust);

  /* --- Layout --- */
  let W = 1;
  let H = 1;
  let isMobile = false;
  function layout() {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    isMobile = W < 821 || W / H < 0.9;

    if (isMobile) {
      camBase.set(0, 4.2, 23);
      lookBase.set(0, 2.2, 0);
    } else {
      camBase.set(0, 3.7, 15.5);
      lookBase.set(0, 3.25, 0);
    }
    const vh = 2 * camBase.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const vw = vh * camera.aspect;
    stage.position.x = isMobile ? 0 : Math.min(vw * 0.2, 4.6);
    stage.position.y = isMobile ? -3.1 : 0;
    stage.scale.setScalar(isMobile ? 0.9 : 1);

    sun.position.set(stage.position.x + 6, 11, 7);
    sun.target.position.set(stage.position.x, 2.5, 0);
    rim.position.set(stage.position.x - 6, 6, -8);
    rim.target.position.set(stage.position.x, 3, 0);

    camera.updateProjectionMatrix();
  }
  layout();
  window.addEventListener('resize', layout);

  /* --- Interaction --- */
  const pointer = { x: 0, y: 0, nx: 0, ny: 0, sx: 0, sy: 0, inside: false };
  const drag = { active: false, lastX: 0, lastT: 0, v: 0, moved: 0 };
  let rotVel = 0;
  let autoSpeed = 0.12;
  let introDone = false;
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickables = [...slabs];
  T.temple.traverse((o) => o.isMesh && pickables.push(o));
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
    if (drag.active) {
      const now = performance.now();
      const dx = e.clientX - drag.lastX;
      const dt = Math.max((now - drag.lastT) / 1000, 0.008);
      turntable.rotation.y += dx * 0.0065;
      drag.v = THREE.MathUtils.clamp((dx * 0.0065) / dt, -7, 7);
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
    rotVel += 2.2;
    gsap.to(u.uMix, {
      value: 1,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        u.uMapA.value = textures[key];
        u.uMix.value = 0;
        transitioning = false;
      },
    });
    gsap.fromTo(T.diyaLight, { intensity: 7 }, { intensity: 3, duration: 2, ease: 'power2.out' });
    const slab = slabs.find((s) => s.userData.key === key);
    if (slab) gsap.to(slab.userData, { spin: slab.userData.spin + Math.PI * 2, duration: 1.6, ease: 'expo.out' });
    return true;
  }

  /* --- Intro --- */
  function prepareIntro() {
    T.layers.forEach((l) => (l.visible = false));
    podiumLayer.visible = false;
    halo.scale.setScalar(0.001);
    slabs.forEach((s) => s.scale.setScalar(0.001));
    contact.material.opacity = 0;
  }

  function intro() {
    const tl = gsap.timeline({
      onComplete: () => {
        introDone = true;
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
      { x: 1, y: 1, z: 1, duration: 1.6, ease: 'expo.out', onStart: () => (podiumLayer.visible = true) },
      0.1
    );
    T.layers.forEach((layer, i) => {
      tl.fromTo(
        layer.position,
        { y: 3.2 + i * 0.4 },
        { y: 0, duration: 1.7, ease: 'expo.out', onStart: () => (layer.visible = true) },
        0.3 + i * 0.13
      );
    });
    tl.to(halo.scale, { x: 1, y: 1, z: 1, duration: 2.2, ease: 'expo.out' }, 0.9);
    tl.fromTo(halo.rotation, { z: -1.2 }, { z: 0, duration: 2.6, ease: 'expo.out' }, 0.9);
    slabs.forEach((s, i) => {
      tl.to(s.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'back.out(1.6)' }, 1.2 + i * 0.12);
    });
    tl.to(dust.material.uniforms.uOpacity, { value: 1, duration: 2.5 }, 1);
    // Ceremonial stone reveal on load: sweep a golden line up the temple
    tl.call(() => {
      const u = templeMat.userData.uniforms;
      u.uMapB.value = textures.makrana;
      gsap.fromTo(u.uMix, { value: 0 }, { value: 1, duration: 2.2, ease: 'power2.inOut', onComplete: () => (u.uMix.value = 0) });
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
    cap: new THREE.Vector3(0, -0.15, 3.2),
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

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // Turntable
    if (introDone && !drag.active) {
      rotVel += (autoSpeed - rotVel) * (1 - Math.exp(-dt * 1.4));
      turntable.rotation.y += rotVel * dt;
    }

    // Camera parallax
    pointer.sx += (pointer.nx - pointer.sx) * (1 - Math.exp(-dt * 3));
    pointer.sy += (pointer.ny - pointer.sy) * (1 - Math.exp(-dt * 3));
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

    // Slabs
    slabs.forEach((s) => {
      const u = s.userData;
      const target = hovered === s ? 1 : 0;
      u.hover += (target - u.hover) * (1 - Math.exp(-dt * 8));
      s.position.set(
        u.base.x - pointer.sx * 0.25 * (1 + u.i * 0.2),
        u.base.y + Math.sin(t * 0.7 + u.i * 1.7) * 0.16,
        u.base.z + u.hover * 0.6
      );
      s.rotation.set(
        u.rot.x + Math.sin(t * 0.5 + u.i) * 0.12,
        u.rot.y + Math.cos(t * 0.4 + u.i) * 0.15 + u.spin - u.hover * u.rot.y * 0.8,
        u.rot.z + Math.sin(t * 0.3 + u.i * 2) * 0.06
      );
      if (s.scale.x > 0.01 && introDone) s.scale.setScalar(1 + u.hover * 0.14);
    });

    // Diya flicker
    const flick = Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.06 + Math.sin(t * 23.7) * 0.04;
    T.flame.scale.set(0.09 + flick * 0.05, 0.18 + flick * 0.12, 1);
    T.glow.material.opacity = 0.85 + flick;
    if (!gsap.isTweening(T.diyaLight)) T.diyaLight.intensity = 3 + flick * 6;

    dust.material.uniforms.uTime.value = t;

    pick();
    renderer.render(scene, camera);
    onFrame?.(frameState());
    requestAnimationFrame(tick);
  }

  async function warmup() {
    // Compile all programs while everything is visible (hidden behind loader)
    if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
    else renderer.compile(scene, camera);
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
