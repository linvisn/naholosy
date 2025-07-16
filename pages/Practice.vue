<script setup>
import words from '~/assets/data/words_processed.json'

const isPreparation = ref(true)
const practiceAll = ref(true)
const wordAmount = ref(1)
const chosenLetters = ref([])
const array = ref([])
const currentWord = ref({})
const answer = ref('')
const pointsAmount = ref(0)
const maxPoints = ref(0)
const showResults = ref(false)
const mistakes = ref([])
const showMistakes = ref(false)
const chipColor = ref('')

const extractLetters = () => {
    return words.map((word) => word.letter)
}
const startPractice = () => {
    isPreparation.value = false
    pointsAmount.value = 0
    mistakes.value = []
    chipColor.value = ''

    let wordsToShuffle = words.filter(item => chosenLetters.value.includes(item.letter)).flatMap(item => item.words)
    let currentIndex = wordsToShuffle.length

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [wordsToShuffle[currentIndex], wordsToShuffle[randomIndex]] = [wordsToShuffle[randomIndex], wordsToShuffle[currentIndex]]
    }

    array.value = wordsToShuffle.slice(0, practiceAll.value ? undefined : wordAmount.value)
    maxPoints.value = array.value.length
    currentWord.value = array.value[0]
}
const checkWord = () => {
    let processedAnswer = answer.value[0].toLowerCase() + answer.value.slice(1)
    let isCorrect = Array.isArray(currentWord.value.word) ? currentWord.value.word.includes(processedAnswer) : currentWord.value.word === processedAnswer

    if (isCorrect) {
        pointsAmount.value++
        chipColor.value = 'green'
    }
    else {
        mistakes.value.push({ answer: answer.value, word: currentWord.value.word })
        chipColor.value = 'red'
    }

    if (array.value.length > 1) {
        array.value.shift()
        currentWord.value = array.value[0]
    }
    else {
        isPreparation.value = true
        showResults.value = !showResults.value
    }

    answer.value = ''
}
</script>

<template>
    <div v-if="isPreparation">
        <v-alert class="text-h5 font-weight-bold" type="info"
            text="Оберіть нижченаведені параметри перед тим, як розпочати" />
        <div class="mt-6 mb-10">
            <v-select v-model="chosenLetters" label="літери, з яких мають починатися слова" :items="extractLetters()"
                multiple clearable />
            <v-row class="d-flex flex-row">
                <v-col><v-checkbox v-model="practiceAll" label="Практикувати всі слова" /></v-col>
                <v-col><v-number-input v-model="wordAmount" :min="1" :disabled="practiceAll" controlVariant="stacked"
                        label="кількість слів" /></v-col>
            </v-row>
        </div>

        <div class="d-flex align-center flex-wrap ga-4">
            <v-btn class="bg-deep-orange-accent-4" size="large" variant="tonal" elevation="8"
                :disabled="chosenLetters.length < 1" @click="startPractice()">Розпочати</v-btn>
            <v-btn @click="chosenLetters = extractLetters()">Обрати всі літери</v-btn>
            <NuxtLink to="/">
                <v-btn variant="text">Повернутися до головної сторінки</v-btn>
            </NuxtLink>
        </div>

        <v-overlay v-model="showResults" class="d-flex align-center justify-center">
            <v-card class="d-flex flex-column align-center" title="Результат">
                <v-card-text>Ви правильно визначили наголоси в {{ pointsAmount }} з {{ maxPoints }} слів!</v-card-text>
                <v-btn v-if="mistakes.length > 0" class="mb-3" variant="tonal"
                    @click="showMistakes = true; showResults = false">Переглянути помилки</v-btn>
            </v-card>
        </v-overlay>

        <v-overlay v-model="showMistakes" class="d-flex align-center justify-center">
            <v-card title="Помилки, яких ви припустилися">
                <v-table :striped="'odd'" fixed-header hover>
                    <thead>
                        <tr>
                            <th>ваша відповідь</th>
                            <th>правильна відповідь</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(mistake, mistakeIndex) in mistakes" :key="mistakeIndex">
                            <td>{{ mistake.answer }}</td>
                            <td>{{ Array.isArray(mistake.word) ? mistake.word.join('/') : mistake.word }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-overlay>
    </div>

    <div v-else>
        <div class="text-h2 text-break">{{ currentWord.display }}</div>

        <div class="d-flex flex-wrap ga-2 my-6">
            <v-chip>Слів залишилось: {{ array.length }}</v-chip>
            <v-chip :color="chipColor">{{ pointsAmount }} з {{ maxPoints }} правильних відповідей</v-chip>
        </div>

        <v-text-field v-model="answer" label="запиши слово маленькими літерами, а наголошені голосні - великими" />

        <div class="d-flex flex-wrap ga-4">
            <v-btn v-if="array.length > 1" variant="tonal" @click="checkWord()">Перевірити</v-btn>
            <v-btn v-else class="bg-green" size="large" @click="checkWord()">Закінчити</v-btn>
            <v-btn v-if="array.length > 1" variant="text" @click="isPreparation = true">Повернутися до
                налаштувань</v-btn>
        </div>
    </div>
</template>