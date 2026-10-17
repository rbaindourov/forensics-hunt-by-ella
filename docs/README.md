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

## 3. Three.js 3D Soundstage, 4-Character Rigged Cast & 3D Props Architecture
- **8 Custom 3D Stage Sets (`public/app.js`)**: Arranged around a 3D studio ring (`STAGE_RADIUS = 28`), each stage pairs the high-resolution corrected comic panel on a 3D gold-trimmed cinema frame with animated 3D Blender/Poly Haven stage props (`./scene_props_3d.glb`) and **all 4 live-rigged 3D Stylized Female Characters (`./katey_3d.glb`, `./mom_3d.glb`, `./amy_3d.glb`, `./lizzy_3d.glb`)** cloned via `SkeletonUtils.clone()` and driven at 60 FPS by `THREE.AnimationMixer`:
  - **Act 1 (`1. Forensics HUNT!`)**: Katey's bedroom featuring **3D Animated Katey (`katey_3d.glb`)** looking around her empty room in disbelief, a real 3D walnut chest of drawers with hollow pulled-out drawers & spilled papers (`Prop_Wooden_Dresser`), Poly Haven CC0 potted haworthia succulent (`Prop_Potted_Succulent`), Poly Haven CC0 open binder notebook (`Prop_Binder_Notebook`), Poly Haven CC0 hanging wooden picture frame (`Prop_Picture_Frame`), 3D purple rolling office swivel chair on 5 caster wheels (`Prop_Swivel_Chair`), 3D over-ear headphones & friendship necklace on the lavender rug (`Prop_Headphones`), panelled bedroom door with `"Katey"` plaque, and hovering 3D magnifying glass.
  - **Act 2 (`2. Suspects.`)**: 3D Detective Suspects board + bouncing red arrow + **all 3 3D Rigged & Animated Suspects (`mom_3d.glb`, `amy_3d.glb`, `lizzy_3d.glb`)** lined up side-by-side.
  - **Act 3 (`3. INTERROGATION`)**: 3 Interrogation Pedestals equipped with **Poly Haven CC0 3D Interrogation Chairs (`Prop_Interrogation_Chair`)** and **overhead 3D Theatrical Barn-Door Spotlights (`Prop_Interrogation_Spotlight`)** illuminating **3D Katey's Mom** (biting her lip on Left Pedestal #1), **3D Amy** (flashing her articulated 3D V-Peace sign `✌️` and wide nervous grin on Center Pedestal #2), and **3D Lizzy** (looking down and mumbling nervously on Right Pedestal #3).
  - **Act 4 (`4. But, What did they say!`)**: Pop-up 3D Alibi speech bubbles + **3D Mom, 3D Amy, and 3D Lizzy** delivering their alibis.
  - **Act 5 (`5. Let's Narrow this Down! By Fingerprints!`)**: Green laser Fingerprint Scanner comparing Crime Scene vs. Mom/Amy/Lizzy alongside **3D Amy** (cleared and sighing in relief!).
  - **Act 6 (`6. But Interrogation!`)**: Detective Notes pad + slamming `"Mom is Safe!"` rubber stamp with camera shake + **3D Mom** and **3D Lizzy**.
  - **Act 7 (`7. She Was GUILTY!`)**: **Full-scale 3D Rigged & Animated Stylized Lizzy (`scale = 2.15`)** on the courtroom Spotlight Podium with 3D interrogation chair and overhead barn-door spotlight under the `"She Was GUILTY!"` banner.
  - **Act 8 (`8. by Ella`)**: 3D extruded beating heart `"❤️ by Ella"` surrounded by a 4-character curtain call (**3D Katey, 3D Mom, 3D Amy, and 3D Lizzy**).
- **Interactive "🧍‍♀️ 3D Cast Close-Up" Camera Mode (`#btn-lizzy-closeup`)**: Top-HUD toggle button that cycles close-up camera inspection through **Lizzy**, **Katey's Mom**, **Amy (`✌️`)**, and **Katey**, with interactive 360° pointer-drag orbit inspection.
- **Multi-Character Neural Voiceover (`public/audio/scene_1.mp3` – `scene_8.mp3`)**: Pre-generated neural voices for Detective/Narrator Ella, Katey's Mom, Amy, and Lizzy.
- **In-Browser Voiceover Recording Studio**: Uses `MediaRecorder` + `IndexedDB` (`VoiceoverStore`) so Ella can click **🎙️ Voiceover Studio**, read from the built-in teleprompter, and record her own voice (or upload audio files) for any of the 8 scenes.

## 4. 4-Character 3D Stylized Cast (`GEO-body_female_stylized`)
All 4 characters are built on the official **Blender Studio Human Base Meshes v1.4.1 (`GEO-body_female_stylized`)** all-quad topology and rigged to a unified 19+ bone skeletal hierarchy:
1. **Lizzy (`lizzy_3d.blend` / `public/lizzy_3d.glb`)**: Center-parted wavy chestnut-brown bob, upturned worried eyebrows, charcoal-plum long-sleeve crop top (`Mat_Studio_CropTop`), wide-leg olive-green cargo pants with 3D side pockets, chunky white sneakers, and 120-frame `Lizzy_Nervous_Interrogation` loop.
2. **Katey's Mom (`mom_3d.blend` / `public/mom_3d.glb`)**: Pulled-up crown hair + high top-knot bun (`Mom_Studio_Hair`), pearl stud earrings & upper tooth edge (`Mom_Studio_EarringsAndTeeth`), sculpted *"biting lip"* expression, dusty rose-pink crew-neck long-sleeve shirt (`Mat_Mom_PinkShirt`), slate-blue denim overalls (`Mom_Studio_Overalls`) with raycasted front bib, patch pocket, shoulder straps, and silver clasps (`Mom_Overalls_Buckles`), and 120-frame `Mom_Biting_Lip_Interrogation` loop.
3. **Amy (`amy_3d.blend` / `public/amy_3d.glb`)**: Long wavy chestnut-brown hair cascading past her shoulders (`Amy_Studio_Hair`), wide open-teeth *"nervous smile"* (`Amy_Studio_SmileTeeth`) with cute cheek dimples, crew-neck olive-charcoal short-sleeve T-shirt (`Mat_Amy_StarTee`) with 3D 5-pointed yellow chest star (`Amy_Chest_Star`), fitted blue denim jeans (`Amy_Studio_Jeans`), topological 4-island finger separation (`peace_fingers.R` vs `fingers.R`) forming an articulated **3D V-Peace Sign (`✌️`)**, and 120-frame `Amy_Forced_Peace_Interrogation` loop.
4. **Katey (`katey_3d.blend` / `public/katey_3d.glb`)**: Sleek long dark espresso-brown hair (`Mat_Katey_Hair`), lavender-violet V-neck long-sleeve sweater (`Mat_Katey_Sweater`), raycasted 3D dark velvet choker necklace (`Katey_Choker`), denim jeans, and 120-frame `Katey_Room_Discovery` animation loop.

## 5. 3D Bedroom & Interrogation Props Library (`scene_props_3d.blend` / `public/scene_props_3d.glb`)
Combines **Poly Haven CC0 3D Models** (imported via Blender MCP `import_asset`) with bespoke beveled 3D Blender furniture & lighting meshes:
- `Prop_Potted_Succulent`: Poly Haven CC0 `potted_plant_04` (zebra haworthia succulent in weathered ceramic pot).
- `Prop_Binder_Notebook`: Poly Haven CC0 `binder_notebook` (open ring-binder notebook with pages and pen).
- `Prop_Picture_Frame`: Poly Haven CC0 `hanging_picture_frame_02` (wooden hanging wall frame).
- `Prop_Interrogation_Chair`: Poly Haven CC0 `SchoolChair_01` (navy molded chair with tubular metal legs for the 3 interrogation pedestals).
- `Prop_Wooden_Dresser`: Custom 3D walnut chest of drawers with 4 upper drawers + bottom drawers, featuring hollow pulled-out open drawer boxes, brass pull knobs, and spilled papers.
- `Prop_Swivel_Chair`: Custom 3D purple ergonomic rolling office chair with 5-star caster base, dual wheels, chrome gas lift, and plush purple cushions.
- `Prop_Headphones`: Custom 3D purple over-ear headphones with plush ear cushions, wavy audio cord, and friendship necklace ring on the bedroom rug.
- `Prop_Interrogation_Spotlight`: Custom 3D theatrical stage spotlight with ceiling pipe clamp, U-shaped mounting yoke, cooling fins, 4 flared barn-door flaps, and glowing Fresnel lens.

