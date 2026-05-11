// ============================================================
//  WEAPONS.JS — Weapon Definitions + HD 3D Meshes + Skins
//  WARZONE 3D — All weapons with realistic geometry and materials
// ============================================================

import { WEAPON_SKINS } from './animations.js';

export const WEAPON_CATEGORIES = {
  ASSAULT_RIFLE: "Assault Rifle",
  SMG:           "SMG",
  SNIPER:        "Sniper Rifle",
  SHOTGUN:       "Shotgun",
  PISTOL:        "Pistol",
  LMG:           "LMG"
};

export const WEAPONS = {
  // ── ASSAULT RIFLES ──────────────────────────────────────────
  m4a1: {
    id:"m4a1", name:"M4A1", category:"ASSAULT_RIFLE",
    icon:"🔫", emoji:"⚡",
    damage:28, fireRate:720, reloadTime:2.4,
    magSize:30, reserveAmmo:120, range:80,
    recoil:0.03, spread:0.015, auto:true,
    bulletSpeed:120, bulletColor:0xffdd44,
    description:"Versatile AR, reliable all-rounder",
    stats:{dmg:7,rof:8,range:8,reload:7,control:8}
  },
  ak47: {
    id:"ak47", name:"AK-47", category:"ASSAULT_RIFLE",
    icon:"🔫", emoji:"💥",
    damage:36, fireRate:600, reloadTime:2.7,
    magSize:30, reserveAmmo:120, range:70,
    recoil:0.055, spread:0.022, auto:true,
    bulletSpeed:115, bulletColor:0xff8844,
    description:"High damage, punishing recoil",
    stats:{dmg:9,rof:6,range:7,reload:6,control:5}
  },
  scar: {
    id:"scar", name:"SCAR-L", category:"ASSAULT_RIFLE",
    icon:"🔫", emoji:"🎯",
    damage:32, fireRate:650, reloadTime:2.5,
    magSize:30, reserveAmmo:120, range:85,
    recoil:0.04, spread:0.018, auto:true,
    bulletSpeed:125, bulletColor:0xffee66,
    description:"Long-range AR with top accuracy",
    stats:{dmg:8,rof:7,range:9,reload:7,control:7}
  },
  m16: {
    id:"m16", name:"M16A4", category:"ASSAULT_RIFLE",
    icon:"🔫", emoji:"🔒",
    damage:35, fireRate:800, reloadTime:2.2,
    magSize:30, reserveAmmo:120, range:75,
    recoil:0.025, spread:0.012, auto:false, burst:3,
    bulletSpeed:120, bulletColor:0xffffaa,
    description:"3-round burst precision rifle",
    stats:{dmg:8,rof:9,range:8,reload:8,control:9}
  },
  famas: {
    id:"famas", name:"FAMAS", category:"ASSAULT_RIFLE",
    icon:"🔫", emoji:"🇫🇷",
    damage:30, fireRate:1000, reloadTime:2.0,
    magSize:25, reserveAmmo:100, range:70,
    recoil:0.035, spread:0.018, auto:false, burst:3,
    bulletSpeed:130, bulletColor:0xccff88,
    description:"Bullpup burst rifle, ultra fast ROF",
    stats:{dmg:7,rof:10,range:7,reload:8,control:7}
  },

  // ── SMGs ────────────────────────────────────────────────────
  mp5: {
    id:"mp5", name:"MP5", category:"SMG",
    icon:"🔫", emoji:"⚡",
    damage:20, fireRate:900, reloadTime:1.8,
    magSize:30, reserveAmmo:150, range:40,
    recoil:0.025, spread:0.025, auto:true,
    bulletSpeed:100, bulletColor:0xaaffff,
    description:"Fast-fire CQB classic",
    stats:{dmg:5,rof:9,range:4,reload:9,control:7}
  },
  uzi: {
    id:"uzi", name:"UZI", category:"SMG",
    icon:"🔫", emoji:"💨",
    damage:18, fireRate:1100, reloadTime:1.6,
    magSize:25, reserveAmmo:150, range:30,
    recoil:0.03, spread:0.035, auto:true,
    bulletSpeed:95, bulletColor:0x88ffff,
    description:"Extreme fire rate — melt CQB",
    stats:{dmg:4,rof:10,range:3,reload:9,control:5}
  },
  pp19: {
    id:"pp19", name:"PP-19 BIZON", category:"SMG",
    icon:"🔫", emoji:"🌀",
    damage:22, fireRate:750, reloadTime:2.0,
    magSize:53, reserveAmmo:106, range:45,
    recoil:0.02, spread:0.02, auto:true,
    bulletSpeed:100, bulletColor:0xccffcc,
    description:"53-round drum, sustained suppression",
    stats:{dmg:5,rof:8,range:5,reload:7,control:8}
  },
  kriss: {
    id:"kriss", name:"KRISS VECTOR", category:"SMG",
    icon:"🔫", emoji:"🌪️",
    damage:24, fireRate:1200, reloadTime:1.9,
    magSize:25, reserveAmmo:100, range:35,
    recoil:0.022, spread:0.028, auto:true,
    bulletSpeed:98, bulletColor:0xffaacc,
    description:".45 ACP with near-zero recoil system",
    stats:{dmg:6,rof:10,range:3,reload:8,control:9}
  },

  // ── SNIPER RIFLES ────────────────────────────────────────────
  awm: {
    id:"awm", name:"AWM", category:"SNIPER",
    icon:"🎯", emoji:"💀",
    damage:120, fireRate:45, reloadTime:3.5,
    magSize:5, reserveAmmo:20, range:300,
    recoil:0.12, spread:0.001, auto:false,
    bulletSpeed:300, bulletColor:0xffffff,
    description:"One-shot headshot sniper — crown jewel",
    stats:{dmg:10,rof:1,range:10,reload:3,control:6}
  },
  kar98: {
    id:"kar98", name:"KAR98K", category:"SNIPER",
    icon:"🎯", emoji:"☠️",
    damage:90, fireRate:50, reloadTime:3.2,
    magSize:5, reserveAmmo:25, range:250,
    recoil:0.10, spread:0.002, auto:false,
    bulletSpeed:280, bulletColor:0xeeeeff,
    description:"Classic bolt-action precision",
    stats:{dmg:9,rof:2,range:10,reload:4,control:6}
  },
  mini14: {
    id:"mini14", name:"MINI14", category:"SNIPER",
    icon:"🎯", emoji:"🔭",
    damage:48, fireRate:280, reloadTime:2.8,
    magSize:20, reserveAmmo:60, range:180,
    recoil:0.05, spread:0.005, auto:false,
    bulletSpeed:220, bulletColor:0xffeecc,
    description:"Semi-auto marksman rifle",
    stats:{dmg:6,rof:5,range:9,reload:6,control:7}
  },
  barret: {
    id:"barret", name:"BARRETT M82", category:"SNIPER",
    icon:"🎯", emoji:"🔱",
    damage:150, fireRate:35, reloadTime:4.2,
    magSize:10, reserveAmmo:30, range:350,
    recoil:0.18, spread:0.0008, auto:false,
    bulletSpeed:380, bulletColor:0xfff0cc,
    description:".50 BMG — obliterates through cover",
    stats:{dmg:10,rof:1,range:10,reload:2,control:4}
  },

  // ── SHOTGUNS ─────────────────────────────────────────────────
  s12k: {
    id:"s12k", name:"S12K", category:"SHOTGUN",
    icon:"💥", emoji:"🔨",
    damage:15, fireRate:240, reloadTime:2.5,
    magSize:8, reserveAmmo:40, range:20, pellets:8,
    recoil:0.08, spread:0.12, auto:false,
    bulletSpeed:80, bulletColor:0xff6600,
    description:"Semi-auto shotgun — 8 pellets",
    stats:{dmg:9,rof:4,range:2,reload:6,control:4}
  },
  dp12: {
    id:"dp12", name:"DP-12", category:"SHOTGUN",
    icon:"💥", emoji:"💣",
    damage:22, fireRate:120, reloadTime:3.5,
    magSize:12, reserveAmmo:36, range:15, pellets:6,
    recoil:0.14, spread:0.14, auto:false,
    bulletSpeed:70, bulletColor:0xff4400,
    description:"Double-barrel pump — devastating",
    stats:{dmg:10,rof:2,range:1,reload:3,control:3}
  },

  // ── PISTOLS ──────────────────────────────────────────────────
  deagle: {
    id:"deagle", name:"DESERT EAGLE", category:"PISTOL",
    icon:"🔫", emoji:"👑",
    damage:55, fireRate:180, reloadTime:1.8,
    magSize:7, reserveAmmo:35, range:50,
    recoil:0.08, spread:0.015, auto:false,
    bulletSpeed:130, bulletColor:0xffd700,
    description:"Powerful semi-auto .50 AE",
    stats:{dmg:8,rof:3,range:5,reload:8,control:5}
  },
  m9: {
    id:"m9", name:"M9 BERETTA", category:"PISTOL",
    icon:"🔫", emoji:"⚡",
    damage:25, fireRate:400, reloadTime:1.4,
    magSize:15, reserveAmmo:60, range:40,
    recoil:0.035, spread:0.02, auto:false,
    bulletSpeed:110, bulletColor:0xffcc88,
    description:"Standard 9mm sidearm",
    stats:{dmg:5,rof:6,range:4,reload:9,control:7}
  },
  p90: {
    id:"p90", name:"P90", category:"PISTOL",
    icon:"🔫", emoji:"🌪️",
    damage:16, fireRate:900, reloadTime:2.0,
    magSize:50, reserveAmmo:100, range:35,
    recoil:0.02, spread:0.028, auto:true,
    bulletSpeed:95, bulletColor:0xaaddff,
    description:"High-cap PDW with auto fire",
    stats:{dmg:4,rof:9,range:3,reload:7,control:7}
  },

  // ── LMGs ────────────────────────────────────────────────────
  m249: {
    id:"m249", name:"M249 SAW", category:"LMG",
    icon:"🔫", emoji:"🔥",
    damage:30, fireRate:800, reloadTime:4.5,
    magSize:100, reserveAmmo:200, range:60,
    recoil:0.045, spread:0.03, auto:true,
    bulletSpeed:110, bulletColor:0xffaa44,
    description:"200-round belt suppression king",
    stats:{dmg:7,rof:8,range:6,reload:2,control:5}
  },
  pkm: {
    id:"pkm", name:"PKM", category:"LMG",
    icon:"🔫", emoji:"💪",
    damage:38, fireRate:650, reloadTime:5.0,
    magSize:75, reserveAmmo:150, range:65,
    recoil:0.055, spread:0.028, auto:true,
    bulletSpeed:115, bulletColor:0xff8822,
    description:"Russian heavy machine gun",
    stats:{dmg:9,rof:7,range:7,reload:1,control:4}
  }
};

export function getWeaponsByCategory(cat) {
  return Object.values(WEAPONS).filter(w => w.category === cat);
}

// ── Material helpers ───────────────────────────────────────────
function skinMat(THREE, skinDef, slot, extra = {}) {
  const s = skinDef || WEAPON_SKINS.default;
  return new THREE.MeshPhongMaterial({
    color:             s.colors[slot]           || 0x222222,
    emissive:          s.emissive[slot]         || 0x000000,
    emissiveIntensity: s.emissiveIntensity[slot]|| 0,
    shininess:         s.shininess[slot]        || 80,
    ...extra
  });
}

function makeMat(THREE, color, shininess = 80, emissive = 0x000000, emissiveIntensity = 0) {
  return new THREE.MeshPhongMaterial({ color, shininess, emissive, emissiveIntensity });
}

function addPart(group, geo, mat, px, py, pz, rx=0, ry=0, rz=0, sx=1, sy=1, sz=1) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(px, py, pz);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function box(THREE, w, h, d)             { return new THREE.BoxGeometry(w, h, d); }
function cyl(THREE, rt, rb, h, seg=12)   { return new THREE.CylinderGeometry(rt, rb, h, seg); }
function sph(THREE, r, seg=8)            { return new THREE.SphereGeometry(r, seg, seg); }

// ── Main factory ───────────────────────────────────────────────
export function createWeaponMesh(weaponId, THREE, skinId = 'default') {
  const weapon = WEAPONS[weaponId];
  if (!weapon) return null;
  const skin = WEAPON_SKINS[skinId] || WEAPON_SKINS.default;

  const builders = {
    m4a1:   (s) => build_M4A1(THREE, s),
    ak47:   (s) => build_AK47(THREE, s),
    scar:   (s) => build_SCAR(THREE, s),
    m16:    (s) => build_M16(THREE, s),
    famas:  (s) => build_FAMAS(THREE, s),
    mp5:    (s) => build_MP5(THREE, s),
    uzi:    (s) => build_UZI(THREE, s),
    pp19:   (s) => build_PP19(THREE, s),
    kriss:  (s) => build_KRISS(THREE, s),
    awm:    (s) => build_AWM(THREE, s),
    kar98:  (s) => build_KAR98(THREE, s),
    mini14: (s) => build_MINI14(THREE, s),
    barret: (s) => build_BARRET(THREE, s),
    s12k:   (s) => build_S12K(THREE, s),
    dp12:   (s) => build_DP12(THREE, s),
    deagle: (s) => build_DEAGLE(THREE, s),
    m9:     (s) => build_M9(THREE, s),
    p90:    (s) => build_P90(THREE, s),
    m249:   (s) => build_M249(THREE, s),
    pkm:    (s) => build_PKM(THREE, s),
  };

  const fn = builders[weaponId];
  const group = fn ? fn(skin) : buildGeneric(THREE, weapon, skin);
  group.userData = { weaponId, weapon, skinId };

  // Add animated skin particles for special skins
  if (skin.particleEffect) addSkinParticles(group, skin, THREE);

  return group;
}

// ── Skin particle effect (emissive glow pulsing) ───────────────
function addSkinParticles(group, skin, THREE) {
  const stripeColor = skin.stripeColor || 0x333333;
  const emissive    = skin.stripeEmissive || 0x000000;
  const intensity   = skin.stripeEmissiveIntensity || 0;

  // Pulsing emissive sphere overlay (subtle glow orb at muzzle)
  const glowMat = new THREE.MeshPhongMaterial({
    color: stripeColor,
    emissive: emissive,
    emissiveIntensity: intensity,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const glowSph = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), glowMat);
  glowSph.position.set(0, 0.012, -0.58);
  glowSph.userData.isSkinGlow = true;
  group.add(glowSph);
}

// ── Stripe helper (skin-colored accent stripe) ─────────────────
function addStripe(g, THREE, skin, px, py, pz, w, h, d) {
  const s = skin || WEAPON_SKINS.default;
  const mat = new THREE.MeshPhongMaterial({
    color:             s.stripeColor             || 0x333333,
    emissive:          s.stripeEmissive          || 0x000000,
    emissiveIntensity: s.stripeEmissiveIntensity || 0,
    shininess: 200
  });
  addPart(g, box(THREE, w, h, d), mat, px, py, pz);
}

// ═══════════════════════════════════════════════════════════════
//  ASSAULT RIFLES
// ═══════════════════════════════════════════════════════════════

function build_M4A1(THREE, skin) {
  const g   = new THREE.Group();
  const P   = skinMat(THREE, skin, 'primary');
  const S   = skinMat(THREE, skin, 'secondary');
  const A   = skinMat(THREE, skin, 'accent');
  const met = makeMat(THREE, 0x2e2e2e, 160);
  const alu = makeMat(THREE, 0x3a3a3a, 200);
  const tan = skinMat(THREE, skin, 'primary');

  // Upper receiver
  addPart(g, box(THREE, 0.055, 0.055, 0.38), S,  0,  0.015, -0.01);
  addPart(g, box(THREE, 0.008, 0.012, 0.04), alu, 0.027, 0.025, 0.04);
  // Lower receiver
  addPart(g, box(THREE, 0.052, 0.048, 0.22), P,  0, -0.018, 0.03);
  addPart(g, box(THREE, 0.042, 0.005, 0.06), P,  0, -0.048, 0.04);
  addPart(g, box(THREE, 0.042, 0.022, 0.005), P, 0, -0.037, 0.01);
  addPart(g, box(THREE, 0.042, 0.022, 0.005), P, 0, -0.037, 0.07);
  addPart(g, box(THREE, 0.006, 0.018, 0.007), met, 0, -0.038, 0.042);

  // Pistol grip
  addPart(g, box(THREE, 0.038, 0.070, 0.045), P,  0.004, -0.072, 0.115);
  addPart(g, box(THREE, 0.034, 0.018, 0.038), P,  0.004, -0.102, 0.105);
  for (let i=0;i<4;i++) addPart(g, box(THREE, 0.041, 0.008, 0.005), S, 0.001, -0.058-i*0.012, 0.112);

  // Curved 30-round magazine
  const mag = new THREE.Group();
  addPart(mag, box(THREE, 0.038, 0.090, 0.028), S,  0, 0,      0);
  addPart(mag, box(THREE, 0.036, 0.018, 0.024), S,  0, -0.054, 0.004);
  addPart(mag, box(THREE, 0.034, 0.012, 0.020), P,  0, -0.064, 0.007);
  for (let i=0;i<3;i++) addPart(mag, box(THREE, 0.041, 0.004, 0.002), A, 0, -0.010+i*0.022, 0.015);
  addPart(mag, box(THREE, 0.040, 0.006, 0.005), met, 0, 0.048, -0.012);
  mag.position.set(0, -0.075, 0.045);
  mag.rotation.x = 0.08;
  g.add(mag);

  // Barrel assembly
  addPart(g, cyl(THREE, 0.014, 0.016, 0.06, 8), met, 0, 0.012, -0.22, Math.PI/2);
  addPart(g, cyl(THREE, 0.010, 0.012, 0.32, 10), met, 0, 0.012, -0.38, Math.PI/2);
  addPart(g, cyl(THREE, 0.005, 0.005, 0.28,  6), alu, 0, 0.028, -0.32, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.012, 0.045, 6), met, 0, 0.012, -0.565, Math.PI/2);
  for (let i=0;i<6;i++) {
    const a=(i/6)*Math.PI*2;
    addPart(g, box(THREE, 0.003, 0.018, 0.005), met, Math.cos(a)*0.014, 0.012+Math.sin(a)*0.014, -0.558);
  }

  // Quad-rail handguard
  addPart(g, box(THREE, 0.046, 0.046, 0.20), P,  0, 0.012, -0.16);
  addPart(g, box(THREE, 0.048, 0.008, 0.19), alu, 0,  0.040, -0.16);
  addPart(g, box(THREE, 0.008, 0.048, 0.19), alu, 0.029, 0.012, -0.16);
  addPart(g, box(THREE, 0.008, 0.048, 0.19), alu,-0.029, 0.012, -0.16);
  for (let i=0;i<10;i++) addPart(g, box(THREE, 0.050, 0.003, 0.006), alu, 0, 0.044, -0.065-i*0.019);

  // Picatinny top rail
  addPart(g, box(THREE, 0.022, 0.007, 0.38), alu, 0, 0.044, -0.01);
  for (let i=0;i<18;i++) addPart(g, box(THREE, 0.024, 0.003, 0.005), alu, 0, 0.048, 0.10-i*0.022);

  // Collapsible stock
  addPart(g, box(THREE, 0.038, 0.038, 0.14), S,  0, -0.008, 0.195);
  addPart(g, box(THREE, 0.060, 0.042, 0.028), P,  0, -0.006, 0.278);
  addPart(g, cyl(THREE, 0.012, 0.012, 0.11, 8), met, 0, -0.008, 0.205, Math.PI/2);
  addPart(g, box(THREE, 0.058, 0.055, 0.010), P,  0, -0.005, 0.290);

  // Iron sights
  addPart(g, box(THREE, 0.006, 0.022, 0.008), S, 0, 0.050, -0.52);
  addPart(g, box(THREE, 0.020, 0.006, 0.008), S, 0, 0.060, -0.52);
  addPart(g, box(THREE, 0.022, 0.016, 0.008), S, 0, 0.050,  0.085);
  addPart(g, box(THREE, 0.008, 0.008, 0.010), A, 0, 0.050,  0.082);

  addStripe(g, THREE, skin, 0.028, 0.022, -0.02, 0.002, 0.004, 0.36);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_AK47(THREE, skin) {
  const g   = new THREE.Group();
  const wood= skin.name === 'Default' ? makeMat(THREE, 0x6B3A2A, 50) : skinMat(THREE, skin, 'secondary');
  const met = skinMat(THREE, skin, 'secondary');
  const P   = skinMat(THREE, skin, 'primary');
  const A   = skinMat(THREE, skin, 'accent');

  addPart(g, box(THREE, 0.060, 0.058, 0.36), met,  0,  0.010, -0.005);
  addPart(g, box(THREE, 0.056, 0.010, 0.25), P,    0,  0.042,  0.005);
  addPart(g, box(THREE, 0.004, 0.022, 0.038), P,   0.031, 0.008, -0.015);

  addPart(g, cyl(THREE, 0.013, 0.015, 0.08,  8), met, 0, 0.012, -0.225, Math.PI/2);
  addPart(g, cyl(THREE, 0.009, 0.013, 0.34, 10), met, 0, 0.012, -0.405, Math.PI/2);
  addPart(g, box(THREE, 0.026, 0.022, 0.028), met,    0,  0.022, -0.285);
  addPart(g, cyl(THREE, 0.005, 0.005, 0.16,  6), A,   0,  0.038, -0.245, Math.PI/2);
  addPart(g, cyl(THREE, 0.016, 0.013, 0.055, 8), met, 0,  0.012, -0.595, Math.PI/2);
  addPart(g, box(THREE, 0.020, 0.006, 0.008), met,    0,  0.028, -0.595);

  // Curved banana mag
  const mag = new THREE.Group();
  addPart(mag, box(THREE, 0.042, 0.065, 0.032), P,  0,  0.010, 0);
  addPart(mag, box(THREE, 0.040, 0.040, 0.030), P,  0, -0.042, 0.006);
  addPart(mag, box(THREE, 0.038, 0.028, 0.026), P,  0, -0.064, 0.014);
  addPart(mag, box(THREE, 0.036, 0.018, 0.022), met,0, -0.078, 0.022);
  for (let i=0;i<4;i++) addPart(mag, box(THREE, 0.044, 0.004, 0.002), A, 0, -0.008+i*0.018, 0.017);
  mag.position.set(0, -0.072, 0.040);
  mag.rotation.x = 0.12;
  g.add(mag);

  addPart(g, box(THREE, 0.050, 0.040, 0.18), wood, 0, 0.010, -0.155);
  addPart(g, box(THREE, 0.044, 0.012, 0.18), P,    0, 0.030, -0.155);
  addPart(g, box(THREE, 0.044, 0.042, 0.18), wood, 0, -0.002, 0.205);
  addPart(g, box(THREE, 0.040, 0.054, 0.012), wood,0,  0.004, 0.300);
  addPart(g, box(THREE, 0.040, 0.065, 0.042), P,   0.003, -0.064, 0.108);
  addPart(g, box(THREE, 0.036, 0.016, 0.036), P,   0.003, -0.096, 0.100);
  addPart(g, box(THREE, 0.044, 0.005, 0.065), P,   0, -0.044, 0.048);
  addPart(g, box(THREE, 0.007, 0.022, 0.008), met, 0, -0.034, 0.042);

  // AK iron sights
  addPart(g, cyl(THREE, 0.010, 0.010, 0.030, 8), met, 0, 0.028, -0.555, Math.PI/2);
  addPart(g, box(THREE, 0.022, 0.020, 0.010), met, 0, 0.028, -0.548);
  addPart(g, box(THREE, 0.005, 0.014, 0.006), met, 0, 0.040, -0.548);
  addPart(g, box(THREE, 0.028, 0.018, 0.010), met, 0, 0.050, 0.095);

  addStripe(g, THREE, skin, 0.031, 0.018, -0.010, 0.002, 0.004, 0.34);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_SCAR(THREE, skin) {
  const g   = new THREE.Group();
  const P   = skinMat(THREE, skin, 'primary');
  const S   = skinMat(THREE, skin, 'secondary');
  const A   = skinMat(THREE, skin, 'accent');
  const alu = makeMat(THREE, 0x3c3c3c, 200);
  const met = makeMat(THREE, 0x2a2a2a, 150);

  addPart(g, box(THREE, 0.062, 0.058, 0.32), P, 0,  0.010, -0.005);
  addPart(g, box(THREE, 0.025, 0.008, 0.32), A, 0,  0.044,  0.000);
  for (let i=0;i<14;i++) addPart(g, box(THREE, 0.027, 0.003, 0.005), A, 0, 0.048, 0.095-i*0.023);

  addPart(g, box(THREE, 0.060, 0.050, 0.24), P,   0,  0.010, -0.14);
  addPart(g, box(THREE, 0.008, 0.050, 0.22), A,   0.035, 0.010, -0.14);
  addPart(g, box(THREE, 0.008, 0.050, 0.22), A,  -0.035, 0.010, -0.14);
  addPart(g, box(THREE, 0.060, 0.008, 0.22), S,   0, -0.016, -0.14);

  addPart(g, cyl(THREE, 0.013, 0.015, 0.07, 8), met, 0, 0.012, -0.22, Math.PI/2);
  addPart(g, cyl(THREE, 0.009, 0.013, 0.30, 10), met, 0, 0.012, -0.38, Math.PI/2);
  addPart(g, cyl(THREE, 0.016, 0.014, 0.04, 8), A,   0, 0.012, -0.545, Math.PI/2);

  addPart(g, box(THREE, 0.058, 0.048, 0.20), S, 0, -0.016, 0.025);
  addPart(g, box(THREE, 0.040, 0.072, 0.044), P, 0.002, -0.070, 0.108);
  addPart(g, box(THREE, 0.040, 0.092, 0.030), S, 0, -0.074, 0.046);
  for (let i=0;i<3;i++) addPart(g, box(THREE, 0.042, 0.004, 0.002), A, 0, -0.010+i*0.024, 0.062);

  addPart(g, box(THREE, 0.042, 0.040, 0.16), P, 0, -0.004, 0.200);
  addPart(g, box(THREE, 0.058, 0.046, 0.026), S, 0, -0.004, 0.288);

  addStripe(g, THREE, skin, 0.032, 0.018, -0.01, 0.002, 0.004, 0.30);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_M16(THREE, skin) {
  const g   = new THREE.Group();
  const P   = skinMat(THREE, skin, 'primary');
  const S   = skinMat(THREE, skin, 'secondary');
  const A   = skinMat(THREE, skin, 'accent');
  const met = makeMat(THREE, 0x2c2c2c, 150);
  const alu = makeMat(THREE, 0x383838, 200);

  addPart(g, box(THREE, 0.056, 0.056, 0.40), S,  0,  0.012,  0.010);
  addPart(g, box(THREE, 0.022, 0.007, 0.42), A,  0,  0.046,  0.010);
  for (let i=0;i<19;i++) addPart(g, box(THREE, 0.024, 0.003, 0.005), A, 0, 0.050, 0.115-i*0.022);

  addPart(g, cyl(THREE, 0.013, 0.015, 0.09,  8), met, 0, 0.012, -0.245, Math.PI/2);
  addPart(g, cyl(THREE, 0.009, 0.013, 0.40, 10), met, 0, 0.012, -0.450, Math.PI/2);
  addPart(g, cyl(THREE, 0.006, 0.006, 0.35,  6), alu, 0, 0.032, -0.390, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.012, 0.055, 6), met, 0, 0.012, -0.677, Math.PI/2);
  for (let i=0;i<6;i++) {
    const a=(i/6)*Math.PI*2;
    addPart(g, box(THREE, 0.003, 0.020, 0.006), met, Math.cos(a)*0.014, 0.012+Math.sin(a)*0.014, -0.668);
  }

  addPart(g, box(THREE, 0.038, 0.040, 0.22), P,  0, -0.005, 0.230);
  addPart(g, box(THREE, 0.054, 0.046, 0.012), S,  0, -0.003, 0.345);
  addPart(g, cyl(THREE, 0.026, 0.026, 0.22, 12), P,  0, 0.012, -0.19, Math.PI/2);
  addPart(g, box(THREE, 0.024, 0.006, 0.22), A,   0, 0.038, -0.190);
  addPart(g, box(THREE, 0.054, 0.046, 0.21), P,   0, -0.016, 0.040);
  addPart(g, box(THREE, 0.038, 0.072, 0.042), P,  0.002, -0.070, 0.110);
  addPart(g, box(THREE, 0.040, 0.092, 0.028), S,  0, -0.074, 0.050);

  addStripe(g, THREE, skin, 0.029, 0.020, 0.008, 0.002, 0.004, 0.40);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_FAMAS(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x222222, 150);

  // Bullpup — long receiver fills entire body
  addPart(g, box(THREE, 0.058, 0.060, 0.44), S, 0, 0.008, 0.060);
  addPart(g, box(THREE, 0.020, 0.006, 0.44), A, 0, 0.044, 0.060);

  // Short barrel protruding from front
  addPart(g, cyl(THREE, 0.011, 0.013, 0.06, 8), met, 0, 0.012, -0.185, Math.PI/2);
  addPart(g, cyl(THREE, 0.008, 0.011, 0.18, 10), met, 0, 0.012, -0.270, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.011, 0.04, 8), A,  0, 0.012, -0.380, Math.PI/2);

  // Carry handle on top (FAMAS signature)
  addPart(g, box(THREE, 0.020, 0.010, 0.28), P, 0, 0.068, 0.090);
  addPart(g, box(THREE, 0.020, 0.038, 0.008), P, 0, 0.053, -0.065);
  addPart(g, box(THREE, 0.020, 0.038, 0.008), P, 0, 0.053,  0.245);
  // Sight in handle
  addPart(g, box(THREE, 0.006, 0.008, 0.008), A, 0, 0.074, 0.230);
  addPart(g, box(THREE, 0.012, 0.010, 0.010), A, 0, 0.074, -0.060);

  // Grip (mid-body, bullpup style)
  addPart(g, box(THREE, 0.040, 0.070, 0.044), P, 0.002, -0.056, 0.040);
  addPart(g, box(THREE, 0.036, 0.018, 0.038), P, 0.002, -0.086, 0.032);
  // Trigger guard
  addPart(g, box(THREE, 0.044, 0.005, 0.060), P, 0, -0.032, 0.045);
  addPart(g, box(THREE, 0.044, 0.022, 0.005), P, 0, -0.022, 0.015);
  addPart(g, box(THREE, 0.044, 0.022, 0.005), P, 0, -0.022, 0.075);
  addPart(g, box(THREE, 0.006, 0.018, 0.007), met,0, -0.026, 0.042);

  // Magazine (straight)
  addPart(g, box(THREE, 0.038, 0.075, 0.028), S, 0, -0.068, 0.042);
  for (let i=0;i<3;i++) addPart(g, box(THREE, 0.040, 0.004, 0.002), A, 0, -0.018+i*0.020, 0.057);

  // Stock (built into body, cheek rest)
  addPart(g, box(THREE, 0.056, 0.038, 0.022), S, 0, 0.002, 0.300);
  addPart(g, box(THREE, 0.054, 0.054, 0.010), P, 0, 0.008, 0.316);

  addStripe(g, THREE, skin, 0.030, 0.018, 0.055, 0.002, 0.004, 0.42);
  return g;
}

// ═══════════════════════════════════════════════════════════════
//  SMGs
// ═══════════════════════════════════════════════════════════════

function build_MP5(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x252525, 150);
  const alu= makeMat(THREE, 0x333333, 200);

  addPart(g, box(THREE, 0.050, 0.052, 0.28), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.020, 0.006, 0.28), A, 0, 0.040, 0.010);
  addPart(g, cyl(THREE, 0.010, 0.012, 0.06, 8), met, 0, 0.010, -0.185, Math.PI/2);
  addPart(g, cyl(THREE, 0.007, 0.010, 0.22, 10), met, 0, 0.010, -0.305, Math.PI/2);

  const mag = new THREE.Group();
  addPart(mag, box(THREE, 0.034, 0.070, 0.025), P,  0,  0.005, 0);
  addPart(mag, box(THREE, 0.032, 0.025, 0.022), S,  0, -0.040, 0.005);
  addPart(mag, box(THREE, 0.030, 0.015, 0.018), P,  0, -0.056, 0.010);
  for (let i=0;i<3;i++) addPart(mag, box(THREE, 0.036, 0.004, 0.002), A, 0, -0.005+i*0.020, 0.014);
  mag.position.set(0, -0.068, 0.048);
  mag.rotation.x = 0.06;
  g.add(mag);

  addPart(g, box(THREE, 0.010, 0.008, 0.14), met, -0.024, -0.004, 0.205);
  addPart(g, box(THREE, 0.010, 0.008, 0.14), met,  0.024, -0.004, 0.205);
  addPart(g, box(THREE, 0.060, 0.012, 0.008), P,   0, -0.004, 0.278);
  addPart(g, box(THREE, 0.036, 0.065, 0.038), P,  0.002, -0.060, 0.108);
  addPart(g, box(THREE, 0.032, 0.015, 0.032), S,  0.002, -0.090, 0.100);
  addPart(g, box(THREE, 0.040, 0.005, 0.060), P,  0, -0.040, 0.052);
  addPart(g, box(THREE, 0.040, 0.020, 0.005), P,  0, -0.030, 0.022);
  addPart(g, box(THREE, 0.040, 0.020, 0.005), P,  0, -0.030, 0.082);

  addStripe(g, THREE, skin, 0.026, 0.018, 0.010, 0.002, 0.003, 0.26);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_UZI(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const met= makeMat(THREE, 0x202020, 140);

  addPart(g, box(THREE, 0.055, 0.060, 0.22), S,  0,  0.008, 0.020);
  addPart(g, box(THREE, 0.018, 0.005, 0.22), skinMat(THREE, skin, 'accent'), 0, 0.038, 0.020);
  addPart(g, cyl(THREE, 0.009, 0.012, 0.14, 10), met, 0, 0.010, -0.145, Math.PI/2);
  addPart(g, cyl(THREE, 0.018, 0.018, 0.12, 12), P,  0, 0.010, -0.130, Math.PI/2);
  addPart(g, box(THREE, 0.044, 0.090, 0.048), P,  0, -0.072, 0.070);
  addPart(g, box(THREE, 0.036, 0.070, 0.026), S,  0, -0.060, 0.072);
  addPart(g, box(THREE, 0.050, 0.010, 0.16), P,  0, 0.040, 0.180);

  addStripe(g, THREE, skin, 0.028, 0.015, 0.015, 0.002, 0.003, 0.20);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_PP19(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x222222, 140);
  const alu= makeMat(THREE, 0x2e2e2e, 180);

  addPart(g, box(THREE, 0.052, 0.054, 0.26), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.018, 0.005, 0.26), A, 0, 0.038, 0.010);
  addPart(g, cyl(THREE, 0.011, 0.013, 0.07, 8), met, 0, 0.010, -0.185, Math.PI/2);
  addPart(g, cyl(THREE, 0.008, 0.011, 0.20, 10), met, 0, 0.010, -0.295, Math.PI/2);

  // Drum mag
  const drum = new THREE.Group();
  addPart(drum, cyl(THREE, 0.050, 0.050, 0.046, 20), P, 0, 0, 0, Math.PI/2);
  addPart(drum, cyl(THREE, 0.048, 0.048, 0.006, 20), A, 0, 0, 0.026, Math.PI/2);
  addPart(drum, cyl(THREE, 0.048, 0.048, 0.006, 20), A, 0, 0,-0.026, Math.PI/2);
  addPart(drum, cyl(THREE, 0.012, 0.012, 0.048, 8), met, 0, 0, 0, Math.PI/2);
  for (let i=0;i<8;i++) {
    const a=(i/8)*Math.PI*2;
    addPart(drum, box(THREE, 0.004, 0.004, 0.046), S, Math.cos(a)*0.042, Math.sin(a)*0.042, 0);
  }
  drum.position.set(0, -0.068, 0.050);
  g.add(drum);

  addPart(g, box(THREE, 0.038, 0.070, 0.040), P, 0.002, -0.060, 0.108);
  addPart(g, box(THREE, 0.038, 0.040, 0.14),  S, 0, -0.005, 0.205);
  addPart(g, box(THREE, 0.054, 0.044, 0.024), P, 0, -0.003, 0.280);

  addStripe(g, THREE, skin, 0.027, 0.018, 0.010, 0.002, 0.003, 0.24);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_KRISS(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1c1c1c, 160);

  // Distinctive angular receiver
  addPart(g, box(THREE, 0.052, 0.055, 0.24), S, 0, 0.008, 0.010);
  addPart(g, box(THREE, 0.018, 0.005, 0.24), A, 0, 0.038, 0.010);

  // Short barrel
  addPart(g, cyl(THREE, 0.009, 0.012, 0.05, 8), met, 0, 0.010, -0.175, Math.PI/2);
  addPart(g, cyl(THREE, 0.007, 0.009, 0.17, 10), met, 0, 0.010, -0.260, Math.PI/2);
  addPart(g, cyl(THREE, 0.013, 0.010, 0.03, 8), A,  0, 0.010, -0.355, Math.PI/2);

  // Angled grip (KRISS signature)
  addPart(g, box(THREE, 0.042, 0.068, 0.040), P,  0.002, -0.050, 0.080);
  addPart(g, box(THREE, 0.038, 0.016, 0.034), P,  0.002, -0.079, 0.073);
  addPart(g, box(THREE, 0.042, 0.005, 0.058), P,  0, -0.030, 0.048);
  addPart(g, box(THREE, 0.042, 0.020, 0.005), P,  0, -0.020, 0.019);
  addPart(g, box(THREE, 0.042, 0.020, 0.005), P,  0, -0.020, 0.077);
  addPart(g, box(THREE, 0.006, 0.016, 0.007), met,0, -0.024, 0.041);

  // .45 ACP magazine
  addPart(g, box(THREE, 0.036, 0.078, 0.028), S, 0, -0.064, 0.046);
  for (let i=0;i<3;i++) addPart(g, box(THREE, 0.038, 0.004, 0.002), A, 0, -0.018+i*0.020, 0.061);

  // Folding stock
  addPart(g, box(THREE, 0.038, 0.036, 0.14), S, 0, -0.004, 0.200);
  addPart(g, box(THREE, 0.054, 0.040, 0.022), P, 0, -0.002, 0.276);
  addPart(g, box(THREE, 0.050, 0.038, 0.008), S, 0,  0.000, 0.289);

  addStripe(g, THREE, skin, 0.027, 0.016, 0.008, 0.002, 0.003, 0.22);
  return g;
}

// ═══════════════════════════════════════════════════════════════
//  SNIPER RIFLES
// ═══════════════════════════════════════════════════════════════

function build_AWM(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1e1e1e, 180);
  const alu= makeMat(THREE, 0x2a2a2a, 220);
  const tan= skin.name==='Default' ? makeMat(THREE, 0x8a7050, 60) : skinMat(THREE, skin, 'primary');

  addPart(g, box(THREE, 0.058, 0.055, 0.38), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.022, 0.008, 0.40), A, 0, 0.045, 0.008);

  // Very long barrel
  addPart(g, cyl(THREE, 0.015, 0.018, 0.10, 10), met, 0, 0.010, -0.260, Math.PI/2);
  addPart(g, cyl(THREE, 0.010, 0.015, 0.55, 12), met, 0, 0.010, -0.555, Math.PI/2);
  addPart(g, cyl(THREE, 0.022, 0.022, 0.065, 10), met, 0, 0.010, -0.865, Math.PI/2);
  for (let i=0;i<5;i++) addPart(g, box(THREE, 0.026, 0.006, 0.005), A, 0, 0.030, -0.830-i*0.013);

  // Box magazine
  addPart(g, box(THREE, 0.042, 0.065, 0.038), P, 0, -0.070, 0.048);
  addPart(g, box(THREE, 0.044, 0.008, 0.040), A, 0, -0.037, 0.048);

  // Bolt handle
  addPart(g, cyl(THREE, 0.006, 0.006, 0.052, 8), met, 0.054, 0.022, 0.020, 0, 0, Math.PI/2);
  addPart(g, sph(THREE, 0.012, 10), met, 0.082, 0.022, 0.020);

  // Large scope
  addPart(g, cyl(THREE, 0.022, 0.022, 0.28, 14), S, 0, 0.068, -0.060, Math.PI/2);
  addPart(g, cyl(THREE, 0.018, 0.022, 0.03, 10), S, 0, 0.068, -0.210, Math.PI/2);
  addPart(g, cyl(THREE, 0.018, 0.022, 0.03, 10), S, 0, 0.068,  0.090, Math.PI/2);
  addPart(g, cyl(THREE, 0.022, 0.022, 0.004, 14),
    makeMat(THREE, 0x4488ff, 200, 0x2266ff, 0.5), 0, 0.068, -0.222, Math.PI/2);
  addPart(g, cyl(THREE, 0.008, 0.008, 0.028, 8), met, 0,      0.094, -0.060);
  addPart(g, cyl(THREE, 0.008, 0.008, 0.028, 8), met, 0.034,  0.068, -0.060, 0, 0, Math.PI/2);
  addPart(g, box(THREE, 0.034, 0.014, 0.016), alu, 0, 0.060, -0.110);
  addPart(g, box(THREE, 0.034, 0.014, 0.016), alu, 0, 0.060, -0.010);

  // Thumbhole stock
  addPart(g, box(THREE, 0.044, 0.065, 0.22), tan, 0,  0.002, 0.230);
  addPart(g, box(THREE, 0.040, 0.024, 0.09), P,   0, -0.028, 0.185);
  addPart(g, box(THREE, 0.062, 0.058, 0.016), P,  0,  0.003, 0.348);

  // Bipod
  addPart(g, box(THREE, 0.006, 0.038, 0.006), met, -0.020, -0.010, -0.270);
  addPart(g, box(THREE, 0.006, 0.038, 0.006), met,  0.020, -0.010, -0.270);
  addPart(g, box(THREE, 0.046, 0.006, 0.008), met,  0.000, -0.010, -0.270);

  addStripe(g, THREE, skin, 0.030, 0.020, 0.010, 0.002, 0.003, 0.38);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_KAR98(THREE, skin) {
  const g  = new THREE.Group();
  const wood= skin.name==='Default' ? makeMat(THREE, 0x5C3317, 40) : skinMat(THREE, skin, 'secondary');
  const met = skinMat(THREE, skin, 'primary');
  const S   = skinMat(THREE, skin, 'secondary');

  addPart(g, box(THREE, 0.048, 0.048, 0.62), wood, 0, -0.005, 0.090);
  addPart(g, box(THREE, 0.040, 0.035, 0.30), wood, 0, -0.010, -0.19);
  addPart(g, box(THREE, 0.052, 0.055, 0.22), met,  0,  0.012, -0.005);
  addPart(g, cyl(THREE, 0.012, 0.014, 0.10, 10), met, 0, 0.012, -0.255, Math.PI/2);
  addPart(g, cyl(THREE, 0.008, 0.012, 0.42, 12), met, 0, 0.012, -0.515, Math.PI/2);

  addPart(g, cyl(THREE, 0.007, 0.007, 0.065, 8), met, 0.055, 0.022, 0.050, 0, 0, Math.PI/2);
  addPart(g, cyl(THREE, 0.007, 0.007, 0.040, 8), met, 0.088, 0.014, 0.050, 0.4, 0, Math.PI/2);
  addPart(g, sph(THREE, 0.013, 10), met, 0.106, 0.008, 0.058);

  addPart(g, box(THREE, 0.036, 0.020, 0.040), S,   0, -0.030, 0.040);
  addPart(g, box(THREE, 0.022, 0.024, 0.012), met, 0,  0.048, 0.085);
  addPart(g, box(THREE, 0.005, 0.016, 0.006), met, 0,  0.058, 0.084);
  addPart(g, box(THREE, 0.016, 0.010, 0.010), met, 0,  0.042,-0.680);

  addStripe(g, THREE, skin, 0.027, 0.020, 0.080, 0.002, 0.003, 0.60);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_MINI14(THREE, skin) {
  const g  = new THREE.Group();
  const wood= skin.name==='Default' ? makeMat(THREE, 0x7B4F2A, 50) : skinMat(THREE, skin, 'secondary');
  const met = skinMat(THREE, skin, 'primary');
  const A   = skinMat(THREE, skin, 'accent');
  const alu = makeMat(THREE, 0x303030, 200);

  addPart(g, box(THREE, 0.050, 0.055, 0.30), met,  0, 0.010, 0.005);
  addPart(g, box(THREE, 0.048, 0.044, 0.24), wood, 0, 0.005, -0.165);
  addPart(g, box(THREE, 0.046, 0.050, 0.20), wood, 0, 0.000, 0.215);
  addPart(g, cyl(THREE, 0.011, 0.013, 0.08, 8), met,  0, 0.010, -0.240, Math.PI/2);
  addPart(g, cyl(THREE, 0.007, 0.011, 0.36, 12), met, 0, 0.010, -0.470, Math.PI/2);
  addPart(g, box(THREE, 0.036, 0.075, 0.030), met, 0, -0.072, 0.050);
  for (let i=0;i<3;i++) addPart(g, box(THREE, 0.038, 0.004, 0.002), A, 0, -0.015+i*0.020, 0.066);
  addPart(g, box(THREE, 0.038, 0.065, 0.040), wood, 0, -0.060, 0.108);

  addStripe(g, THREE, skin, 0.026, 0.020, 0.010, 0.002, 0.003, 0.29);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_BARRET(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1a1a1a, 180);
  const alu= makeMat(THREE, 0x282828, 220);

  // Very heavy receiver
  addPart(g, box(THREE, 0.072, 0.068, 0.42), S,  0,  0.012,  0.010);
  addPart(g, box(THREE, 0.025, 0.010, 0.44), A,  0,  0.052,  0.008);

  // Massive .50 cal barrel
  addPart(g, cyl(THREE, 0.020, 0.024, 0.14, 12), met, 0, 0.012, -0.310, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.020, 0.60, 14), met, 0, 0.012, -0.680, Math.PI/2);
  // Massive muzzle brake
  addPart(g, cyl(THREE, 0.028, 0.028, 0.075, 10), met, 0, 0.012, -1.000, Math.PI/2);
  for (let i=0;i<5;i++) addPart(g, box(THREE, 0.032, 0.008, 0.006), A, 0, 0.034, -0.965-i*0.015);

  // Scope (large long-range)
  addPart(g, cyl(THREE, 0.026, 0.026, 0.36, 14), S, 0, 0.076, -0.080, Math.PI/2);
  addPart(g, cyl(THREE, 0.022, 0.026, 0.040, 10), S, 0, 0.076, -0.270, Math.PI/2);
  addPart(g, cyl(THREE, 0.022, 0.026, 0.040, 10), S, 0, 0.076,  0.100, Math.PI/2);
  addPart(g, cyl(THREE, 0.026, 0.026, 0.004, 14),
    makeMat(THREE, 0x2266ff, 200, 0x1144ff, 0.6), 0, 0.076, -0.285, Math.PI/2);

  // Box magazine (10-round)
  addPart(g, box(THREE, 0.058, 0.085, 0.052), P, 0, -0.080, 0.052);
  addPart(g, box(THREE, 0.060, 0.010, 0.054), A, 0, -0.040, 0.052);

  // Folding stock
  addPart(g, box(THREE, 0.058, 0.068, 0.05), S, 0, 0.002, 0.250);
  addPart(g, box(THREE, 0.044, 0.022, 0.20), P, 0, -0.010, 0.330);
  addPart(g, box(THREE, 0.070, 0.072, 0.020), S, 0, 0.003, 0.435);

  // Pistol grip
  addPart(g, box(THREE, 0.050, 0.082, 0.054), P, 0.003, -0.075, 0.110);
  addPart(g, box(THREE, 0.046, 0.020, 0.046), P, 0.003, -0.112, 0.102);

  // Bipod (heavy extended)
  addPart(g, box(THREE, 0.012, 0.010, 0.014), met, 0, -0.022, -0.420);
  addPart(g, box(THREE, 0.008, 0.090, 0.008), met, -0.030, -0.068, -0.420);
  addPart(g, box(THREE, 0.008, 0.090, 0.008), met,  0.030, -0.068, -0.420);
  addPart(g, box(THREE, 0.008, 0.014, 0.012), met, -0.030, -0.116, -0.420);
  addPart(g, box(THREE, 0.008, 0.014, 0.012), met,  0.030, -0.116, -0.420);

  addStripe(g, THREE, skin, 0.037, 0.022, 0.012, 0.002, 0.004, 0.42);
  return g;
}

// ═══════════════════════════════════════════════════════════════
//  SHOTGUNS
// ═══════════════════════════════════════════════════════════════

function build_S12K(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x242424, 150);
  const alu= makeMat(THREE, 0x303030, 200);

  addPart(g, box(THREE, 0.072, 0.062, 0.28), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.022, 0.006, 0.28), A, 0, 0.044, 0.010);
  addPart(g, cyl(THREE, 0.018, 0.022, 0.07, 10), met, 0, 0.010, -0.215, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.018, 0.28, 12), met, 0, 0.010, -0.370, Math.PI/2);
  addPart(g, cyl(THREE, 0.016, 0.014, 0.030, 8), A,   0, 0.010, -0.525, Math.PI/2);

  addPart(g, box(THREE, 0.058, 0.068, 0.042), P, 0, -0.070, 0.048);
  addPart(g, box(THREE, 0.060, 0.008, 0.044), A, 0, -0.036, 0.048);
  for (let i=0;i<2;i++) addPart(g, box(THREE, 0.060, 0.004, 0.002), A, 0, -0.040+i*0.022, 0.071);

  addPart(g, box(THREE, 0.046, 0.072, 0.048), P, 0.003, -0.070, 0.112);
  addPart(g, box(THREE, 0.012, 0.010, 0.16), met, -0.026, -0.002, 0.210);
  addPart(g, box(THREE, 0.012, 0.010, 0.16), met,  0.026, -0.002, 0.210);
  addPart(g, box(THREE, 0.064, 0.014, 0.010), P,   0, -0.002, 0.293);

  addStripe(g, THREE, skin, 0.037, 0.018, 0.010, 0.002, 0.004, 0.26);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_DP12(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const brn= skin.name==='Default' ? makeMat(THREE, 0x4a2800, 50) : skinMat(THREE, skin, 'secondary');
  const met= makeMat(THREE, 0x1e1e1e, 150);

  addPart(g, box(THREE, 0.080, 0.060, 0.30), S, 0, 0.010, 0.010);
  addPart(g, cyl(THREE, 0.018, 0.020, 0.08, 10), met,  0.018, 0.010, -0.220, Math.PI/2);
  addPart(g, cyl(THREE, 0.018, 0.020, 0.08, 10), met, -0.018, 0.010, -0.220, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.018, 0.30, 12), met,  0.018, 0.010, -0.410, Math.PI/2);
  addPart(g, cyl(THREE, 0.014, 0.018, 0.30, 12), met, -0.018, 0.010, -0.410, Math.PI/2);
  addPart(g, box(THREE, 0.062, 0.014, 0.012), A, 0, 0.010, -0.340);
  addPart(g, box(THREE, 0.062, 0.014, 0.012), A, 0, 0.010, -0.200);
  addPart(g, box(THREE, 0.068, 0.040, 0.12), brn, 0, -0.012, -0.220);
  for (let i=0;i<5;i++) addPart(g, box(THREE, 0.070, 0.003, 0.005), P, 0, -0.004+i*0.008, -0.165-i*0.016);
  addPart(g, box(THREE, 0.050, 0.072, 0.050), P, 0.003, -0.068, 0.108);
  addPart(g, box(THREE, 0.062, 0.058, 0.018), P, 0, -0.005, 0.305);
  addPart(g, box(THREE, 0.044, 0.044, 0.16),  S, 0, -0.006, 0.210);
  addPart(g, cyl(THREE, 0.012, 0.012, 0.22, 8), met,  0.018, -0.018, -0.030, Math.PI/2);
  addPart(g, cyl(THREE, 0.012, 0.012, 0.22, 8), met, -0.018, -0.018, -0.030, Math.PI/2);

  addStripe(g, THREE, skin, 0.041, 0.018, 0.010, 0.002, 0.004, 0.28);
  return g;
}

// ═══════════════════════════════════════════════════════════════
//  PISTOLS
// ═══════════════════════════════════════════════════════════════

function build_DEAGLE(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= skin.name==='Default' ? makeMat(THREE, 0x1c1c1c, 200) : skinMat(THREE, skin, 'secondary');
  const gld= skin.name==='Default' ? makeMat(THREE, 0xb8860b, 200, 0xffd700, 0.2)
           : new THREE.MeshPhongMaterial({
               color: skin.colors.accent, emissive: skin.emissive.accent,
               emissiveIntensity: skin.emissiveIntensity.accent * 0.5, shininess: 200
             });

  addPart(g, box(THREE, 0.058, 0.058, 0.22), S, 0,  0.020, -0.030);
  for (let i=0;i<6;i++) addPart(g, box(THREE, 0.060, 0.012, 0.004), P, 0, 0.022, 0.070-i*0.018);
  addPart(g, box(THREE, 0.005, 0.022, 0.040), P, 0.030, 0.020, -0.020);

  addPart(g, box(THREE, 0.054, 0.050, 0.18), S, 0, -0.008, 0.005);
  addPart(g, box(THREE, 0.050, 0.016, 0.14), P, 0, -0.024, -0.035);

  addPart(g, cyl(THREE, 0.012, 0.014, 0.06, 10), met, 0, 0.020, -0.195, Math.PI/2);
  addPart(g, cyl(THREE, 0.010, 0.012, 0.20, 12), met, 0, 0.020, -0.280, Math.PI/2);
  for (let i=0;i<3;i++) addPart(g, box(THREE, 0.015, 0.005, 0.008), P, 0, 0.032, -0.240-i*0.015);

  addPart(g, box(THREE, 0.046, 0.095, 0.048), P, 0.002, -0.082, 0.100);
  addPart(g, box(THREE, 0.040, 0.020, 0.040), P, 0.002, -0.125, 0.092);
  for (let i=0;i<5;i++) for (let j=0;j<3;j++) {
    addPart(g, box(THREE, 0.048, 0.003, 0.003), P, 0, -0.055-i*0.014, 0.076+j*0.012);
  }

  addPart(g, box(THREE, 0.038, 0.065, 0.030), P, 0, -0.070, 0.055);
  addPart(g, box(THREE, 0.040, 0.006, 0.032), gld, 0, -0.037, 0.055);
  addPart(g, box(THREE, 0.018, 0.020, 0.012), S, 0, 0.044, 0.098);
  addPart(g, box(THREE, 0.048, 0.005, 0.058), P, 0, -0.030, 0.050);
  addPart(g, box(THREE, 0.048, 0.022, 0.005), P, 0, -0.020, 0.021);
  addPart(g, box(THREE, 0.048, 0.022, 0.005), P, 0, -0.020, 0.079);
  addPart(g, cyl(THREE, 0.013, 0.013, 0.010, 12), gld, 0, 0.020, -0.385, Math.PI/2);

  // Sights with emissive dot
  addPart(g, box(THREE, 0.010, 0.010, 0.008), P, -0.016, 0.052, -0.225);
  addPart(g, box(THREE, 0.010, 0.010, 0.008), P,  0.016, 0.052, -0.225);
  addPart(g, box(THREE, 0.012, 0.012, 0.008), P,  0.000, 0.052,  0.080);
  addPart(g, box(THREE, 0.005, 0.006, 0.010),
    makeMat(THREE, 0x00ff44, 200, 0x00ff44, 1.0), 0, 0.055, 0.079);

  addStripe(g, THREE, skin, 0.030, 0.028, -0.035, 0.002, 0.003, 0.20);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_M9(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x252525, 180);

  addPart(g, box(THREE, 0.048, 0.050, 0.18), S, 0,  0.014, -0.020);
  for (let i=0;i<7;i++) addPart(g, box(THREE, 0.050, 0.010, 0.004), P, 0, 0.016, 0.048-i*0.016);
  addPart(g, box(THREE, 0.004, 0.018, 0.034), P, 0.025, 0.014, -0.012);
  addPart(g, box(THREE, 0.044, 0.044, 0.16), S, 0, -0.006, -0.010);
  addPart(g, cyl(THREE, 0.008, 0.010, 0.05, 10), met, 0, 0.014, -0.165, Math.PI/2);
  addPart(g, cyl(THREE, 0.006, 0.008, 0.18, 12), met, 0, 0.014, -0.250, Math.PI/2);
  addPart(g, box(THREE, 0.040, 0.085, 0.038), P, 0.001, -0.072, 0.090);
  addPart(g, box(THREE, 0.036, 0.018, 0.032), P, 0.001, -0.112, 0.082);
  addPart(g, box(THREE, 0.032, 0.060, 0.022), S, 0, -0.058, 0.054);
  addPart(g, box(THREE, 0.040, 0.005, 0.052), P, 0, -0.026, 0.046);
  addPart(g, box(THREE, 0.040, 0.020, 0.005), P, 0, -0.016, 0.020);
  addPart(g, box(THREE, 0.040, 0.020, 0.005), P, 0, -0.016, 0.072);
  addPart(g, box(THREE, 0.016, 0.018, 0.010), S, 0, 0.040, 0.082);

  addStripe(g, THREE, skin, 0.025, 0.020, -0.020, 0.002, 0.003, 0.17);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_P90(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1e1e1e, 150);
  const blu= skin.name==='Default' ? makeMat(THREE, 0x0a1a2a, 80)
           : new THREE.MeshPhongMaterial({ color: skin.colors.secondary, transparent:true, opacity:0.85, shininess:180 });

  addPart(g, box(THREE, 0.060, 0.058, 0.34), P, 0, 0.005, 0.030);
  addPart(g, box(THREE, 0.058, 0.058, 0.12), S, 0, 0.005, -0.125);
  addPart(g, box(THREE, 0.054, 0.022, 0.28), blu, 0, 0.040, 0.020);
  addPart(g, box(THREE, 0.052, 0.004, 0.28), A,  0, 0.052, 0.020);
  for (let i=0;i<8;i++) {
    addPart(g, cyl(THREE, 0.005, 0.005, 0.020, 6),
      makeMat(THREE, 0xddaa44, 100), 0, 0.042, 0.100-i*0.034, 0, 0, Math.PI/2);
  }

  addPart(g, cyl(THREE, 0.010, 0.012, 0.05, 8), met, 0, -0.002, -0.205, Math.PI/2);
  addPart(g, cyl(THREE, 0.007, 0.010, 0.20, 10), met, 0, -0.002, -0.305, Math.PI/2);
  addPart(g, box(THREE, 0.034, 0.030, 0.14), S, 0, -0.002, -0.165);

  addPart(g, box(THREE, 0.044, 0.070, 0.050), P, 0.002, -0.055, 0.095);
  addPart(g, box(THREE, 0.040, 0.018, 0.044), P, 0.002, -0.086, 0.088);
  addPart(g, box(THREE, 0.050, 0.005, 0.060), P, 0, -0.030, 0.050);
  addPart(g, box(THREE, 0.050, 0.022, 0.005), P, 0, -0.020, 0.020);
  addPart(g, box(THREE, 0.050, 0.022, 0.005), P, 0, -0.020, 0.080);
  addPart(g, box(THREE, 0.056, 0.050, 0.06), S, 0, 0.003, 0.240);
  addPart(g, box(THREE, 0.054, 0.048, 0.010), A, 0, 0.003, 0.272);

  addStripe(g, THREE, skin, 0.031, 0.016, 0.025, 0.002, 0.003, 0.32);
  return g;
}

// ═══════════════════════════════════════════════════════════════
//  LMGs
// ═══════════════════════════════════════════════════════════════

function build_M249(THREE, skin) {
  const g  = new THREE.Group();
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1e1e1e, 150);
  const alu= makeMat(THREE, 0x2c2c2c, 200);
  const grn= skin.name==='Default' ? makeMat(THREE, 0x1a2a1a, 60) : skinMat(THREE, skin, 'primary');

  addPart(g, box(THREE, 0.068, 0.065, 0.38), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.025, 0.008, 0.40), A, 0, 0.050, 0.008);
  for (let i=0;i<18;i++) addPart(g, box(THREE, 0.027, 0.003, 0.005), A, 0, 0.054, 0.105-i*0.022);
  addPart(g, box(THREE, 0.064, 0.018, 0.16), P, 0, 0.050, 0.040);

  addPart(g, cyl(THREE, 0.016, 0.019, 0.10, 10), met, 0, 0.010, -0.265, Math.PI/2);
  addPart(g, cyl(THREE, 0.011, 0.016, 0.46, 12), met, 0, 0.010, -0.525, Math.PI/2);
  addPart(g, cyl(THREE, 0.016, 0.014, 0.06,  8), A,   0, 0.010, -0.785, Math.PI/2);
  for (let i=0;i<6;i++) {
    const a=(i/6)*Math.PI*2;
    addPart(g, box(THREE, 0.003, 0.022, 0.007), met, Math.cos(a)*0.016, 0.010+Math.sin(a)*0.016, -0.758);
  }
  addPart(g, cyl(THREE, 0.006, 0.006, 0.42, 6), alu, 0, 0.034, -0.480, Math.PI/2);
  addPart(g, box(THREE, 0.022, 0.022, 0.030), met, 0, 0.022, -0.280);

  // SAW box magazine
  addPart(g, box(THREE, 0.060, 0.080, 0.075), grn, 0, -0.072, 0.045);
  addPart(g, box(THREE, 0.062, 0.010, 0.077), A,   0, -0.032, 0.045);
  addPart(g, box(THREE, 0.020, 0.080, 0.010), grn, 0, -0.072, 0.083);

  // Bipod
  addPart(g, box(THREE, 0.008, 0.006, 0.008), met,  0, -0.016, -0.360);
  addPart(g, box(THREE, 0.006, 0.065, 0.006), met, -0.022, -0.053, -0.360);
  addPart(g, box(THREE, 0.006, 0.065, 0.006), met,  0.022, -0.053, -0.360);

  addPart(g, box(THREE, 0.044, 0.075, 0.048), P,  0.002, -0.072, 0.108);
  addPart(g, box(THREE, 0.042, 0.045, 0.16),  grn, 0, -0.005, 0.210);
  addPart(g, box(THREE, 0.064, 0.052, 0.030), P,   0, -0.003, 0.296);
  addPart(g, box(THREE, 0.060, 0.048, 0.22), P,    0, 0.010, -0.175);
  addPart(g, box(THREE, 0.008, 0.048, 0.20), alu,  0.036, 0.010, -0.175);
  addPart(g, box(THREE, 0.008, 0.048, 0.20), alu, -0.036, 0.010, -0.175);

  addStripe(g, THREE, skin, 0.035, 0.022, 0.010, 0.002, 0.004, 0.36);
  return g;
}

// ─────────────────────────────────────────────────────────────

function build_PKM(THREE, skin) {
  const g  = new THREE.Group();
  const wood= skin.name==='Default' ? makeMat(THREE, 0x4a2e14, 50) : skinMat(THREE, skin, 'secondary');
  const P  = skinMat(THREE, skin, 'primary');
  const S  = skinMat(THREE, skin, 'secondary');
  const A  = skinMat(THREE, skin, 'accent');
  const met= makeMat(THREE, 0x1a1a1a, 160);
  const alu= makeMat(THREE, 0x262626, 200);

  addPart(g, box(THREE, 0.070, 0.068, 0.38), S, 0, 0.010, 0.010);
  addPart(g, box(THREE, 0.022, 0.008, 0.38), A, 0, 0.052, 0.010);

  addPart(g, cyl(THREE, 0.018, 0.022, 0.12, 10), met, 0, 0.010, -0.285, Math.PI/2);
  addPart(g, cyl(THREE, 0.012, 0.018, 0.56, 12), met, 0, 0.010, -0.595, Math.PI/2);
  addPart(g, cyl(THREE, 0.020, 0.020, 0.05, 10), met, 0, 0.010, -0.900, Math.PI/2);
  for (let i=0;i<4;i++) addPart(g, box(THREE, 0.024, 0.006, 0.008), A, 0, 0.022, -0.875-i*0.012);
  addPart(g, cyl(THREE, 0.007, 0.007, 0.50, 6), alu, 0, 0.036, -0.545, Math.PI/2);
  addPart(g, box(THREE, 0.028, 0.026, 0.034), met, 0, 0.024, -0.300);

  // Belt box
  addPart(g, box(THREE, 0.066, 0.095, 0.090), P, 0, -0.080, 0.048);
  addPart(g, box(THREE, 0.068, 0.012, 0.092), A, 0, -0.037, 0.048);

  addPart(g, box(THREE, 0.050, 0.058, 0.22), wood, 0, -0.002, 0.225);
  addPart(g, box(THREE, 0.044, 0.062, 0.012), wood,0,  0.000, 0.340);
  addPart(g, box(THREE, 0.044, 0.078, 0.050), wood,0.003, -0.068, 0.108);
  addPart(g, box(THREE, 0.058, 0.030, 0.24), wood, 0, -0.012, -0.175);
  addPart(g, box(THREE, 0.056, 0.028, 0.22), P,    0,  0.018, -0.175);

  // Bipod
  addPart(g, box(THREE, 0.010, 0.008, 0.012), met,  0, -0.016, -0.400);
  addPart(g, box(THREE, 0.006, 0.075, 0.006), met, -0.028, -0.058, -0.400);
  addPart(g, box(THREE, 0.006, 0.075, 0.006), met,  0.028, -0.058, -0.400);

  addStripe(g, THREE, skin, 0.036, 0.022, 0.010, 0.002, 0.004, 0.36);
  return g;
}

// ─────────────────────────────────────────────────────────────

function buildGeneric(THREE, weapon, skin) {
  const g   = new THREE.Group();
  const P   = skinMat(THREE, skin, 'primary');
  const S   = skinMat(THREE, skin, 'secondary');
  addPart(g, box(THREE, 0.12, 0.10, 0.55), S, 0, 0, 0);
  addPart(g, cyl(THREE, 0.015, 0.015, 0.4, 8), P, 0, 0.01, -0.47, Math.PI/2);
  return g;
}

export default WEAPONS;