# soheldaniel.github.io

My portfolio: projects, videos, education. Live at **https://danielsohel.com** (https://soheldaniel.github.io redirects there). The privacy policy for my private dashboard is at /privacy.

Astro + Tailwind, static, hosted on GitHub Pages. Every push to `main` deploys, and the
site also rebuilds once a day so new YouTube uploads appear on their own.

## Run it

```sh
pnpm install
pnpm dev        # http://localhost:4321, reloads on save
pnpm build      # production build into dist/
pnpm preview    # serve dist/ to check the real build
```

Needs Node 22.12+ and pnpm.

## Change things

| I want to…                         | Edit                                                        |
|------------------------------------|-------------------------------------------------------------|
| change name, tagline, "Now", links | `src/config.ts`                                             |
| add my YouTube channel             | `src/config.ts` → `youtube.url` and `youtube.channelId`     |
| pin specific videos                | `src/config.ts` → `youtube.videos` (ids after `watch?v=`)   |
| add a photo                        | put `me.jpg` in `public/`, set `photo: '/me.jpg'`           |
| update the CV                      | replace `public/cv.pdf`                                     |
| edit education / hardware / skills | `src/content/experience.ts`                                 |
| edit or add a project              | `src/content/projects/*.md` (see below)                     |

### Adding a project

Copy `src/content/projects/softrasterizer.md` to a new file and change the
frontmatter. Images go in `src/assets/projects/` and are referenced relatively
(`../../assets/projects/foo.png`); Astro resizes and converts them to webp at build time.
`order` sets the position, and `video: <youtube id>` adds a "Watch the build" link.
The markdown body becomes the bullet list on the card.

A short looping clip instead of the cover image: put `name.mp4`, `name.webm` and
`name-poster.jpg` in `public/media/` and set `clip: name`. See `scripts/media.sh`
for the ffmpeg settings.

### Refreshing screenshots

`pnpm media` re-copies the screenshots from `~/code/sarah's video player` and
`~/code/softrasterizer` and re-encodes the showcase clip from `~/Desktop/showcase-hd.mp4`.

## YouTube

At build time the site reads the channel's public RSS feed (no key needed). If YouTube's
feed is down, it falls back to the Data API when a `YOUTUBE_API_KEY` repo secret is set
(GitHub → Settings → Secrets → Actions). Pinned ids in `youtube.videos` always work.
If none of this returns anything, the section shows a "launching soon" card.

## Layout

```
src/config.ts               personal details, links, YouTube settings
src/content/projects/       one .md per project
src/content/experience.ts   education, hardware builds, skills
src/components/             Sidebar, Section, ProjectCard, VideoGrid, Timeline, CopyEmail, Icon
src/layouts/Base.astro      <head>, fonts, cursor glow, fade-in
src/pages/index.astro       the page itself
src/lib/youtube.ts          fetches videos at build time
public/                     cv.pdf, og.png (link preview), favicon, media/
```
