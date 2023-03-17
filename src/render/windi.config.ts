import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,ts,js}'],
    exclude: ['node_modules', '.git'],
  },
})
