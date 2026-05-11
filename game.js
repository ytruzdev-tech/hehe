// ============================================================
//  GAME.JS — HD Main game logic for WARZONE 3D
//  Fixed: boundary wall loop, variable hoisting, myId null guard
// ============================================================

import { WEAPONS, WEAPON_CATEGORIES, getWeaponsByCategory, createWeaponMesh } from './weapons.js';
import { animSystem, KILL_ANIMATIONS } from './animations.js';

// ── Constants ─────────────────────────────────────────────────
const PLAYER_HEIGHT  = 1.75;
const PLAYER_SPEED   = 7;
const PLAYER_SPRINT  = 13;
const SLIDE_SPEED    = 16;
const PRONE_SPEED    = 2.5;
const JUMP_FORCE     = 7.5;
const GRAVITY        = -22;
const MAX_HEALTH     = 100;
const RESPAWN_TIME   = 5;
const TICK_RATE      = 25;
const BOT_COUNT      = 0;
const MAP_SIZE       = 70;
const BULLET_POOL    = 60;
const MAX_STAMINA    = 100;
const SPRINT_DRAIN   = 25;
const SPRINT_REGEN   = 15;
const SLIDE_DURATION = 1.2;
const PRONE_HEIGHT   = 0.5;
const SLIDE_HEIGHT   = 0.8;

// ── State ──────────────────────────────────────────────────────
let scene, camera, renderer, clock;
let playerMesh, weaponMesh;
let players   = {};
let bullets   = [];
let bots      = [];
let obstacles = [];
let pickups   = [];
let treeTrunks = [];

let myId          = null;
let myName        = '';
let roomId        = '';
let myKills       = 0;
let myDeaths      = 0;
let myHealth      = MAX_HEALTH;
let isDead        = false;
let isPointerLocked = false;
let selectedAnim  = 'ice';
let currentWeaponId = 'm4a1';
let currentWeapon = WEAPONS.m4a1;
let ammoInMag     = 30;
let reserveAmmo   = 120;
let isReloading   = false;
let reloadTimer   = 0;
let isSprinting   = false;
let isSliding     = false;
let isProne       = false;
let slideTimer    = 0;
let slideDir      = new THREE.Vector3();
let canJump       = true;
let velocityY     = 0;
let lastTickTime  = 0;
let lastShotTime  = 0;
let gameStarted   = false;
let loadoutSlots  = ['m4a1','mp5','deagle',null];
let activeSlot    = 0;
let scores        = {};
let stamina       = MAX_STAMINA;
let isADS         = false;
let stepTimer     = 0;
let recoilTargetX = 0;
let recoilTargetY = 0;
let currentRecoilX = 0;
let currentRecoilY = 0;
let lastKiller    = '';

const keys = {};
let mouseDX = 0, mouseDY = 0;
let yaw = 0, pitch = 0;

// ── DOM refs ───────────────────────────────────────────────────
const loadingScreen   = document.getElementById('loading-screen');
const loadingBar      = document.getElementById('loading-bar');
const loadingPct      = document.getElementById('loading-pct');
const loadingText     = document.getElementById('loading-text');
const lobbyScreen     = document.getElementById('lobby-screen');
const hud             = document.getElementById('hud');
const healthNum       = document.getElementById('health-num');
const healthBar       = document.getElementById('health-bar');
const ammoMag         = document.getElementById('ammo-mag');
const ammoRes         = document.getElementById('ammo-res');
const weaponNameHud   = document.getElementById('weapon-name-hud');
const fireModeHud     = document.getElementById('fire-mode-hud');
const killFeed        = document.getElementById('kill-feed');
const scoreList       = document.getElementById('score-list');
const deathScreen     = document.getElementById('death-screen');
const deathKiller     = document.getElementById('death-killer');
const respawnCount    = document.getElementById('respawn-count');
const pointerMsg      = document.getElementById('pointer-lock-msg');
const reloadIndicator = document.getElementById('reload-indicator');
const reloadBarFill   = document.getElementById('reload-bar-fill');
const playerLabels    = document.getElementById('player-labels');
const weaponSelectScr = document.getElementById('weapon-select-screen');
const crosshairWrap   = document.getElementById('crosshair-wrap');
const compassNeedle   = document.getElementById('compass-needle');
const sprintBarFill   = document.getElementById('sprint-bar-fill');
const sprintBarWrap   = document.getElementById('sprint-bar-wrap');
const lowHealthVig    = document.getElementById('low-health-vignette');
const adsOverlay      = document.getElementById('ads-overlay');
const slideVig        = document.getElementById('slide-vignette');
const siStand         = document.getElementById('si-stand');
const siSlide         = document.getElementById('si-slide');
const siProne         = document.getElementById('si-prone');
const ammoWarning     = document.getElementById('ammo-warning');

// ── Loading ────────────────────────────────────────────────────
(function boot() {
  const steps = [
    [12, 'LOADING SHADERS...'],
    [28, 'BUILDING HD MAP...'],
    [48, 'GENERATING TERRAIN...'],
    [62, 'SPAWNING ENTITIES...'],
    [78, 'CONNECTING FIREBASE...'],
    [90, 'INITIALIZING PHYSICS...'],
    [100,'READY FOR BATTLE!']
  ];
  let idx = 0;
  const iv = setInterval(() => {
    if (idx >= steps.length) { clearInterval(iv); return; }
    const [p, txt] = steps[idx++];
    if (loadingBar)  loadingBar.style.width = p + '%';
    if (loadingPct)  loadingPct.textContent = p + '%';
    if (loadingText) loadingText.textContent = txt;
    if (p === 100) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          showLobby();
        }, 1100);
      }, 500);
    }
  }, 350);
})();

// ── Lobby ──────────────────────────────────────────────────────
function showLobby() {
  lobbyScreen.style.display = 'flex';
  buildWeaponUI('weapon-cats-lobby', 'weapons-grid-lobby', true);
}

window.selectAnim = el => {
  document.querySelectorAll('.anim-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedAnim = el.dataset.anim;
};

window.joinGame = () => {
  myName = document.getElementById('player-name-input').value.trim() || 'SOLDIER_' + Math.floor(Math.random() * 9999);
  roomId = document.getElementById('room-id-input').value.trim() || 'room_' + Math.floor(Math.random() * 9999);
  startGame();
};

window.createRoom = () => {
  myName = document.getElementById('player-name-input').value.trim() || 'SOLDIER_' + Math.floor(Math.random() * 9999);
  roomId = 'room_' + Date.now();
  document.getElementById('room-id-input').value = roomId;
  startGame();
};

// ── Weapon UI ──────────────────────────────────────────────────
function buildWeaponUI(catsId, gridId, isLobby) {
  const catsEl = document.getElementById(catsId);
  const gridEl = document.getElementById(gridId);
  if (!catsEl || !gridEl) return;
  catsEl.innerHTML = '';
  let first = true;
  for (const [key, label] of Object.entries(WEAPON_CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (first ? ' active' : '');
    btn.textContent = label;
    btn.dataset.cat = key;
    btn.onclick = () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWeaponCards(gridEl, key, isLobby);
    };
    catsEl.appendChild(btn);
    if (first) { renderWeaponCards(gridEl, key, isLobby); first = false; }
  }
}

function renderWeaponCards(gridEl, cat, isLobby) {
  gridEl.innerHTML = '';
  getWeaponsByCategory(cat).forEach(w => {
    const card = document.createElement('div');
    card.className = 'weapon-card' + (loadoutSlots.includes(w.id) ? ' selected' : '');
    const dmgW = (w.stats.dmg / 10) * 40;
    const rofW = (w.stats.rof / 10) * 40;
    const rngW = (w.stats.range / 10) * 40;
    card.innerHTML = `
      <div class="wc-icon">${w.icon}</div>
      <div class="wc-name">${w.name}</div>
      <div class="stat-bar"><div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${dmgW}px"></div></div></div>
      <div class="stat-bar"><div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${rofW}px;background:linear-gradient(90deg,#4488ff,#00aaff)"></div></div></div>
      <div class="stat-bar"><div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${rngW}px;background:linear-gradient(90deg,#44ff88,#00ff44)"></div></div></div>
    `;
    card.onclick = () => selectWeaponCard(w.id, card, gridEl);
    gridEl.appendChild(card);
  });
}

function selectWeaponCard(wid, card, gridEl) {
  const emptyIdx = loadoutSlots.findIndex(s => !s);
  const idx = emptyIdx >= 0 ? emptyIdx : 0;
  loadoutSlots[idx] = wid;
  gridEl.querySelectorAll('.weapon-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  updateWeaponBar();
  updateLobbySlots();
}

function updateLobbySlots() {
  const slots = document.querySelectorAll('#lobby-loadout-slots .loadout-slot');
  slots.forEach((slot, i) => {
    const wid = loadoutSlots[i];
    slot.innerHTML = wid
      ? `<span class="ls-icon">${WEAPONS[wid]?.icon || '🔫'}</span><span style="font-size:0.6rem;color:#ff8844">${WEAPONS[wid]?.name || wid}</span>`
      : `<span class="ls-icon" style="opacity:0.3">—</span><span>SLOT ${i + 1}</span>`;
    slot.classList.toggle('filled', !!wid);
    slot.classList.toggle('active-slot', i === activeSlot);
  });
}

window.closeWeaponSelect = () => {
  weaponSelectScr.style.display = 'none';
};

function updateWeaponBar() {
  for (let i = 0; i < 4; i++) {
    const slot = document.getElementById('hslot-' + i);
    if (!slot) continue;
    const wid = loadoutSlots[i];
    const iconEl = slot.querySelector('.hs-icon');
    const ammoEl = slot.querySelector('.hs-ammo');
    if (iconEl) iconEl.textContent = wid ? (WEAPONS[wid]?.icon || '🔫') : '—';
    if (ammoEl) ammoEl.textContent = wid ? (i === activeSlot ? ammoInMag : '—') : '—';
    slot.classList.toggle('active', i === activeSlot);
  }
}

// ── Three.js init ──────────────────────────────────────────────
function initThree() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6ab0de);
  scene.fog = new THREE.FogExp2(0x8fc8e8, 0.012);

  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.05, 800);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('game-canvas'),
    antialias: true, powerPreference: 'high-performance'
  });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  clock = new THREE.Clock();

  const ambient = new THREE.AmbientLight(0xfff0e0, 0.35);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfffaee, 1.6);
  sun.position.set(50, 80, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 300;
  sun.shadow.camera.left = -100; sun.shadow.camera.right = 100;
  sun.shadow.camera.top = 100; sun.shadow.camera.bottom = -100;
  sun.shadow.bias = -0.0003;
  scene.add(sun);

  const hemi = new THREE.HemisphereLight(0x87ceeb, 0x4a6741, 0.5);
  scene.add(hemi);

  const fill = new THREE.DirectionalLight(0xcceeaa, 0.2);
  fill.position.set(-20, 5, -20);
  scene.add(fill);

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}

// ── HD MAP ─────────────────────────────────────────────────────
function buildMap() {
  // Ground
  const groundGeo = new THREE.PlaneGeometry(MAP_SIZE * 2.5, MAP_SIZE * 2.5, 80, 80);
  const posArr = groundGeo.attributes.position.array;
  const colors = [];
  for (let i = 0; i < posArr.length; i += 3) {
    colors.push(0.28 + Math.random() * 0.06, 0.45 + Math.random() * 0.10, 0.20 + Math.random() * 0.05);
  }
  groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const groundMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Dirt patches
  for (let i = 0; i < 30; i++) {
    const pg = new THREE.PlaneGeometry(2 + Math.random() * 6, 2 + Math.random() * 6, 4, 4);
    const pm = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.45 + Math.random() * 0.1, 0.32 + Math.random() * 0.05, 0.15 + Math.random() * 0.05) });
    const p = new THREE.Mesh(pg, pm);
    p.rotation.x = -Math.PI / 2; p.position.y = 0.01;
    p.position.x = (Math.random() - 0.5) * MAP_SIZE * 2;
    p.position.z = (Math.random() - 0.5) * MAP_SIZE * 2;
    scene.add(p);
  }

  // ── FIX: Boundary walls — declare mesh first, then use it ────
  const wallDefs = [
    { pos: [0, 6, -MAP_SIZE],  size: [MAP_SIZE * 2, 12, 0.5] },
    { pos: [0, 6,  MAP_SIZE],  size: [MAP_SIZE * 2, 12, 0.5] },
    { pos: [-MAP_SIZE, 6, 0],  size: [0.5, 12, MAP_SIZE * 2] },
    { pos: [ MAP_SIZE, 6, 0],  size: [0.5, 12, MAP_SIZE * 2] },
  ];
  wallDefs.forEach(b => {
    const wallGeo = new THREE.BoxGeometry(...b.size);
    const wallMat = new THREE.MeshLambertMaterial({ visible: false });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(b.pos[0], b.pos[1], b.pos[2]);
    scene.add(wall);
    const box = new THREE.Box3().setFromObject(wall);
    obstacles.push({ mesh: wall, box });
  });

  // Buildings
  const buildings = [
    { pos: [-18, 0, -18], w: 10, h: 7, d: 10, color: 0x8a8070, roofColor: 0x555045 },
    { pos: [ 18, 0, -18], w: 8,  h: 5, d: 8,  color: 0x909070, roofColor: 0x5a5a40 },
    { pos: [-18, 0,  18], w: 9,  h: 6, d: 9,  color: 0x7a7868, roofColor: 0x484838 },
    { pos: [ 18, 0,  18], w: 11, h: 8, d: 11, color: 0x858575, roofColor: 0x4a4a38 },
    { pos: [  0, 0,   0], w: 6,  h: 4, d: 6,  color: 0xaaa090, roofColor: 0x606050 },
    { pos: [-28, 0,   0], w: 7,  h: 5, d: 10, color: 0x857a6a, roofColor: 0x504540 },
    { pos: [ 28, 0,   0], w: 7,  h: 5, d: 10, color: 0x857a6a, roofColor: 0x504540 },
    { pos: [  0, 0, -30], w: 10, h: 6, d: 8,  color: 0x9a9080, roofColor: 0x5a5040 },
    { pos: [  0, 0,  30], w: 10, h: 6, d: 8,  color: 0x9a9080, roofColor: 0x5a5040 },
  ];

  buildings.forEach(b => {
    const bGroup = new THREE.Group();
    const wallGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
    const wallMat = new THREE.MeshLambertMaterial({ color: b.color });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = b.h / 2;
    wall.castShadow = wall.receiveShadow = true;
    bGroup.add(wall);

    const roofMat = new THREE.MeshLambertMaterial({ color: b.roofColor });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(b.w + 0.3, 0.35, b.d + 0.3), roofMat);
    roof.position.y = b.h + 0.175;
    bGroup.add(roof);

    const winGlassMat = new THREE.MeshLambertMaterial({ color: 0x88bbdd, transparent: true, opacity: 0.7 });
    [[b.w / 2 + 0.06, 0, 'x'], [-(b.w / 2 + 0.06), 0, 'x']].forEach(([wx, wz]) => {
      for (let row = 0; row < Math.max(1, Math.floor(b.h / 3)); row++) {
        const glass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 1.0), winGlassMat);
        glass.position.set(wx, 1.2 + row * 2.2, wz);
        bGroup.add(glass);
      }
    });

    const doorMat = new THREE.MeshLambertMaterial({ color: 0x5a4a30 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.1, 0.12), doorMat);
    door.position.set(0, 1.05, b.d / 2 + 0.06);
    bGroup.add(door);

    bGroup.position.set(b.pos[0], 0, b.pos[2]);
    scene.add(bGroup);

    // Build obstacle box directly from known world coordinates — no setFromObject needed
    // Wall center is at (b.pos[0], b.h/2, b.pos[2]), half-extents are (b.w/2, b.h/2, b.d/2)
    const obsBox = new THREE.Box3(
      new THREE.Vector3(b.pos[0] - b.w / 2, 0,        b.pos[2] - b.d / 2),
      new THREE.Vector3(b.pos[0] + b.w / 2, b.h,      b.pos[2] + b.d / 2)
    );
    obstacles.push({ mesh: wall, box: obsBox });
  });

  // Crates
  for (let i = 0; i < 35; i++) {
    const size = 0.8 + Math.random() * 0.8;
    const x = (Math.random() - 0.5) * MAP_SIZE * 1.6;
    const z = (Math.random() - 0.5) * MAP_SIZE * 1.6;
    const cGeo = new THREE.BoxGeometry(size, size, size);
    const cMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.48 + Math.random() * 0.1, 0.34 + Math.random() * 0.06, 0.15 + Math.random() * 0.06) });
    const crate = new THREE.Mesh(cGeo, cMat);
    crate.position.set(x, size / 2, z);
    crate.rotation.y = Math.random() * Math.PI;
    crate.castShadow = crate.receiveShadow = true;
    scene.add(crate);
    obstacles.push({ mesh: crate, box: new THREE.Box3().setFromObject(crate) });
  }

  // Barrels
  for (let i = 0; i < 25; i++) {
    const x = (Math.random() - 0.5) * MAP_SIZE * 1.5;
    const z = (Math.random() - 0.5) * MAP_SIZE * 1.5;
    const h = 1.0 + Math.random() * 0.3;
    const barrelGeo = new THREE.CylinderGeometry(0.3, 0.3, h, 14);
    const barrelMat = new THREE.MeshLambertMaterial({ color: 0x334433 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(x, h / 2, z);
    barrel.castShadow = barrel.receiveShadow = true;
    scene.add(barrel);
    obstacles.push({ mesh: barrel, box: new THREE.Box3().setFromObject(barrel) });
  }

  // Trees
  const trunkColors = [0x3d2b1f, 0x4a3728, 0x5c3d2e, 0x3a2818];
  const canopyColors = [0x2d5a27, 0x3a7034, 0x255420, 0x4a8040, 0x1e4a1a];
  for (let i = 0; i < 40; i++) {
    const x = (Math.random() - 0.5) * MAP_SIZE * 1.9;
    const z = (Math.random() - 0.5) * MAP_SIZE * 1.9;
    const scale = 0.7 + Math.random() * 0.8;
    const trunkH = 2.5 * scale + Math.random() * 1.5;
    const trunkR = 0.14 * scale + Math.random() * 0.06;
    const trunkGeo = new THREE.CylinderGeometry(trunkR * 0.7, trunkR, trunkH, 10, 3);
    const trunkMat = new THREE.MeshLambertMaterial({ color: trunkColors[Math.floor(Math.random() * trunkColors.length)] });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(x, trunkH / 2, z);
    trunk.castShadow = true;
    scene.add(trunk);
    treeTrunks.push(trunk);
    obstacles.push({ mesh: trunk, box: new THREE.Box3().setFromObject(trunk) });

    const canopyMat = new THREE.MeshLambertMaterial({ color: canopyColors[Math.floor(Math.random() * canopyColors.length)] });
    const treeType = Math.floor(Math.random() * 3);
    if (treeType === 0) {
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(2.2 * scale, 8, 6), canopyMat);
      canopy.position.set(x, trunkH + 1.2 * scale, z);
      canopy.castShadow = true;
      scene.add(canopy);
    } else if (treeType === 1) {
      for (let t = 0; t < 3; t++) {
        const coneR = (2.0 - t * 0.5) * scale;
        const coneH = (2.5 - t * 0.4) * scale;
        const cone = new THREE.Mesh(new THREE.ConeGeometry(coneR, coneH, 10), canopyMat);
        cone.position.set(x, trunkH + t * 1.2 * scale + coneH / 2, z);
        cone.castShadow = true;
        scene.add(cone);
      }
    } else {
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(2.4 * scale, 10, 7), canopyMat);
      canopy.position.set(x, trunkH + 2.0 * scale, z);
      canopy.castShadow = true;
      scene.add(canopy);
    }
  }

  // Sandbags
  for (let i = 0; i < 12; i++) {
    const x = (Math.random() - 0.5) * MAP_SIZE * 1.4;
    const z = (Math.random() - 0.5) * MAP_SIZE * 1.4;
    const angle = Math.random() * Math.PI;
    const numBags = 3 + Math.floor(Math.random() * 5);
    const bagMat = new THREE.MeshLambertMaterial({ color: 0x9a8a6a });
    const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(numBags * 0.6, 0.6, 0.7), bagMat);
    wallMesh.position.set(x, 0.3, z);
    wallMesh.rotation.y = angle;
    scene.add(wallMesh);
    obstacles.push({ mesh: wallMesh, box: new THREE.Box3().setFromObject(wallMesh) });
  }

  // Broken walls
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - 0.5) * MAP_SIZE * 1.3;
    const z = (Math.random() - 0.5) * MAP_SIZE * 1.3;
    const len = 3 + Math.random() * 4;
    const bwall = new THREE.Mesh(
      new THREE.BoxGeometry(len, 1.4, 0.35),
      new THREE.MeshLambertMaterial({ color: 0x888888 })
    );
    bwall.position.set(x, 0.7, z);
    bwall.rotation.y = Math.random() * Math.PI;
    bwall.castShadow = bwall.receiveShadow = true;
    scene.add(bwall);
    obstacles.push({ mesh: bwall, box: new THREE.Box3().setFromObject(bwall) });
  }

  // Road
  const roadMat = new THREE.MeshLambertMaterial({ color: 0x606060 });
  [
    [0, 0, 0, MAP_SIZE * 2, 4],
    [0, 0, 0, 4, MAP_SIZE * 2]
  ].forEach(([x, y, z, rw, rl]) => {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(rw, rl), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(x, 0.005, z);
    scene.add(road);
  });

  spawnPickups();
}

function spawnPickups() {
  const pos = [[-12, 0, -12], [12, 0, 12], [-12, 0, 12], [12, 0, -12],
               [0, 0, 22], [0, 0, -22], [22, 0, 0], [-22, 0, 0]];
  pos.forEach(p => {
    const geo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const mat = new THREE.MeshLambertMaterial({ color: 0xff2222, emissive: 0x660000, emissiveIntensity: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p[0], 0.55, p[2]);
    scene.add(mesh);
    pickups.push({ mesh, type: 'health', value: 35, active: true });
  });
  const apos = [[5, 0, 5], [-5, 0, -5], [15, 0, -15], [-15, 0, 15]];
  apos.forEach(p => {
    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffcc00, emissive: 0x885500, emissiveIntensity: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p[0], 0.5, p[2]);
    scene.add(mesh);
    pickups.push({ mesh, type: 'ammo', value: 30, active: true });
  });
}

// ── Local Player ───────────────────────────────────────────────
function createLocalPlayer() {
  const geo = new THREE.CylinderGeometry(0.4, 0.4, PLAYER_HEIGHT, 8);
  const mat = new THREE.MeshLambertMaterial({ visible: false });
  playerMesh = new THREE.Mesh(geo, mat);
  const sp = getSpawnPos();
  playerMesh.position.set(sp.x, PLAYER_HEIGHT / 2, sp.z);
  scene.add(playerMesh);
  camera.position.set(sp.x, PLAYER_HEIGHT * 0.85, sp.z);
  equipWeapon(loadoutSlots[0] || 'm4a1');
}

function getSpawnPos() {
  // Spawn points are deliberately placed away from all building centers
  const sp = [
    { x: -22, y: 0, z: -22 }, { x: 22, y: 0, z: -22 },
    { x: -22, y: 0, z: 22 },  { x: 22, y: 0, z: 22 },
    { x: 0, y: 0, z: -32 },   { x: 0, y: 0, z: 32 },
    { x: -32, y: 0, z: 0 },   { x: 32, y: 0, z: 0 },
    { x: -40, y: 0, z: -40 }, { x: 40, y: 0, z: 40 },
  ];
  // Shuffle and pick the first one that doesn't collide with any obstacle
  const shuffled = sp.sort(() => Math.random() - 0.5);
  for (const candidate of shuffled) {
    const testBox = new THREE.Box3(
      new THREE.Vector3(candidate.x - 0.5, 0,            candidate.z - 0.5),
      new THREE.Vector3(candidate.x + 0.5, PLAYER_HEIGHT, candidate.z + 0.5)
    );
    const blocked = obstacles.some(o => o.box.intersectsBox(testBox));
    if (!blocked) return candidate;
  }
  // Fallback: just return the last one regardless
  return shuffled[shuffled.length - 1];
}

function equipWeapon(wid) {
  if (!wid) return;
  currentWeaponId = wid;
  currentWeapon = WEAPONS[wid];
  if (!currentWeapon) return;
  ammoInMag = currentWeapon.magSize;
  reserveAmmo = currentWeapon.reserveAmmo;
  isReloading = false;
  if (weaponMesh) camera.remove(weaponMesh);
  weaponMesh = createWeaponMesh(wid, THREE);
  if (weaponMesh) {
    weaponMesh.scale.setScalar(1.0);
    weaponMesh.position.set(0.25, -0.22, -0.45);
    weaponMesh.rotation.y = Math.PI;
    camera.add(weaponMesh);
    scene.add(camera);
  }
  updateHUD();
  updateWeaponBar();
}

// ── Remote Player Mesh ─────────────────────────────────────────
function createRemotePlayerMesh(name, isBot) {
  const g = new THREE.Group();
  const skinMat2 = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.8, 0.6, 0.4) });
  const bodyMat = new THREE.MeshLambertMaterial({ color: 0x1a2a5a });
  const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1a2a5a });
  const bootMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
  const vestMat = new THREE.MeshLambertMaterial({ color: 0x3a4a2a });
  const helmetMat = new THREE.MeshLambertMaterial({ color: 0x2a3520 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.75, 0.3), bodyMat);
  torso.position.y = 0.95; torso.castShadow = true; g.add(torso);
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.6, 0.32), vestMat);
  vest.position.y = 0.98; g.add(vest);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), skinMat2);
  head.position.y = 1.61; head.castShadow = true; g.add(head);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.6), helmetMat);
  helmet.position.y = 1.68; g.add(helmet);

  [-0.37, 0.37].forEach(ax => {
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 8), bodyMat);
    upper.position.set(ax, 0.86, 0); upper.castShadow = true; g.add(upper);
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.08, 0.38, 8), bodyMat);
    lower.position.set(ax, 0.52, 0.04); lower.castShadow = true; g.add(lower);
  });

  [-0.16, 0.16].forEach(lx => {
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.55, 8), pantsMat);
    upper.position.set(lx, 0.37, 0); upper.castShadow = true; g.add(upper);
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.1, 0.5, 8), pantsMat);
    lower.position.set(lx, 0.02, 0.02); lower.castShadow = true; g.add(lower);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.2, 0.28), bootMat);
    boot.position.set(lx, -0.28, 0.03); g.add(boot);
  });

  const label = document.createElement('div');
  label.className = 'float-label ' + (isBot ? 'bot' : 'enemy');
  const safeName = name.replace(/[^a-zA-Z0-9_]/g, '_');
  label.innerHTML = `${name}<div class="float-label-hp" id="flhp-${safeName}" style="width:100%"></div>`;
  playerLabels.appendChild(label);

  g.castShadow = true;
  scene.add(g);
  return { group: g, label, safeName };
}

// ── Bots ───────────────────────────────────────────────────────
function spawnBots() {
  const names = ['GHOST', 'VIPER', 'REAPER', 'HAWK', 'STORM'];
  for (let i = 0; i < BOT_COUNT; i++) {
    const name = '[BOT] ' + names[i % names.length];
    const { group, label, safeName } = createRemotePlayerMesh(name, true);
    const sp = getSpawnPos();
    group.position.set(sp.x, 0, sp.z);
    const bid = 'bot_' + i;
    scores[bid] = { name, kills: 0 };
    bots.push({
      id: bid, name, mesh: group, label, safeName,
      health: MAX_HEALTH, alive: true,
      speed: 2 + Math.random() * 2.5,
      targetPos: new THREE.Vector3(sp.x, 0, sp.z),
      roamTimer: 0, shootTimer: 0, strafeTimer: 0, strafeDir: 1,
      weapon: Object.values(WEAPONS)[Math.floor(Math.random() * Object.values(WEAPONS).length)]
    });
  }
}

function updateBots(dt) {
  bots.forEach(bot => {
    if (!bot.alive) return;
    updateFloatingLabel(bot.label, bot.mesh.position, PLAYER_HEIGHT + 0.5, bot.health / MAX_HEALTH, bot.safeName);

    bot.roamTimer -= dt;
    bot.strafeTimer -= dt;
    if (bot.roamTimer <= 0) {
      bot.roamTimer = 2 + Math.random() * 4;
      const distToPlayer = bot.mesh.position.distanceTo(camera.position);
      if (distToPlayer < 50 && !isDead) {
        bot.targetPos = camera.position.clone();
        bot.targetPos.y = 0;
      } else {
        bot.targetPos = new THREE.Vector3(
          (Math.random() - 0.5) * MAP_SIZE * 1.5,
          0,
          (Math.random() - 0.5) * MAP_SIZE * 1.5
        );
      }
    }
    if (bot.strafeTimer <= 0) {
      bot.strafeTimer = 0.8 + Math.random() * 1.5;
      bot.strafeDir = Math.random() < 0.5 ? 1 : -1;
    }

    const dir = bot.targetPos.clone().sub(bot.mesh.position);
    dir.y = 0;
    if (dir.length() > 1.5) {
      dir.normalize();
      const strafe = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(bot.strafeDir * 0.4);
      const move = dir.clone().add(strafe).normalize().multiplyScalar(bot.speed * dt);
      bot.mesh.position.add(move);
      bot.mesh.lookAt(bot.targetPos.clone().add(new THREE.Vector3(0, 1.5, 0)));
    }

    bot.shootTimer -= dt;
    if (bot.shootTimer <= 0) {
      bot.shootTimer = 1 + Math.random() * 2.5;
      const dist = bot.mesh.position.distanceTo(camera.position);
      if (dist < 45 && !isDead) {
        const hitChance = Math.max(0.04, 0.3 - dist * 0.005);
        if (Math.random() < hitChance) {
          applyDamage(bot.weapon.damage * (0.4 + Math.random() * 0.6), bot.name);
        }
      }
    }
  });

  pickups.forEach(p => { if (p.active) p.mesh.rotation.y += dt * 2.2; });
}

// ── Firebase ───────────────────────────────────────────────────
async function initFirebase() {
  if (!window.DB) { console.warn('Firebase offline — bot-only mode'); return; }
  myId = 'player_' + Date.now() + '_' + Math.floor(Math.random() * 9999);
  // Update local score entry now that we have a real myId
  const localScore = scores['local'];
  if (localScore) {
    scores[myId] = localScore;
    delete scores['local'];
  }
  const path = `rooms/${roomId}/players/${myId}`;
  try {
    await window.DB.set(path, {
      name: myName, x: camera.position.x, y: camera.position.y, z: camera.position.z,
      yaw, health: myHealth, kills: myKills, deaths: myDeaths,
      weapon: currentWeaponId, anim: selectedAnim, alive: true, ts: Date.now()
    });
    window.DB.onDisconnect(path).remove();
    window.DB.onValue(`rooms/${roomId}/players`, snap => {
      const all = snap.val() || {};
      Object.entries(all).forEach(([id, data]) => {
        if (id === myId) return;
        if (!players[id]) {
          const { group, label, safeName } = createRemotePlayerMesh(data.name || 'PLAYER', false);
          players[id] = { mesh: group, label, data, safeName };
          scores[id] = { name: data.name || 'PLAYER', kills: data.kills || 0 };
        } else {
          players[id].mesh.position.lerp(new THREE.Vector3(data.x || 0, 0, data.z || 0), 0.25);
          players[id].mesh.rotation.y = -(data.yaw || 0);
          players[id].data = data;
          scores[id].kills = data.kills || 0;
          updateFloatingLabel(players[id].label, players[id].mesh.position, PLAYER_HEIGHT + 0.5, (data.health || MAX_HEALTH) / MAX_HEALTH, players[id].safeName);
        }
        updateScoreUI();
      });
      Object.keys(players).forEach(id => {
        if (!all[id]) {
          scene.remove(players[id].mesh);
          players[id].label.remove();
          delete players[id];
          delete scores[id];
        }
      });
    });
    window.DB.onValue(`rooms/${roomId}/kills`, snap => {
      const kills = snap.val();
      if (!kills) return;
      const arr = Object.values(kills);
      const latest = arr[arr.length - 1];
      if (latest && Date.now() - latest.ts < 3000) {
        addKillFeed(latest.killer, latest.victim, latest.anim);
        if (latest.victim === myName) handleDeath(latest.killer);
      }
    });
  } catch (e) {
    console.warn('Firebase error:', e);
  }
}

async function pushPos() {
  if (!window.DB || !myId) return;
  try {
    await window.DB.update(`rooms/${roomId}/players/${myId}`, {
      x: camera.position.x, y: camera.position.y, z: camera.position.z,
      yaw, health: myHealth, kills: myKills, deaths: myDeaths,
      weapon: currentWeaponId, alive: !isDead
    });
  } catch (e) {}
}

async function pushKill(victimName, animType) {
  if (!window.DB || !myId) return;
  try {
    await window.DB.push(`rooms/${roomId}/kills`, {
      killer: myName, victim: victimName, anim: animType, ts: Date.now()
    });
  } catch (e) {}
}

// ── Input ──────────────────────────────────────────────────────
function initInput() {
  document.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
      switchSlot(parseInt(e.code.replace('Digit', '')) - 1);
    }
    if (e.code === 'KeyR' && !isReloading) startReload();
    if (e.code === 'Tab') { e.preventDefault(); toggleWeaponSelect(); }
    if (e.code === 'KeyB') cycleAnim();
    if (e.code === 'KeyC' && !isProne && isSprinting) startSlide();
    if (e.code === 'KeyZ') toggleProne();
  });
  document.addEventListener('keyup', e => { keys[e.code] = false; });
  document.addEventListener('mousemove', e => {
    if (!isPointerLocked) return;
    mouseDX += e.movementX;
    mouseDY += e.movementY;
  });
  document.addEventListener('mousedown', e => {
    if (!isPointerLocked) { requestPointerLock(); return; }
    if (e.button === 0) { if (currentWeapon?.auto) startAutoFire(); else tryShoot(); }
    if (e.button === 2) enterADS();
  });
  document.addEventListener('mouseup', e => {
    if (e.button === 0) stopAutoFire();
    if (e.button === 2) exitADS();
  });
  document.addEventListener('pointerlockchange', () => {
    isPointerLocked = document.pointerLockElement === document.body;
    if (pointerMsg) pointerMsg.style.display = isPointerLocked ? 'none' : 'flex';
  });
  document.addEventListener('contextmenu', e => e.preventDefault());
}

window.requestPointerLock = () => document.body.requestPointerLock();

let autoFireIv = null;
function startAutoFire() {
  if (autoFireIv) return;
  autoFireIv = setInterval(() => {
    if (isPointerLocked && currentWeapon?.auto) tryShoot();
  }, Math.round(60000 / currentWeapon.fireRate));
}
function stopAutoFire() { clearInterval(autoFireIv); autoFireIv = null; }

function switchSlot(s) {
  if (s < 0 || s > 3 || !loadoutSlots[s]) return;
  activeSlot = s;
  isReloading = false;
  stopAutoFire();
  equipWeapon(loadoutSlots[s]);
}

function toggleWeaponSelect() {
  const showing = weaponSelectScr.style.display === 'flex';
  weaponSelectScr.style.display = showing ? 'none' : 'flex';
  if (!showing) buildWeaponUI('weapon-cats-ingame', 'weapons-grid-ingame', false);
}

function cycleAnim() {
  const ks = Object.keys(KILL_ANIMATIONS);
  const idx = ks.indexOf(selectedAnim);
  selectedAnim = ks[(idx + 1) % ks.length];
  document.querySelectorAll('.anim-opt').forEach(o => o.classList.toggle('selected', o.dataset.anim === selectedAnim));
  showNotif('Kill Anim: ' + KILL_ANIMATIONS[selectedAnim].name);
}

// ── ADS ────────────────────────────────────────────────────────
function enterADS() {
  if (isDead) return;
  isADS = true;
  if (adsOverlay) adsOverlay.classList.add('active');
  if (weaponMesh) { weaponMesh.position.set(0, -0.15, -0.42); weaponMesh.scale.setScalar(0.88); }
  camera.fov = currentWeapon.category === 'SNIPER' ? 30 : 60;
  camera.updateProjectionMatrix();
}

function exitADS() {
  isADS = false;
  if (adsOverlay) adsOverlay.classList.remove('active');
  if (weaponMesh) { weaponMesh.position.set(0.25, -0.22, -0.45); weaponMesh.scale.setScalar(1.0); }
  camera.fov = 75;
  camera.updateProjectionMatrix();
}

// ── Slide / Prone ──────────────────────────────────────────────
function startSlide() {
  if (isSliding || isProne) return;
  isSliding = true;
  slideTimer = SLIDE_DURATION;
  slideDir.set(
    keys['KeyA'] ? -1 : (keys['KeyD'] ? 1 : 0),
    0,
    keys['KeyW'] ? -1 : (keys['KeyS'] ? 1 : 0)
  );
  if (slideDir.length() === 0) slideDir.set(0, 0, -1);
  slideDir.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  if (slideVig) slideVig.classList.add('active');
  updateStanceIndicator();
  showNotif('SLIDING');
}

function endSlide() {
  isSliding = false;
  if (slideVig) slideVig.classList.remove('active');
  updateStanceIndicator();
}

function toggleProne() {
  if (isSliding) return;
  isProne = !isProne;
  updateStanceIndicator();
  showNotif(isProne ? 'PRONE' : 'STANDING');
}

function updateStanceIndicator() {
  if (siStand) siStand.classList.toggle('active', !isSliding && !isProne);
  if (siSlide) siSlide.classList.toggle('active', isSliding);
  if (siProne) siProne.classList.toggle('active', isProne && !isSliding);
}

// ── Shooting ───────────────────────────────────────────────────
function tryShoot() {
  if (isDead || isReloading || !gameStarted) return;
  const now = Date.now();
  const fi = 60000 / currentWeapon.fireRate;
  if (now - lastShotTime < fi) return;
  lastShotTime = now;
  if (ammoInMag <= 0) { if (reserveAmmo > 0) startReload(); return; }

  ammoInMag--;
  updateHUD();
  flashMuzzle();
  applyRecoil();

  if (currentWeapon.burst) {
    let left = currentWeapon.burst - 1;
    const bIv = setInterval(() => {
      if (left-- <= 0 || ammoInMag <= 0) { clearInterval(bIv); return; }
      ammoInMag--; updateHUD(); spawnBullet();
    }, 85);
  }

  if (currentWeapon.pellets) {
    for (let i = 0; i < currentWeapon.pellets; i++) spawnBullet(true);
  } else {
    spawnBullet();
  }

  if (weaponMesh) {
    weaponMesh.position.z += 0.06;
    weaponMesh.rotation.x -= 0.04;
    setTimeout(() => {
      if (weaponMesh) { weaponMesh.position.z -= 0.06; weaponMesh.rotation.x += 0.04; }
    }, 90);
  }

  if (ammoInMag === 0 && reserveAmmo > 0) startReload();
}

function applyRecoil() {
  const vert = currentWeapon.recoil * (0.7 + Math.random() * 0.6);
  const horiz = currentWeapon.recoil * (Math.random() - 0.5) * 0.5;
  recoilTargetY -= vert * 1.8;
  recoilTargetX += horiz * 0.8;
  if (crosshairWrap) {
    crosshairWrap.classList.add('spread');
    setTimeout(() => crosshairWrap.classList.remove('spread'), 150);
  }
}

function spawnBullet(spread = false) {
  const dir = new THREE.Vector3(0, 0, -1);
  const spreadMult = isADS ? 0.3 : 1.0;
  const spreadVal = spread ? currentWeapon.spread * 3 * spreadMult : currentWeapon.spread * spreadMult;
  dir.x += (Math.random() - 0.5) * spreadVal;
  dir.y += (Math.random() - 0.5) * spreadVal;
  dir.applyEuler(camera.rotation).normalize();

  const geo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 6);
  const mat = new THREE.MeshBasicMaterial({ color: currentWeapon.bulletColor });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(camera.position).add(dir.clone().multiplyScalar(0.6));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  scene.add(mesh);

  bullets.push({
    mesh, dir: dir.clone(),
    speed: currentWeapon.bulletSpeed,
    damage: currentWeapon.damage,
    range: currentWeapon.range,
    traveled: 0, alive: true
  });
  if (bullets.length > BULLET_POOL) {
    const old = bullets.shift();
    scene.remove(old.mesh);
  }
}

function flashMuzzle() {
  if (!weaponMesh) return;
  const light = new THREE.PointLight(currentWeapon.bulletColor, 3.5, 4);
  light.position.set(0.25, -0.2, -0.95);
  camera.add(light);
  setTimeout(() => camera.remove(light), 55);
  const flashGeo = new THREE.PlaneGeometry(0.25, 0.25);
  const flashMat = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });
  const flash = new THREE.Mesh(flashGeo, flashMat);
  flash.position.set(0.25, -0.20, -1.05);
  camera.add(flash);
  setTimeout(() => camera.remove(flash), 55);
}

// ── Reload ─────────────────────────────────────────────────────
function startReload() {
  if (isReloading || ammoInMag === currentWeapon.magSize || reserveAmmo <= 0) return;
  isReloading = true;
  reloadTimer = currentWeapon.reloadTime;
  if (reloadIndicator) reloadIndicator.classList.add('show');
  if (reloadBarFill) reloadBarFill.style.width = '0%';
}

function updateReload(dt) {
  if (!isReloading) return;
  reloadTimer -= dt;
  if (reloadBarFill) reloadBarFill.style.width = Math.max(0, (1 - reloadTimer / currentWeapon.reloadTime) * 100) + '%';
  if (reloadTimer <= 0) {
    const need = currentWeapon.magSize - ammoInMag;
    const fill = Math.min(need, reserveAmmo);
    ammoInMag += fill;
    reserveAmmo -= fill;
    isReloading = false;
    if (reloadIndicator) reloadIndicator.classList.remove('show');
    updateHUD();
  }
}

// ── Bullet update ──────────────────────────────────────────────
function updateBullets(dt) {
  bullets.forEach(b => {
    if (!b.alive) return;
    const mv = b.dir.clone().multiplyScalar(b.speed * dt);
    b.mesh.position.add(mv);
    b.traveled += mv.length();
    if (b.traveled > b.range) { scene.remove(b.mesh); b.alive = false; return; }

    const bBox = new THREE.Box3().setFromObject(b.mesh);

    for (const obs of obstacles) {
      if (obs.box.intersectsBox(bBox)) {
        spawnImpact(b.mesh.position.clone());
        scene.remove(b.mesh); b.alive = false; return;
      }
    }

    for (const bot of bots) {
      if (!bot.alive) continue;
      const bb = new THREE.Box3().setFromObject(bot.mesh).expandByScalar(0.35);
      if (bb.intersectsBox(bBox)) {
        bot.health -= b.damage;
        showHitMarker();
        scene.remove(b.mesh); b.alive = false;
        const hpEl = document.getElementById('flhp-' + bot.safeName);
        if (hpEl) hpEl.style.width = Math.max(0, bot.health / MAX_HEALTH * 100) + '%';
        if (bot.health <= 0) killBot(bot);
        return;
      }
    }

    for (const [id, rp] of Object.entries(players)) {
      const rpb = new THREE.Box3().setFromObject(rp.mesh).expandByScalar(0.35);
      if (rpb.intersectsBox(bBox)) {
        scene.remove(b.mesh); b.alive = false;
        showHitMarker();
        registerKill(rp.data?.name || 'PLAYER');
        return;
      }
    }
  });
  bullets = bullets.filter(b => b.alive);
}

function killBot(bot) {
  bot.alive = false;
  bot.health = 0;
  const sp = worldToScreen(bot.mesh.position);
  animSystem.playKillAnimationAt(selectedAnim, sp.x, sp.y);
  myKills++;
  const scoreKey = myId || 'local';
  scores[scoreKey] = { name: myName, kills: myKills };
  updateScoreUI();
  addKillFeed(myName, bot.name, selectedAnim);
  pushKill(bot.name, selectedAnim);
  bot.mesh.visible = false;
  bot.label.style.display = 'none';
  setTimeout(() => {
    const sp2 = getSpawnPos();
    bot.mesh.position.set(sp2.x, 0, sp2.z);
    bot.health = MAX_HEALTH;
    bot.alive = true;
    bot.mesh.visible = true;
    bot.label.style.display = '';
  }, 8000);
}

function registerKill(victimName) {
  myKills++;
  const scoreKey = myId || 'local';
  scores[scoreKey] = { name: myName, kills: myKills };
  animSystem.playKillAnimationAt(selectedAnim, innerWidth / 2, innerHeight / 2);
  addKillFeed(myName, victimName, selectedAnim);
  pushKill(victimName, selectedAnim);
  updateScoreUI();
}

function spawnImpact(pos) {
  for (let i = 0; i < 6; i++) {
    const spark = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0xffaa44, transparent: true })
    );
    spark.position.copy(pos);
    scene.add(spark);
    const sd = new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
    const start = performance.now();
    const animF = () => {
      const t = (performance.now() - start) / 300;
      if (t >= 1) { scene.remove(spark); return; }
      spark.position.addScaledVector(sd, 0.03);
      spark.material.opacity = 1 - t;
      requestAnimationFrame(animF);
    };
    requestAnimationFrame(animF);
  }
}

// ── Damage / Death ─────────────────────────────────────────────
function applyDamage(amount, attacker) {
  if (isDead) return;
  myHealth = Math.max(0, myHealth - Math.round(amount));
  updateHUD();
  const ov = document.getElementById('damage-vignette');
  if (ov) { ov.classList.remove('flash'); void ov.offsetWidth; ov.classList.add('flash'); }
  lastKiller = attacker;
  if (myHealth <= 0) handleDeath(attacker);
}

function handleDeath(killer) {
  if (isDead) return;
  isDead = true;
  myDeaths++;
  if (deathScreen) deathScreen.style.display = 'flex';
  if (deathKiller) deathKiller.textContent = 'KILLED BY: ' + (killer || 'UNKNOWN');
  if (hud) hud.style.display = 'none';
  if (pointerMsg) pointerMsg.style.display = 'none';
  document.exitPointerLock();
  addKillFeed(killer || 'UNKNOWN', myName, 'fire');
  let t = RESPAWN_TIME;
  if (respawnCount) respawnCount.textContent = `RESPAWNING IN ${t}...`;
  const iv = setInterval(() => {
    t--;
    if (respawnCount) respawnCount.textContent = `RESPAWNING IN ${t}...`;
    if (t <= 0) { clearInterval(iv); respawn(); }
  }, 1000);
}

function respawn() {
  isDead = false;
  myHealth = MAX_HEALTH;
  const sp = getSpawnPos();
  camera.position.set(sp.x, PLAYER_HEIGHT * 0.85, sp.z);
  playerMesh.position.set(sp.x, PLAYER_HEIGHT / 2, sp.z);
  velocityY = 0;
  isProne = false;
  isSliding = false;
  if (deathScreen) deathScreen.style.display = 'none';
  if (hud) hud.style.display = 'block';
  updateHUD();
  equipWeapon(loadoutSlots[activeSlot] || 'm4a1');
  requestPointerLock();
  updateStanceIndicator();
}

// ── Player Movement ────────────────────────────────────────────
function updatePlayer(dt) {
  if (isDead) return;

  recoilTargetY += (0 - recoilTargetY) * Math.min(1, dt * 8);
  recoilTargetX += (0 - recoilTargetX) * Math.min(1, dt * 8);
  currentRecoilY += (recoilTargetY - currentRecoilY) * 0.3;
  currentRecoilX += (recoilTargetX - currentRecoilX) * 0.3;

  const sens = isADS ? 0.0012 : 0.002;
  yaw   -= mouseDX * sens;
  pitch -= mouseDY * sens;
  pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
  mouseDX = 0;
  mouseDY = 0;

  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw + currentRecoilX;
  camera.rotation.x = pitch + currentRecoilY;

  if (compassNeedle) compassNeedle.style.transform = `rotate(${yaw * 180 / Math.PI}deg)`;

  const wantsMove = keys['KeyW'] || keys['KeyS'] || keys['KeyA'] || keys['KeyD'];
  const wantsSprint = (keys['ShiftLeft'] || keys['ShiftRight']) && wantsMove && !isProne && !isSliding;
  isSprinting = wantsSprint && stamina > 0;
  if (isSprinting) {
    stamina = Math.max(0, stamina - SPRINT_DRAIN * dt);
    if (sprintBarWrap) sprintBarWrap.classList.add('show');
  } else {
    stamina = Math.min(MAX_STAMINA, stamina + SPRINT_REGEN * dt);
    if (stamina >= MAX_STAMINA && sprintBarWrap) sprintBarWrap.classList.remove('show');
  }
  if (sprintBarFill) sprintBarFill.style.width = (stamina / MAX_STAMINA * 100) + '%';

  if (isSliding) {
    slideTimer -= dt;
    if (slideTimer <= 0) endSlide();
    else {
      const slideSpeed = SLIDE_SPEED * (slideTimer / SLIDE_DURATION);
      const sp = slideDir.clone().multiplyScalar(slideSpeed * dt);
      camera.position.x += sp.x;
      camera.position.z += sp.z;
      const targetY = SLIDE_HEIGHT * 0.85;
      camera.position.y += (targetY - camera.position.y) * 0.15;
    }
  } else {
    const moveDir = new THREE.Vector3();
    if (keys['KeyW'] || keys['ArrowUp'])    moveDir.z -= 1;
    if (keys['KeyS'] || keys['ArrowDown'])  moveDir.z += 1;
    if (keys['KeyA'] || keys['ArrowLeft'])  moveDir.x -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveDir.x += 1;

    if (moveDir.length() > 0) {
      moveDir.normalize();
      moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      const spd = isProne ? PRONE_SPEED : (isSprinting ? PLAYER_SPRINT : PLAYER_SPEED);
      const next = camera.position.clone().add(moveDir.clone().multiplyScalar(spd * dt));
      const pBox = new THREE.Box3(
        new THREE.Vector3(next.x - 0.38, camera.position.y - 0.6, next.z - 0.38),
        new THREE.Vector3(next.x + 0.38, camera.position.y + 0.1, next.z + 0.38)
      );
      // Separate X and Z collision so player can slide along walls instead of getting stuck
      const nextX = new THREE.Box3(
        new THREE.Vector3(next.x - 0.38, camera.position.y - 0.6, camera.position.z - 0.38),
        new THREE.Vector3(next.x + 0.38, camera.position.y + 0.1, camera.position.z + 0.38)
      );
      const nextZ = new THREE.Box3(
        new THREE.Vector3(camera.position.x - 0.38, camera.position.y - 0.6, next.z - 0.38),
        new THREE.Vector3(camera.position.x + 0.38, camera.position.y + 0.1, next.z + 0.38)
      );
      const blockX = obstacles.some(o => o.box.intersectsBox(nextX));
      const blockZ = obstacles.some(o => o.box.intersectsBox(nextZ));
      if (!blockX) camera.position.x = next.x;
      if (!blockZ) camera.position.z = next.z;
      stepTimer += dt * (isSprinting ? 8 : 5);
      const bob = Math.sin(stepTimer) * 0.025;
      if (weaponMesh && !isADS) weaponMesh.position.y = -0.22 + bob;
    }
  }

  if ((keys['Space'] || keys['KeyE']) && canJump && !isProne && !isSliding) {
    velocityY = JUMP_FORCE;
    canJump = false;
  }
  velocityY += GRAVITY * dt;
  camera.position.y += velocityY * dt;
  playerMesh.position.x = camera.position.x;
  playerMesh.position.z = camera.position.z;

  const targetH = isProne ? PRONE_HEIGHT * 0.85 : (isSliding ? SLIDE_HEIGHT * 0.85 : PLAYER_HEIGHT * 0.85);
  if (camera.position.y < targetH) {
    camera.position.y = targetH;
    velocityY = 0;
    canJump = true;
  }

  const b = MAP_SIZE - 1.5;
  camera.position.x = Math.max(-b, Math.min(b, camera.position.x));
  camera.position.z = Math.max(-b, Math.min(b, camera.position.z));

  if (weaponMesh && !isADS && !isSliding && !wantsMove) {
    const t = Date.now() * 0.001;
    weaponMesh.position.x = 0.25 + Math.sin(t * 1.3) * 0.003;
    weaponMesh.position.y = -0.22 + Math.cos(t * 0.9) * 0.002;
  }

  pickups.forEach(p => {
    if (!p.active) return;
    const dist = p.mesh.position.distanceTo(camera.position);
    if (dist < 1.6) {
      if (p.type === 'health' && myHealth < MAX_HEALTH) {
        myHealth = Math.min(MAX_HEALTH, myHealth + p.value);
        updateHUD(); p.active = false; p.mesh.visible = false;
        showNotif('+' + p.value + ' HEALTH');
        setTimeout(() => { p.active = true; p.mesh.visible = true; }, 20000);
      } else if (p.type === 'ammo') {
        reserveAmmo += p.value; updateHUD(); p.active = false; p.mesh.visible = false;
        showNotif('+' + p.value + ' AMMO');
        setTimeout(() => { p.active = true; p.mesh.visible = true; }, 15000);
      }
    }
  });
}

// ── Floating labels ────────────────────────────────────────────
function worldToScreen(wp) {
  const v = wp.clone().project(camera);
  return { x: (v.x * 0.5 + 0.5) * innerWidth, y: (-v.y * 0.5 + 0.5) * innerHeight };
}

function updateFloatingLabel(labelEl, worldPos, yOffset, hpFrac, safeName) {
  if (!labelEl) return;
  const wp = worldPos.clone();
  wp.y += yOffset;
  const v = wp.project(camera);
  if (v.z > 1) { labelEl.style.display = 'none'; return; }
  const sx = (v.x * 0.5 + 0.5) * innerWidth;
  const sy = (-v.y * 0.5 + 0.5) * innerHeight;
  if (sx < 0 || sx > innerWidth || sy < 0 || sy > innerHeight) { labelEl.style.display = 'none'; return; }
  labelEl.style.display = 'block';
  labelEl.style.left = sx + 'px';
  labelEl.style.top = sy + 'px';
  if (safeName) {
    const hpEl = document.getElementById('flhp-' + safeName);
    if (hpEl && hpFrac !== undefined) hpEl.style.width = (hpFrac * 100) + '%';
  }
}

function updateAllLabels() {
  Object.values(players).forEach(rp =>
    updateFloatingLabel(rp.label, rp.mesh.position, PLAYER_HEIGHT + 0.5, (rp.data?.health || MAX_HEALTH) / MAX_HEALTH, rp.safeName)
  );
}

// ── HUD ────────────────────────────────────────────────────────
function updateHUD() {
  const hp = Math.round(myHealth);
  if (healthNum) healthNum.textContent = hp;
  if (healthBar)  healthBar.style.width = (hp / MAX_HEALTH * 100) + '%';
  if (hp > 60) {
    if (healthNum) healthNum.style.color = '#44ff88';
    if (healthBar)  healthBar.style.background = 'linear-gradient(90deg,#22cc44,#88ff44)';
    if (lowHealthVig) lowHealthVig.classList.remove('active');
  } else if (hp > 30) {
    if (healthNum) healthNum.style.color = '#ffcc00';
    if (healthBar)  healthBar.style.background = 'linear-gradient(90deg,#cc8800,#ffcc00)';
    if (lowHealthVig) lowHealthVig.classList.remove('active');
  } else {
    if (healthNum) healthNum.style.color = '#ff2222';
    if (healthBar)  healthBar.style.background = 'linear-gradient(90deg,#cc1111,#ff4444)';
    if (lowHealthVig) lowHealthVig.classList.add('active');
  }

  if (ammoMag) ammoMag.textContent = ammoInMag;
  if (ammoRes) ammoRes.textContent = reserveAmmo;
  if (weaponNameHud) weaponNameHud.textContent = currentWeapon?.name || '';
  if (fireModeHud)  fireModeHud.textContent = currentWeapon?.auto ? '● AUTO' : (currentWeapon?.burst ? '▐ BURST' : '◘ SEMI');

  const lowAmmo = ammoInMag <= Math.floor((currentWeapon?.magSize || 30) * 0.25) && ammoInMag > 0;
  if (ammoWarning) {
    ammoWarning.classList.toggle('show', lowAmmo || ammoInMag === 0);
    ammoWarning.textContent = ammoInMag === 0 ? '⚠ EMPTY' : '⚠ LOW AMMO';
  }

  updateWeaponBar();
}

function showHitMarker() {
  const hm = document.getElementById('hit-marker');
  if (!hm) return;
  hm.classList.remove('flash');
  void hm.offsetWidth;
  hm.classList.add('flash');
}

function addKillFeed(killer, victim, animType) {
  if (!killFeed) return;
  const a = KILL_ANIMATIONS[animType] || KILL_ANIMATIONS.fire;
  const div = document.createElement('div');
  div.className = 'kill-entry' + (killer === myName ? ' my-kill' : '');
  div.innerHTML = `<span class="ke-killer">${killer}</span><span>${a.emoji}</span><span class="ke-victim">${victim}</span>`;
  killFeed.appendChild(div);
  if (killFeed.children.length > 8) killFeed.removeChild(killFeed.firstChild);
  setTimeout(() => div.remove(), 4000);
}

function updateScoreUI() {
  if (!scoreList) return;
  const sorted = Object.entries(scores).sort((a, b) => (b[1].kills || 0) - (a[1].kills || 0));
  const myKey = myId || 'local';
  scoreList.innerHTML = sorted.slice(0, 8).map(([id, s]) =>
    `<div class="sc-entry${id === myKey ? ' me' : ''}">
      <span>${s.name}</span><span class="sc-kills">${s.kills || 0}</span>
    </div>`
  ).join('');
}

let notifTO = null;
function showNotif(msg) {
  const el = document.getElementById('notif');
  if (!el) return;
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(notifTO);
  notifTO = setTimeout(() => el.style.opacity = '0', 2200);
}

// ── Game start ─────────────────────────────────────────────────
async function startGame() {
  lobbyScreen.style.display = 'none';
  if (hud) hud.style.display = 'block';
  initThree();
  buildMap();
  createLocalPlayer();
  spawnBots();
  // Use 'local' as placeholder key until Firebase assigns a real myId
  scores['local'] = { name: myName, kills: 0 };
  updateScoreUI();
  updateHUD();
  updateWeaponBar();
  await initFirebase();
  initInput();
  gameStarted = true;
  if (pointerMsg) pointerMsg.style.display = 'flex';
  renderer.setAnimationLoop(gameLoop);
}

// ── Game loop ──────────────────────────────────────────────────
function gameLoop() {
  const dt = Math.min(clock.getDelta(), 0.05);
  updatePlayer(dt);
  updateBullets(dt);
  updateBots(dt);
  updateReload(dt);
  updateAllLabels();
  const now = Date.now();
  if (now - lastTickTime > TICK_RATE) { lastTickTime = now; pushPos(); }
  renderer.render(scene, camera);
}
