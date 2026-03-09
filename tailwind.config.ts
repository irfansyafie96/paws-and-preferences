import { defineConfig } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        like: 'var(--color-like)',
        dislike: 'var(--color-dislike)',
        'text-primary': 'var(--text-primary)',
        'card-bg': 'var(--card-bg)',
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)',
      },
    },
  },
})
