import * as THREE from 'three';

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
scene.background = new THREE.Color(0x161026);
scene.fog = new THREE.FogExp2(0x161026, 0.012);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 6, 42);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);

const keySpotLight = new THREE.SpotLight(0xfff4d6, 3.2, 65, Math.PI / 4, 0.45, 1);
keySpotLight.position.set(0, 18, 38);
keySpotLight.castShadow = true;
scene.add(keySpotLight);
scene.add(keySpotLight.target);

const rimLight = new THREE.PointLight(0x9b5de5, 2.2, 40);
rimLight.position.set(-8, 10, 28);
scene.add(rimLight);

// Studio Soundstage Floor
const floorGeo = new THREE.CylinderGeometry(52, 52, 0.8, 64);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x19122c,
  roughness: 0.35,
  metalness: 0.2
});
const studioFloor = new THREE.Mesh(floorGeo, floorMat);
studioFloor.position.y = -3.6;
studioFloor.receiveShadow = true;
scene.add(studioFloor);

// Decorative Golden Soundstage Ring
const ringGeo = new THREE.RingGeometry(27.5, 28.2, 64);
ringGeo.rotateX(-Math.PI / 2);
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd166, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
const stageRing = new THREE.Mesh(ringGeo, ringMat);
stageRing.position.y = -3.18;
scene.add(stageRing);

// Floating Atmospheric Dust Motes / Confetti Particles
const particleCount = 260;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(particleCount * 3);
const particleCol = new Float32Array(particleCount * 3);
const palette = [new THREE.Color(0xffd166), new THREE.Color(0xff5d8f), new THREE.Color(0x00f5d4), new THREE.Color(0xc77dff)];
for (let i = 0; i < particleCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const rad = 16 + Math.random() * 24;
  particlePos[i * 3] = Math.cos(angle) * rad;
  particlePos[i * 3 + 1] = -2 + Math.random() * 14;
  particlePos[i * 3 + 2] = Math.sin(angle) * rad;
  const c = palette[i % palette.length];
  particleCol[i * 3] = c.r;
  particleCol[i * 3 + 1] = c.g;
  particleCol[i * 3 + 2] = c.b;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleCol, 3));
const particleMat = new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.75 });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

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
const textureLoader = new THREE.TextureLoader();

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
    // ACT 1: Katey's Empty Bedroom (Clean lavender wall - NO floating open door!)
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 4.6, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xc8b4d8, roughness: 0.7 })
    );
    wall.position.set(0, 2.3, -1.4);
    diorama.add(wall);

    // Wooden Dresser with pulled-out drawers
    const dresser = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 1.35, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x8d6346, roughness: 0.6 })
    );
    dresser.position.set(0.7, 0.68, -0.75);
    diorama.add(dresser);

    // Open drawer sticking out
    const openDrawer = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.32, 0.55),
      new THREE.MeshStandardMaterial({ color: 0xa47551 })
    );
    openDrawer.position.set(1.1, 0.55, -0.2);
    diorama.add(openDrawer);

    // Little Potted Plant on top of dresser
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.12, 0.24, 16),
      new THREE.MeshStandardMaterial({ color: 0x7f4f24 })
    );
    pot.position.set(1.3, 1.48, -0.7);
    const leaves = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.22, 1),
      new THREE.MeshStandardMaterial({ color: 0x52b788 })
    );
    leaves.position.set(1.3, 1.72, -0.7);
    diorama.add(pot, leaves);

    // Spinning Purple Desk Chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(-0.9, 0.0, 0.1);
    const seat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0x6c5ce7 })
    );
    seat.position.y = 0.75;
    const backrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.75, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x5f4dd0 })
    );
    backrest.position.set(0, 1.35, -0.32);
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.75, 12),
      new THREE.MeshStandardMaterial({ color: 0x2d3436, metalness: 0.8 })
    );
    pole.position.y = 0.38;
    chairGroup.add(seat, backrest, pole);
    diorama.add(chairGroup);
    animatedProps.chair = chairGroup;

    // 3D Magnifying Glass hovering & scanning the crime scene
    const magGroup = new THREE.Group();
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.08, 16, 36),
      new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.8, roughness: 0.2 })
    );
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.52, 0.04, 32),
      new THREE.MeshPhysicalMaterial({ color: 0x90e0ef, transparent: true, opacity: 0.4, roughness: 0.1 })
    );
    lens.rotation.x = Math.PI / 2;
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.09, 0.9, 16),
      new THREE.MeshStandardMaterial({ color: 0x5c3a21 })
    );
    handle.position.set(0.55, -0.55, 0);
    handle.rotation.z = Math.PI / 4;
    magGroup.add(rim, lens, handle);
    magGroup.position.set(0, 2.5, 0.6);
    diorama.add(magGroup);
    animatedProps.magnifyingGlass = magGroup;
  } else if (idx === 1) {
    // ACT 2: 3D Detective Suspects Board + Bouncing Red Arrow
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 4.4, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xf3e5ab, roughness: 0.6 })
    );
    board.position.set(0, 2.3, -0.5);
    const woodBorder = new THREE.Mesh(
      new THREE.BoxGeometry(3.9, 4.7, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x7f5539 })
    );
    woodBorder.position.set(0, 2.3, -0.55);
    diorama.add(woodBorder, board);

    const suspects = [
      { name: "1. Katey's Mom", y: 3.5, col: '#ffccd5' },
      { name: '2. Amy (Friend)', y: 2.5, col: '#caf0f8' },
      { name: '3. Lizzy (Sister)', y: 1.5, col: '#e0aaff' },
      { name: 'Witnesses: NONE', y: 0.55, col: '#ffd166' }
    ];
    suspects.forEach((s) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(3.1, 0.72),
        new THREE.MeshBasicMaterial({ map: makeLabelTexture(s.name, s.col, '#111', 512, 120, 42), transparent: true })
      );
      card.position.set(0, s.y, -0.35);
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
    arrowGroup.position.set(0.8, 5.1, -0.2);
    arrowGroup.rotation.z = -0.25;
    diorama.add(arrowGroup);
    animatedProps.suspectArrow = arrowGroup;
  } else if (idx === 2) {
    // ACT 3: 3D Interrogation Spotlights on Mom, Amy, and Lizzy (No "guilty" arrow!)
    const pedColors = [0xe56b6f, 0xf4a261, 0x6d597a];
    const labels = ["Katey's Mom\n(biting lip)", 'Amy\n(nervous smile)', 'Lizzy\n(scared, mumbling)'];
    animatedProps.interrogationCones = [];

    labels.forEach((lbl, i) => {
      const xPos = (i - 1) * 1.45;
      const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 0.6, 1.3, 24),
        new THREE.MeshStandardMaterial({ color: pedColors[i] })
      );
      stand.position.set(xPos, 0.65, 0);
      diorama.add(stand);

      const badge = new THREE.Mesh(
        new THREE.PlaneGeometry(1.35, 0.65),
        new THREE.MeshBasicMaterial({
          map: makeLabelTexture(lbl.split('\n')[0], '#fff', '#111', 380, 120, 38),
          transparent: true
        })
      );
      badge.position.set(xPos, 1.65, 0.35);
      diorama.add(badge);

      // Volumetric Spotlight Cone
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xffe66d,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const lightCone = new THREE.Mesh(new THREE.ConeGeometry(0.95, 4.2, 24, 1, true), coneMat);
      lightCone.position.set(xPos, 3.2, 0);
      diorama.add(lightCone);
      animatedProps.interrogationCones.push(lightCone);
    });
  } else if (idx === 3) {
    // ACT 4: 3D Pop-Up Speech Bubbles ("But, What did they say!")
    animatedProps.speechBubbles = [];
    const lines = [
      { who: 'Mom: "Emergency meeting at work!"', y: 3.7, col: '#ffffff' },
      { who: 'Amy: "Finished Corey\'s class homework!"', y: 2.35, col: '#e0fbfc' },
      { who: 'Lizzy: "Sold my sis— no my stuff!"', y: 1.0, col: '#ffccd5' }
    ];
    lines.forEach((item, i) => {
      const bubble = new THREE.Mesh(
        new THREE.PlaneGeometry(3.8, 0.95),
        new THREE.MeshBasicMaterial({
          map: makeLabelTexture(item.who, item.col, '#111', 680, 140, 34),
          transparent: true
        })
      );
      bubble.position.set(0, item.y, 0.1 * i);
      diorama.add(bubble);
      animatedProps.speechBubbles.push(bubble);
    });
  } else if (idx === 4) {
    // ACT 5: 3D Forensics Fingerprint Scanner (Crime Scene vs. Mom, Amy, Lizzy separately!)
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
  } else if (idx === 5) {
    // ACT 6: Detective Notes & Giant 3D "Mom is Safe!" Rubber Stamp
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 4.3, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xffea85, roughness: 0.5 })
    );
    pad.position.set(0, 2.3, -0.3);
    diorama.add(pad);

    const stampBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 0.95),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('Mom is Safe!', '#fff3b0', '#111111', 560, 150, 58),
        transparent: true
      })
    );
    stampBanner.position.set(0, 1.05, -0.15);
    stampBanner.rotation.z = 0.08;
    diorama.add(stampBanner);
    animatedProps.momSafeStamp = stampBanner;
  } else if (idx === 6) {
    // ACT 7: "7. She Was GUILTY!" — Short-Haired Lizzy on the Spotlight Podium
    const lizzyTex = textureLoader.load('./sprites/lizzy_short_hair.png');
    lizzyTex.colorSpace = THREE.SRGBColorSpace;
    const lizzyStandee = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 3.8),
      new THREE.MeshBasicMaterial({ map: lizzyTex, transparent: true })
    );
    lizzyStandee.position.set(0, 2.1, 0.2);
    diorama.add(lizzyStandee);

    const guiltyBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 0.95),
      new THREE.MeshBasicMaterial({
        map: makeLabelTexture('She Was GUILTY!', '#ff4d6d', '#ffffff', 600, 150, 54),
        transparent: true
      })
    );
    guiltyBanner.position.set(0, 4.35, 0.1);
    diorama.add(guiltyBanner);
    animatedProps.guiltyBanner = guiltyBanner;
    animatedProps.lizzyStandee = lizzyStandee;
  } else if (idx === 7) {
    // ACT 8: "8. BFF — by Ella" — 3D Sculpted Extruded Heart, Spinning Gold Star & Credit
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
    heartMesh.position.set(0, 2.75, 0.2);
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
    ellaPlaque.position.set(0, 0.75, 0.4);
    diorama.add(ellaPlaque);
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

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();
  sceneElapsed += dt;

  // Target stage position & angle
  const angle = (currentSceneIdx / SCENES.length) * Math.PI * 2;
  const stageCenter = stageGroups[currentSceneIdx].position;

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

  // Camera shake decay (used when "Mom is Safe!" stamp slams down)
  if (cameraShakeIntensity > 0.001) {
    targetCamPos.x += (Math.random() - 0.5) * cameraShakeIntensity;
    targetCamPos.y += (Math.random() - 0.5) * cameraShakeIntensity;
    cameraShakeIntensity *= 0.88;
  }

  currentCamPos.lerp(targetCamPos, 0.055);
  currentLookAt.lerp(targetLookAt, 0.07);
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
    animatedProps.chair.rotation.y = Math.sin(elapsed * 1.5) * 0.65;
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
      cone.rotation.z = Math.sin(elapsed * 1.8 + i) * 0.08;
      cone.material.opacity = 0.16 + Math.sin(elapsed * 3 + i * 2) * 0.08;
    });
  }
  if (animatedProps.speechBubbles) {
    animatedProps.speechBubbles.forEach((b, i) => {
      b.position.x = Math.sin(elapsed * 2 + i) * 0.08;
      const scale = 1 + Math.sin(elapsed * 3 + i * 1.5) * 0.03;
      b.scale.set(scale, scale, 1);
    });
  }
  if (animatedProps.laserBar) {
    animatedProps.laserBar.position.y = 2.15 + Math.sin(elapsed * 2.6) * 0.95;
  }
  if (animatedProps.momSafeStamp) {
    const pulse = 1 + Math.sin(elapsed * 4) * 0.04;
    animatedProps.momSafeStamp.scale.set(pulse, pulse, 1);
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

  // Rotate atmospheric particles gently
  particles.rotation.y = elapsed * 0.03;

  renderer.render(scene, camera);
}

// Initialize DB & Start Render Loop
voStore.init().then(() => {
  updateHUDForScene(0);
  animate();
});
