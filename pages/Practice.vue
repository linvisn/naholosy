<script setup>
import words from '~/assets/data/words.json'

const isPreparation = ref(true)
const chosenLetters = ref([])
const array = ref([])
const currentWord = ref('')
const answer = ref('')
const pointsAmount = ref(0)
const maxPoints = ref(0)
const overlay = ref(false)

const extractLetters = () => {
    return words.map((word) => word.letter)
}
const startPractice = () => {
    isPreparation.value = false
    pointsAmount.value = 0

    array.value = words.filter(item => chosenLetters.value.includes(item.letter)).flatMap(item => item.words)
    let currentIndex = array.value.length
    maxPoints.value = array.value.length

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array.value[currentIndex], array.value[randomIndex]] = [array.value[randomIndex], array.value[currentIndex]]
    }

    currentWord.value = array.value[0]
}
const checkWord = () => {
    if (answer.value === currentWord.value) pointsAmount.value++

    if (array.value.length > 1) {
        array.value.shift()
        currentWord.value = array.value[0]
    }
    else {
        isPreparation.value = true
        overlay.value = !overlay.value
    }

    answer.value = ''
}
</script>

<template>
    <div v-if="isPreparation">
        <div class="text-h5 font-weight-bold">Оберіть нижченаведені параметри перед тим, як розпочати</div>
        <v-select class="mt-6 mb-10" v-model="chosenLetters" label="літери, з яких мають починатися слова"
            :items="extractLetters()" multiple clearable />

        <div class="d-flex align-center flex-wrap ga-4">
            <v-btn class="bg-deep-orange-accent-4" size="large" variant="tonal" elevation="8"
                :disabled="chosenLetters.length < 1" @click="startPractice()">Розпочати</v-btn>
            <v-btn @click="chosenLetters = extractLetters()">Обрати всі літери</v-btn>
            <NuxtLink to="/">
                <v-btn variant="text">Повернутися до головної сторінки</v-btn>
            </NuxtLink>
        </div>

        <v-overlay v-model="overlay" class="d-flex align-center justify-center">
            <v-card title="Результат">
                <v-card-text>Ви правильно визначили наголоси в {{ pointsAmount }} з {{ maxPoints }} слів!</v-card-text>
            </v-card>
        </v-overlay>
    </div>

    <div v-else>
        <div class="text-h2 text-lowercase text-break" :style="{ 'user-select': 'none' }">{{ currentWord }}</div>

        <div class="d-flex flex-wrap ga-2 my-6">
            <v-chip>Слів залишилось: {{ array.length }}</v-chip>
            <v-chip>{{ pointsAmount }} з {{ maxPoints }} правильних відповідей</v-chip>
        </div>

        <v-text-field v-model="answer" label="Запиши слово маленькими літерами, а наголошені голосні - великими" />

        <div class="d-flex flex-wrap ga-4">
            <v-btn v-if="array.length > 1" variant="tonal" @click="checkWord()">Перевірити</v-btn>
            <v-btn v-else class="bg-green" size="large" @click="checkWord()">Закінчити</v-btn>
            <v-btn v-if="array.length > 1" variant="text" @click="isPreparation = true">Повернутися до
                налаштувань</v-btn>
        </div>
    </div>
</template>