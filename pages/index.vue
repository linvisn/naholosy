<script setup>
import { useStorage } from '@vueuse/core'
import words from '~/assets/data/words.json'

const defaultTheme = useStorage('defaultTheme', 'light')

const splitToGroups = (arr, amount) => {
  let result = []
  let perGroup = Math.ceil(arr.length / amount)

  for (let i = 0; i < amount; i++) {
    result.push(arr.slice(i * perGroup, (i + 1) * perGroup))
  }

  return result
}
const toggleTheme = () => {
  defaultTheme.value = defaultTheme.value === 'light' ? 'dark' : 'light'
}

const groups = splitToGroups(words, 4)
</script>

<template>
  <div class="mt-10 text-h2 text-center font-weight-bold font-italic">
    Вітаємо в тренажері наголосів <br> для ЗНО/НМТ
  </div>

  <div class="d-flex flex-row items-center justify-center ga-6 my-10">
    <NuxtLink to="/practice">
      <v-btn prepend-icon="mdi-play" size="x-large" variant="tonal" elevation="8">Розпочати тренування</v-btn>
    </NuxtLink>
    
    <v-tooltip text="Перемкнути тему">
      <template #activator="{ props: theme }">
        <v-btn v-bind="theme" icon="mdi-theme-light-dark" elevation="4" @click="toggleTheme()" />
      </template>
    </v-tooltip>
  </div>

  <v-row dense>
    <v-col v-for="(group, groupIndex) in groups" :key="groupIndex" cols="12" sm="6" md="3">
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(item, itemIndex) in group" :key="itemIndex" :title="item.letter">
          <v-expansion-panel-text v-for="(word, wordIndex) in item.words" :key="wordIndex">
            {{ word }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>

  <v-footer border class="d-flex align-center justify-center flex-column mt-10 mx-auto px-10"
    :style="{ width: 'fit-content' }">
    <div class="text-overline text-justify">Бажаєте допомогти з покращенням застосунку? Перейдіть до <a
        href="https://github.com/linvisn/naholosy">репозиторію</a>, аби дізнатися більше.</div>
    <v-divider class="my-2" thickness="1" width="200" />
    <div class="text-caption">2025 - <a href="https://github.com/linvisn/">linvisn</a></div>
  </v-footer>
</template>