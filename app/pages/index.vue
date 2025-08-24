<script setup>
import words from '~/assets/data/words.json'

const defaultTheme = useCookie('defaultTheme', { default: () => 'light' })

const toggleTheme = () => {
  defaultTheme.value = defaultTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="mt-4 mt-sm-8 text-h2 text-center font-weight-bold" :style="{ 'line-height': 1.35 }">
    Вітаємо в тренажері <span class="px-3 bg-blue-lighten-1">наголосів</span> для <span class="px-3 bg-teal-accent-4">ЗНО/НМТ</span>
  </div>

  <div class="d-flex flex-wrap align-center justify-center ga-6 my-10">
    <NuxtLink to="/practice">
      <v-btn size="x-large" variant="tonal" elevation="8">Розпочати тренування</v-btn>
    </NuxtLink>
    <v-btn size="large" @click="toggleTheme()">Перемкнути тему</v-btn>
    <a href="https://www.privat24.ua/send/hz9q7" target="_blank"><v-btn size="large">Підтримати розробку</v-btn></a>
  </div>

  <v-card class="py-1 border" variant="elevated">
    <v-table density="compact">
      <tbody>
        <tr v-for="(item, index) in words" :key="index">
          <td class="text-h5 text-high-emphasis">{{ item.letter }}</td>
          <td class="py-2 text-body-1 text-medium-emphasis">{{ item.words.join(', ') }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-footer class="d-flex align-center justify-center flex-column mt-10 mx-auto px-10 border"
    :style="{ width: 'fit-content' }">
    <div class="text-overline text-justify">Бажаєте допомогти з покращенням застосунку? Перейдіть до <a
        href="https://github.com/linvisn/naholosy">репозиторію</a>, аби дізнатися більше.</div>
    <v-divider class="my-2" thickness="1" width="200" />
    <div class="text-caption">2025 - <a href="https://github.com/linvisn/">linvisn</a></div>
  </v-footer>
</template>