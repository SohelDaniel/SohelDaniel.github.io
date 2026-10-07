#!/bin/sh
# Copies project screenshots/clips into the site and re-encodes the clips for the web.
# Re-run after re-rendering anything in the source projects:  pnpm media
set -e
cd "$(dirname "$0")/.."

VR="$HOME/code/sarah's video player/docs/images"
SR="$HOME/code/softrasterizer/docs"
IMG=src/assets/projects
MEDIA=public/media
mkdir -p "$IMG" "$MEDIA"

for f in showcase-hd math-3 transform-hd smooth-shading labels-8 graph-8 \
         scene3-naive scene3-greedy scene3-refined scene3-framed aa-off-zoom aa-on-zoom; do
	cp "$VR/$f.png" "$IMG/vr-$f.png"
done
cp "$SR/render.png" "$IMG/sr-render.png"
cp "$SR/depth.png"  "$IMG/sr-depth.png"

# hero clip: 720p, no audio, small enough to autoplay
clip() { # $1 = source mp4, $2 = output name
	ffmpeg -v error -y -i "$1" -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 "$MEDIA/$2.webm"
	ffmpeg -v error -y -i "$1" -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart "$MEDIA/$2.mp4"
	ffmpeg -v error -y -ss 18 -i "$1" -frames:v 1 -vf "scale=1280:-2" -q:v 4 "$MEDIA/$2-poster.jpg"
}
clip "$HOME/Desktop/showcase-hd.mp4" showcase

ls -lh "$MEDIA"
