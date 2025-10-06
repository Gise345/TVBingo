
TV Bingo — Vite demo (React + Three.js)
=====================================

What's included
- Minimal Vite project scaffold with the 3D hero component (src/TVBingoHome3D.jsx)
- README with prompts and instructions
- Public assets folder: place generated AI images and your swordfish.glb there

How to run locally (VS Code)
1. Open VS Code -> File -> Open Folder -> select the folder: /path/to/tvbingo-vite
2. Open a terminal in VS Code (Ctrl+`) and run:
   npm install
   npm run dev
3. Open the displayed URL (usually http://localhost:5173) to preview.

Dependencies
- Node.js (16+ recommended)
- npm (or yarn)
- Packages are in package.json (three, @react-three/fiber, @react-three/drei, framer-motion, vite)

Assets (place these into public/assets/)
- ai-carnival-1.jpg   (panoramic background, wide)
- ai-carnival-2.jpg   (mid-shot background)
- confetti-png.png    (transparent confetti overlay)
- swordfish.glb       (the 3D model — required to see the mascot)
- logo-tvbingo.png    (optional)

AI image generation: ready-to-run prompts & sizes
------------------------------------------------
Use Stable Diffusion / Midjourney / DALL·E / Leonardo to generate carnival backgrounds.
Prompt (panoramic, wide):
  "Caribbean carnival parade, vibrant feathers and costumes, drummers and dancers, palm trees lining the street, Bahamian flag, bright blue sky, confetti in the air, ultra-detailed, dynamic wide-angle panorama, photorealistic --ar 3:1 --v 5"

Prompt (closer mid-shot):
  "Colorful carnival dancers with feathered headdresses, drums and cheering crowd, tropical palm trees, vivid saturated colors, bright blue sky, energetic motion blur, Bahamian carnival vibe, highly detailed --ar 16:9 --v 5"

Suggested export sizes:
- ai-carnival-1.jpg (panoramic): 3000 x 1000 px (3:1)
- ai-carnival-2.jpg (mid-shot): 2000 x 1125 px (16:9)
- confetti-png.png: 2000 x 2000 px with transparent background (if supported)
- logo-tvbingo.png: 512 x 512 px (or SVG)

How to get a swordfish.glb (3D model)
-------------------------------------
I cannot reliably generate a high-quality, rigged GLB in this environment. Options:

1) Quick approach (recommended for demo):
   - Use a simple placeholder GLB from free model sites (search "fish glb" or "mascot glb").
   - Or export a rough low-poly fish from Blender (steps below).

2) Blender (fast low-poly swordfish) — manual steps:
   - In Blender, create a basic fish shape using primitives (cube/scale), sculpt, and add simple fins.
   - Export -> File -> Export -> glTF 2.0 (.glb)

3) If you want, I can draft a Blender Python script to generate a stylised low-poly fish automatically that you can run in Blender. Ask me and I'll include it in the project.

Putting it all together
- After placing the images and swordfish.glb into public/assets, run `npm install` and `npm run dev`.
- If the GLB isn't present the scene will fail to load the model — use any placeholder named swordfish.glb.

Notes & next steps I can do right now (tell me which):
- Provide the two AI carnival images (I can generate them and drop into the /public/assets folder). 
- Provide a Blender Python script to generate a low-poly swordfish.glb you can run locally in Blender and then drop into the assets folder.
- Build and zip a production-ready bundle (vite build) and provide the zip for download.
