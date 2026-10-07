// Everything personal about the site lives here. Edit this file, push, done.

export const site = {
	name: 'Sohel Danial',
	role: 'CS student · Technion',
	tagline: 'I build graphics engines from scratch, and explain how they work on YouTube.',
	description:
		'Sohel Danial: Computer Science student at the Technion building 3D renderers, layout solvers and hardware from scratch, and making videos about it.',
	location: 'Haifa, Israel',
	email: 'sohel.danial@campus.technion.ac.il',
	github: 'https://github.com/SohelDaniel',
	// Leave empty to hide the button. The file goes in public/.
	cv: '',
	// Square photo in public/ (e.g. '/me.jpg'). Empty shows an "SD" monogram instead.
	photo: '',
	// One line about what you're doing right now. Empty hides it.
	now: 'Hooking an AI up to my 3D engine so it can direct its own scenes.',
};

export const youtube = {
	// Your channel URL, e.g. 'https://www.youtube.com/@yourhandle'. Empty = "coming soon".
	url: '',
	// The "UC..." id from youtube.com/account_advanced. Once set, new uploads appear
	// on the site automatically (the site rebuilds every day).
	channelId: '',
	// Optional: video ids to always show first (the part after watch?v=).
	// Also a fallback if YouTube's feed is down.
	videos: [] as string[],
	// How many videos to show in total.
	limit: 6,
};
