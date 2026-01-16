<script setup>
import { useTheme } from 'vuetify'

const defaultTheme = useCookie('defaultTheme', { default: () => 'light' })
const theme = useTheme()

watch(defaultTheme, newTheme => { theme.change(newTheme) }, { immediate: true })
</script>

<template>
  <v-app>
    <v-container :fluid="true" :min-height="'100vh'">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in'}" />
    </v-container>
  </v-app>
</template>

<style>
* {
  font-family: 'Finlandica' !important;
}

.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(24px);
  transform: translateY(-24px);
}

.translate-enter-active, .translate-leave-active {
  transition: all 0.2s ease;
}
.translate-enter-from, .translate-leave-to {
  opacity: 0;
}
.translate-enter-from {
  transform: translateX(-30px);
}
.translate-leave-to {
  transform: translateX(30px);
}
</style>