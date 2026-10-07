---
title: softrasterizer
blurb: A software rasterizer in C++17 with no graphics API and no third-party libraries. It loads an OBJ model, projects it through a perspective camera and fills every triangle into a z-buffer by hand. This is where the video renderer started.
year: '2026'
order: 2
tech: [C++17, Rasterization, Z-buffer, Unit tests]
repo: https://github.com/SohelDaniel/softrasterizer
cover: ../../assets/projects/sr-render.png
coverAlt: A low-poly creature model rendered with a random colour per triangle
gallery:
  - src: ../../assets/projects/sr-render.png
    alt: Colour render of the model
    caption: render
  - src: ../../assets/projects/sr-depth.png
    alt: Depth buffer visualised in greyscale
    caption: z-buffer
---

- **Typed pipeline stages.** Model, clip and screen space are separate types, so you can't hand a vertex to the wrong stage.
- **Indexed meshes.** Shared vertices are stored once and referenced by index, the same way a GPU does it.
- **One write path.** `set_if_nearer` is the only way to touch a pixel, and it updates colour and depth together, so the two can never disagree.
