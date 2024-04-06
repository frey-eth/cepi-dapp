import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-connect': 'linear-gradient(82.55deg, #ED048A 5.78%, #FEE10A 94.22%)',
      },
      fontFamily: {
        mono: ['var(--font-mona-sans)'],
      },
      boxShadow: {
        inner: '1px 1px 0px 0px #FFFFFF29 inset',
        inner2: '0px 0px 8px 0px #FFFFFF14 inset',
      },
    },
  },
  plugins: [],
}
export default config
