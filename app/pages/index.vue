<script setup>
import words from '~/assets/data/words.json'

const defaultTheme = useCookie('defaultTheme', { default: () => 'light' })
const showExtra = ref(false)
const showUpdates = ref(false)

const toggleTheme = () => {
  defaultTheme.value = defaultTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="mt-4 mt-sm-8 text-h3 text-md-h2 text-center font-weight-bold" :style="{ 'line-height': 1.35 }">
    Вітаємо в тренажері <span class="px-3 bg-blue">наголосів</span> для <div><span class="px-3 bg-light-green-darken-1">ЗНО/НМТ</span></div>
  </div>

  <div class="d-flex flex-wrap align-center justify-center ga-6 my-10">
    <NuxtLink to="/practice">
      <v-btn size="x-large" variant="tonal" elevation="8" prepend-icon="i-mdi:play">
        Розпочати тренування
      </v-btn>
    </NuxtLink>
    <v-btn size="large" @click="showExtra = true" prepend-icon="i-mdi:dots-horizontal">
      Інше
    </v-btn>
  </div>

  <v-overlay v-model="showExtra" class="d-flex align-center justify-center">
    <v-card class="d-flex flex-column align-center ga-3 pa-5">
      <v-btn size="large" variant="tonal" @click="toggleTheme()" prepend-icon="i-mdi:theme-light-dark">
        Перемкнути тему
      </v-btn>
      <v-btn size="large" variant="tonal" @click="showUpdates = true; showExtra = false" prepend-icon="i-mdi:creation-outline">
        Переглянути останнє оновлення
      </v-btn>
      <a href="https://github.com/linvisn/naholosy" target="_blank">
        <v-btn size="large" variant="tonal" prepend-icon="i-mdi:github">
          Переглянути репозиторій
        </v-btn>
      </a>
    </v-card>
  </v-overlay>
  
  <v-overlay v-model="showUpdates" class="d-flex align-center justify-center">
    <v-card class="d-flex flex-column align-start" title="Останнє оновлення" subtitle="10.12.2025" prepend-icon="i-mdi:creation-outline">
      <v-card-text>Було додано 3 нових слова, розділ оновлень на головній сторінці, кнопку на сторінці тренування, що відкриває інструкцію з використання тренажера, а також змінні іконки біля кількості правильних відповідей під час тренування.</v-card-text>
    </v-card>
  </v-overlay>

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

  <v-footer class="d-flex align-center justify-center flex-column mt-10 mx-auto px-5 border" :style="{ width: 'fit-content' }">
    <div class="text-subtitle-1 text-center">Дякую, що користуєтеся моїм застосунком!</div>
    <v-divider class="my-2" thickness="1" width="200" />
    <div class="text-caption">2025 - <a href="https://github.com/linvisn/">linvisn</a></div>
  </v-footer>
</template>