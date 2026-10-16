# Forensics HUNT! — 3D Mystery Movie & Voiceover Studio (by Ella)

## 1. Overview
This project transforms Ella's 8-panel comic strip **"Forensics HUNT!"** into an interactive **Three.js 3D Mystery Movie** complete with multi-character neural voiceovers, a procedural mystery soundtrack, and an in-browser **Voiceover Recording Studio** where Ella can record or upload her own voiceover for every scene.

## 2. Comic Strip Revisions Applied First
Before constructing the 3D scene textures, all five requested visual corrections were applied to the 8-panel comic strip (`public/forensics_hunt_by_ella.png`):
1. **Panel 1 ("1. Forensics HUNT!")**: Removed the floating cream/beige open door on the right bedroom wall above the wooden dresser.
2. **Panel 3 ("3. INTERROGATION")**: Removed the arrow pointing at Lizzy and the `"guilty"` label next to her.
3. **Panel 5 ("5. Let's Narrow this Down! By Fingerprints!")**: Removed `"Mom"` from underneath the `"Crime scene:"` fingerprint box on the left, and placed three separate suspect fingerprint boxes labeled `"Mom"`, `"Amy"`, and `"Lizzy"` side-by-side on the right under `"Fingerprint"`.
4. **Panel 7 ("7. She Was GUILTY!")**: Shortened Lizzy's hair into a chin-length brown bob to match her short hair in Panel 3.
5. **Panel 8 ("8. BFF")**: Added `"by Ella"` at the bottom of the final panel.

## 3. Three.js 3D Soundstage & Voiceover Architecture
- **8 Custom 3D Stage Sets (`public/app.js`)**: Arranged around a 3D studio ring (`STAGE_RADIUS = 28`), each stage pairs the high-resolution corrected comic panel on a 3D gold-trimmed cinema frame with animated 3D stage props (Katey's bedroom & hovering 3D magnifying glass, Suspect board & bouncing red arrow, 3-cone Interrogation spotlights, pop-up Alibi speech bubbles, green laser Fingerprint Scanner comparing Crime Scene vs. Mom/Amy/Lizzy, slamming `"Mom is Safe!"` rubber stamp with camera shake, short-haired Lizzy on the courtroom podium, and a 3D extruded beating BFF heart `"by Ella"`).
- **Multi-Character Neural Voiceover (`public/audio/scene_1.mp3` – `scene_8.mp3`)**: Pre-generated neural voices for Detective/Narrator Ella, Katey's Mom, Amy, and Lizzy.
- **In-Browser Voiceover Recording Studio**: Uses `MediaRecorder` + `IndexedDB` (`VoiceoverStore`) so Ella can click **🎙️ Voiceover Studio**, read from the built-in teleprompter, and record her own voice (or upload audio files) for any of the 8 scenes.
