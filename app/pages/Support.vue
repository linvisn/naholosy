<script setup>
const link = 'https://www.privat24.ua/send/hz9q7'

definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo(link, { external: true })
    }
  ],
})
</script>

<template>
  Здійснюється перенаправлення... Якщо цього не сталося, натисніть <a :href="link">тут</a>.
</template>