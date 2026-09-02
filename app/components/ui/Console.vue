<script setup>
import lines from '~/data/console/lines.json'

const typeSpeed = 30
const deleteSpeed = 25
const endPause = 1500
const nextLinePause = 300

const displayed = ref('')

let lineIndex = 0
let charIndex = 0
let isDeleting = false
let timer = null

function step() {
  const line = lines[lineIndex]
  let delay

  if (isDeleting) {
    charIndex -= 1
    displayed.value = line.slice(0, charIndex)
    delay = deleteSpeed

    if (charIndex === 0) {
      isDeleting = false
      lineIndex = (lineIndex + 1) % lines.length
      delay = nextLinePause
    }
  } else {
    charIndex += 1
    displayed.value = line.slice(0, charIndex)
    delay = typeSpeed

    if (charIndex === line.length) {
      isDeleting = true
      delay = endPause
    }
  }

  timer = setTimeout(step, delay)
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches
  if (prefersReducedMotion) {
    displayed.value = lines[0]
    return
  }
  step()
})
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="ai-console" aria-hidden="true">
    <span class="ai-console__dot" />
    <span class="ai-console__text">{{ displayed }}</span>
    <span class="ai-console__cursor">_</span>
  </div>
</template>
