import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'surface-elevated': 'hsl(var(--surface-elevated))',
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          dim: 'hsl(var(--accent-dim))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        secondary: 'hsl(var(--secondary))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        'text-muted': 'hsl(var(--text-muted))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(160 84% 39% / 0.12), transparent)',
        'card-glow':
          'radial-gradient(ellipse 60% 60% at 50% 0%, hsl(160 84% 39% / 0.06), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px hsl(160 84% 39% / 0.2)' },
          '100%': { boxShadow: '0 0 20px hsl(160 84% 39% / 0.4)' },
        },
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'hsl(210 12% 75%)',
            '--tw-prose-headings': 'hsl(210 20% 95%)',
            '--tw-prose-lead': 'hsl(210 12% 70%)',
            '--tw-prose-links': 'hsl(160 84% 45%)',
            '--tw-prose-bold': 'hsl(210 20% 95%)',
            '--tw-prose-counters': 'hsl(210 12% 60%)',
            '--tw-prose-bullets': 'hsl(160 84% 39%)',
            '--tw-prose-hr': 'hsl(210 12% 18%)',
            '--tw-prose-quotes': 'hsl(210 12% 75%)',
            '--tw-prose-quote-borders': 'hsl(160 84% 39%)',
            '--tw-prose-captions': 'hsl(210 12% 60%)',
            '--tw-prose-code': 'hsl(160 84% 55%)',
            '--tw-prose-pre-code': 'hsl(210 12% 85%)',
            '--tw-prose-pre-bg': 'hsl(210 18% 8%)',
            '--tw-prose-th-borders': 'hsl(210 12% 20%)',
            '--tw-prose-td-borders': 'hsl(210 12% 16%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
