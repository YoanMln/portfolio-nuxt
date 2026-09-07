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
  if (!lines.length) return
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches
  if (prefersReducedMotion) {
    displayed.value = lines[0]
    return
  }
  step()
})
onUnmounted(() => {
  if (timer !== null) clearTimeout(timer)
})
</script>

<template>
  <div class="ai-console" aria-hidden="true">
    <span class="ai-console__dot" />
    <span class="ai-console__text">{{ displayed }}</span>
    <span class="ai-console__cursor">_</span>
  </div>
</template>

<style scoped lang="scss">
.ai-console {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 40;
  display: flex;
  align-items: center;
  pointer-events: none;
  gap: 9px;
  font-family: $font-mono;
  font-size: 11px;
  color: $core;
  background: rgba($bg-void, 0.7);
  border: 1px solid $line;
  padding: 9px 13px;
  max-width: 260px;
  backdrop-filter: blur(6px);

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $red;
    box-shadow: 0 0 8px $red;
    flex: none;
    animation: console-pulse 1.8s ease-in-out infinite;
  }
  &__cursor {
    animation: blink 1s step-end infinite;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes console-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
}
</style>
