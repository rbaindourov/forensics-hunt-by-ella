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
- **8 Custom 3D Stage Sets (`public/app.js`)**: Arranged around a 3D studio ring (`STAGE_RADIUS = 28`), each stage pairs the high-resolution corrected comic panel on a 3D gold-trimmed cinema frame with animated 3D stage props (Katey's bedroom & hovering 3D magnifying glass, Suspect board & bouncing red arrow, 3-cone Interrogation spotlights, pop-up Alibi speech bubbles, green laser Fingerprint Scanner comparing Crime Scene vs. Mom/Amy/Lizzy, slamming `"Mom is Safe!"` rubber stamp with camera shake, short-haired Lizzy on the courtroom podium, and a 3D extruded beating BFF heart `"by Ella"`).
- **Multi-Character Neural Voiceover (`public/audio/scene_1.mp3` – `scene_8.mp3`)**: Pre-generated neural voices for Detective/Narrator Ella, Katey's Mom, Amy, and Lizzy.
- **In-Browser Voiceover Recording Studio**: Uses `MediaRecorder` + `IndexedDB` (`VoiceoverStore`) so Ella can click **🎙️ Voiceover Studio**, read from the built-in teleprompter, and record her own voice (or upload audio files) for any of the 8 scenes.

## 4. 3D Character Model & "Nervous Interrogation" Animation (`lizzy_3d.blend` / `public/lizzy_3d.glb`)
- **Sculpted 3D Head & 2K UV Facial Texture (`sprites/lizzy_face_uv_2k.png`)**: Anatomically sculpted `96×64` female head mesh (`Lizzy_Head`) with V-tapered jawline, recessed orbital sockets, integrated 3D nose bridge/tip, cheekbones, and 3D lips mapped with a custom 2048×2048 facial texture matching Lizzy's upturned worried eyebrows, hooded almond eyes, cheek blush, and parted lips.
- **Natural Center-Parted Chin-Length Wavy Bob (`Lizzy_Hair_*` & `sprites/lizzy_hair_uv_2k.png`)**: Parted crown with recessed hair part, sweeping left and right 3D curtain bangs, layered chin-length bob locks, a visible sculpted right ear (`Lizzy_Ear_R`), and a 2K brushed chestnut-brown strand texture.
- **Sculpted Shoulders, Hourglass Belly & Articulated Clasped Hands (`sprites/lizzy_body_skin_uv_2k.png`)**:
  - **Shoulders & Long-Sleeve Crop Top**: Exposed collarbone/scoop-neck skin patch (`Lizzy_CollarSkin`) bordered by a dark scoop collar (`Lizzy_CollarTrim`), continuous trapezius-to-deltoid shoulder bridge, sculpted bust with front armhole crease seams (`Lizzy_ArmholeSeam_L/R`), and slender sleeves that drop to low wide elbows (`z = 1.18m`) with open triangular negative space beside her ribcage before sweeping at a 44° diagonal up to wrist cuffs (`Lizzy_SleeveCuff_L/R`).
  - **Hourglass Midriff & High-Waisted Hips (`Lizzy_Midriff`)**: 48-ring sculpted abdominal mesh that cinches inward at the upper waist (`rx = 0.071m`) and flares smoothly into the front-dipped cargo waistband (`rx = 0.134m`), complete with sculpted rectus abdominis columns, oblique grooves, lumbar curve, recessed teardrop navel (`Lizzy_NavelInk`), and 2K under-hem shadow shading.
  - **Articulated Clasped Hands (`Lizzy_HandPalm_L/R`, `Lizzy_Finger_0..3`, `Lizzy_HandCrease_*`)**: Elongated dorsal left metacarpals and right palm sweeping diagonally out of the wrist cuffs, topped by 4 individually sculpted, phalanx-bent fingers and 3D comic crease strokes.
- **120-Frame Seamless "Nervous Interrogation" Animation Loop (24 fps)**: Hierarchical pivot rig (`Lizzy_Pivot_*`) animating Panel 3's interrogation cues (*"scared"*, *"answering slowly and thinking"*, *"looking down"*, *"mumbling"*):
  - Fidgeting/wringing clasped hands in front of her chest
  - Bowing her head down and looking away to the left and right while avoiding eye contact, with a brief nervous glance up at Frame 58
  - Rapid micro-nod/shake during the mumbling beat (Frames 65–100) with secondary hair follow-through sway
  - Shallow nervous breathing, tense shrugging shoulders, side-to-side hip weight shift, and an anxious right sneaker toe-tap.

