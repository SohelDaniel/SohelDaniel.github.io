import { youtube } from '../config';

export type Video = { id: string; title: string; published?: Date; thumb: string; url: string };

const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const decode = (s: string) =>
	s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// 1. the channel's public RSS feed (no key needed, but YouTube sometimes answers 404)
async function fromRss(channelId: string): Promise<Video[]> {
	const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
	if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);
	const xml = await res.text();
	return xml
		.split('<entry>')
		.slice(1)
		.map((e) => {
			const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '';
			const link = e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? watch(id);
			return {
				id,
				title: decode(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
				published: new Date(e.match(/<published>([^<]+)<\/published>/)?.[1] ?? 0),
				thumb: thumb(id),
				url: link,
			};
		})
		// Shorts show up in the feed too; they make bad 16:9 cards
		.filter((v) => v.id && !v.url.includes('/shorts/'));
}

// 2. the YouTube Data API, if a key is provided (YOUTUBE_API_KEY env var / GitHub secret)
async function fromApi(channelId: string, key: string): Promise<Video[]> {
	const uploads = 'UU' + channelId.slice(2);
	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${uploads}&key=${key}`,
	);
	if (!res.ok) throw new Error(`API HTTP ${res.status}`);
	const data = (await res.json()) as {
		items: { snippet: { title: string; publishedAt: string; resourceId: { videoId: string } } }[];
	};
	return data.items.map(({ snippet: s }) => ({
		id: s.resourceId.videoId,
		title: s.title,
		published: new Date(s.publishedAt),
		thumb: thumb(s.resourceId.videoId),
		url: watch(s.resourceId.videoId),
	}));
}

// 3. hand-picked ids from config; titles come from oEmbed (no key needed)
async function fromIds(ids: string[]): Promise<Video[]> {
	return Promise.all(
		ids.map(async (id) => {
			let title = '';
			try {
				const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watch(id))}`);
				if (res.ok) title = ((await res.json()) as { title: string }).title;
			} catch {}
			return { id, title: title || 'Watch on YouTube', thumb: thumb(id), url: watch(id) };
		}),
	);
}

// Runs at build time. Any failure just means fewer (or no) videos; the site still builds.
export async function latestVideos(): Promise<Video[]> {
	let auto: Video[] = [];
	if (youtube.channelId) {
		try {
			auto = await fromRss(youtube.channelId);
		} catch (err) {
			const key = import.meta.env.YOUTUBE_API_KEY ?? process.env.YOUTUBE_API_KEY;
			try {
				if (!key) throw err;
				auto = await fromApi(youtube.channelId, key);
			} catch (err2) {
				console.warn(`[youtube] could not load channel videos: ${err2}`);
			}
		}
	}
	const pinned = await fromIds(youtube.videos);
	const seen = new Set(pinned.map((v) => v.id));
	return [...pinned, ...auto.filter((v) => !seen.has(v.id))].slice(0, youtube.limit);
}
