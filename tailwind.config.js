/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        discord: {
          blurple: '#5865F2',
          'blurple-hover': '#4752C4',
          green: '#57F287',
          yellow: '#FEE75C',
          fuchsia: '#EB459E',
          red: '#ED4245',
          dark: '#1E1F22',
          surface: '#2B2D31',
          card: '#313338',
          input: '#383A40',
          border: '#3F4147',
          muted: '#949BA4',
          text: '#F2F3F5',
        }
      }
    },
  },
  plugins: [],
}
