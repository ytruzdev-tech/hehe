// ============================================================
//  ANIMATIONS.JS — HD Kill Animations + Weapon Skins for WARZONE 3D
// ============================================================

export const KILL_ANIMATIONS = {
  ice: {
    name:"ICE BURST", emoji:"❄️", label:"FROZEN!",
    textColor:"#a8edff", glowColor:"rgba(100,200,255,0.4)",
    colors:["#a8edff","#d0f8ff","#88ccff","#ffffff","#66aaff","#cceeff","#aaddff"],
    particleCount:60, particleSize:[3,18], duration:1600
  },
  fire: {
    name:"FIRE BLAST", emoji:"🔥", label:"INCINERATED!",
    textColor:"#ff8800", glowColor:"rgba(255,100,0,0.5)",
    colors:["#ff4400","#ff8800","#ffcc00","#ff2200","#ff6600","#ff9900","#ffee00"],
    particleCount:75, particleSize:[8,28], duration:1800
  },
  magma: {
    name:"MAGMA BURST", emoji:"🌋", label:"MELTED!",
    textColor:"#ff4400", glowColor:"rgba(255,60,0,0.5)",
    colors:["#ff2200","#ff6600","#cc2200","#ff4400","#dd4400","#ff8800","#ff0000"],
    particleCount:65, particleSize:[10,32], duration:2000
  },
  earth: {
    name:"EARTH SMASH", emoji:"🪨", label:"CRUSHED!",
    textColor:"#c09060", glowColor:"rgba(100,70,30,0.4)",
    colors:["#8B5E3C","#a0724a","#6B4423","#c09060","#5a3520","#7a5530","#b07040"],
    particleCount:65, particleSize:[12,36], duration:1500
  },
  galaxy: {
    name:"GALAXY", emoji:"🌌", label:"OBLITERATED!",
    textColor:"#cc66ff", glowColor:"rgba(150,0,255,0.5)",
    colors:["#9966ff","#cc44ff","#6644ff","#ff66cc","#4488ff","#ff44ff","#aaffff"],
    particleCount:85, particleSize:[2,14], duration:2200
  },
  air: {
    name:"AIRSTRIKE", emoji:"💥", label:"BLOWN AWAY!",
    textColor:"#aaddff", glowColor:"rgba(150,200,255,0.4)",
    colors:["#ccffff","#eeffff","#aaddff","#ffffff","#88ccdd","#ddffff","#ffffff"],
    particleCount:80, particleSize:[3,12], duration:1400
  },
  sun: {
    name:"SOLAR FLARE", emoji:"☀️", label:"VAPORIZED!",
    textColor:"#ffff44", glowColor:"rgba(255,220,0,0.6)",
    colors:["#ffff00","#ffdd00","#ffaa00","#ff8800","#ffffaa","#ffee44","#fff0aa"],
    particleCount:80, particleSize:[6,24], duration:1900
  },
  storm: {
    name:"THUNDERSTORM", emoji:"⚡", label:"ELECTROCUTED!",
    textColor:"#aaff44", glowColor:"rgba(100,255,50,0.5)",
    colors:["#aaff00","#88ff44","#ffffff","#ddff88","#44ffaa","#ccff00","#ffffff"],
    particleCount:70, particleSize:[2,10], duration:1600
  },
  nuke: {
    name:"NUCLEAR", emoji:"☢️", label:"ANNIHILATED!",
    textColor:"#88ff44", glowColor:"rgba(100,255,0,0.5)",
    colors:["#88ff00","#aaff44","#ffff44","#ffffff","#44ff88","#ccff88","#ffff00"],
    particleCount:100, particleSize:[4,20], duration:2400
  }
};

// ── Weapon Skin Definitions ────────────────────────────────────
export const WEAPON_SKINS = {
  default: {
    name: "Default", rarity: "COMMON",
    description: "Standard military finish",
    colors: { primary: 0x1a1a1a, secondary: 0x2e2e2e, accent: 0x3a3a3a },
    emissive: { primary: 0x000000, secondary: 0x000000, accent: 0x000000 },
    emissiveIntensity: { primary: 0, secondary: 0, accent: 0 },
    shininess: { primary: 90, secondary: 160, accent: 200 },
    stripeColor: 0x333333, stripeEmissive: 0x000000, stripeEmissiveIntensity: 0
  },
  lava: {
    name: "Lava Flow", rarity: "LEGENDARY",
    description: "Flows with molten rock",
    colors: { primary: 0x1a0800, secondary: 0x2a0c00, accent: 0xff4400 },
    emissive: { primary: 0xff2200, secondary: 0xff4400, accent: 0xff6600 },
    emissiveIntensity: { primary: 0.3, secondary: 0.5, accent: 0.8 },
    shininess: { primary: 40, secondary: 60, accent: 180 },
    stripeColor: 0xff6600, stripeEmissive: 0xff3300, stripeEmissiveIntensity: 1.2,
    particleEffect: 'lava'
  },
  ice: {
    name: "Permafrost", rarity: "EPIC",
    description: "Encased in eternal ice",
    colors: { primary: 0x0a1825, secondary: 0x0d2030, accent: 0x88ccff },
    emissive: { primary: 0x0022aa, secondary: 0x0044cc, accent: 0x00aaff },
    emissiveIntensity: { primary: 0.15, secondary: 0.25, accent: 0.7 },
    shininess: { primary: 200, secondary: 220, accent: 255 },
    stripeColor: 0x88ddff, stripeEmissive: 0x44aaff, stripeEmissiveIntensity: 1.0,
    particleEffect: 'ice'
  },
  magma: {
    name: "Magma Core", rarity: "LEGENDARY",
    description: "Forged in volcanic depths",
    colors: { primary: 0x1a0500, secondary: 0x300800, accent: 0xff2200 },
    emissive: { primary: 0xcc1100, secondary: 0xff2200, accent: 0xff6600 },
    emissiveIntensity: { primary: 0.4, secondary: 0.6, accent: 1.0 },
    shininess: { primary: 30, secondary: 50, accent: 120 },
    stripeColor: 0xff4400, stripeEmissive: 0xff1100, stripeEmissiveIntensity: 1.5,
    particleEffect: 'magma'
  },
  earth: {
    name: "Terra Firma", rarity: "RARE",
    description: "Ancient stone and soil",
    colors: { primary: 0x2a1a0a, secondary: 0x3d2a10, accent: 0x8b6040 },
    emissive: { primary: 0x0a0500, secondary: 0x100800, accent: 0x0a0500 },
    emissiveIntensity: { primary: 0.05, secondary: 0.05, accent: 0.1 },
    shininess: { primary: 20, secondary: 30, accent: 60 },
    stripeColor: 0x7a5530, stripeEmissive: 0x3a2510, stripeEmissiveIntensity: 0.2,
    particleEffect: 'earth'
  },
  sun: {
    name: "Solar Wrath", rarity: "LEGENDARY",
    description: "Radiates stellar energy",
    colors: { primary: 0x1a1000, secondary: 0x2a1a00, accent: 0xffdd00 },
    emissive: { primary: 0xaa6600, secondary: 0xcc8800, accent: 0xffcc00 },
    emissiveIntensity: { primary: 0.3, secondary: 0.5, accent: 1.2 },
    shininess: { primary: 80, secondary: 120, accent: 255 },
    stripeColor: 0xffee00, stripeEmissive: 0xffcc00, stripeEmissiveIntensity: 1.8,
    particleEffect: 'sun'
  },
  galaxy: {
    name: "Void Walker", rarity: "LEGENDARY",
    description: "Pulled from deep space",
    colors: { primary: 0x05020f, secondary: 0x0a0520, accent: 0x8844ff },
    emissive: { primary: 0x220066, secondary: 0x440088, accent: 0x8844ff },
    emissiveIntensity: { primary: 0.2, secondary: 0.4, accent: 0.9 },
    shininess: { primary: 100, secondary: 150, accent: 200 },
    stripeColor: 0x9966ff, stripeEmissive: 0x6633ff, stripeEmissiveIntensity: 1.0,
    particleEffect: 'galaxy'
  },
  storm: {
    name: "Thunderstrike", rarity: "EPIC",
    description: "Crackling with electricity",
    colors: { primary: 0x0a0f0a, secondary: 0x0f180f, accent: 0x44ff88 },
    emissive: { primary: 0x002200, secondary: 0x004400, accent: 0x00ff44 },
    emissiveIntensity: { primary: 0.1, secondary: 0.2, accent: 0.8 },
    shininess: { primary: 120, secondary: 160, accent: 220 },
    stripeColor: 0x88ff44, stripeEmissive: 0x44ff00, stripeEmissiveIntensity: 1.2,
    particleEffect: 'storm'
  },
  nuke: {
    name: "Radioactive", rarity: "LEGENDARY",
    description: "Lethally irradiated",
    colors: { primary: 0x080f08, secondary: 0x101a10, accent: 0x55ff22 },
    emissive: { primary: 0x003300, secondary: 0x005500, accent: 0x44ff00 },
    emissiveIntensity: { primary: 0.2, secondary: 0.35, accent: 1.0 },
    shininess: { primary: 80, secondary: 120, accent: 200 },
    stripeColor: 0x77ff33, stripeEmissive: 0x44ff00, stripeEmissiveIntensity: 1.5,
    particleEffect: 'nuke'
  }
};

export const SKIN_RARITY_ORDER = ['COMMON','RARE','EPIC','LEGENDARY'];
export const SKIN_RARITY_COLORS = {
  COMMON: '#888888', RARE: '#4488ff', EPIC: '#aa44ff', LEGENDARY: '#ff8800'
};

// ── Animation System ───────────────────────────────────────────
export class AnimationSystem {
  constructor() {
    this.overlay = document.getElementById('kill-anim-overlay');
    this._ensureBaseKF();
  }

  playKillAnimation(animType, x, y) {
    const anim = KILL_ANIMATIONS[animType] || KILL_ANIMATIONS.fire;
    const cx   = x || window.innerWidth  / 2;
    const cy   = y || window.innerHeight / 2;
    this._dispatch(animType, cx, cy, anim);
  }

  playKillAnimationAt(animType, x, y) {
    this.playKillAnimation(animType, x, y);
  }

  _dispatch(type, cx, cy, anim) {
    switch (type) {
      case 'fire':   this._fireBurn(cx, cy, anim);      break;
      case 'magma':  this._magmaMelt(cx, cy, anim);     break;
      case 'earth':  this._earthCrush(cx, cy, anim);    break;
      case 'galaxy': this._galaxySuck(cx, cy, anim);    break;
      case 'air':    this._airStrike(cx, cy, anim);     break;
      case 'ice':    this._iceBurst(cx, cy, anim);      break;
      case 'sun':    this._solarFlare(cx, cy, anim);    break;
      case 'storm':  this._thunderStorm(cx, cy, anim);  break;
      case 'nuke':   this._nuclearBlast(cx, cy, anim);  break;
      default:       this._genericExplode(cx, cy, anim); break;
    }
    this._killLabel(cx, cy, anim);
  }

  // ── FIRE ──────────────────────────────────────────────────────
  _fireBurn(cx, cy, anim) {
    for (let ring = 0; ring < 4; ring++) {
      setTimeout(() => {
        for (let i = 0; i < 22; i++) {
          const p = this._el();
          const size  = 12 + Math.random() * 24 + ring * 6;
          const color = anim.colors[i % anim.colors.length];
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
          const dist  = 25 + Math.random() * 140 + ring * 45;
          const dx    = Math.cos(angle) * dist + (Math.random() - 0.5) * 50;
          const dy    = Math.sin(angle) * dist - 40 - ring * 22;
          const dur   = 500 + Math.random() * 700;
          p.style.cssText = `
            position:absolute; pointer-events:none;
            left:${cx}px; top:${cy}px;
            width:${size}px; height:${size * 1.5}px;
            background:radial-gradient(ellipse at 40% 30%, #ffee00, ${color}, #880000);
            border-radius:40% 60% 55% 45% / 60% 35% 65% 40%;
            box-shadow:0 0 ${size}px ${color}, 0 0 ${size * 2.5}px rgba(255,100,0,0.3);
            --dx:${dx}px; --dy:${dy}px;
            animation:wz_explode ${dur}ms cubic-bezier(0.2,0.8,0.3,1) ${Math.random()*200}ms forwards;
            z-index:210;
          `;
          this.overlay.appendChild(p);
          setTimeout(() => p.remove(), dur + 250);
        }
      }, ring * 110);
    }
    for (let i = 0; i < 12; i++) {
      const smoke = this._el();
      const size = 22 + Math.random() * 35;
      smoke.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${cx - size/2 + (Math.random()-0.5)*60}px; top:${cy - size/2}px;
        width:${size}px; height:${size}px;
        background:radial-gradient(circle,rgba(50,50,50,0.85),transparent);
        --dx:${(Math.random()-0.5)*70}px; --dy:${-(90+Math.random()*130)}px;
        animation:wz_explode ${900+Math.random()*400}ms ease-out ${300+Math.random()*500}ms forwards;
      `;
      this.overlay.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1800);
    }
    this._flashScreen('rgba(255,80,0,0.08)', 450);
  }

  // ── MAGMA ─────────────────────────────────────────────────────
  _magmaMelt(cx, cy, anim) {
    for (let i = 0; i < 55; i++) {
      const p = this._el();
      const size  = 10 + Math.random() * 28;
      const color = anim.colors[i % anim.colors.length];
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.3;
      const dist  = 20 + Math.random() * 170;
      const dur   = 750 + Math.random() * 750;
      p.style.cssText = `
        position:absolute; pointer-events:none;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size}px;
        background:radial-gradient(circle at 35% 35%, #ffee88, ${color}, #440000);
        box-shadow:0 0 ${size * 1.8}px ${color};
        border-radius:${30+Math.random()*40}% ${60-Math.random()*20}% ${40+Math.random()*20}% ${50-Math.random()*20}%;
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms ease-out ${Math.random()*300}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 350);
    }
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const drip = this._el();
        const startX = cx + (Math.random() - 0.5) * 80;
        const size   = 8 + Math.random() * 14;
        const fallY  = 90 + Math.random() * 120;
        drip.style.cssText = `
          position:absolute; pointer-events:none; border-radius:50% 50% 40% 40%;
          left:${startX}px; top:${cy}px;
          width:${size}px; height:${size * 1.6}px;
          background:radial-gradient(circle, #ffaa00, #ff4400, #770000);
          box-shadow:0 0 10px #ff5500;
          --dx:${(Math.random()-0.5)*20}px; --dy:${fallY}px;
          animation:wz_explode 650ms ease-in ${Math.random()*250}ms forwards;
          z-index:209;
        `;
        this.overlay.appendChild(drip);
        setTimeout(() => {
          drip.remove();
          const puddle = this._el();
          const pw = 14 + Math.random() * 18;
          puddle.style.cssText = `
            position:absolute; pointer-events:none; border-radius:55% 45% 50% 50%;
            left:${startX - pw/2}px; top:${cy + fallY}px;
            width:${pw}px; height:${pw * 0.4}px;
            background:radial-gradient(ellipse,#ff5500,#770000);
            box-shadow:0 0 6px #ff3300;
            --dx:0px; --dy:0px;
            animation:wz_explode 1400ms ease-out forwards;
          `;
          this.overlay.appendChild(puddle);
          setTimeout(() => puddle.remove(), 1450);
        }, 650);
      }, i * 65);
    }
    this._flashScreen('rgba(255,50,0,0.10)', 550);
  }

  // ── EARTH ─────────────────────────────────────────────────────
  _earthCrush(cx, cy, anim) {
    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        const rock = this._el();
        const size = 18 + Math.random() * 32;
        const startX = cx + (Math.random() - 0.5) * 240;
        const startY = cy - 220 - Math.random() * 180;
        const col = anim.colors[Math.floor(Math.random() * anim.colors.length)];
        rock.style.cssText = `
          position:absolute; pointer-events:none;
          left:${startX}px; top:${startY}px;
          width:${size}px; height:${size * 0.85}px;
          background:radial-gradient(circle at 30% 30%, #d0a870, ${col}, #2a1208);
          border-radius:${30+Math.random()*30}% ${50+Math.random()*20}% ${40+Math.random()*20}% ${30+Math.random()*30}%;
          box-shadow:inset -5px -5px 10px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.4);
          --dx:${cx - startX + (Math.random()-0.5)*30}px; --dy:${cy - startY}px;
          animation:wz_explode 520ms cubic-bezier(0.4,0,1,1) forwards;
          z-index:210;
        `;
        this.overlay.appendChild(rock);
        setTimeout(() => {
          rock.remove();
          this._groundImpact(cx + (Math.random() - 0.5) * 90, cy + 15);
        }, 520);
      }, i * 85);
    }
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        const dust = this._el();
        const size = 16 + Math.random() * 28;
        const angle = Math.PI + (Math.random() - 0.5) * Math.PI;
        const dist = 35 + Math.random() * 120;
        dust.style.cssText = `
          position:absolute; pointer-events:none; border-radius:50%;
          left:${cx}px; top:${cy + 10}px;
          width:${size}px; height:${size}px;
          background:radial-gradient(circle,rgba(160,120,80,0.85),transparent);
          --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist - 25}px;
          animation:wz_explode 750ms ease-out ${i*30}ms forwards;
        `;
        this.overlay.appendChild(dust);
        setTimeout(() => dust.remove(), 800 + i * 30);
      }
    }, 650);
    this._shakeCanvas(0.7);
    this._flashScreen('rgba(100,70,30,0.08)', 300);
  }

  _groundImpact(x, y) {
    const ring = this._el();
    ring.style.cssText = `
      position:absolute; pointer-events:none; border-radius:50%;
      left:${x - 45}px; top:${y - 10}px; width:90px; height:32px;
      border:3px solid rgba(160,100,40,0.85);
      animation:wz_ringExpand 450ms ease-out forwards; z-index:209;
    `;
    this.overlay.appendChild(ring);
    setTimeout(() => ring.remove(), 470);
  }

  // ── GALAXY ────────────────────────────────────────────────────
  _galaxySuck(cx, cy, anim) {
    for (let i = 0; i < 90; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const dist   = 110 + Math.random() * 220;
      const startX = cx + Math.cos(angle) * dist;
      const startY = cy + Math.sin(angle) * dist;
      const color  = anim.colors[i % anim.colors.length];
      const size   = 2 + Math.random() * 9;
      const delay  = Math.random() * 450;
      const dur    = 850 + Math.random() * 500;
      const p = this._el();
      p.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${startX}px; top:${startY}px;
        width:${size}px; height:${size}px;
        background:${color};
        box-shadow:0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}44;
        --dx:${cx - startX}px; --dy:${cy - startY}px;
        animation:wz_explode ${dur}ms cubic-bezier(0.4,0,0.8,0.2) ${delay}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + delay + 60);
    }
    const bh = this._el();
    bh.style.cssText = `
      position:absolute; pointer-events:none; border-radius:50%;
      left:${cx - 44}px; top:${cy - 44}px; width:88px; height:88px;
      background:radial-gradient(circle, #000 35%, #220044 65%, transparent 100%);
      box-shadow:0 0 50px #9900ff, 0 0 100px #6600cc, inset 0 0 25px #000;
      animation:wz_blackHolePulse 2.2s ease-out forwards; z-index:208;
    `;
    this.overlay.appendChild(bh);
    setTimeout(() => bh.remove(), 2400);
    for (let r = 0; r < 4; r++) {
      const ring = this._el();
      const rs   = 55 + r * 35;
      ring.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${cx - rs}px; top:${cy - rs * 0.42}px;
        width:${rs * 2}px; height:${rs * 0.84}px;
        border:2px solid ${anim.colors[r % anim.colors.length]};
        box-shadow:0 0 12px ${anim.colors[r % anim.colors.length]};
        animation:wz_ringExpand ${1300 + r * 180}ms ease-out ${r * 90}ms forwards;
        z-index:209;
      `;
      this.overlay.appendChild(ring);
      setTimeout(() => ring.remove(), 1600 + r * 200);
    }
  }

  // ── AIR STRIKE ────────────────────────────────────────────────
  _airStrike(cx, cy, anim) {
    for (let r = 0; r < 6; r++) {
      setTimeout(() => {
        const ring = this._el();
        const rs   = 22 + r * 32;
        ring.style.cssText = `
          position:absolute; pointer-events:none; border-radius:50%;
          left:${cx - rs}px; top:${cy - rs}px;
          width:${rs * 2}px; height:${rs * 2}px;
          border:3px solid rgba(200,220,255,${0.95 - r * 0.14});
          box-shadow:0 0 18px rgba(150,200,255,0.55);
          animation:wz_ringExpand 420ms ease-out forwards; z-index:209;
        `;
        this.overlay.appendChild(ring);
        setTimeout(() => ring.remove(), 440);
      }, r * 55);
    }
    for (let i = 0; i < 70; i++) {
      const p = this._el();
      const size  = 3 + Math.random() * 11;
      const angle = Math.random() * Math.PI * 2;
      const dist  = 90 + Math.random() * 240;
      const color = i < 35 ? anim.colors[i % anim.colors.length] : '#777788';
      p.style.cssText = `
        position:absolute; pointer-events:none;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size * (0.5 + Math.random())}px;
        background:${color}; border-radius:2px;
        box-shadow:0 0 ${size * 1.5}px ${color};
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${420+Math.random()*560}ms cubic-bezier(0.1,0,0.3,1) ${Math.random()*110}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
    setTimeout(() => {
      for (let i = 0; i < 18; i++) {
        const s = this._el();
        const sz = 32 + Math.random() * 55;
        s.style.cssText = `
          position:absolute; pointer-events:none; border-radius:50%;
          left:${cx + (Math.random()-0.5)*120 - sz/2}px; top:${cy - sz/2}px;
          width:${sz}px; height:${sz}px;
          background:radial-gradient(circle,rgba(200,200,210,0.75),transparent);
          --dx:${(Math.random()-0.5)*70}px; --dy:${-(45+Math.random()*70)}px;
          animation:wz_explode 1050ms ease-out ${i*45}ms forwards;
        `;
        this.overlay.appendChild(s);
        setTimeout(() => s.remove(), 1150 + i * 45);
      }
    }, 200);
    this._shakeCanvas(0.9);
    this._flashScreen('rgba(240,245,255,0.18)', 160);
  }

  // ── ICE BURST ─────────────────────────────────────────────────
  _iceBurst(cx, cy, anim) {
    for (let i = 0; i < 55; i++) {
      const p = this._el();
      const w     = 4 + Math.random() * 11;
      const h     = w * (2 + Math.random() * 2.2);
      const color = anim.colors[i % anim.colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 45 + Math.random() * 195;
      const dur   = 650 + Math.random() * 700;
      p.style.cssText = `
        position:absolute; pointer-events:none;
        left:${cx}px; top:${cy}px;
        width:${w}px; height:${h}px;
        background:linear-gradient(135deg,rgba(255,255,255,0.95),${color},rgba(100,180,255,0.7));
        border-radius:2px; transform:rotate(${Math.random()*360}deg);
        box-shadow:0 0 ${w * 2.5}px ${color}, 0 0 ${w * 5}px rgba(150,220,255,0.25);
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms cubic-bezier(0.1,0.8,0.3,1) ${Math.random()*200}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 250);
    }
    const ring = this._el();
    ring.style.cssText = `
      position:absolute; pointer-events:none; border-radius:50%;
      left:${cx - 90}px; top:${cy - 90}px; width:180px; height:180px;
      border:3px solid rgba(150,220,255,0.9);
      box-shadow:0 0 25px rgba(100,200,255,0.6), inset 0 0 25px rgba(100,200,255,0.25);
      animation:wz_ringExpand 900ms ease-out forwards; z-index:209;
    `;
    this.overlay.appendChild(ring);
    setTimeout(() => ring.remove(), 930);
    this._flashScreen('rgba(150,220,255,0.13)', 320);
  }

  // ── SUN / SOLAR FLARE ─────────────────────────────────────────
  _solarFlare(cx, cy, anim) {
    // Central burst
    const core = this._el();
    core.style.cssText = `
      position:absolute; pointer-events:none; border-radius:50%;
      left:${cx - 60}px; top:${cy - 60}px; width:120px; height:120px;
      background:radial-gradient(circle, #ffffff 20%, #ffee00 50%, #ff8800 80%, transparent 100%);
      box-shadow:0 0 80px #ffdd00, 0 0 160px rgba(255,180,0,0.5);
      --dx:0px; --dy:0px;
      animation:wz_explode 1600ms ease-out forwards; z-index:208;
    `;
    this.overlay.appendChild(core);
    setTimeout(() => core.remove(), 1650);

    // Solar rays shooting outward
    for (let i = 0; i < 12; i++) {
      const ray = this._el();
      const angle = (i / 12) * Math.PI * 2;
      const len   = 120 + Math.random() * 180;
      const w     = 4 + Math.random() * 8;
      ray.style.cssText = `
        position:absolute; pointer-events:none;
        left:${cx}px; top:${cy}px;
        width:${w}px; height:${len}px;
        background:linear-gradient(to bottom, #ffffff, #ffdd00, transparent);
        transform-origin:50% 0%;
        transform:rotate(${angle * 180/Math.PI}deg);
        border-radius:2px;
        box-shadow:0 0 ${w * 3}px #ffcc00;
        --dx:0px; --dy:0px;
        animation:wz_explode ${800+Math.random()*400}ms ease-out ${Math.random()*200}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(ray);
      setTimeout(() => ray.remove(), 1200 + Math.random() * 300);
    }

    // Plasma particles
    for (let i = 0; i < 65; i++) {
      const p = this._el();
      const size  = 6 + Math.random() * 20;
      const color = anim.colors[i % anim.colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 60 + Math.random() * 210;
      const dur   = 700 + Math.random() * 800;
      p.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size}px;
        background:radial-gradient(circle, #ffffff, ${color});
        box-shadow:0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}66;
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms ease-out ${Math.random()*200}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 250);
    }
    this._flashScreen('rgba(255,230,50,0.20)', 300);
    this._shakeCanvas(0.5);
  }

  // ── THUNDERSTORM ──────────────────────────────────────────────
  _thunderStorm(cx, cy, anim) {
    // Lightning bolts
    for (let b = 0; b < 5; b++) {
      setTimeout(() => {
        const bolt = this._el();
        const startX = cx + (Math.random() - 0.5) * 100;
        const startY = cy - 200 - Math.random() * 100;
        const endX   = cx + (Math.random() - 0.5) * 60;
        const len    = 200 + Math.random() * 100;
        const w      = 2 + Math.random() * 4;
        bolt.style.cssText = `
          position:absolute; pointer-events:none;
          left:${startX}px; top:${startY}px;
          width:${w}px; height:${len}px;
          background:linear-gradient(to bottom, transparent, #aaffaa, #ffffff, #88ff44, transparent);
          border-radius:2px;
          box-shadow:0 0 ${w * 4}px #88ff44, 0 0 ${w * 8}px #44ff0088;
          --dx:${endX - startX}px; --dy:${len}px;
          animation:wz_explode 300ms ease-in forwards;
          z-index:212;
        `;
        this.overlay.appendChild(bolt);
        setTimeout(() => bolt.remove(), 350);
        // Impact flash
        setTimeout(() => this._flashScreen('rgba(150,255,80,0.20)', 80), 250);
        this._shakeCanvas(0.3);
      }, b * 180 + Math.random() * 100);
    }

    // Electric arc particles
    for (let i = 0; i < 70; i++) {
      const p = this._el();
      const size  = 2 + Math.random() * 9;
      const color = anim.colors[i % anim.colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 50 + Math.random() * 180;
      const dur   = 400 + Math.random() * 500;
      p.style.cssText = `
        position:absolute; pointer-events:none;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size * (0.3 + Math.random() * 1.5)}px;
        background:${color}; border-radius:1px;
        box-shadow:0 0 ${size * 3}px ${color};
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms ease-out ${Math.random()*200}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 250);
    }
  }

  // ── NUCLEAR ───────────────────────────────────────────────────
  _nuclearBlast(cx, cy, anim) {
    // Shockwave rings expanding
    for (let r = 0; r < 8; r++) {
      setTimeout(() => {
        const ring = this._el();
        const rs   = 30 + r * 28;
        ring.style.cssText = `
          position:absolute; pointer-events:none; border-radius:50%;
          left:${cx - rs}px; top:${cy - rs}px;
          width:${rs * 2}px; height:${rs * 2}px;
          border:4px solid rgba(${r < 4 ? '255,255,100' : '100,255,50'},${0.9 - r * 0.10});
          box-shadow:0 0 20px rgba(150,255,50,0.5);
          animation:wz_ringExpand 600ms ease-out forwards; z-index:209;
        `;
        this.overlay.appendChild(ring);
        setTimeout(() => ring.remove(), 640);
      }, r * 70);
    }

    // Mushroom cloud base
    const cloud = this._el();
    cloud.style.cssText = `
      position:absolute; pointer-events:none; border-radius:50% 50% 30% 30%;
      left:${cx - 70}px; top:${cy - 80}px; width:140px; height:160px;
      background:radial-gradient(ellipse at 50% 60%, rgba(150,255,50,0.5), rgba(50,150,0,0.3), transparent);
      box-shadow:0 0 60px rgba(100,255,0,0.3), 0 0 120px rgba(50,150,0,0.2);
      --dx:0px; --dy:-60px;
      animation:wz_explode 2000ms ease-out forwards; z-index:207;
    `;
    this.overlay.appendChild(cloud);
    setTimeout(() => cloud.remove(), 2100);

    // Radiation particles
    for (let i = 0; i < 100; i++) {
      const p = this._el();
      const size  = 3 + Math.random() * 18;
      const color = anim.colors[i % anim.colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 80 + Math.random() * 260;
      const dur   = 800 + Math.random() * 1000;
      p.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size}px;
        background:radial-gradient(circle, #ffffff, ${color});
        box-shadow:0 0 ${size * 2}px ${color};
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms ease-out ${Math.random()*300}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 350);
    }
    this._flashScreen('rgba(200,255,100,0.25)', 200);
    this._shakeCanvas(1.2);
  }

  // ── GENERIC FALLBACK ──────────────────────────────────────────
  _genericExplode(cx, cy, anim) {
    for (let i = 0; i < anim.particleCount; i++) {
      const p = this._el();
      const size  = anim.particleSize[0] + Math.random() * (anim.particleSize[1] - anim.particleSize[0]);
      const color = anim.colors[i % anim.colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 65 + Math.random() * 210;
      const dur   = anim.duration * 0.8;
      p.style.cssText = `
        position:absolute; pointer-events:none; border-radius:50%;
        left:${cx}px; top:${cy}px;
        width:${size}px; height:${size}px;
        background:${color}; box-shadow:0 0 ${size * 2}px ${color};
        --dx:${Math.cos(angle)*dist}px; --dy:${Math.sin(angle)*dist}px;
        animation:wz_explode ${dur}ms ease-out ${Math.random()*200}ms forwards;
        z-index:210;
      `;
      this.overlay.appendChild(p);
      setTimeout(() => p.remove(), dur + 250);
    }
  }

  // ── Kill label ─────────────────────────────────────────────────
  _killLabel(cx, cy, anim) {
    const txt = document.createElement('div');
    txt.className = 'kill-text-3d';
    txt.textContent = anim.emoji + ' ' + anim.label;
    txt.style.cssText = `
      left:${cx}px; top:${cy}px; color:${anim.textColor};
      filter:drop-shadow(0 0 12px ${anim.textColor}) drop-shadow(0 0 25px ${anim.glowColor || anim.textColor});
      animation-duration:${anim.duration * 1.1}ms;
    `;
    this.overlay.appendChild(txt);
    setTimeout(() => txt.remove(), anim.duration * 1.2);
  }

  // ── Helpers ───────────────────────────────────────────────────
  _el() {
    const d = document.createElement('div');
    return d;
  }

  _flashScreen(color, dur) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:fixed; inset:0; background:${color}; pointer-events:none;
      z-index:205; --dx:0px; --dy:0px;
      animation:wz_explode ${dur}ms ease-out forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), dur + 60);
  }

  _shakeCanvas(intensity) {
    const c = document.getElementById('game-canvas');
    if (!c) return;
    c.classList.add('shake');
    setTimeout(() => c.classList.remove('shake'), Math.round(420 * intensity));
  }

  _ensureBaseKF() {
    if (document.getElementById('wz-anim-kf')) return;
    const s = document.createElement('style');
    s.id = 'wz-anim-kf';
    s.textContent = `
      @keyframes wz_explode {
        0%   { transform:translate(0,0) scale(1.2); opacity:1; }
        100% { transform:translate(var(--dx),var(--dy)) scale(0); opacity:0; }
      }
      @keyframes wz_ringExpand {
        0%   { transform:scale(0); opacity:1; }
        100% { transform:scale(4.0); opacity:0; }
      }
      @keyframes wz_blackHolePulse {
        0%   { transform:scale(0); opacity:0; }
        20%  { transform:scale(1); opacity:1; }
        80%  { transform:scale(1.25); opacity:0.85; }
        100% { transform:scale(0.5); opacity:0; }
      }
      @keyframes firePart {
        0%   { transform:translate(0,0) scale(1); opacity:1; filter:brightness(2); }
        50%  { filter:brightness(1.3); }
        100% { transform:translate(var(--dx),var(--dy)) scale(0.04); opacity:0; filter:brightness(0.3); }
      }
    `;
    document.head.appendChild(s);
  }
}

export const animSystem = new AnimationSystem();
export default animSystem;