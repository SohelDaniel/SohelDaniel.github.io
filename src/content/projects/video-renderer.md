---
title: sarah's video renderer
blurb: A 3D engine written from scratch in C++17, built so an AI can direct the scenes. The AI describes what's in a scene in a tiny language; a solver decides where everything goes, how it moves without colliding and where the camera stands, then a CPU rasterizer draws it live.
year: '2026'
order: 2
tech: [C++17, SDL3, CPU rasterizer, Layout solver, Own TeX + font engine, ffmpeg]
repo: https://github.com/SohelDaniel/sarah-s-video-renderer
cover: ../../assets/projects/vr-showcase-hd.png
coverAlt: A rendered solar-system scene with a typeset orbital-velocity formula above it
clip: showcase
stats:
  - { value: '16k', label: 'lines of C++' }
  - { value: '328', label: 'automated checks' }
  - { value: '0', label: 'graphics libraries' }
  - { value: '~1 ms', label: 'per frame' }
gallery:
  - src: ../../assets/projects/vr-scene3-naive.png
    alt: Objects overlapping each other with no solver
    caption: no solver · 36 overlaps
  - src: ../../assets/projects/vr-scene3-greedy.png
    alt: Objects placed by greedy placement
    caption: greedy placement
  - src: ../../assets/projects/vr-scene3-refined.png
    alt: Objects after gradient refinement, none hidden
    caption: + refinement
  - src: ../../assets/projects/vr-scene3-framed.png
    alt: Final scene with the camera placed automatically
    caption: + auto camera
  - src: ../../assets/projects/vr-transform-hd.png
    alt: E = mc² transforming step by step into the full energy–momentum relation
    caption: formula transform (LCS matching)
  - src: ../../assets/projects/vr-smooth-shading.png
    alt: Smoothly shaded sphere and sharp-edged cube
    caption: smooth shading, 40° crease angle
---

- **Scene language → solver → pixels.** The AI writes a `.dan` file (`sphere blue near cube`, `comet flies_past sun 4s-12s`). It never writes a coordinate. Greedy placement, gradient refinement, motion planning and an automatic camera turn that into a layout with no overlaps and nothing hidden.
- **Every pixel computed on the CPU.** Hand-written matrices, barycentric rasterization, z-buffer, Sutherland–Hodgman near-plane clipping, Blinn-Phong shading, supersampled anti-aliasing mixed in linear light, and 1080p mp4 export.
- **Its own text stack.** An outline-font rasterizer (de Casteljau curves, nonzero winding, kerning) and a small TeX engine for fractions, roots and Greek letters. Formulas write themselves in and morph into the next one, like Manim.
- **Built for an AI in the loop.** Live reload on save, plus a `.dan.report` listing every error and solver problem so the AI can fix its own scene.
