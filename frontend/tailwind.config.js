/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure black base
        void: '#000000',
        // Slightly lighter blacks for layering
        surface: {
          DEFAULT: '#0a0a0a',
          50: '#fafafa',
          100: '#171717',
          200: '#141414',
          300: '#111111',
          400: '#0d0d0d',
          500: '#0a0a0a',
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
        // CYAN - the hero accent
        cyber: {
          DEFAULT: '#00f0ff',
          dim: '#00a8b3',
          glow: '#00f0ff',
        },
        // Lime for success - ELECTRIC
        neon: {
          DEFAULT: '#b4ff39',
          dim: '#8bc42a',
        },
        // Orange for warnings
        heat: {
          DEFAULT: '#ff6b35',
          dim: '#cc5529',
        },
        // Red for errors
        danger: '#ff3b3b',
        // Muted text
        muted: '#525252',
        // Bright text
        bright: '#ffffff',
      },
      fontFamily: {
        // One font family - MONO EVERYTHING for that dev feel
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        // Display for big headlines
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // MASSIVE type scale
        'hero': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'title': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'cyber': '0 0 30px rgba(0, 240, 255, 0.3)',
        'cyber-lg': '0 0 60px rgba(0, 240, 255, 0.4)',
        'neon': '0 0 30px rgba(180, 255, 57, 0.3)',
        'heat': '0 0 30px rgba(255, 107, 53, 0.3)',
        'glow': '0 0 100px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-cyber': 'pulseCyber 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3s steps(30) infinite',
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        pulseCyber: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
