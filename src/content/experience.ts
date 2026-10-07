// Education and hands-on work shown in the timeline. Newest first.

export type Entry = {
	when: string;
	title: string;
	where?: string;
	text: string;
	tags?: string[];
};

export const education: Entry[] = [
	{
		when: '2025 — now',
		title: 'B.Sc. Computer Science',
		where: 'Technion, Israel Institute of Technology',
		text: 'Second year at the Taub Faculty of Computer Science. Coursework includes Digital Systems & Computer Structure (single-cycle, multi-cycle and pipelined RISC-V in SystemVerilog), Introduction to Systems Programming (C/C++), Linear Algebra, Introduction to Computer Science (C) and Calculus.',
		tags: ['C', 'C++', 'RISC-V', 'SystemVerilog', 'Linux'],
	},
	{
		when: '2026',
		title: 'Graphics & Engineering Design',
		where: 'Mechanical Engineering elective (taken by choice)',
		text: 'Final project, the "Magen HaCarmel" launcher: I designed the tilt sub-assembly, a fully parametric worm and sector-gear drive. A worm drive locks itself, so the locking requirement is met by the geometry alone, with no brake.',
		tags: ['SolidWorks', 'Assemblies', 'Tolerancing'],
	},
];

export const builds: Entry[] = [
	{
		when: 'Hardware',
		title: 'Two-axis camera gimbal',
		text: 'A motorised 2-axis gimbal for the Raspberry Pi Camera Module 3: mechanical design, motor control and capture logic on the Pi.',
		tags: ['Raspberry Pi', 'CAD', 'Motors'],
	},
	{
		when: 'Hardware',
		title: 'Solenoid lens shutter',
		text: 'Salvaged the solenoid from an IR-cut camera module and built a mechanical filter that opens and closes in sync with image capture.',
		tags: ['Salvage', 'Soldering'],
	},
	{
		when: 'Hardware',
		title: 'Linear-actuator prototypes',
		text: 'Modelled, printed and built several actuator designs, driven from an Arduino Uno in C++.',
		tags: ['Arduino', 'C++', '3D printing'],
	},
];

export const skills: { group: string; items: string[] }[] = [
	{ group: 'Languages', items: ['C++', 'C', 'Python', 'TypeScript', 'Swift'] },
	{ group: 'Graphics', items: ['Rasterization', 'Shading', 'Anti-aliasing', 'Font & TeX layout'] },
	{ group: 'Hardware', items: ['SolidWorks', '3D printing', 'Arduino', 'Raspberry Pi', 'Soldering'] },
	{ group: 'Tools', items: ['Git', 'Linux', 'Neovim', 'Make', 'ffmpeg'] },
];
