import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

// ============================================================================
// 1. SCENE SCRIPT, TIMELINE & METADATA (ALL 8 PANELS WITH APPLIED NOTES)
// ============================================================================
const SCENES = [
  {
    id: 1,
    title: '1. Forensics HUNT!',
    note: '✅ Note Applied: Removed the floating open door from the right bedroom wall.',
    speaker: '🎙️ NARRATOR (ELLA)',
    subtitle: "Story: Katey went to her BFF's B-day party. But when she came back, her room was empty! Who Did This!",
    audioUrl: './audio/scene_1.mp3',
    panelUrl: './panels/panel_1.png',
    bgColor: 0x231934,
    lightColor: 0xe0b0ff,
    durationFallback: 13.5,
    subCues: [
      { t: 0.0, speaker: '🎬 MOVIE INTRO', text: 'Forensics HUNT! — A Mystery Movie by Ella.' },
      { t: 3.6, speaker: '🎙️ NARRATOR (ELLA)', text: "Story: Katey went to her BFF's B-day party. But when she came back, her room was empty! Who Did This!" }
    ]
  },
  {
    id: 2,
    title: '2. Suspects.',
    note: '🔍 Reviewing the 3 Suspects on the Detective Board • Witnesses: NONE',
    speaker: '🕵️‍♀️ DETECTIVE ELLA',
    subtitle: "Katey's mom (recently had an argument with Katey) • Amy (had a sleepover, didn't know she wasn't invited) • Lizzy (always left out, recently stole Katey's phone). Witnesses: NONE!",
    audioUrl: './audio/scene_2.mp3',
    panelUrl: './panels/panel_2.png',
    bgColor: 0x261c38,
    lightColor: 0xffccd5,
    durationFallback: 28.0,
    subCues: [
      { t: 0.0, speaker: '🕵️‍♀️ DETECTIVE ELLA', text: "Part 2: Suspects! Let's check the detective board." },
      { t: 4.2, speaker: '🕵️‍♀️ SUSPECT #1', text: "Katey's mom (recently had an argument with Katey)." },
      { t: 9.8, speaker: '🕵️‍♀️ SUSPECT #2', text: "Amy (Katey's friend Amy had a sleepover with Katey, but didn't know she wasn't invited)." },
      { t: 17.5, speaker: '🕵️‍♀️ SUSPECT #3', text: "Lizzy (Lizzy, Katey's sister, is always left out and had recently stolen Katey's phone). Witnesses: NONE!" }
    ]
  },
  {
    id: 3,
    title: '3. INTERROGATION',
    note: '✅ Note Applied: Removed the arrow pointing at Lizzy saying "guilty".',
    speaker: '🔦 INTERROGATION ROOM',
    subtitle: "Katey's mom: biting lip • Amy: not talking a lot, nervous smile, forced peace • Lizzy (short hair): scared, answering slowly and thinking, looking down, mumbling.",
    audioUrl: './audio/scene_3.mp3',
    panelUrl: './panels/panel_3.png',
    bgColor: 0x2b161b,
    lightColor: 0xffaa66,
    durationFallback: 22.4,
    subCues: [
      { t: 0.0, speaker: '🔦 INTERROGATION', text: 'Part 3: INTERROGATION! Watch how each suspect reacts under the spotlight.' },
      { t: 5.5, speaker: '👩 KATEY\'S MOM', text: "Katey's mom: Biting her lip nervously." },
      { t: 9.0, speaker: '✌️ AMY', text: 'Amy: Not talking a lot, wearing a nervous smile, and holding a forced peace sign.' },
      { t: 15.0, speaker: '😟 LIZZY', text: 'Lizzy: Scared, answering slowly and thinking, looking down, and mumbling.' }
    ]
  },
  {
    id: 4,
    title: '4. But, What did they say!',
    note: '💬 Full Multi-Character Voice Acting for Mom, Amy, and Lizzy!',
    speaker: '💬 SUSPECT STATEMENTS',
    subtitle: 'Mom: "I was at work. It was an emergency meeting!" • Amy: "I just went home and finished assignments from Corey\'s class." • Lizzy: "Oh I also sold some of my sis— no my stuff and bought better clothes."',
    audioUrl: './audio/scene_4.mp3',
    panelUrl: './panels/panel_4.png',
    bgColor: 0x16263b,
    lightColor: 0x90e0ef,
    durationFallback: 35.0,
    subCues: [
      { t: 0.0, speaker: '🕵️‍♀️ DETECTIVE ELLA', text: 'Part 4: But, What did they say!' },
      { t: 2.8, speaker: '👩 MOM', text: '"I was at work. It was an emergency meeting!"' },
      { t: 8.2, speaker: '👧 AMY', text: '"I was really sad when I was uninvited. I just went home and finished assignments from Corey\'s class."' },
      { t: 18.0, speaker: '😟 LIZZY', text: '"I... I... was like reading in my... a room. Then I slept and called my... my friend! friend! Oh I also sold some of my sis— no my stuff and bought better clothes."' }
    ]
  },
  {
    id: 5,
    title: "5. Let's Narrow this Down! By Fingerprints!",
    note: '✅ Note Applied: Crime scene print stands alone on left; Mom, Amy & Lizzy placed separately on right.',
    speaker: '🔬 FORENSICS LAB',
    subtitle: 'Crime scene: [Print] vs. Fingerprint: [Mom] [Amy] [Lizzy] — Mom and Lizzy have similar fingerprints. Amy is safe 😌 (sighs in relief)',
    audioUrl: './audio/scene_5.mp3',
    panelUrl: './panels/panel_5.png',
    bgColor: 0x292514,
    lightColor: 0xffe66d,
    durationFallback: 21.4,
    subCues: [
      { t: 0.0, speaker: '🔬 FORENSICS LAB', text: "Part 5: Let's Narrow this Down! By Fingerprints!" },
      { t: 4.5, speaker: '🔬 LASER SCANNER', text: 'Comparing Crime Scene fingerprint vs. Mom, Amy, and Lizzy...' },
      { t: 11.2, speaker: '🧬 MATCH RESULT', text: 'Mom and Lizzy have similar fingerprints to the Crime Scene! Amy is safe 😌 (sighs in relief).' }
    ]
  },
  {
    id: 6,
    title: '6. But Interrogation!',
    note: '📋 Detective Notes Deduction • Rubber Stamp: "Mom is Safe!"',
    speaker: '📋 DETECTIVE NOTES',
    subtitle: 'Detective notes — Mom: Biting lip. Lizzy: Scared, answering slowly, and thinking long, looking down in shame, mumbling. [Mom is Safe!]',
    audioUrl: './audio/scene_6.mp3',
    panelUrl: './panels/panel_6.png',
    bgColor: 0x2b2412,
    lightColor: 0xffd166,
    durationFallback: 19.2,
    subCues: [
      { t: 0.0, speaker: '📋 DETECTIVE NOTES', text: 'Part 6: But Interrogation! Checking the detective notes...' },
      { t: 5.5, speaker: '📋 DEDUCTION', text: 'Mom: Only biting lip. Lizzy: Scared, answering slowly, and thinking long, looking down in shame, mumbling!' },
      { t: 14.5, speaker: '✅ VERDICT ON MOM', text: 'STAMPED: Mom is Safe!' }
    ]
  },
  {
    id: 7,
    title: '7. She Was GUILTY!',
    note: "✅ Note Applied: Lizzy's hair is kept short (chin-length bob) to match Panel 3.",
    speaker: '⚖️ FINAL VERDICT',
    subtitle: '7. She Was GUILTY! — Short-haired Lizzy is caught red-handed!',
    audioUrl: './audio/scene_7.mp3',
    panelUrl: './panels/panel_7.png',
    bgColor: 0x281436,
    lightColor: 0xd08bff,
    durationFallback: 8.0,
    subCues: [
      { t: 0.0, speaker: '⚖️ FINAL VERDICT', text: '7. She Was GUILTY! All forensic evidence and interrogation clues point to Lizzy!' }
    ]
  },
  {
    id: 8,
    title: '8. by Ella',
    note: '✅ Note Applied: Final panel says "8. by Ella"!',
    speaker: '💖 CASE CLOSED • BY ELLA',
    subtitle: '8. by Ella ❤️ 🙂 ⭐',
    audioUrl: './audio/scene_8.mp3',
    panelUrl: './panels/panel_8.png',
    bgColor: 0x361428,
    lightColor: 0xff758f,
    durationFallback: 4.5,
    subCues: [
      { t: 0.0, speaker: '💖 GRAND FINALE', text: 'Part 8: Case closed, by Ella! ❤️ 🙂 ⭐' }
    ]
  }
];

// ============================================================================
// 2. INDEXEDDB STORAGE FOR CUSTOM RECORDED VOICEOVERS
// ============================================================================
class VoiceoverStore {
  constructor() {
    this.dbName = 'EllaForensicsMovieDB';
    this.storeName = 'voiceovers';
    this.db = null;
    this.memCache = new Map();
  }

  async init() {
    return new Promise((resolve) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        this.loadAllToCache().then(resolve);
      };
      req.onerror = () => resolve();
    });
  }

  async loadAllToCache() {
    if (!this.db) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const url = URL.createObjectURL(cursor.value);
          this.memCache.set(Number(cursor.key), { blob: cursor.value, url });
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => resolve();
    });
  }

  async saveRecording(sceneIndex, blob) {
    const prev = this.memCache.get(sceneIndex);
    if (prev && prev.url) URL.revokeObjectURL(prev.url);
    const url = URL.createObjectURL(blob);
    this.memCache.set(sceneIndex, { blob, url });

    if (!this.db) return url;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).put(blob, sceneIndex);
      tx.oncomplete = () => resolve(url);
      tx.onerror = () => resolve(url);
    });
  }

  async deleteRecording(sceneIndex) {
    const prev = this.memCache.get(sceneIndex);
    if (prev && prev.url) URL.revokeObjectURL(prev.url);
    this.memCache.delete(sceneIndex);

    if (!this.db) return;
    return new Promise((resolve) => {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).delete(sceneIndex);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  }

  getCustomUrl(sceneIndex) {
    const item = this.memCache.get(sceneIndex);
    return item ? item.url : null;
  }
}

// ============================================================================
// 3. PROCEDURAL CINEMATIC SOUNDTRACK & SFX ENGINE (WEB AUDIO API)
// ============================================================================
class CinematicSoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicVolume = 0.35;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.stepIndex = 0;
    this.currentSceneIndex = 0;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.musicVolume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.musicVolume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
    }
  }

  startScore() {
    this.ensureContext();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Detective mystery bass & pizzicato loop that adapts to the current scene
    const mysteryNotes = [146.83, 174.61, 164.81, 130.81, 146.83, 220.0, 196.0, 174.61]; // D minor noir
    const finaleNotes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 349.23, 392.0];   // C major happy BFF

    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic || !this.ctx || this.musicVolume <= 0.01) return;
      const now = this.ctx.currentTime;
      const isFinale = this.currentSceneIndex === 7;
      const isGuilty = this.currentSceneIndex === 6;
      const scale = isFinale ? finaleNotes : mysteryNotes;
      const freq = scale[this.stepIndex % scale.length];
      this.stepIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = isFinale ? 'triangle' : (isGuilty ? 'sawtooth' : 'sine');
      osc.frequency.setValueAtTime(isGuilty ? freq * 0.5 : freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(isGuilty ? 0.14 : 0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.45);
    }, 480);
  }

  stopScore() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playWhoosh() {
    if (!this.ctx || this.musicVolume <= 0.01) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.35);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  playStampImpact() {
    if (!this.ctx || this.musicVolume <= 0.01) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.32);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.36);
  }
}

// ============================================================================
// 4. THREE.JS 3D SOUNDSTAGE & 8 DIORAMA SETS
// ============================================================================
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x060311);
scene.fog = new THREE.FogExp2(0x060311, 0.0026);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 6, 42);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.92);
scene.add(ambientLight);

const keySpotLight = new THREE.SpotLight(0xfff4d6, 3.4, 75, Math.PI / 4, 0.45, 1);
keySpotLight.position.set(0, 18, 38);
keySpotLight.castShadow = true;
scene.add(keySpotLight);
scene.add(keySpotLight.target);

const rimLight = new THREE.PointLight(0x9b5de5, 2.5, 55);
rimLight.position.set(-8, 10, 28);
scene.add(rimLight);

// ============================================================================
// 4A. COSMIC DEEP-SPACE NEBULA SKY DOME & ORBITAL SOUNDSTAGE FLOOR
// ============================================================================
function createCosmicSkyTexture() {
  const c = document.createElement('canvas');
  c.width = 2048;
  c.height = 1024;
  const ctx = c.getContext('2d');

  // Deep cosmic void gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, c.height);
  bgGrad.addColorStop(0.0, '#03010a');
  bgGrad.addColorStop(0.35, '#09041c');
  bgGrad.addColorStop(0.55, '#12082e');
  bgGrad.addColorStop(0.75, '#080418');
  bgGrad.addColorStop(1.0, '#030108');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, c.width, c.height);

  // Sweeping Milky Way & Cosmic Nebula Clouds
  const nebulaClouds = [
    { x: 420,  y: 360, rx: 520, ry: 180, col: 'rgba(155, 93, 229, 0.26)' },
    { x: 1050, y: 310, rx: 640, ry: 210, col: 'rgba(255, 77, 141, 0.22)' },
    { x: 1620, y: 390, rx: 480, ry: 170, col: 'rgba(0, 245, 212, 0.18)' },
    { x: 760,  y: 440, rx: 550, ry: 150, col: 'rgba(255, 209, 102, 0.14)' },
    { x: 1380, y: 260, rx: 420, ry: 160, col: 'rgba(114, 9, 183, 0.28)' },
    { x: 220,  y: 280, rx: 390, ry: 140, col: 'rgba(76, 201, 240, 0.20)' }
  ];
  nebulaClouds.forEach((n) => {
    ctx.save();
    ctx.translate(n.x, n.y);
    ctx.scale(1, n.ry / n.rx);
    const g = ctx.createRadialGradient(0, 0, 10, 0, 0, n.rx);
    g.addColorStop(0, n.col);
    g.addColorStop(0.55, n.col.replace(/[\d.]+\)$/, '0.08)'));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, n.rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Crisp multi-colored starfield across the sky dome
  const starColors = ['#ffffff', '#fff3b0', '#caf0f8', '#ffccd5', '#e0aaff', '#ffd166'];
  for (let i = 0; i < 2200; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const r = Math.random() < 0.08 ? 1.8 + Math.random() * 1.8 : 0.5 + Math.random() * 1.1;
    ctx.fillStyle = starColors[i % starColors.length];
    ctx.globalAlpha = 0.45 + Math.random() * 0.55;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const cosmicSkyDome = new THREE.Mesh(
  new THREE.SphereGeometry(185, 64, 32),
  new THREE.MeshBasicMaterial({ map: createCosmicSkyTexture(), side: THREE.BackSide, fog: false })
);
scene.add(cosmicSkyDome);

// Studio Soundstage Cosmic Observatory Floor & Celestial Orbit Rings
const floorGeo = new THREE.CylinderGeometry(52, 52, 0.8, 64);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x0e0820,
  roughness: 0.28,
  metalness: 0.35
});
const studioFloor = new THREE.Mesh(floorGeo, floorMat);
studioFloor.position.y = -3.6;
studioFloor.receiveShadow = true;
scene.add(studioFloor);

// Concentric Golden & Cyan Celestial Soundstage Rings
const ringGeo = new THREE.RingGeometry(27.4, 28.3, 96);
ringGeo.rotateX(-Math.PI / 2);
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd166, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
const stageRing = new THREE.Mesh(ringGeo, ringMat);
stageRing.position.y = -3.18;
scene.add(stageRing);

const outerCosmicRingGeo = new THREE.RingGeometry(33.5, 34.1, 96);
outerCosmicRingGeo.rotateX(-Math.PI / 2);
const outerCosmicRing = new THREE.Mesh(
  outerCosmicRingGeo,
  new THREE.MeshBasicMaterial({ color: 0x00f5d4, side: THREE.DoubleSide, transparent: true, opacity: 0.25 })
);
outerCosmicRing.position.y = -3.19;
scene.add(outerCosmicRing);

// 3D Blender Cosmic Floating Objects & Giant 3D Saturn Backdrop (populated from scene_props_3d.glb)
const cosmicOrbitersGroup = new THREE.Group();
scene.add(cosmicOrbitersGroup);
const cosmicOrbiterItems = [];
let saturnBackdropHero = null;
let cosmicExoplanetHero = null;

// Helper to create crisp Canvas 2D labels as Three.js textures
function makeLabelTexture(text, bgColor = '#ffd166', textColor = '#161026', width = 512, height = 128, fontSize = 44) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(6, 6, width - 12, height - 12, 24);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#111111';
  ctx.stroke();
  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px "Fredoka", "Comic Neue", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Helper to create multi-line ruled Detective Note cards for Act 6
function makeDetectiveNotesTexture(lines, bgColor = '#fff6b3', borderColor = '#161026', width = 640, height = 260, fontSize = 34) {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(6, 6, width - 12, height - 12, 18);
  ctx.fill();

  // Faint blue horizontal notebook ruling lines
  ctx.strokeStyle = 'rgba(72, 149, 239, 0.28)';
  ctx.lineWidth = 2;
  const lineSpacing = Math.floor((height - 36) / Math.max(lines.length, 1));
  for (let i = 0; i < lines.length; i++) {
    const yLine = 34 + (i + 1) * lineSpacing - 8;
    ctx.beginPath();
    ctx.moveTo(18, yLine);
    ctx.lineTo(width - 18, yLine);
    ctx.stroke();
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  ctx.font = `bold ${fontSize}px "Fredoka", "Comic Neue", sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  lines.forEach((item, idx) => {
    ctx.fillStyle = item.color || '#161026';
    const yPos = 24 + (idx + 0.5) * lineSpacing;
    ctx.fillText(item.text, 28, yPos);
  });

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeFingerprintCardMesh(label, isCrimeScene = false) {
  const group = new THREE.Group();
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 360;
  const ctx = c.getContext('2d');

  // Card backing
  ctx.fillStyle = '#fff9db';
  ctx.fillRect(0, 0, 256, 360);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 232, 260);

  // Draw concentric fingerprint whorls
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3.5;
  const cx = 128;
  const cy = 145;
  const isAmy = label === 'Amy';
  for (let r = 12; r < 95; r += 8) {
    ctx.beginPath();
    if (isAmy) {
      // Arch pattern for Amy (distinct!)
      ctx.arc(cx, cy + 25, r, Math.PI * 1.1, Math.PI * 1.9);
    } else {
      // Spiral whorl pattern for Crime Scene, Mom, and Lizzy
      ctx.ellipse(cx, cy, r * 0.78, r, 0.12, 0.2, Math.PI * 1.85);
    }
    ctx.stroke();
  }

  // Bottom label (Note: Crime Scene has NO "Mom" underneath!)
  if (label) {
    ctx.fillStyle = '#111';
    ctx.font = 'bold 42px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, 128, 326);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.9, 0.12),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 })
  );
  group.add(card);

  if (isCrimeScene) {
    const topLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.45),
      new THREE.MeshBasicMaterial({ map: makeLabelTexture('Crime scene:', '#fff3b0', '#111', 360, 100, 42), transparent: true })
    );
    topLabel.position.set(0, 1.25, 0.08);
    group.add(topLabel);
  }
  return group;
}

// Build all 8 Stage Sets around the soundstage circle (radius = 28)
const STAGE_RADIUS = 28;
const stageGroups = [];
const animatedProps = {};
const characterSlots = {
  lizzy: [],
  mom: [],
  amy: [],
  katey: []
};
const characterSceneMap = new Map(); // `${sceneIdx}:${charKey}` -> THREE.Group
const propPlacementQueue = []; // { propName, targetGroup, x, y, z, scale, rotX, rotY, rotZ }
const characterMixers = [];
const textureLoader = new THREE.TextureLoader();

function createCharacterSlot(charKey, sceneIdx, parentGroup, x, y, z, scale = 1.75, rotY = 0) {
  const slot = new THREE.Group();
  slot.position.set(x, y, z);
  slot.rotation.y = rotY;
  slot.scale.set(scale, scale, scale);

  // Dedicated warm front-key light so each 3D character's sculpted face, hair, and outfit shine
  const charLight = new THREE.PointLight(0xfff5e4, 2.2, 8.5);
  charLight.position.set(0.25, 1.35, 1.45);
  slot.add(charLight);

  parentGroup.add(slot);
  if (characterSlots[charKey]) {
    characterSlots[charKey].push({ sceneIdx, slot });
  }
  characterSceneMap.set(`${sceneIdx}:${charKey}`, slot);
  return slot;
}

function queuePropInstance(propName, parentGroup, x, y, z, scale = 1.0, rotY = 0, rotX = 0, rotZ = 0) {
  const holder = new THREE.Group();
  holder.position.set(x, y, z);
  holder.rotation.set(rotX, rotY, rotZ);
  holder.scale.set(scale, scale, scale);
  parentGroup.add(holder);
  propPlacementQueue.push({ propName, holder });
  return holder;
}

SCENES.forEach((sceneData, idx) => {
  const angle = (idx / SCENES.length) * Math.PI * 2;
  const stageGroup = new THREE.Group();
  stageGroup.position.set(Math.sin(angle) * STAGE_RADIUS, 0, Math.cos(angle) * STAGE_RADIUS);
  stageGroup.rotation.y = angle;
  scene.add(stageGroup);
  stageGroups.push(stageGroup);

  // Stage Circular Platform Pedestal
  const podiumGeo = new THREE.CylinderGeometry(5.6, 6.0, 0.6, 40);
  const podiumMat = new THREE.MeshStandardMaterial({
    color: sceneData.bgColor,
    roughness: 0.4,
    metalness: 0.15
  });
  const podium = new THREE.Mesh(podiumGeo, podiumMat);
  podium.position.y = -2.9;
  podium.receiveShadow = true;
  stageGroup.add(podium);

  // Main 3D Framed Comic Panel Screen (Left-Center of the Stage Set)
  const panelTex = textureLoader.load(sceneData.panelUrl);
  panelTex.colorSpace = THREE.SRGBColorSpace;

  const frameGroup = new THREE.Group();
  frameGroup.position.set(-2.0, 0.35, -0.8);
  frameGroup.rotation.y = 0.16;

  // Outer Gold/Dark Frame
  const outerFrame = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 6.3, 0.28),
    new THREE.MeshStandardMaterial({ color: 0x2b1e3e, metalness: 0.45, roughness: 0.3 })
  );
  outerFrame.castShadow = true;
  frameGroup.add(outerFrame);

  const goldTrim = new THREE.Mesh(
    new THREE.BoxGeometry(4.28, 6.08, 0.31),
    new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.6, roughness: 0.25 })
  );
  frameGroup.add(goldTrim);

  // Crisp Comic Panel Surface
  const panelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.1, 5.9),
    new THREE.MeshBasicMaterial({ map: panelTex })
  );
  panelPlane.position.z = 0.17;
  frameGroup.add(panelPlane);
  stageGroup.add(frameGroup);

  // Right-Side 3D Diorama Props specific to each Act!
  const diorama = new THREE.Group();
  diorama.position.set(2.3, -2.6, 0.35);
  stageGroup.add(diorama);

  if (idx === 0) {
    // ACT 1: Katey's Empty Bedroom with Real 3D Blender & Poly Haven Props + 3D Animated Katey!
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 4.7, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xc8b4d8, roughness: 0.7 })
    );
    wall.position.set(0, 2.35, -1.4);
    wall.receiveShadow = true;
    diorama.add(wall);

    // White baseboard along bottom of lavender bedroom wall
    const baseboard = new THREE.Mesh(
      new THREE.BoxGeometry(4.52, 0.18, 0.21),
      new THREE.MeshStandardMaterial({ color: 0xf4effa, roughness: 0.5 })
    );
    baseboard.position.set(0, 0.09, -1.39);
    diorama.add(baseboard);

    // Panelled Cream Bedroom Door on left of wall with "Katey" plaque & brass doorknob
    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.38, 3.05, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xf5ebe6, roughness: 0.55 })
    );
    doorFrame.position.set(-1.38, 1.52, -1.28);
    const doorInner = new THREE.Mesh(
      new THREE.BoxGeometry(1.16, 2.85, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xeadcd5, roughness: 0.6 })
    );
    doorInner.position.set(-1.38, 1.50, -1.25);
    const kateyPlaque = new THREE.Mesh(
      new THREE.PlaneGeometry(0.68, 0.28),
      new THREE.MeshBasicMaterial({ map: makeLabelTexture('Katey', '#e6b88a', '#2b1911', 256, 108, 52), transparent: true })
    );
    kateyPlaque.position.set(-1.38, 2.25, -1.20);
    const doorKnob = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xd4a359, metalness: 0.8, roughness: 0.25 })
    );
    doorKnob.position.set(-0.92, 1.38, -1.18);
    diorama.add(doorFrame, doorInner, kateyPlaque, doorKnob);

    // Colorful sticky notes on right bedroom wall (matching Panel 1)
    // Poly Haven CC0 3D Sticky Notes clusters pinned to the bedroom wall above the dresser
    queuePropInstance('Prop_Sticky_Notes', diorama, 0.85, 2.55, -1.27, 1.15, 0.04);
    queuePropInstance('Prop_Sticky_Notes', diorama, 1.48, 2.25, -1.27, 0.95, -0.08);

    // Lavender Bedroom Rug on floor in front of dresser
    const rug = new THREE.Mesh(
      new THREE.BoxGeometry(2.65, 0.03, 1.35),
      new THREE.MeshStandardMaterial({ color: 0x9d84b7, roughness: 0.85 })
    );
    rug.position.set(0.55, 0.015, 0.48);
    rug.receiveShadow = true;
    diorama.add(rug);

    // 1. Real 3D Walnut Chest of Drawers with Open Hollow Drawers & Spilled Papers
    queuePropInstance('Prop_Wooden_Dresser', diorama, 0.82, 0.0, -0.78, 1.35, 0);

    // 2. Poly Haven CC0 Potted Zebra Haworthia Succulent on right corner of dresser
    queuePropInstance('Prop_Potted_Succulent', diorama, 1.52, 1.18, -0.72, 1.45, 0.4);

    // 3. Poly Haven CC0 Open Binder Notebook & Stationery Cup on dresser top
    queuePropInstance('Prop_Binder_Notebook', diorama, 0.15, 1.20, -0.68, 1.35, 0.25);
    queuePropInstance('Prop_Stationery_Cup', diorama, 1.12, 1.18, -0.74, 1.25, -0.2);

    // 4. Poly Haven CC0 Wooden Picture Frame hanging on bedroom wall
    queuePropInstance('Prop_Picture_Frame', diorama, -0.18, 2.55, -1.28, 1.25, 0);

    // 5. Real 3D Purple Rolling Swivel Office Chair on 5 caster wheels (animated swivel!)
    const chairGroup = queuePropInstance('Prop_Swivel_Chair', diorama, -0.95, 0.0, -0.18, 1.45, 0.35);
    animatedProps.chair = chairGroup;

    // 6. Real 3D Over-Ear Headphones + Cord + Necklace lying on the bedroom rug
    queuePropInstance('Prop_Headphones', diorama, 0.88, 0.03, 0.55, 1.55, 0.15);

    // 7. 3D Rigged & Animated Stylized Katey discovering her empty bedroom!
    createCharacterSlot('katey', idx, diorama, -1.85, 0.0, 0.42, 1.72, 0.28);

    // 8. Real Poly Haven CC0 3D Magnifying Glass (`Prop_Magnifying_Glass`) hovering & scanning the crime scene!
    const magGroup = queuePropInstance('Prop_Magnifying_Glass', diorama, 0.2, 2.55, 0.68, 1.38, 0);
    animatedProps.magnifyingGlass = magGroup;
  } else if (idx === 1) {
    // ACT 2: 3D Detective Suspects Board + ALL 3 3D Rigged Suspects (Mom, Amy & Lizzy)!
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(3.1, 4.4, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xf3e5ab, roughness: 0.6 })
    );
    board.position.set(-0.95, 2.3, -0.65);
    const woodBorder = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 4.7, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x7f5539 })
    );
    woodBorder.position.set(-0.95, 2.3, -0.70);
    diorama.add(woodBorder, board);

    const suspects = [
      { name: "1. Katey's Mom", y: 3.5, col: '#ffccd5' },
      { name: '2. Amy (Friend)', y: 2.5, col: '#caf0f8' },
      { name: '3. Lizzy (Sister)', y: 1.5, col: '#e0aaff' },
      { name: 'Witnesses: NONE', y: 0.55, col: '#ffd166' }
    ];
    suspects.forEach((s) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(2.75, 0.72),
        new THREE.MeshBasicMaterial({ map: makeLabelTexture(s.name, s.col, '#111', 512, 120, 42), transparent: true })
      );
      card.position.set(-0.95, s.y, -0.50);
      diorama.add(card);
    });

    // Bouncing Red Arrow above the Suspect Board
    const arrowGroup = new THREE.Group();
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.7, 4),
      new THREE.MeshStandardMaterial({ color: 0xd62828, emissive: 0x550000 })
    );
    cone.rotation.x = Math.PI;
    const shaft = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.65, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xd62828 })
    );
    shaft.position.y = 0.6;
    arrowGroup.add(cone, shaft);
    arrowGroup.position.set(-0.2, 5.1, -0.35);
    arrowGroup.rotation.z = -0.25;
    diorama.add(arrowGroup);
    animatedProps.suspectArrow = arrowGroup;

    // All 3 3D Rigged & Animated Suspects lined up beside the Suspects Board!
    createCharacterSlot('mom', idx, diorama, 0.85, 0.0, -0.15, 1.58, -0.12);
    createCharacterSlot('amy', idx, diorama, 1.65, 0.0, 0.25, 1.58, -0.18);
    createCharacterSlot('lizzy', idx, diorama, 2.45, 0.0, 0.55, 1.62, -0.25);
  } else if (idx === 2) {
    // ACT 3: 3D INTERROGATION — All 3 3D Animated Suspects (Mom, Amy, Lizzy) + 3D Interrogation Chairs + 3D Barn-Door Spotlights!
    const pedColors = [0xe56b6f, 0xf4a261, 0x6d597a];
    const suspectConfigs = [
      { key: 'mom', label: "Katey's Mom", badgeCol: '#ffccd5', coneCol: 0xff758f },
      { key: 'amy', label: 'Amy (Peace ✌️)', badgeCol: '#ffe66d', coneCol: 0xffe66d },
      { key: 'lizzy', label: 'Lizzy (Mumbling)', badgeCol: '#e0aaff', coneCol: 0xc77dff }
    ];
    animatedProps.interrogationCones = [];
    animatedProps.interrogationRigs = [];

    suspectConfigs.forEach((cfg, i) => {
      const xPos = (i - 1) * 1.55;
      const pedHeight = 0.36;
      const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.70, pedHeight, 28),
        new THREE.MeshStandardMaterial({ color: pedColors[i], roughness: 0.35, metalness: 0.2 })
      );
      stand.position.set(xPos, pedHeight * 0.5, 0);
      stand.receiveShadow = true;
      diorama.add(stand);

      const badge = new THREE.Mesh(
        new THREE.PlaneGeometry(1.42, 0.58),
        new THREE.MeshBasicMaterial({
          map: makeLabelTexture(cfg.label, cfg.badgeCol, '#111', 400, 120, 36),
          transparent: true
        })
      );
      badge.position.set(xPos, 4.05, 0.42);
      diorama.add(badge);

      // 1. Real Poly Haven CC0 3D Interrogation Chair (`Prop_Interrogation_Chair`) on each pedestal behind the suspect!
      queuePropInstance('Prop_Interrogation_Chair', diorama, xPos, pedHeight, -0.26, 1.35, 0);

      // 2. Real 3D Theatrical Barn-Door Interrogation Spotlight (`Prop_Interrogation_Spotlight`) mounted overhead!
      const spotRig = queuePropInstance('Prop_Interrogation_Spotlight', diorama, xPos, 5.25, 0.25, 1.35, 0);
      animatedProps.interrogationRigs.push(spotRig);

      // Volumetric Spotlight Cone streaming down from the 3D Barn-Door Spotlight
      const coneMat = new THREE.MeshBasicMaterial({
        color: cfg.coneCol,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const lightCone = new THREE.Mesh(new THREE.ConeGeometry(1.02, 4.5, 24, 1, true), coneMat);
      lightCone.position.set(xPos, 3.15, 0.05);
      diorama.add(lightCone);
      animatedProps.interrogationCones.push(lightCone);

      // 3. Place the 3D Rigged & Animated Suspect (Mom #1, Amy #2, Lizzy #3) on their pedestal!
      createCharacterSlot(cfg.key, idx, diorama, xPos, pedHeight, 0.12, 1.76, (1 - i) * 0.12);
    });
  } else if (idx === 3) {
    // ACT 4: 3D Pop-Up Speech Bubbles ("But, What did they say!") + 3D Mom, Amy & Lizzy
    animatedProps.speechBubbles = [];
    const lines = [
      { who: 'Mom: "Emergency meeting at work!"', y: 3.7, col: '#ffffff' },
      { who: 'Amy: "Finished Corey\'s class homework!"', y: 2.35, col: '#e0fbfc' },
      { who: 'Lizzy: "Sold my sis— no my stuff!"', y: 1.0, col: '#ffccd5' }
    ];
    lines.forEach((item, i) => {
      const bubble = new THREE.Mesh(
        new THREE.PlaneGeometry(3.3, 0.90),
        new THREE.MeshBasicMaterial({
          map: makeLabelTexture(item.who, item.col, '#111', 680, 140, 34),
          transparent: true
        })
      );
      bubble.position.set(-0.75, item.y, 0.08 * i);
      diorama.add(bubble);
      animatedProps.speechBubbles.push(bubble);
    });

    createCharacterSlot('mom', idx, diorama, 1.05, 0.0, -0.25, 1.55, -0.15);
    createCharacterSlot('amy', idx, diorama, 1.78, 0.0, 0.15, 1.55, -0.20);
    createCharacterSlot('lizzy', idx, diorama, 2.48, 0.0, 0.50, 1.62, -0.25);
  } else if (idx === 4) {
    // ACT 5: 3D Forensics Fingerprint Scanner (Crime Scene vs. Mom, Amy, Lizzy separately!) + 3D Amy & Lizzy
    const crimePrint = makeFingerprintCardMesh('', true);
    crimePrint.position.set(-1.65, 2.2, 0);
    diorama.add(crimePrint);

    const vsBadge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.75, 0.55),
      new THREE.MeshBasicMaterial({ map: makeLabelTexture('vs.', '#ffd166', '#111', 200, 140, 56), transparent: true })
    );
    vsBadge.position.set(-0.6, 2.1, 0.15);
    diorama.add(vsBadge);

    const headerRight = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 0.45),
      new THREE.MeshBasicMaterial({ map: makeLabelTexture('Fingerprint', '#fff3b0', '#111', 420, 100, 42), transparent: true })
    );
    headerRight.position.set(1.15, 3.45, 0.08);
    diorama.add(headerRight);

    ['Mom', 'Amy', 'Lizzy'].forEach((name, i) => {
      const card = makeFingerprintCardMesh(name, false);
      card.scale.set(0.72, 0.72, 0.72);
      card.position.set(0.15 + i * 1.02, 2.15, 0);
      diorama.add(card);
    });

    // Moving Green Laser Scanner Bar
    const laserBar = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 0.09, 0.35),
      new THREE.MeshBasicMaterial({ color: 0x00f5d4 })
    );
    laserBar.position.set(0.2, 2.2, 0.22);
    diorama.add(laserBar);
    animatedProps.laserBar = laserBar;

    // 3D Amy (cleared by fingerprints!) standing on the right
    createCharacterSlot('amy', idx, diorama, 2.65, 0.0, 0.45, 1.65, -0.28);
  } else if (idx === 5) {
    // ACT 6: "6. But Interrogation!" — 3D Poly Haven Detective Clipboard, Multi-Line Notes, Writing Pen, Magnifying Glass & Slamming 3D Rubber Stamp!
    // 1. Real Poly Haven CC0 3D Detective Clipboard & Lined Legal Pad (`Prop_Detective_Clipboard`)
    queuePropInstance('Prop_Detective_Clipboard', diorama, -0.88, 2.38, -0.42, 1.02, 0);

    // 2. Detective Notes Header & Itemized Behavior Comparison Cards (matching Panel 6!)
    const notesHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(2.75, 0.54),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('📋 Detective notes:', '#ffd166', '#161026', 540, 110, 42),
        transparent: true
      })
    );
    notesHeader.position.set(-0.88, 4.02, -0.14);
    diorama.add(notesHeader);

    const momNoteCard = new THREE.Mesh(
      new THREE.PlaneGeometry(2.78, 0.68),
      new THREE.MeshBasicMaterial({
        map: makeDetectiveNotesTexture(
          [
            { text: 'Mom: Biting lip', color: '#161026' },
            { text: '✓ Just nervous — Alibi checks out!', color: '#1b4332' }
          ],
          '#d8f3dc',
          '#2d6a4f',
          620,
          150,
          31
        ),
        transparent: true
      })
    );
    momNoteCard.position.set(-0.88, 3.28, -0.12);
    diorama.add(momNoteCard);

    const lizzyNoteCard = new THREE.Mesh(
      new THREE.PlaneGeometry(2.85, 1.25),
      new THREE.MeshBasicMaterial({
        map: makeDetectiveNotesTexture(
          [
            { text: 'Lizzy: Scared,', color: '#9d0208' },
            { text: 'answering slowly, and thinking long,', color: '#161026' },
            { text: 'looking down in shame, mumbling.', color: '#6a040f' }
          ],
          '#fff3b0',
          '#d62828',
          660,
          280,
          30
        ),
        transparent: true
      })
    );
    lizzyNoteCard.position.set(-0.88, 2.18, -0.11);
    diorama.add(lizzyNoteCard);
    animatedProps.lizzyNoteCard = lizzyNoteCard;

    // 3. Stamped "Mom is Safe!" Impression Box at bottom of Legal Pad
    const stampBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(2.82, 0.88),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('Mom is Safe!', '#fff3b0', '#111111', 560, 150, 58),
        transparent: true
      })
    );
    stampBanner.position.set(-0.88, 0.96, -0.09);
    stampBanner.rotation.z = 0.08;
    diorama.add(stampBanner);
    animatedProps.momSafeStamp = stampBanner;

    // 4. Real 3D Wooden & Brass Rubber Stamp (`Prop_Rubber_Stamp`) that physically slams down onto "Mom is Safe!"
    const rubberStamp = queuePropInstance('Prop_Rubber_Stamp', diorama, -0.88, 0.96, 0.85, 0.88, 0);
    rubberStamp.rotation.z = 0.08;
    animatedProps.rubberStampMesh = rubberStamp;

    // 5. Real Poly Haven CC0 3D Executive Pen (`Prop_Detective_Pen`) actively writing & checking off the notes!
    const detPen = queuePropInstance('Prop_Detective_Pen', diorama, -0.15, 3.15, 0.12, 1.15, 0);
    animatedProps.detectivePen = detPen;

    // 6. Real Poly Haven CC0 3D Magnifying Glass (`Prop_Magnifying_Glass`) inspecting Lizzy's suspicious notes!
    const detMag = queuePropInstance('Prop_Magnifying_Glass', diorama, -0.55, 2.18, 0.32, 1.18, 0);
    animatedProps.detectiveMagnifier = detMag;

    // 7. Poly Haven 3D Stationery Cup & Sticky Notes on the Detective Stand
    queuePropInstance('Prop_Stationery_Cup', diorama, -2.25, 0.0, 0.35, 1.65, 0.3);
    queuePropInstance('Prop_Sticky_Notes', diorama, 0.38, 3.85, -0.35, 1.05, -0.12);

    // 8. 3D Mom (stamped Safe!) and 3D Lizzy (Nervous & Mumbling!) side-by-side
    createCharacterSlot('mom', idx, diorama, 1.15, 0.0, 0.15, 1.68, -0.12);
    createCharacterSlot('lizzy', idx, diorama, 2.25, 0.0, 0.42, 1.72, -0.24);
  } else if (idx === 6) {
    // ACT 7: "7. She Was GUILTY!" — Full 3D Rigged & Animated Stylized Lizzy + 3D Interrogation Chair & Overhead Spotlight!
    queuePropInstance('Prop_Interrogation_Chair', diorama, 0.0, 0.0, -0.25, 1.55, 0);
    queuePropInstance('Prop_Interrogation_Spotlight', diorama, 0.0, 5.45, 0.35, 1.55, 0);
    const lizzyHeroSlot = createCharacterSlot('lizzy', idx, diorama, 0.0, 0.0, 0.25, 2.15, 0);

    const guiltyBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 0.95),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('She Was GUILTY!', '#ff4d6d', '#ffffff', 600, 150, 54),
        transparent: true
      })
    );
    guiltyBanner.position.set(0, 4.45, 0.1);
    diorama.add(guiltyBanner);
    animatedProps.guiltyBanner = guiltyBanner;
    animatedProps.lizzyStandee = lizzyHeroSlot;
  } else if (idx === 7) {
    // ACT 8: "8. by Ella" — 3D Sculpted Extruded Heart + Full 4-Character 3D Cast Curtain Call!
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x, y + 0.5);
    heartShape.bezierCurveTo(x, y + 0.5, x - 0.5, y + 1.2, x - 1.1, y + 1.2);
    heartShape.bezierCurveTo(x - 1.8, y + 1.2, x - 1.8, y + 0.2, x - 1.8, y + 0.2);
    heartShape.bezierCurveTo(x - 1.8, y - 0.6, x - 1.0, y - 1.3, x, y - 2.0);
    heartShape.bezierCurveTo(x + 1.0, y - 1.3, x + 1.8, y - 0.6, x + 1.8, y + 0.2);
    heartShape.bezierCurveTo(x + 1.8, y + 0.2, x + 1.8, y + 1.2, x + 1.1, y + 1.2);
    heartShape.bezierCurveTo(x + 0.5, y + 1.2, x, y + 0.5, x, y + 0.5);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.14,
      bevelThickness: 0.14
    });
    heartGeo.center();
    const heartMesh = new THREE.Mesh(
      heartGeo,
      new THREE.MeshStandardMaterial({ color: 0xe63946, roughness: 0.2, metalness: 0.25 })
    );
    heartMesh.position.set(0, 3.15, -0.2);
    diorama.add(heartMesh);
    animatedProps.bffHeart = heartMesh;

    // 3D By Ella Signature Plaque
    const ellaPlaque = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 0.9),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('❤️ by Ella', '#ffd166', '#161026', 540, 150, 52),
        transparent: true
      })
    );
    ellaPlaque.position.set(0, 1.05, -0.1);
    diorama.add(ellaPlaque);

    // Full 4-Character 3D Cast Curtain Call around the Finale Heart!
    createCharacterSlot('katey', idx, diorama, -1.75, 0.0, 0.45, 1.48, 0.22);
    createCharacterSlot('mom', idx, diorama, -0.65, 0.0, 0.55, 1.48, 0.08);
    createCharacterSlot('amy', idx, diorama, 0.65, 0.0, 0.55, 1.48, -0.08);
    createCharacterSlot('lizzy', idx, diorama, 1.75, 0.0, 0.45, 1.48, -0.22);
  }
});

// ============================================================================
// 4B. PARALLEL 3D ASSET LOADING PIPELINE WITH STARTUP PROGRESS LOADER
// ============================================================================
const startupLoaderEl = document.getElementById('startup-loader');
const startButtonsGroup = document.getElementById('start-buttons-group');
const loaderStatusText = document.getElementById('loader-status-text');
const loaderBarFill = document.getElementById('loader-bar-fill');
const loaderSubtext = document.getElementById('loader-subtext');

// Track individual asset progress across all 5 models
const ASSET_SPECS = [
  { id: 'katey', label: 'Katey (Protagonist)', url: './katey_3d.glb', clipName: 'Katey_Room_Discovery', type: 'character' },
  { id: 'mom',   label: "Katey's Mom", url: './mom_3d.glb',   clipName: 'Mom_Biting_Lip_Interrogation', type: 'character' },
  { id: 'amy',   label: 'Amy (Friend ✌️)', url: './amy_3d.glb',   clipName: 'Amy_Forced_Peace_Interrogation', type: 'character' },
  { id: 'lizzy', label: 'Lizzy (Sister)', url: './lizzy_3d.glb', clipName: 'Lizzy_Nervous_Interrogation', type: 'character' },
  { id: 'props', label: '3D Saturn & Scene Props', url: './scene_props_3d.glb', clipName: null, type: 'props' }
];

const assetProgressMap = new Map();
ASSET_SPECS.forEach((a) => assetProgressMap.set(a.id, { loaded: 0, total: 1, ratio: 0, done: false, label: a.label }));

function updateLoaderUI(activeLabel = '') {
  let totalRatio = 0;
  let finishedCount = 0;
  assetProgressMap.forEach((info) => {
    totalRatio += info.ratio;
    if (info.done) finishedCount++;
  });
  const avgPercent = Math.min(100, Math.round((totalRatio / ASSET_SPECS.length) * 100));

  if (loaderBarFill) {
    loaderBarFill.style.width = `${avgPercent}%`;
  }
  if (loaderStatusText) {
    if (finishedCount === ASSET_SPECS.length) {
      loaderStatusText.textContent = '✨ All 3D Characters & Cosmic Assets Ready!';
    } else if (activeLabel) {
      loaderStatusText.textContent = `Streaming ${activeLabel}… (${avgPercent}%)`;
    } else {
      loaderStatusText.textContent = `Loading 3D Soundstage & Cast… (${avgPercent}%)`;
    }
  }
  if (loaderSubtext) {
    loaderSubtext.textContent = finishedCount === ASSET_SPECS.length
      ? 'Parallel asset compilation complete • Ready to screen!'
      : `Parallel stream: ${finishedCount} of ${ASSET_SPECS.length} assets ready (${avgPercent}%)`;
  }
}

// Instantiate dedicated GLTFLoader
const gltfLoader = new GLTFLoader();

function loadGLTFAsync(spec) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      spec.url,
      (gltf) => {
        const item = assetProgressMap.get(spec.id);
        if (item) {
          item.ratio = 1;
          item.done = true;
        }
        updateLoaderUI(spec.label);
        resolve({ spec, gltf });
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const ratio = Math.min(1, xhr.loaded / xhr.total);
          const item = assetProgressMap.get(spec.id);
          if (item) {
            item.loaded = xhr.loaded;
            item.total = xhr.total;
            item.ratio = ratio;
          }
          updateLoaderUI(spec.label);
        }
      },
      (err) => {
        console.warn(`[AssetLoader] Non-fatal load issue for ${spec.url}:`, err);
        const item = assetProgressMap.get(spec.id);
        if (item) {
          item.ratio = 1;
          item.done = true;
        }
        updateLoaderUI();
        resolve({ spec, gltf: null });
      }
    );
  });
}

// Parallel execution via Promise.all across all 5 assets concurrently
const parallelAssetsPromise = Promise.all(ASSET_SPECS.map((s) => loadGLTFAsync(s))).then((results) => {
  results.forEach(({ spec, gltf }) => {
    if (!gltf) return;

    if (spec.type === 'character') {
      const key = spec.id;
      const baseModel = gltf.scene;
      const clips = gltf.animations || [];
      const targetClip = clips.find((c) => c.name === spec.clipName) || clips[0];

      (characterSlots[key] || []).forEach(({ slot }) => {
        const cloned = SkeletonUtils.clone(baseModel);
        cloned.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            node.frustumCulled = false;
            if (node.material) {
              node.material = node.material.clone();
              const mName = node.material.name || '';
              if (
                mName.includes('CropTop') ||
                mName.includes('PinkShirt') ||
                mName.includes('StarTee') ||
                mName.includes('Sweater')
              ) {
                node.material.vertexColors = false;
              }
              node.material.needsUpdate = true;
            }
          }
        });
        slot.add(cloned);

        if (targetClip) {
          const mixer = new THREE.AnimationMixer(cloned);
          const action = mixer.clipAction(targetClip);
          action.play();
          characterMixers.push(mixer);
        }
      });
    } else if (spec.type === 'props') {
      const propTemplates = new Map();
      gltf.scene.traverse((node) => {
        if (node.name && node.name.startsWith('Prop_')) {
          propTemplates.set(node.name, node);
        }
      });

      propPlacementQueue.forEach(({ propName, holder }) => {
        const template = propTemplates.get(propName);
        if (!template) return;
        const clone = template.clone(true);
        clone.position.set(0, 0, 0);
        clone.traverse((child) => {
          if (child.isMesh) {
            const matName = (child.material && child.material.name) || '';
            if (matName.includes('lense')) {
              child.material = child.material.clone();
              child.material.transparent = true;
              child.material.opacity = 0.34;
              child.material.depthWrite = false;
              child.castShadow = false;
              child.receiveShadow = false;
            } else {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });
        holder.add(clone);
      });

      // 1. Colossal 3D Saturn Backdrop (Prop_Saturn_Backdrop)
      const saturnTemplate = propTemplates.get('Prop_Saturn_Backdrop');
      if (saturnTemplate) {
        saturnBackdropHero = saturnTemplate.clone(true);
        saturnBackdropHero.scale.set(4.5, 4.5, 4.5);
        saturnBackdropHero.position.set(12, 9.2, -16);
        saturnBackdropHero.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.frustumCulled = false;
            if (child.material) {
              child.material = child.material.clone();
              if ((child.material.name || '').includes('Rings')) {
                child.material.transparent = true;
                child.material.side = THREE.DoubleSide;
                child.material.depthWrite = false;
              }
            }
          }
        });
        scene.add(saturnBackdropHero);
      }

      // 2. Companion 3D Ringed Exoplanet (Prop_Cosmic_Planet)
      const exoTemplate = propTemplates.get('Prop_Cosmic_Planet');
      if (exoTemplate) {
        cosmicExoplanetHero = exoTemplate.clone(true);
        cosmicExoplanetHero.scale.set(5.2, 5.2, 5.2);
        cosmicExoplanetHero.position.set(-18, 11.5, -14);
        cosmicExoplanetHero.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
        scene.add(cosmicExoplanetHero);
      }

      // 3. 160 Real 3D Blender Cosmic Orbiters
      const cosmicPropKeys = [
        'Prop_Cosmic_Star',
        'Prop_Cosmic_Sparkle',
        'Prop_Cosmic_Crystal',
        'Prop_Cosmic_Asteroid',
        'Prop_Cosmic_Planet'
      ].filter((k) => propTemplates.has(k));

      if (cosmicPropKeys.length > 0) {
        const totalOrbiters = 160;
        for (let i = 0; i < totalOrbiters; i++) {
          const key = cosmicPropKeys[i % cosmicPropKeys.length];
          const tpl = propTemplates.get(key);
          const inst = tpl.clone(true);
          const angle = (i / totalOrbiters) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
          const radius = 15 + Math.random() * 32;
          const baseY = -2.2 + Math.random() * 16.5;
          const baseScale = key === 'Prop_Cosmic_Planet'
            ? 0.55 + Math.random() * 0.65
            : 0.45 + Math.random() * 0.85;

          inst.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius);
          inst.scale.set(baseScale, baseScale, baseScale);
          inst.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
          inst.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = false;
              child.receiveShadow = false;
            }
          });
          cosmicOrbitersGroup.add(inst);
          cosmicOrbiterItems.push({
            mesh: inst,
            baseY,
            bobSpeed: 0.8 + Math.random() * 1.6,
            bobPhase: Math.random() * Math.PI * 2,
            bobAmp: 0.18 + Math.random() * 0.35,
            rotSpeedX: (Math.random() - 0.5) * 1.4,
            rotSpeedY: (Math.random() - 0.5) * 1.8,
            rotSpeedZ: (Math.random() - 0.5) * 1.2
          });
        }
      }
    }
  });

  // Smoothly transition from loader to start buttons
  if (startupLoaderEl) {
    startupLoaderEl.style.opacity = '0';
    setTimeout(() => {
      startupLoaderEl.classList.add('hidden');
      if (startButtonsGroup) {
        startButtonsGroup.classList.remove('hidden');
      }
    }, 350);
  }
});

// ============================================================================
// 5. MOVIE PLAYBACK, CAMERA CHOREOGRAPHY & VOICEOVER CONTROLLER
// ============================================================================
const voStore = new VoiceoverStore();
const soundEngine = new CinematicSoundEngine();
const audioPlayer = new Audio();
audioPlayer.preload = 'auto';

let currentSceneIdx = 0;
let isMoviePlaying = false;
let cameraMode = 'cinematic'; // 'cinematic' or 'orbit'
let closeupCharKey = null; // null | 'lizzy' | 'mom' | 'amy' | 'katey'
const CLOSEUP_ORDER = [
  { key: 'lizzy', label: 'Close-Up: Lizzy', defaultScene: 2 },
  { key: 'mom',   label: "Close-Up: Katey's Mom", defaultScene: 2 },
  { key: 'amy',   label: 'Close-Up: Amy ✌️', defaultScene: 2 },
  { key: 'katey', label: 'Close-Up: Katey', defaultScene: 0 }
];
let userOrbitAngle = 0;
let sceneElapsed = 0;
let cameraShakeIntensity = 0;
let autoAdvanceTimer = null;

// UI Elements
const startOverlay = document.getElementById('start-overlay');
const btnStartMovie = document.getElementById('btn-start-movie');
const btnOpenRecorderStart = document.getElementById('btn-open-recorder-start');
const btnPlayPause = document.getElementById('btn-play-pause');
const playIcon = document.getElementById('play-icon');
const playLabel = document.getElementById('play-label');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnReplayScene = document.getElementById('btn-replay-scene');
const sceneStepPill = document.getElementById('scene-step-pill');
const sceneHeading = document.getElementById('scene-heading');
const sceneNoteBadge = document.getElementById('scene-Note-badge');
const speakerTag = document.getElementById('speaker-tag');
const subtitleText = document.getElementById('subtitle-text');
const thumbButtons = Array.from(document.querySelectorAll('.scene-thumb'));
const voiceVolInput = document.getElementById('voice-volume');
const musicVolInput = document.getElementById('music-volume');
const btnCameraMode = document.getElementById('btn-camera-mode');
const cameraModeLabel = document.getElementById('camera-mode-label');
const btnLizzyCloseup = document.getElementById('btn-lizzy-closeup');
const lizzyCloseupLabel = document.getElementById('lizzy-closeup-label');

// Modals
const voiceStudioModal = document.getElementById('voice-studio-modal');
const comicSheetModal = document.getElementById('comic-sheet-modal');
const studioSceneList = document.getElementById('studio-scene-list');

function getVoiceoverMode() {
  const checked = document.querySelector('input[name="vo-mode"]:checked');
  return checked ? checked.value : 'auto';
}

function stopCurrentVoiceover() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  audioPlayer.pause();
  audioPlayer.onended = null;
  audioPlayer.ontimeupdate = null;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function updateHUDForScene(idx) {
  const s = SCENES[idx];
  sceneStepPill.textContent = `ACT ${idx + 1} OF ${SCENES.length}`;
  sceneHeading.textContent = s.title;
  sceneNoteBadge.textContent = s.note;
  speakerTag.textContent = s.speaker;
  subtitleText.textContent = s.subtitle;

  thumbButtons.forEach((btn, i) => {
    const active = i === idx;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  // Update background atmosphere smoothly
  soundEngine.currentSceneIndex = idx;
}

function triggerSceneDone() {
  if (!isMoviePlaying) return;
  autoAdvanceTimer = setTimeout(() => {
    if (!isMoviePlaying) return;
    if (currentSceneIdx < SCENES.length - 1) {
      goToScene(currentSceneIdx + 1, true);
    } else {
      // Movie finished at Scene 8!
      setPlayingState(false);
    }
  }, 1100);
}

function playVoiceoverForScene(idx) {
  stopCurrentVoiceover();
  const s = SCENES[idx];
  const mode = getVoiceoverMode();

  // Check if user recorded a custom voiceover for this scene
  const customUrl = voStore.getCustomUrl(idx);
  const targetUrl = customUrl || s.audioUrl;

  if (mode === 'tts' && !customUrl && 'speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(s.subtitle);
    utter.rate = 0.98;
    utter.pitch = idx === 7 ? 1.15 : 1.05;
    utter.volume = parseFloat(voiceVolInput.value);
    utter.onend = () => triggerSceneDone();
    window.speechSynthesis.speak(utter);
    return;
  }

  audioPlayer.src = targetUrl;
  audioPlayer.volume = parseFloat(voiceVolInput.value);

  audioPlayer.ontimeupdate = () => {
    const t = audioPlayer.currentTime;
    if (!customUrl && s.subCues && s.subCues.length > 0) {
      let activeCue = s.subCues[0];
      for (const cue of s.subCues) {
        if (t >= cue.t) activeCue = cue;
      }
      speakerTag.textContent = activeCue.speaker;
      subtitleText.textContent = activeCue.text;
    } else if (customUrl) {
      speakerTag.textContent = '🎤 ELLA\'S CUSTOM VOICEOVER';
      subtitleText.textContent = s.subtitle;
    }

    // Trigger rubber stamp impact sound & shake in Scene 6
    if (idx === 5 && t >= 14.2 && t <= 14.5 && cameraShakeIntensity < 0.05) {
      cameraShakeIntensity = 0.35;
      soundEngine.playStampImpact();
    }
  };

  audioPlayer.onended = () => {
    triggerSceneDone();
  };

  audioPlayer.play().catch(() => {
    // Fallback timer if browser blocks autoplay
    autoAdvanceTimer = setTimeout(() => triggerSceneDone(), s.durationFallback * 1000);
  });
}

function setPlayingState(playing) {
  isMoviePlaying = playing;
  playIcon.textContent = playing ? '⏸️' : '▶️';
  playLabel.textContent = playing ? 'Pause Movie' : 'Play Movie';

  if (playing) {
    soundEngine.startScore();
    playVoiceoverForScene(currentSceneIdx);
  } else {
    soundEngine.stopScore();
    stopCurrentVoiceover();
  }
}

function goToScene(idx, keepPlaying = isMoviePlaying) {
  currentSceneIdx = (idx + SCENES.length) % SCENES.length;
  sceneElapsed = 0;
  soundEngine.playWhoosh();
  updateHUDForScene(currentSceneIdx);

  if (keepPlaying) {
    isMoviePlaying = true;
    playIcon.textContent = '⏸️';
    playLabel.textContent = 'Pause Movie';
    soundEngine.startScore();
    playVoiceoverForScene(currentSceneIdx);
  } else {
    stopCurrentVoiceover();
  }
}

// ============================================================================
// 6. INTERACTIVE VOICEOVER RECORDING STUDIO (MICROPHONE + UPLOAD)
// ============================================================================
let activeMediaRecorder = null;
let recordingSceneIdx = null;
let recordedChunks = [];

function renderVoiceStudioList() {
  studioSceneList.innerHTML = '';
  SCENES.forEach((s, idx) => {
    const hasCustom = Boolean(voStore.getCustomUrl(idx));
    const isRecThis = recordingSceneIdx === idx;

    const card = document.createElement('div');
    card.className = 'studio-scene-card';
    card.innerHTML = `
      <div class="studio-scene-top">
        <span class="studio-scene-title">${s.title}</span>
        <span class="studio-badge ${hasCustom ? 'custom' : ''}">
          ${hasCustom ? '🎤 Ella\'s Custom Recording Active' : '✨ Built-In Neural Cast Voice'}
        </span>
      </div>
      <div class="studio-script-box">
        <strong>Teleprompter Script:</strong> “${s.subtitle}”
      </div>
      <div class="studio-actions">
        <button class="btn-studio record ${isRecThis ? 'recording' : ''}" data-action="record" data-idx="${idx}">
          ${isRecThis ? '⏹️ Stop Recording' : '🔴 Record My Voice'}
        </button>
        <label class="btn-studio">
          📁 Upload Audio
          <input type="file" accept="audio/*" data-action="upload" data-idx="${idx}" hidden />
        </label>
        <button class="btn-studio" data-action="preview" data-idx="${idx}">
          🔊 Preview Scene ${idx + 1}
        </button>
        ${hasCustom ? `<button class="btn-studio" data-action="reset" data-idx="${idx}">↩️ Restore Cast Voice</button>` : ''}
      </div>
    `;
    studioSceneList.appendChild(card);
  });
}

studioSceneList.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const idx = Number(btn.dataset.idx);

  if (action === 'record') {
    if (activeMediaRecorder && recordingSceneIdx === idx) {
      activeMediaRecorder.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      recordingSceneIdx = idx;
      activeMediaRecorder = new MediaRecorder(stream);
      activeMediaRecorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) recordedChunks.push(ev.data);
      };
      activeMediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        await voStore.saveRecording(idx, blob);
        stream.getTracks().forEach((t) => t.stop());
        activeMediaRecorder = null;
        recordingSceneIdx = null;
        renderVoiceStudioList();
      };
      activeMediaRecorder.start();
      renderVoiceStudioList();
    } catch (err) {
      alert('Microphone access is needed to record your voiceover. You can also click "Upload Audio" to attach an audio file!');
    }
  } else if (action === 'preview') {
    goToScene(idx, true);
  } else if (action === 'reset') {
    await voStore.deleteRecording(idx);
    renderVoiceStudioList();
  }
});

studioSceneList.addEventListener('change', async (e) => {
  const input = e.target.closest('input[data-action="upload"]');
  if (!input || !input.files || !input.files[0]) return;
  const idx = Number(input.dataset.idx);
  await voStore.saveRecording(idx, input.files[0]);
  renderVoiceStudioList();
});

// ============================================================================
// 7. EVENT LISTENERS & KEYBOARD CONTROLS
// ============================================================================
btnStartMovie.addEventListener('click', () => {
  startOverlay.classList.add('hidden');
  goToScene(0, true);
});

btnOpenRecorderStart.addEventListener('click', () => {
  startOverlay.classList.add('hidden');
  renderVoiceStudioList();
  voiceStudioModal.showModal();
});

btnPlayPause.addEventListener('click', () => {
  setPlayingState(!isMoviePlaying);
});

btnPrev.addEventListener('click', () => goToScene(currentSceneIdx - 1, isMoviePlaying));
btnNext.addEventListener('click', () => goToScene(currentSceneIdx + 1, isMoviePlaying));
btnReplayScene.addEventListener('click', () => goToScene(currentSceneIdx, true));

thumbButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = Number(btn.dataset.scene);
    goToScene(target, true);
  });
});

voiceVolInput.addEventListener('input', () => {
  audioPlayer.volume = parseFloat(voiceVolInput.value);
});

musicVolInput.addEventListener('input', () => {
  soundEngine.setVolume(parseFloat(musicVolInput.value));
});

btnCameraMode.addEventListener('click', () => {
  cameraMode = cameraMode === 'cinematic' ? 'orbit' : 'cinematic';
  cameraModeLabel.textContent = cameraMode === 'cinematic' ? 'Cinematic Cam' : 'Orbit View';
});

if (btnLizzyCloseup) {
  btnLizzyCloseup.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    const curIdx = CLOSEUP_ORDER.findIndex((item) => item.key === closeupCharKey);
    if (curIdx === -1) {
      closeupCharKey = CLOSEUP_ORDER[0].key;
    } else if (curIdx < CLOSEUP_ORDER.length - 1) {
      closeupCharKey = CLOSEUP_ORDER[curIdx + 1].key;
    } else {
      closeupCharKey = null;
    }

    if (closeupCharKey) {
      const spec = CLOSEUP_ORDER.find((item) => item.key === closeupCharKey);
      lizzyCloseupLabel.textContent = spec.label;
      btnLizzyCloseup.classList.add('hud-btn-accent');
      if (!characterSceneMap.has(`${currentSceneIdx}:${closeupCharKey}`)) {
        goToScene(spec.defaultScene, isMoviePlaying);
      }
    } else {
      lizzyCloseupLabel.textContent = '3D Cast Close-Up';
      btnLizzyCloseup.classList.remove('hud-btn-accent');
    }
  });
}

document.getElementById('btn-voice-studio').addEventListener('click', () => {
  renderVoiceStudioList();
  voiceStudioModal.showModal();
});

document.getElementById('btn-close-voice-studio').addEventListener('click', () => {
  voiceStudioModal.close();
});

document.getElementById('btn-comic-sheet').addEventListener('click', () => {
  comicSheetModal.showModal();
});

document.getElementById('btn-close-comic-modal').addEventListener('click', () => {
  comicSheetModal.close();
});

window.addEventListener('keydown', (e) => {
  if (voiceStudioModal.open || comicSheetModal.open) return;
  if (e.code === 'Space') {
    e.preventDefault();
    if (!startOverlay.classList.contains('hidden')) {
      startOverlay.classList.add('hidden');
      goToScene(0, true);
    } else {
      setPlayingState(!isMoviePlaying);
    }
  } else if (e.code === 'ArrowRight') {
    goToScene(currentSceneIdx + 1, isMoviePlaying);
  } else if (e.code === 'ArrowLeft') {
    goToScene(currentSceneIdx - 1, isMoviePlaying);
  }
});

// Pointer drag for slight interactive camera parallax
let isDragging = false;
let prevX = 0;
renderer.domElement.addEventListener('pointerdown', (e) => {
  isDragging = true;
  prevX = e.clientX;
});
window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - prevX;
  prevX = e.clientX;
  userOrbitAngle += dx * 0.005;
});
window.addEventListener('pointerup', () => {
  isDragging = false;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// 8. MAIN THREE.JS ANIMATION & CINEMATIC CAMERA LOOP
// ============================================================================
const clock = new THREE.Clock();
const currentCamPos = new THREE.Vector3(0, 6, 42);
const currentLookAt = new THREE.Vector3(0, 0.5, 28);
const targetCamPos = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const lizzyWorldPos = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();
  sceneElapsed += dt;

  // Advance all 3D character skeletal AnimationMixers (Lizzy, Mom, Amy & Katey)
  for (let i = 0; i < characterMixers.length; i++) {
    characterMixers[i].update(dt);
  }

  // Target stage position & angle
  const angle = (currentSceneIdx / SCENES.length) * Math.PI * 2;
  const stageCenter = stageGroups[currentSceneIdx].position;
  const activeCharSlot = closeupCharKey
    ? (characterSceneMap.get(`${currentSceneIdx}:${closeupCharKey}`) ||
       characterSceneMap.get(`${ currentSceneIdx }:lizzy`) ||
       characterSceneMap.get(`${ currentSceneIdx }:mom`) ||
       characterSceneMap.get(`${ currentSceneIdx }:amy`) ||
       characterSceneMap.get(`${ currentSceneIdx }:katey`))
    : null;

  if (closeupCharKey && activeCharSlot) {
    activeCharSlot.getWorldPosition(lizzyWorldPos);
    const charScale = activeCharSlot.scale.y;
    const lookY = lizzyWorldPos.y + charScale * 1.15;
    const closeDist = charScale * 1.95;
    const orbitYaw = angle + userOrbitAngle + (cameraMode === 'orbit' ? elapsed * 0.45 : Math.sin(elapsed * 0.6) * 0.08);

    targetCamPos.set(
      lizzyWorldPos.x + Math.sin(orbitYaw) * closeDist,
      lookY + 0.15,
      lizzyWorldPos.z + Math.cos(orbitYaw) * closeDist
    );
    targetLookAt.set(lizzyWorldPos.x, lookY, lizzyWorldPos.z);
  } else {
    // Subtle cinematic sway & dolly zoom during each scene
    const dollyZoom = 11.2 - Math.min(sceneElapsed * 0.12, 1.8);
    const swayAngle = angle + (cameraMode === 'orbit' ? elapsed * 0.35 + userOrbitAngle : Math.sin(elapsed * 0.55) * 0.06 + userOrbitAngle * 0.3);

    targetCamPos.set(
      stageCenter.x + Math.sin(swayAngle) * dollyZoom,
      0.85 + Math.sin(elapsed * 0.8) * 0.18,
      stageCenter.z + Math.cos(swayAngle) * dollyZoom
    );

    targetLookAt.set(
      stageCenter.x,
      0.35,
      stageCenter.z
    );
  }

  // Camera shake decay (used when "Mom is Safe!" stamp slams down)
  if (cameraShakeIntensity > 0.001) {
    targetCamPos.x += (Math.random() - 0.5) * cameraShakeIntensity;
    targetCamPos.y += (Math.random() - 0.5) * cameraShakeIntensity;
    cameraShakeIntensity *= 0.88;
  }

  currentCamPos.lerp(targetCamPos, 0.065);
  currentLookAt.lerp(targetLookAt, 0.08);
  camera.position.copy(currentCamPos);
  camera.lookAt(currentLookAt);

  // Move spotlight onto active stage set
  keySpotLight.position.set(
    stageCenter.x + Math.sin(angle) * 8,
    12,
    stageCenter.z + Math.cos(angle) * 8
  );
  keySpotLight.target.position.copy(stageCenter);
  keySpotLight.color.lerp(new THREE.Color(SCENES[currentSceneIdx].lightColor), 0.05);

  // Animate Stage Props
  if (animatedProps.chair) {
    animatedProps.chair.rotation.y = 0.35 + Math.sin(elapsed * 1.5) * 0.55;
  }
  if (animatedProps.magnifyingGlass) {
    animatedProps.magnifyingGlass.position.x = Math.sin(elapsed * 1.4) * 1.1;
    animatedProps.magnifyingGlass.position.y = 2.4 + Math.cos(elapsed * 1.8) * 0.55;
    animatedProps.magnifyingGlass.rotation.z = Math.sin(elapsed * 1.2) * 0.25;
  }
  if (animatedProps.suspectArrow) {
    animatedProps.suspectArrow.position.y = 5.05 + Math.abs(Math.sin(elapsed * 3.2)) * 0.45;
  }
  if (animatedProps.interrogationCones) {
    animatedProps.interrogationCones.forEach((cone, i) => {
      const swayZ = Math.sin(elapsed * 1.8 + i) * 0.06;
      cone.rotation.z = swayZ;
      cone.material.opacity = 0.14 + Math.sin(elapsed * 3 + i * 2) * 0.06;
      if (animatedProps.interrogationRigs && animatedProps.interrogationRigs[i]) {
        animatedProps.interrogationRigs[i].rotation.z = swayZ * 0.7;
      }
    });
  }
  if (animatedProps.speechBubbles) {
    animatedProps.speechBubbles.forEach((b, i) => {
      b.position.x = -0.75 + Math.sin(elapsed * 2 + i) * 0.08;
      const scale = 1 + Math.sin(elapsed * 3 + i * 1.5) * 0.03;
      b.scale.set(scale, scale, 1);
    });
  }
  if (animatedProps.laserBar) {
    animatedProps.laserBar.position.y = 2.15 + Math.sin(elapsed * 2.6) * 0.95;
  }

  // Act 6: 3D Rubber Stamp Slamming Down, 3D Detective Pen Writing, & 3D Magnifying Glass Scanning Notes!
  if (animatedProps.rubberStampMesh && animatedProps.momSafeStamp) {
    const cycle = (elapsed * 0.42) % 1.0; // ~2.4s stamp cycle
    let stampZ = 0.92;
    let stampY = 1.32;
    let stampRotX = -0.22;
    let bannerScale = 1.0;

    if (cycle < 0.18) {
      // Wind-up & cock back before slamming down
      const t = cycle / 0.18;
      stampZ = 0.92 + Math.sin(t * Math.PI * 0.5) * 0.45;
      stampY = 1.32 - t * 0.36;
      stampRotX = -0.22 + t * 0.22;
    } else if (cycle < 0.28) {
      // Rapid slam down onto the "Mom is Safe!" box!
      const t = (cycle - 0.18) / 0.10;
      const easeIn = t * t;
      stampZ = 1.37 * (1 - easeIn) + (-0.04) * easeIn;
      stampY = 0.96;
      stampRotX = 0;
    } else if (cycle < 0.44) {
      // Pressed against the pad — "Mom is Safe!" ink impression pops!
      const t = (cycle - 0.28) / 0.16;
      stampZ = -0.04 + t * 0.08;
      stampY = 0.96;
      stampRotX = 0;
      bannerScale = 1.14 - t * 0.10;
    } else {
      // Lift back up and hover clear so the stamped "Mom is Safe!" text is easy to read
      const t = (cycle - 0.44) / 0.56;
      const smooth = Math.sin(t * Math.PI * 0.5);
      stampZ = 0.04 + smooth * 0.88;
      stampY = 0.96 + smooth * 0.36;
      stampRotX = -smooth * 0.22;
      bannerScale = 1.0 + Math.sin(elapsed * 5) * 0.03;
    }

    animatedProps.rubberStampMesh.position.set(-0.88, stampY, stampZ);
    animatedProps.rubberStampMesh.rotation.x = stampRotX;
    animatedProps.momSafeStamp.scale.set(bannerScale, bannerScale, 1);
  }
  if (animatedProps.detectivePen) {
    animatedProps.detectivePen.position.x = -0.85 + Math.sin(elapsed * 3.6) * 0.82;
    animatedProps.detectivePen.position.y = 2.75 + Math.cos(elapsed * 1.4) * 0.62;
    animatedProps.detectivePen.position.z = 0.10 + Math.abs(Math.sin(elapsed * 7.2)) * 0.06;
    animatedProps.detectivePen.rotation.z = Math.sin(elapsed * 7.2) * 0.12;
  }
  if (animatedProps.detectiveMagnifier) {
    animatedProps.detectiveMagnifier.position.x = -0.55 + Math.cos(elapsed * 1.5) * 0.65;
    animatedProps.detectiveMagnifier.position.y = 2.18 + Math.sin(elapsed * 2.1) * 0.36;
    animatedProps.detectiveMagnifier.rotation.z = Math.sin(elapsed * 1.3) * 0.18;
  }

  if (animatedProps.guiltyBanner) {
    const s = 1 + Math.sin(elapsed * 5) * 0.05;
    animatedProps.guiltyBanner.scale.set(s, s, 1);
  }
  if (animatedProps.bffHeart) {
    const beat = 0.82 + Math.pow(Math.sin(elapsed * 3.5), 2) * 0.14;
    animatedProps.bffHeart.scale.set(beat, beat, beat);
    animatedProps.bffHeart.rotation.y = Math.sin(elapsed * 1.2) * 0.45;
  }

  // Position Colossal 3D Saturn Backdrop & Companion Exoplanet in the Cosmic Sky behind the active round-robin card!
  const fwdX = -Math.sin(angle);
  const fwdZ = -Math.cos(angle);
  const rightX = Math.cos(angle);
  const rightZ = -Math.sin(angle);

  if (saturnBackdropHero) {
    const satTargetX = stageCenter.x + fwdX * 32 + rightX * (8.2 + Math.sin(elapsed * 0.22) * 2.0);
    const satTargetY = 6.2 + Math.cos(elapsed * 0.28) * 0.55;
    const satTargetZ = stageCenter.z + fwdZ * 32 + rightZ * (8.2 + Math.sin(elapsed * 0.22) * 2.0);
    saturnBackdropHero.position.x += (satTargetX - saturnBackdropHero.position.x) * 0.05;
    saturnBackdropHero.position.y += (satTargetY - saturnBackdropHero.position.y) * 0.05;
    saturnBackdropHero.position.z += (satTargetZ - saturnBackdropHero.position.z) * 0.05;
    saturnBackdropHero.rotation.y = angle + 0.35 + Math.sin(elapsed * 0.18) * 0.15;
  }

  if (cosmicExoplanetHero) {
    const exoTargetX = stageCenter.x + fwdX * 36 - rightX * (10.5 + Math.cos(elapsed * 0.2) * 1.8);
    const exoTargetY = 7.4 + Math.sin(elapsed * 0.32) * 0.6;
    const exoTargetZ = stageCenter.z + fwdZ * 36 - rightZ * (10.5 + Math.cos(elapsed * 0.2) * 1.8);
    cosmicExoplanetHero.position.x += (exoTargetX - cosmicExoplanetHero.position.x) * 0.05;
    cosmicExoplanetHero.position.y += (exoTargetY - cosmicExoplanetHero.position.y) * 0.05;
    cosmicExoplanetHero.position.z += (exoTargetZ - cosmicExoplanetHero.position.z) * 0.05;
    cosmicExoplanetHero.rotation.y = elapsed * 0.25;
  }

  // Slowly rotate the Cosmic Nebula Sky Dome & 3D Blender Cosmic Orbiters
  cosmicSkyDome.rotation.y = elapsed * 0.008;
  cosmicOrbitersGroup.rotation.y = elapsed * 0.028;
  for (let i = 0; i < cosmicOrbiterItems.length; i++) {
    const item = cosmicOrbiterItems[i];
    item.mesh.position.y = item.baseY + Math.sin(elapsed * item.bobSpeed + item.bobPhase) * item.bobAmp;
    item.mesh.rotation.x += item.rotSpeedX * dt;
    item.mesh.rotation.y += item.rotSpeedY * dt;
    item.mesh.rotation.z += item.rotSpeedZ * dt;
  }

  renderer.render(scene, camera);
}

// Initialize DB & Start Render Loop
voStore.init().then(() => {
  updateHUDForScene(0);
  animate();
});
