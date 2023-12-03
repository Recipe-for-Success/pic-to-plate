import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'theme': '#2d4356',
      'primary': '#1f6e8c',
      'secondary': '#2e8a99',
      'color': '#84a7a1',
      'sky': '#87ceeb',
      'white': '#ffffff'
    },
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
export default config
