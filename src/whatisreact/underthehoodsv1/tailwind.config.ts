import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#035186',
        secondary: '#F87171',
        dark: '#2B2D42',
        light: '#EDF2F4',
        gray: '#A8B2D1',
        'gray-light': '#E5E5E5',
        'gray-dark': '#333333',
      },
    },
  },
  plugins: [],
}
export default config
