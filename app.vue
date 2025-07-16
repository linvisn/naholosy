<script setup>
import { useStorage } from '@vueuse/core'
import { useTheme } from 'vuetify'

const defaultTheme = useStorage('defaultTheme', 'light')
const theme = useTheme()

watch(defaultTheme, newTheme => { theme.change(newTheme) }, { immediate: true })
</script>

<template>
  <v-app>
    <v-container :fluid="true" :min-height="'100vh'">
      <NuxtPage />
    </v-container>
  </v-app>
</template>

<style>
* {
  font-family: 'Finlandica' !important;
}
</style>