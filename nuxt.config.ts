// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      email: '',
      linkedin: '',
      github: '',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/fonts'],
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

  fonts: {
    families: [
      { name: 'Chakra Petch', provider: 'google', weights: [500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500] },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/abstracts" as *;',
        },
      },
    },
  },
})
