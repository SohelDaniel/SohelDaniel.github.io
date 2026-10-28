---
title: dan
blurb: A visual AI tutor in the spirit of 3Blue1Brown. You ask a question; Claude answers in a small declarative markup, and a C++20 engine draws it, animates it, narrates it with streaming text-to-speech and reads the picture back to check that it says what the words say. It can also turn a paper or lecture notes into a 30-minute narrated lecture with printable notes, and any Claude chat can hand a topic to the stage through MCP.
year: '2026'
order: 1
tech: [C++20, raylib, Claude, MCP, Inworld TTS, Node, Layout solver, LaTeX via MathJax, ffmpeg]
repo: https://github.com/SohelDaniel/dan
cover: ../../assets/projects/dan-derivative.png
coverAlt: The derivative as a limit; a secant line sliding toward the tangent while the narration points at the moving point
clip: dan
stats:
  - { value: '6', label: 'axioms the engine enforces' }
  - { value: '0', label: 'pixels written by the AI' }
  - { value: '35 min', label: 'first lecture, from a paper' }
  - { value: '15k', label: 'lines of C++' }
gallery:
  - src: ../../assets/projects/dan-backprop.png
    alt: Backpropagation drawn as a graph with gradients flowing back along the edges
    caption: backprop as a graph
  - src: ../../assets/projects/dan-space-saddle.png
    alt: A saddle surface in 3D with the gradient drawn at a point
    caption: 3D, camera in words
  - src: ../../assets/projects/dan-descent.png
    alt: Gradient descent steps over a contour field
    caption: fields and contours
  - src: ../../assets/projects/dan-energy.png
    alt: The kinetic energy formula typeset above two bars for mass and speed
    caption: LaTeX, bound to the data
  - src: ../../assets/projects/dan-integral.png
    alt: An integral shown as the area accumulating under a curve
    caption: area under a curve
---

- **The AI never gives a pixel.** Claude writes `mark`, `link`, `morph`, `focus` and `Say` lines; the engine owns layout, timing, colour, scales and the camera. A layered graph layout, a map-style label placer and an exact overlap checker decide where everything goes.
- **Six axioms, enforced in code.** No delete, shared scales fixed by a prescan, no two unrelated things in one colour, every change an eased morph, focus for one sentence, and decodability: the engine prints the scene back as markup and re-parses it to prove the picture matches.
- **Voice drives the drawing.** Inworld's streaming TTS returns word timestamps, so a `|cue|` word fires the next line on the word itself, and a spoken number gets a pointer to the thing it names.
- **Lecture mode.** From a PDF or notes: a planner writes an outline, a writer builds each part, `--check` lints it, a separate reviewer scores the frames, and the best version is kept. Plays live with pause-and-ask, plus notes to PDF with LaTeX and mermaid.
- **Measured, not guessed.** An evaluation harness has Claude write scenes for 44 questions and a judge score the frames, so every prompt and engine change is checked against a baseline before it stays.
