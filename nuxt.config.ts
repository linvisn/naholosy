// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'naholosy',
      htmlAttrs: {
        lang: 'uk'
      },
      meta: [
        { name: 'description', content: 'Тренажер наголосів з української мови для підготовки до ЗНО та НМТ' },
        { property: 'og:title', content: 'naholosy' },
        { property: 'og:description', content: 'Тренажер наголосів з української мови для підготовки до ЗНО та НМТ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://naholosy.deno.dev/' },
        { property: 'og:image', content: 'https://naholosy.deno.dev/favicon.ico' },
        { property: 'og:locale', content: 'uk_UA' },
        { name: 'google-site-verification', content: 'BPEXZQkSLeox-mevTFPvG93AbPRkUQNL8B8_8pPy2XM' }
      ]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['vuetify-nuxt-module', '@nuxt/fonts', '@vueuse/nuxt']
})