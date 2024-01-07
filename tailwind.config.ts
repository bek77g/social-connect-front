import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				white: '#efeff3',
				border: 'rgba(255, 255, 255, 0.12)',
				primary: '#6f3bfe',
			},
			padding: {
				layout: '1.25rem',
			},
		},
	},
	plugins: [],
};
export default config;
