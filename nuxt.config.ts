// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'naholosy',
      meta: [
        { name: 'description', content: 'Тренажер наголосів з української мови для підготовки до ЗНО та НМТ' },
      ]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['vuetify-nuxt-module', '@nuxt/fonts', '@vueuse/nuxt']
})