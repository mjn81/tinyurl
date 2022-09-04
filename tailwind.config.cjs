/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#262837',
				secondary: '#FAFCFF',
				input: '#212131',
				outline: '#343452',
				text: '#CCCCDE',
				textSecondary: '#5A5A8A',
			},
		},
	},
	plugins: [],
};
