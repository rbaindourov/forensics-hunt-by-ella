# Forensics HUNT! — 3D Mystery Movie & Voiceover Studio (by Ella)

## 1. Overview
This project transforms Ella's 8-panel comic strip **"Forensics HUNT!"** into an interactive **Three.js 3D Mystery Movie** complete with multi-character neural voiceovers, a procedural mystery soundtrack, and an in-browser **Voiceover Recording Studio** where Ella can record or upload her own voiceover for every scene.

## 2. Comic Strip Revisions Applied First
Before constructing the 3D scene textures, all five requested visual corrections were applied to the 8-panel comic strip (`public/forensics_hunt_by_ella.png`):
1. **Panel 1 ("1. Forensics HUNT!")**: Removed the floating cream/beige open door on the right bedroom wall above the wooden dresser.
2. **Panel 3 ("3. INTERROGATION")**: Removed the arrow pointing at Lizzy and the `"guilty"` label next to her.
3. **Panel 5 ("5. Let's Narrow this Down! By Fingerprints!")**: Removed `"Mom"` from underneath the `"Crime scene:"` fingerprint box on the left, and placed three separate suspect fingerprint boxes labeled `"Mom"`, `"Amy"`, and `"Lizzy"` side-by-side on the right under `"Fingerprint"`.
4. **Panel 7 ("7. She Was GUILTY!")**: Shortened Lizzy's hair into a chin-length brown bob to match her short hair in Panel 3.
5. **Panel 8 ("8. by Ella")**: Replaced `"BFF"` in the final panel with `"by Ella"`, and updated the Scene 8 voiceover and 3D plaque to say `"by Ella"` without `"BFF"`.

## 3. Three.js 3D Soundstage & Voiceover Architecture
- **8 Custom 3D Stage Sets (`public/app.js`)**: Arranged around a 3D studio ring (`STAGE_RADIUS = 28`), each stage pairs the high-resolution corrected comic panel on a 3D gold-trimmed cinema frame with animated 3D stage props and **live-rigged 3D Stylized Lizzy (`./lizzy_3d.glb`)** instances cloned via `SkeletonUtils.clone()` and driven at 60 FPS by `THREE.AnimationMixer`:
  - **Act 1**: Katey's bedroom & hovering 3D magnifying glass
  - **Act 2**: 3D Detective Suspects board + bouncing red arrow + **3D Animated Stylized Lizzy (Suspect #3)**
  - **Act 3**: 3-cone Interrogation spotlights with **3D Animated Stylized Lizzy standing on the 3rd Interrogation Pedestal** performing her 120-frame *"Nervous Interrogation"* loop
  - **Act 4**: Pop-up 3D Alibi speech bubbles + **3D Animated Stylized Lizzy** stammering her alibi
  - **Act 5**: Green laser Fingerprint Scanner comparing Crime Scene vs. Mom/Amy/Lizzy
  - **Act 6**: Detective Notes pad + slamming `"Mom is Safe!"` rubber stamp with camera shake + **3D Animated Stylized Lizzy**
  - **Act 7**: **Full-scale 3D Rigged & Animated Stylized Lizzy (`scale = 2.15`)** on the courtroom Spotlight Podium under the `"She Was GUILTY!"` banner
  - **Act 8**: 3D extruded beating heart `"by Ella"`
- **Interactive "🧍‍♀️ 3D Lizzy Close-Up" Camera Mode (`#btn-lizzy-closeup`)**: Top-HUD toggle button that dollies the Three.js camera directly in front of the active stage's 3D Lizzy (`distance = charScale * 2.05`) with interactive 360° pointer-drag orbit inspection.
- **Multi-Character Neural Voiceover (`public/audio/scene_1.mp3` – `scene_8.mp3`)**: Pre-generated neural voices for Detective/Narrator Ella, Katey's Mom, Amy, and Lizzy.
- **In-Browser Voiceover Recording Studio**: Uses `MediaRecorder` + `IndexedDB` (`VoiceoverStore`) so Ella can click **🎙️ Voiceover Studio**, read from the built-in teleprompter, and record her own voice (or upload audio files) for any of the 8 scenes.

## 4. 3D Character Model & "Nervous Interrogation" Animation (`lizzy_3d.blend` / `public/lizzy_3d.glb`)
- **Official Blender Studio Stylized Female Base Mesh (`GEO-body_female_stylized`)**: Built directly on the production-grade all-quad **Blender Studio Human Base Meshes v1.4.1** stylized female topology (`Lizzy_Studio_Body`, `Lizzy_Studio_Eye_L`, `Lizzy_Studio_Eye_R`), providing authentic anatomical shoulders, collarbones, sculpted ribcage/waist/belly and navel (`z = 1.102m`), 5-fingered articulated hands, and stylized facial topology (sculpted eyelids, nose bridge/nostrils, philtrum, lips, and ears).
- **glTF 2.0 Dual-Primitive Crop Top & Vertex-Color Skin (`Mat_Studio_Skin` & `Mat_Studio_CropTop`)**: Knife-cut edge loops (`bmesh.ops.bisect_plane`) along the crew neckline (`z = 1.416m`), midriff hem (`z = 1.215m`), and perpendicular wrist cuffs split `Lizzy_Studio_Body` into two clean glTF primitives sharing the same skeleton (`Mat_Studio_Skin` with `COLOR_0` vertex colors for rosy cheek blush, terracotta-rose lips, upper lash line, and navel shading, and `Mat_Studio_CropTop` for the charcoal-plum long-sleeve crop top).
- **Center-Parted Short Wavy Chestnut-Brown Bob (`Lizzy_Studio_Hair`) & Worried Eyebrows (`Lizzy_Studio_Brow_L/R`)**: Multi-layered 3D wavy bob locks with inner curtain bangs framing the temples and cheekbones, paired with 3D upturned worried eyebrows and glossy chestnut-brown irises with catchlights.
- **Wide-Leg Olive-Green Cargo Pants (`Lizzy_Studio_CargoPants`), 3D Cargo Pockets (`Lizzy_CargoPocket_L/R`) & Chunky White Sneakers (`Lizzy_Studio_Sneakers`)**: Derived directly from the base mesh's lower body with `bmesh.ops.bisect_plane` and sculpted into straight-draping wide-leg cargo trousers with high-waisted belt loops, fly seam, front slash pockets, outer-front 3D cargo pockets with flaps, gathered ankle cuffs (`z = 0.088m`), and flat-soled chunky white sneakers.
- **120-Frame Skeletal "Nervous Interrogation" Animation Loop (`Lizzy_Nervous_Interrogation`, 24 fps)**: Full skeletal armature rig (`pelvis`, `spine`, `chest`, `neck`, `head`, `clavicle.L/R`, `upper_arm.L/R`, `forearm.L/R`, `hand.L/R`, `fingers.L/R`, `thigh.L/R`, `shin.L/R`, `foot.L/R`) animating Panel 3's interrogation cues (*"scared"*, *"answering slowly and thinking"*, *"looking down"*, *"mumbling"*) with orthonormal hand orientation (both thumbs on top, palms pressed inward at the sternum, fingers curling and fidgeting), nervous breathing, sheepish head glances, and A-stance weight shifts.
